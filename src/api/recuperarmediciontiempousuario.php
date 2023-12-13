<?php
    //-------------------------------------------------------------------------------------------------------
    //          email:text --> recuperarusuario() --> [email, nombreyapliidos, contrasenya]
    //-------------------------------------------------------------------------------------------------------
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        require_once("db.php");
    
        $desde = date("Y-m-d H:i:s", strtotime($_GET['desde']));
        $hasta = date("Y-m-d H:i:s", strtotime($_GET['hasta']));
        $email = $_GET['email'];
    
        // Consulta para obtener mediciones entre las fechas dadas y asociadas al usuario
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
            echo "No se encontraron mediciones en ese rango de fechas para este usuario.";
        }
    
        // Cerrar conexión y liberar recursos
        $result->close();
        $mysql->close();
    }