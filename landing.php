<?php
  session_start();

  require_once("database.php");

  if (isset($_SESSION['user_id'])) {
    $records = $conn->prepare('SELECT email, contrasenya FROM usuario WHERE email = :email');
    $records->bindParam(':email', $_SESSION['user_id']);
    $records->execute();
    $results = $records->fetch(PDO::FETCH_ASSOC);

    $user = null;

    if (count($results) > 0) {
      $user = $results;
    }
  }

  header('Content-Type: application/json');
  echo json_encode($user);

