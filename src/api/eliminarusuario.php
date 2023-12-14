<?php
if(isset($_GET['email'])) {
    $email = $_GET['email'];
    require_once("db.php");

    $query = "DELETE FROM usuario WHERE email = '$email'"; 
    $response = array('message' => '', 'error' => true);

    $result = $mysql->query($query);

    if ($result == true) {
        $response['error'] = false;
        $response['message'] = "Usuario eliminado correctamente";
    } else {
        $response['message'] = "Error al eliminar usuario";
    }

    $mysql->close();
} else {
    $response['message'] = "ID de usuario no proporcionado";
}
echo json_encode($response);
?>