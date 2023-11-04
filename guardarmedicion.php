<?php	
    //-------------------------------------------------------------------------------------------------------
    //          Instante:datetime, latitud:R, longitud:R, valor:R,  idcontaminante:R --> guardarmedicion()
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $instante = $_POST['instante'];
        $latitud = $_POST['latitud'];
        $longitud = $_POST['longitud'];
        $valor = $_POST['valor'];
        $idcontaminante = $_POST['idcontaminante'];
        
        $query = "INSERT INTO medicion (instante, latitud, longitud, valor, idcontaminante) VALUES ('$instante', '$latitud', '$longitud', '$valor', '$idcontaminante')";

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