<?php	
//-------------------------------------------------------------------------------------------------------
//          Email:text, contrasenya:text, nombreyapellidos:text, telefono:text --> registro()
//-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $email = $_POST['email'];
        $contrasenya = password_hash($_POST['contrasenya'], PASSWORD_BCRYPT);
        $nombreyapellidos = $_POST['nombreyapellidos'];
        $telefono = $_POST['telefono'];

        $query = "INSERT INTO usuario (email, contrasenya, nombreyapellidos) VALUES ('$email', '$contrasenya', '$nombreyapellidos')";

        $result = $mysql->query($query);

        if($result == true)
        {
            $query = "INSERT INTO telefono (email, telefono) VALUES ('$email', '$telefono')";

            $result = $mysql->query($query);

            if($result == true)
            {
                echo json_encode("bien");
            }else
            {
                echo json_encode("Ocurrio un error al crear el telefono");
            }
            
        }else
        {
            echo json_encode("Ocurrio un error al crear el usuario");
        }


        
        $mysql->close();
    }