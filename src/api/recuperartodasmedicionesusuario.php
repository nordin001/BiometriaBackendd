<?php
    //-------------------------------------------------------------------------------------------------------
    //          id:R --> recuperarmedicion() --> [id, instante, longitud, latitud, idcontaminante]
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");

        $email = $_GET['email'];

        $query =" SELECT sondamedicion.idmedicion
        FROM usuario
        JOIN usuariosonda ON usuario.email = usuariosonda.email
        JOIN sonda ON usuariosonda.idsonda = sonda.idsonda
        JOIN sondamedicion ON sonda.idsonda = sondamedicion.idsonda
        WHERE usuario.email = '$email'";

        $result = $mysql->query($query);
        
        $array = array();
        if($mysql->affected_rows > 0)
        {                                                                                               
            while($row = $result->fetch_assoc()) 
            {
                $query2 = "SELECT * FROM medicion WHERE idmedicion = '" . $row['idmedicion'] . "'";
                $result2 = $mysql->query($query2);
                if($mysql->affected_rows > 0)
                {                                                                                               
                    while($row2 = $result2->fetch_assoc()) 
                    {
                        $array[] = $row2;
                    } 
                }else
                {
                    echo "Fallo";
                }
            }
            echo json_encode($array);
        }else
        {
            echo "Fallo";
        }
        $result -> close();
        $result2 -> close();
        $mysql -> close();
    }