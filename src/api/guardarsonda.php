<?php	
    //-------------------------------------------------------------------------------------------------------
    //          Instante:datetime, latitud:R, longitud:R, valor:R,  idcontaminante:R --> guardarmedicion()
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        
        $query = "INSERT INTO sonda";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("La sonda se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }