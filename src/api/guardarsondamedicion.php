<?php	
    //-------------------------------------------------------------------------------------------------------
    //          Instante:datetime, latitud:R, longitud:R, valor:R,  idcontaminante:R --> guardarmedicion()
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $idsonda = $_POST['idsonda'];
        $idmedicion = $_POST['idmedicion'];
        
        $query = "INSERT INTO sondamedicion (idsonda, idmedicion) VALUES ('$idsonda', '$idmedicion')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("La medicion se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }