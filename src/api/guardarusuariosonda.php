<?php	
    //-------------------------------------------------------------------------------------------------------
    //          Instante:datetime, latitud:R, longitud:R, valor:R,  idcontaminante:R --> guardarmedicion()
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $email = $_POST['email'];
        $idsonda = $_POST['idsonda'];
        
        $query = "INSERT INTO usuariosonda (email,idsonda) VALUES ('$email','$idsonda')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("La relacion entre el usuario y la sonda se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }