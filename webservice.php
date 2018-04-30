<?php
  
  $empId = $_GET['empId'];
  
  $dbUser = "rudyTesting";
  $db = "nyu_ajax";
  $dbTable = "westworld_employees";
  
  $mysqli = new mysqli("localhost", $dbUser, $dbUser, $db);
  if ($mysqli->connect_errno) {
      echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
  }
  
  $sql = "SELECT name, species, age, gender, occupation, ethnicity, hair, eyes, profile_pic_filename FROM $dbTable WHERE ID = $empId";
  $result = $mysqli->query($sql);
  $row = $result->fetch_assoc();
  
  echo $row['profile_pic_filename'];
  
  $mysqli->close();
?>
