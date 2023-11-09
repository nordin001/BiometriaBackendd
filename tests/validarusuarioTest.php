<?php

require 'validarusuario.php'; // Include the PHP script you want to test

use PHPUnit\Framework\TestCase;

class validarusuarioTest extends TestCase
{
    public function testValidUser()
    {
        // You should set up a test database connection or mock it for testing purposes
        // Here, we are assuming a simplified test scenario using a mock.
        $mysql = $this->getMockBuilder('mysqli')
            ->disableOriginalConstructor()
            ->getMock();

        // Define the expected input values and hash for a valid user
        $email = 'user@example.com';
        $password = 'test_password';
        $expectedHash = password_hash($password, PASSWORD_BCRYPT);

        // Mock the prepare method to return a prepared statement
        $stmt = $this->getMockBuilder('mysqli_stmt')
            ->disableOriginalConstructor()
            ->getMock();

        // Mock the bind_param method to return true
        $stmt->expects($this->once())->method('bind_param')->willReturn(true);

        // Mock the execute method to return true
        $stmt->expects($this->once())->method('execute')->willReturn(true);

        // Mock the bind_result method to set the hash
        $stmt->expects($this->once())->method('bind_result')->willReturn(true);
        $stmt->hashAlmacenado = $expectedHash;

        // Mock the fetch method to return true
        $stmt->expects($this->once())->method('fetch')->willReturn(true);

        // Stub the global $mysql object with our mock
        $GLOBALS['mysql'] = $mysql;

        // Mock the prepare method to return our prepared statement
        $mysql->expects($this->once())->method('prepare')->willReturn($stmt);

        // Set up the POST data to mimic the input data
        $_POST['email'] = $email;
        $_POST['password'] = $password;

        // Call the function to be tested
        ob_start(); // Capture the output to check later
        validarusuario();
        $output = ob_get_clean();

        // Check if the output is as expected
        $this->assertJsonStringEqualsJsonString('["' . $email . '","' . $password . '"]', $output);
    }

    public function testInvalidUser()
    {
        // Similar to the previous test, set up a mock or a test database connection
        // ...

        // Define the expected input values for an invalid user
        $email = 'nonexistent@example.com';
        $password = 'invalid_password';

        // Mock the fetch method to return false, indicating an invalid user
        $stmt->expects($this->once())->method('fetch')->willReturn(false);

        // ...

        // Call the function to be tested
        ob_start(); // Capture the output to check later
        validarusuario();
        $output = ob_get_clean();

        // Check if the output is as expected
        $this->assertSame('Usuario no encontrado', $output);
    }
}
