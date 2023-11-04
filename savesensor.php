<?php	

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $Usuario = $_POST['Usuario'];
        $TipoSensor = $_POST['TipoSensor'];

        $query = "INSERT INTO sensores (Usuario, TipoSensor) VALUES ('$Usuario', '$TipoSensor')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo "El sensor se creo coreectamente";
        }else
        {
            echo "Error";
        }

        $mysql->close();
    }