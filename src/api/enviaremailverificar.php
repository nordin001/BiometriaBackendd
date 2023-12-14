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
        $numeroCodificado = $_POST['numeroCodificado'];
        $contrasenya = $_POST['contrasenya'];
        $telefono = $_POST['telefono'];
        $nombreyapellidos =  $_POST['nombreyapellidos'];
        $emailc = $_POST['emailc'];


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
            $mail_template="<h2>Gracias por registrarte en Ozouna</h2>
                        <h3>Introduce el siguiente código para verificar tu correo</h3s>
                        <h1>$codigo</h1>
                        <br/><br/>
                        <a href='http://localhost/BiometriaBackendd/src/app/verificarcorreo.html?codigo=$numeroCodificado&nombre=$nombreyapellidos&telefono=$telefono&contrasenya=$contrasenya&email=$emailc'>Introducir codigo</a>";
            $mail->Body  = $mail_template;
            $mail->send();
            $response['message'] = "Se ha enviado un email a " . $email;
            $response['error'] = false;
        }
        echo json_encode($response);
    }