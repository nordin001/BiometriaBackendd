<?php
    //-------------------------------------------------------------------------------------------------------
    //          id:R, recuperarcontaminante:R --> guardarusuario() --> [id,nombre]
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");

        $query = "SELECT * FROM contaminantes";

        $result = $mysql->query($query);
        
        $array = array();
        if($mysql->affected_rows > 0)
        {
            while($row = $result->fetch_assoc()) 
            {
                $array[] = $row;
            }

            echo json_encode($array);
        }else
        {
            echo "Fallo";
        }

        $result -> close();
        $mysql -> close();
    }