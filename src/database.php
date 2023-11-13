<?php	

//-------------------------------------------------------------------------------------------------------
//          server:text, username:text, password:text, database:text --> database()
//-------------------------------------------------------------------------------------------------------
$server = 'localhost';
$username = 'root';
$password = '';
$database = 'proyecto_3a';

try {
  $conn = new PDO("mysql:host=$server;dbname=$database;", $username, $password);
} catch (PDOException $e) {
  die('Connection Failed: ' . $e->getMessage());
}