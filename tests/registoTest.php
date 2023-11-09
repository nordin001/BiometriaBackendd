<?php

require_once './registro.php'; // Include the database connection
use PHPUnit\Framework\TestCase;
class registroTest extends TestCase {
    public function testRegistrationSuccess() {
        // Create a new instance of your database connection or use a mock
        $mysql = new DatabaseConnection(); // Replace with your actual DatabaseConnection class

        // Define sample data for registration
        $postData = [
            'email' => 'test@example.com',
            'contrasenya' => 'password123',
            'nombreyapellidos' => 'John Doe',
            'telefono' => '1234567890',
        ];

        // Simulate the POST request
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST = $postData;

        // Capture the output of the registration code
        ob_start();
        include 'registro.php'; // Include your registration script
        $output = ob_get_clean();

        // Check if the registration was successful
        $this->assertJsonStringEqualsJsonString(json_encode('bien'), $output);
        
        // You can also add additional assertions to verify the database state after registration.
        // For example, check if the user and phone entries were added to the database.
    }

    // Add more test methods to cover other scenarios (e.g., registration failure).
}
