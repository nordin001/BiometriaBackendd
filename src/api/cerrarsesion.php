<?php
    //-------------------------------------------------------------------------------------------------------
    //         cerrarsesion()
    //-------------------------------------------------------------------------------------------------------
  session_start();

  session_unset();

  session_destroy();
  header('Location: ../app/InicioSesion.html');
?>
