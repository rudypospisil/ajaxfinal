<?php
  $empId = $_GET['empId'];
  
  $dbUser = "rudyTesting";
  $db = "nyu_ajax";
  $dbTable = "westworld_employees";
  
  $mysqli = new mysqli("localhost", $dbUser, $dbUser, $db);
  if ($mysqli->connect_errno) {
      echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
  }
  
  $query = $_GET['q'];
  
  if ($query == "select")
  {
      $sql = "SELECT fullName, species, age, gender, occupation, ethnicity, hair, eyes, profilePicFilename FROM $dbTable WHERE ID = $empId";
      $result = $mysqli->query($sql);
      $row = $result->fetch_assoc();
      $tempArray[] = $row;
      echo(json_encode($tempArray));
  }
  if ($query == "update")
  {
    $sql = "UPDATE $dbTable SET 
      fullName = " . '"' . $_POST['fullName'] . '", ' . 
      "species = " . '"' . $_POST['species'] . '", ' . 
      "age = " . '"' . $_POST['age'] . '", ' . 
      "gender = " . '"' . $_POST['gender'] . '", ' . 
      "occupation = " . '"' . $_POST['occupation'] . '", ' . 
      "ethnicity = " . '"' . $_POST['ethnicity'] . '", ' . 
      "hair = " . '"' . $_POST['hair'] . '", ' . 
      "eyes = " . '"' . $_POST['eyes'] . '"' . " WHERE ID = $empId";
      
    if($mysqli->query($sql))
    {
      echo($sql);
    } else 
      {
        echo $sql;
        echo("Unsuccessful update.");
      }
  }


  $result->close();
  $mysqli->close();
?>