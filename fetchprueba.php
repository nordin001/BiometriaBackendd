<?php
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");

        $query = "SELECT *
        FROM prueba
        ORDER BY id DESC
        LIMIT 1";

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
?>