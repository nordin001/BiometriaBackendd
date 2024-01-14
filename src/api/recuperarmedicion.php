<?php
    //-------------------------------------------------------------------------------------------------------
    //          id:R --> recuperarmedicion() --> [id, instante, longitud, latitud, idcontaminante]
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");

        $idmedicion = $_GET['idmedicion'];

        $query = "SELECT * FROM medicion WHERE idmedicion = '$idmedicion'";

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
            echo  json_encode("Fallo");
        }

        $result -> close();
        $mysql -> close();
    }