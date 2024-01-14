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
        $emailEncoded = $_POST['email_codificado'];

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
                            <h3>Haz click en el siguiente enlace para cambiar la contraseña.</h3>
                            <br/><br/>
                            <a href='http://localhost/BiometriaBackendd/src/app/contrasenyanueva.html?email=$emailEncoded'>Cambiar Contraseña</a>";
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