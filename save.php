<?php	

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $Nombre = $_POST['Nombre'];
        $Email = $_POST['Email'];
        $Telefono = $_POST['Telefono'];

        $query = "INSERT INTO usuarios (Nombre, Email, Telefono) VALUES ('$Nombre', '$Email', '$Telefono')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo "El usuario se creo coreectamente";
        }else
        {
            echo "Error";
        }

        $mysql->close();
    }
