<?php
  /* May 1, 2018 */
  /* Rudy Pospisil */
  /* NYU, AJAX & Web Services / Sam Sultan */
  /* Final Project */

  /* Pull in employee ID from the URL. */
  $empId = $_GET['empId'];
  
  /* MySQL server details. */
  $dbUser = "rudyTesting";
  $db = "nyu_ajax";
  $dbTable = "westworld_employees";
  
  /* Create the mysqli object */
  $mysqli = new mysqli("localhost", $dbUser, $dbUser, $db);

  /* Connect to db. */
  if ($mysqli->connect_errno) {
      echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
  }
  
  /* Find which SQL query the user is executing. */
  $query = $_GET['q'];
  
  /* Using switch/case to determine query method via the URL and act accordingly. */
  /* A better way would be to create a db class, instantiate it on the HTML page, and call the various methods. */
  switch($query)
  {
    /* Build and execute SQL SELECT and send back the details for the requested employee. */
    case "select" :
      $sql = "SELECT fullName, species, age, gender, occupation, ethnicity, hair, eyes, profilePicFilename FROM $dbTable WHERE ID = $empId";
      $result = $mysqli->query($sql);
      $row = $result->fetch_assoc();
      $tempArray[] = $row;
      echo(json_encode($tempArray));
      break;

    /* Build and execute a SQL UPDATE using the POST data. */
    case "update" :
      $sql = "UPDATE $dbTable SET 
      fullName = " . '"' . $_POST['fullName'] . '", ' . 
      "species = " . '"' . $_POST['species'] . '", ' . 
      "age = " . '"' . $_POST['age'] . '", ' . 
      "gender = " . '"' . $_POST['gender'] . '", ' . 
      "occupation = " . '"' . $_POST['occupation'] . '", ' . 
      "ethnicity = " . '"' . $_POST['ethnicity'] . '", ' . 
      "hair = " . '"' . $_POST['hair'] . '", ' . 
      "eyes = " . '"' . $_POST['eyes'] . '"' . " WHERE ID = $empId";
      
      // Send back a true or false whether successful or not.
      if($mysqli->query($sql))
      {
        echo("TRUE");
      } else 
        {
          echo("FALSE");
        }
      break;

    default :
      break;
  }

  // Shut down the query and connection.
  $result->close();
  $mysqli->close();
?>
