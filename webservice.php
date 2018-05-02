<?php
  $queryType = $_GET['q'];
  $empId = $_GET['empId'];
  
  $dbUser = "rudyTesting";
  $db = "nyu_ajax";
  $dbTable = "westworld_employees";
  
  $mysqli = new mysqli("localhost", $dbUser, $dbUser, $db);
  if ($mysqli->connect_errno) {
      echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
  }
  
  switch($queryType)
  {
    case "select" :
      $sql = "SELECT fullName, species, age, gender, occupation, ethnicity, hair, eyes, profilePicFilename FROM $dbTable WHERE ID = $empId";
      $result = $mysqli->query($sql);
      $row = $result->fetch_assoc();
      $tempArray[] = $row;
      echo(json_encode($tempArray));
      break;
    case "update" :
      $sql = 'UPDATE $dbTable SET fullName = "' . $_POST['fullName'] . '" WHERE ID = ' . $empId;
      if($mysqli->query($sql))
      {
        echo $sql;
        var_dump($_POST);
        echo("Successful update");
      } else 
        {
        echo $sql;
        var_dump($_POST);
        echo("Unsuccessful update.");
      }
      break;
    default:
      break;
  }


  $result->close();
  $mysqli->close();
?>