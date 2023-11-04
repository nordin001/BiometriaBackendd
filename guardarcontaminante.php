<?php	
    //-------------------------------------------------------------------------------------------------------
    //          nombre:text--> guardarcontaminante()
    //-------------------------------------------------------------------------------------------------------

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $nombre = $_POST['nombre'];

        $query = "INSERT INTO contaminantes (nombre) VALUES ('$nombre')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El contaminante se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }