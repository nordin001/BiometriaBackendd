<?php
    //-------------------------------------------------------------------------------------------------------
    //          id:R --> recuperarmedicion() --> [id, instante, longitud, latitud, idcontaminante]
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");

        $email = $_GET['email'];

        $query = "SELECT * FROM usuariosonda WHERE email = '$email'";

        $result = $mysql->query($query);
        
        if($mysql->affected_rows > 0)
        {                                                                                               
            while($row = $result->fetch_assoc()) 
            {
                $array = $row;
            }

            echo json_encode($array);
        }else
        {
            echo "Fallo";
        }

        $result -> close();
        $mysql -> close();
    }