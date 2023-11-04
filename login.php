<?php

//-------------------------------------------------------------------------------------------------------
//          email:text, contrasenya:text --> database()
//-------------------------------------------------------------------------------------------------------
 session_start();
 $response = array('message' => '', 'error' => true);

  if (isset($_SESSION['user_id'])) {
    header('Location: ../app/landing.html');
  }
  require_once("database.php");
  
  if (!empty($_POST['email']) && !empty($_POST['contrasenya'])) {
    $records = $conn->prepare('SELECT email, contrasenya FROM usuario WHERE email = :email');
    $records->bindParam(':email', $_POST['email']);
    $records->execute();
    $results = $records->fetch(PDO::FETCH_ASSOC);

    $message = '';
    
    if (count($results) > 0 && password_verify($_POST['contrasenya'], $results['contrasenya'])) {
      $_SESSION['user_id'] = $results['email'];
      $response['error'] = false;
    } else {
      $response['message'] = "Uno o ambos datos no son correctos";
    }
  }
header('Content-Type: application/json');
echo json_encode($response);
