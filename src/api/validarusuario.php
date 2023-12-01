<?php
//--------------------------------------------------------------------
//      Email:texto, contrasenya:texto --> validarusuario() --> [Email:texto, contrasenya:texto, nombreyapellidos:texto]
//--------------------------------------------------------------------
// Incluye el archivo de conexi�n a la base de datos
require_once 'db.php';

// Obtiene el correo electr�nico y la contrase�a enviados por POST
$email = $_POST['email'];
$contrasenya = $_POST['password'];

// Obt�n el hash almacenado en la base de datos para el usuario con el correo electr�nico proporcionado
$consulta = $mysql->prepare("SELECT contrasenya FROM usuario WHERE email=?");
$consulta->bind_param('s', $email);
$consulta->execute();
$consulta->bind_result($hashAlmacenado);

if ($consulta->fetch()) {
    // Verifica la contrase�a proporcionada por el usuario con el hash almacenado
    if (password_verify($contrasenya, $hashAlmacenado)) {
        // Contrase�a v�lida, puedes iniciar sesi�n
        echo json_encode($email,$contrasenya);;
    } else {
        // Contrase�a incorrecta
        echo "";
    }
} else {
    // El usuario no se encontr� en la base de datos
    echo "";
}

$consulta->close();
$mysql->close();

?>