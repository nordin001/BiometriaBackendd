<?php	

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $Sensor = $_POST['Sensor'];
        $Valores = $_POST['Valores'];
        $Latitud = $_POST['Latitud'];
        $Longitud = $_POST['Longitud'];
        $Hora = $_POST['Hora'];
        

        $query = "INSERT INTO mediciones (Sensor, Valores, Latitud, Longitud, Hora) VALUES ('$Sensor', '$Valores' ,'$Latitud', '$Longitud', '$Hora')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo "La medicion se creo coreectamente";
        }else
        {
            echo "Error";
        }

        $mysql->close();
    }