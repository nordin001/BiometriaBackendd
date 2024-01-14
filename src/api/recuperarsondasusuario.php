<?php
    //-------------------------------------------------------------------------------------------------------
    //          email:text --> recuperartelefono() --> [email,telefono]
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");

        $email = $_GET['email'];

        $query = "SELECT COUNT(*) as count_sondas FROM usuariosonda WHERE email = '$email'";

        $result = $mysql->query($query);

        if($result)
        {
            $row = $result->fetch_assoc();
            $countSondas = $row['count_sondas'];

            echo $countSondas;
        } else {
            echo "Fallo";
        }

        $mysql->close();

    }
?>