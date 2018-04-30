<?php

  $dbConnect = mysqli_connect("localhost", "rudyTesting", "rudyTesting", "nyu_ajax","3306");
  
  if(!$dbConnect) 
  {
    die("Could not connect: ", mysqli_connect_error());  
  }
  else
  {
    echo("Successful connection :)");
  }
