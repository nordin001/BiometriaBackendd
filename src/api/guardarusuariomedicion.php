<?php	
    //-------------------------------------------------------------------------------------------------------
    //          Instante:datetime, latitud:R, longitud:R, valor:R,  idcontaminante:R --> guardarmedicion()
    //-------------------------------------------------------------------------------------------------------
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        require_once("db.php");
    
        $email = $_POST['email'];
        $idmedicion = $_POST['idmedicion'];
    
        // Verificar si existe un registro con el email proporcionado
        $checkQuery = "SELECT COUNT(*) as count FROM usuariomedicion WHERE email = '$email'";
        $checkResult = $mysql->query($checkQuery);
    
        if ($checkResult !== false && $checkResult->num_rows > 0) {
            $row = $checkResult->fetch_assoc();
            $rowCount = $row['count'];
    
            if ($rowCount == 0) {
                // Si no existe un registro con el email, realizar una inserción
                $query = "INSERT INTO usuariomedicion (email, idmedicion) VALUES ('$email', '$idmedicion')";
            } else {
                // Si existe un registro con el email, realizar una actualización
                $query = "UPDATE usuariomedicion SET idmedicion = '$idmedicion' WHERE email = '$email'";
            }
    
            $result = $mysql->query($query);
    
            if ($result !== false) {
                echo json_encode("La operación se realizó correctamente");
            } else {
                echo json_encode("Error en la operación");
            }
        } else {
            echo json_encode("Error al verificar el registro");
        }
    
        $mysql->close();
    }
    