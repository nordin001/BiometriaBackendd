<?php
    //-------------------------------------------------------------------------------------------------------
    //          email:text --> recuperarusuario() --> [email, nombreyapliidos, contrasenya]
    //-------------------------------------------------------------------------------------------------------
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        require_once("db.php");
    
        $desde = date("Y-m-d H:i:s", strtotime($_GET['desde']));
        $hasta = date("Y-m-d H:i:s", strtotime($_GET['hasta']));
        $email = $_GET['email'];
    
        $query = "SELECT m.* 
                  FROM usuario u
                  JOIN usuariosonda us ON u.email = us.email
                  JOIN sonda s ON us.idsonda = s.idsonda
                  JOIN sondamedicion sm ON s.idsonda = sm.idsonda
                  JOIN medicion m ON sm.idmedicion = m.idmedicion
                  WHERE u.email = '$email' AND m.instante BETWEEN '$desde' AND '$hasta'";
    
        $result = $mysql->query($query);
    
        $array = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $array[] = $row;
            }
            echo json_encode($array);
        } else {
            echo json_encode(array());
        }
    
        $result->close();
        $mysql->close();
    }