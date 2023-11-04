<?php	

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $co2 = $_POST['co2'];
        $temp = $_POST['temp'];

        $query = "INSERT INTO prueba (co2, temp) VALUES ('$co2', '$temp')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo "La prueba se creo coreectamente";
        }else
        {
            echo "Error";
        }

        $mysql->close();
    }