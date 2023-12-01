<?php
    //-------------------------------------------------------------------------------------------------------
    //          email:text --> actualizarusuario()
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $email = $_POST["email"];
        $emailantiguo = $_POST["emailantiguo"];
        $nombreyapellidos = $_POST["nombreyapellidos"];

        $query = "UPDATE usuario  SET nombreyapellidos='$nombreyapellidos', email='$email' WHERE email='$emailantiguo'";


        $result = $mysql->query($query);

        if($result == true)
        {
            if(isset($_SESSION['user_id']))
            {
                $_SESSION['user_id'] = $email;
            }
            echo json_encode("El usuario se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }

    