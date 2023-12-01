<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    require_once("db.php");

    $response = array('message' => '', 'error' => true);

    $email = $_POST['email'];
    $codigo = $_POST['codigo'];

    $clave = "";
    for ($i = 0; $i < strlen($codigo); $i++) {
        $asciiValue = ord($codigo[$i]);
        // Simplemente restamos 1 al valor ASCII (puedes usar cualquier operación)
        $clave .= chr($asciiValue - 1);
    }
    

    $query = "SELECT * FROM usuario WHERE email = '$email'";

    $result = $mysql->query($query);

    $message = '';
    if($mysql->affected_rows > 0)
    {
        $response['message'] = "El correo ya tiene una cuenta creada";
    }
    else
    {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'ozounagti@gmail.com';
        $mail->Password = 'kuhriuujbdubqcds';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('ozounagti@gmail.com');
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject  = 'Verificar correo para crear cuenta de Ozouna';
        $mail_template="<h2>Te has registado en Ozouna</h2>
                <h3>Introduce el siguinte codigo para verificar tu correo</h3s>
                <h1>$clave</h1>
                <br/><br/>";
        $mail->Body  = $mail_template;
        $mail->send();
        $response['message'] = "Se ha enviado un email a " . $email;
        $response['error'] = false;
    }
    echo json_encode($response);
}