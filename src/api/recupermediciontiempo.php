<?php
    //-------------------------------------------------------------------------------------------------------
    //          email:text --> recuperarusuario() --> [email, nombreyapliidos, contrasenya]
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");
        $desde = date("Y-m-d H:i:s", strtotime($_GET['desde']));
        $hasta = date("Y-m-d H:i:s", strtotime($_GET['hasta']));

        $query = "SELECT * FROM medicion WHERE instante BETWEEN '$desde' AND '$hasta'";

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
            echo json_encode(array());
        }

        $result -> close();
        $mysql -> close();
    }