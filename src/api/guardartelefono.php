<?php
    //-------------------------------------------------------------------------------------------------------
    //          email:text, telefono:R --> guardartelefono()
    //-------------------------------------------------------------------------------------------------------

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        

        $email = $_POST['email'];
        $telefono = $_POST['telefono'];

        $query = "INSERT INTO telefono (email, telefono) VALUES ('$email', '$telefono')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El telefono se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }