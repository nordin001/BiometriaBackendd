<?php
    //-------------------------------------------------------------------------------------------------------
    //          email:text --> recuperarusuario() --> [email, nombreyapliidos, contrasenya]
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");
        $query = "SELECT  email, nombreyapellidos FROM usuario"; // Suponiendo que la tabla se llama 'usuarios'
        $result = $mysql->query($query);
        
        // Procesar los resultados y devolver los datos como JSON
        $users = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $users[] = $row;
        }
        
        // Devolver los usuarios en formato JSON
        echo json_encode($users);

        $result -> close();
        $mysql -> close();
    }