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

        $decryptedText = "";
        for ($i = 0; $i < strlen($codigo); $i++) {
            $asciiValue = ord($codigo[$i]);
            // Simplemente restamos 1 al valor ASCII (puedes usar cualquier operación)
            $decryptedText .= chr($asciiValue - 1);
        }

        $query = "SELECT * FROM usuario WHERE email = '$email'";

        $result = $mysql->query($query);
        
        $message = '';
        if($mysql->affected_rows > 0)
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
            $mail->Subject  = 'Cambiar contrasenya Ozouna';
            $mail_template="<h2>Cambiar contraseña</h2>
                            <h3>Introduce el siguiente código en la aplicación para cambiar la contraseña.</h3>
                            <br/><br/>
                            <h1>$decryptedText</h1>";
            $mail->Body  = $mail_template;
            $mail->send();
            $response['message'] = "Se ha enviado un email a " . $email;
            $response['error'] = false;
        }
        else
        {
            $response['message'] = "El correo no tiene una cuenta creada";
        }
        echo json_encode($response);
    }