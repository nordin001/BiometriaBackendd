<?php

    //-------------------------------------------------------------------------------------------------------
    //     contrasenyaactual:text, nuevacontrasenya:text, confirmarcontrasenya:text --> cambiarcontrasenya()
    //-------------------------------------------------------------------------------------------------------
session_start();
$response = array('message' => '', 'error' => true);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        require_once("database.php");
        if (!empty($_POST['contrasenyaactual']) && !empty($_POST['nuevacontrasenya']) && !empty($_POST['confirmarcontrasenya'])) {

            $records = $conn->prepare('SELECT contrasenya FROM usuario WHERE email = :email');
            $records->bindParam(':email', $_POST['correo']);
            $records->execute();
            $results = $records->fetch(PDO::FETCH_ASSOC);

            if (count($results) > 0 && password_verify($_POST['contrasenyaactual'], $results['contrasenya'])) {

                if ($_POST['nuevacontrasenya'] == $_POST['confirmarcontrasenya']) {
                    $nuevacontrasenya = password_hash($_POST['nuevacontrasenya'], PASSWORD_BCRYPT);
                    $stmt = $conn->prepare("UPDATE usuario SET contrasenya = :nuevaContrasenya WHERE email = :email");
                    $stmt->bindParam(':nuevaContrasenya', $nuevacontrasenya);
                    $stmt->bindParam(':email', $_POST['correo']);
                    $stmt->execute();

                    $response['message'] = "La contraseña se ha cambiado correctamente.";
                    $response['error'] = false;
                } else {
                    $response['message'] = "Las contraseña nueva y la confirmacion no coinciden";
                }
            } else {
                $response['message'] = "La contraseña actual no coincide";
            }
        }
    }

header('Content-Type: application/json');
echo json_encode($response);
?>
