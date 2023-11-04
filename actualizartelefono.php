<?php
    //-------------------------------------------------------------------------------------------------------
    //          email:text --> actualizartelefono()
    //-------------------------------------------------------------------------------------------------------

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $email = $_POST["email"];
        $telefono = $_POST["telefono"];
        

        $query = "UPDATE telefono  SET telefono='$telefono' WHERE email='$email'";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El telefono se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }