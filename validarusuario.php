<?php
//--------------------------------------------------------------------
//      Email:texto, contrasenya:texto --> validarusuario() --> [Email:texto, contrasenya:texto, nombreyapellidos:texto]
//--------------------------------------------------------------------
// Incluye el archivo de conexión a la base de datos
require_once 'db.php';

// Obtiene el correo electrónico y la contraseña enviados por POST
$email = $_POST['email'];
$contrasenya = $_POST['password'];

// Obtén el hash almacenado en la base de datos para el usuario con el correo electrónico proporcionado
$consulta = $mysql->prepare("SELECT contrasenya FROM usuario WHERE email=?");
$consulta->bind_param('s', $email);
$consulta->execute();
$consulta->bind_result($hashAlmacenado);

if ($consulta->fetch()) {
    // Verifica la contraseña proporcionada por el usuario con el hash almacenado
    if (password_verify($contrasenya, $hashAlmacenado)) {
        // Contraseña válida, puedes iniciar sesión
        echo json_encode($email,$contrasenya);;
    } else {
        // Contraseña incorrecta
        echo "";
    }
} else {
    // El usuario no se encontró en la base de datos
    echo "Usuario no encontrado";
}

$consulta->close();
$mysql->close();

?>