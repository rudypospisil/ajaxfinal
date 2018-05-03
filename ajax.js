// May 1, 2018
// Rudy Pospisil
// NYU, AJAX & Web Services / Sam Sultan
// Final Project

// Getter - Find which employee the user selected.
function getEmp() 
{
  empId = document.getElementById("employeeDropdown").value;
  return empId;
}


// Fires onchange when user selects an employee in the dropdown.
function loadEmployee() 
{
  // CSS magic on the buttons.
  document.getElementById("editButton").innerHTML = '<button type="button" onclick="employeeEdit();">EDIT</button>'; 
  document.getElementById("editButton").style.visibility = "visible";      
  document.getElementById("submitButton").style.visibility = "hidden";  
  
  // Find which employee the user selected.
  getEmp();
  
  // Execute SQL query
  employeeSelect(empId);
  
  // Debugging...
  // document.getElementById("debug").innerHTML = "You selected: " + empId;

}

// Sets up the request to pull in the employee info.
function employeeSelect(empId) 
{
  // Create request object.
  reqUrl = "webservice.php?q=select&empId=" + empId;
  reqObj = new XMLHttpRequest();
  
  // Set up async listener.
  reqObj.onreadystatechange = ajaxResponse; 
  
  // Set up the get request.
  reqObj.open("GET", reqUrl, true);
  
  // Send request. Parameters are in URL.
  reqObj.send();
}

// Set up the editable fields.
function employeeEdit() 
{
  // CSS button magic.
  document.getElementById("editButton").disabled = true;  
  document.getElementById("editButton").style.visibility = "hidden";  
  document.getElementById("submitButton").style.visibility = "visible";  
  document.getElementById("submitButton").innerHTML = '<input type="submit" value="SUBMIT">';  

// This will wrap the employee details in editable input fields.
  document.getElementById("fullName").innerHTML = '<input name="fullName" value="' + jObj[0]["fullName"] + '">' + '</input>';
  document.getElementById("species").innerHTML = '<input name="species" value="' + jObj[0]["species"] + '">' + '</input>';
  document.getElementById("age").innerHTML = '<input name="age" value="' + jObj[0]["age"] + '">' + '</input>';
  document.getElementById("gender").innerHTML = '<input name="gender" value="' + jObj[0]["gender"] + '">' + '</input>';
  document.getElementById("occupation").innerHTML = '<input name="occupation" value="' + jObj[0]["occupation"] + '">' + '</input>';
  document.getElementById("ethnicity").innerHTML = '<input name="ethnicity" value="' + jObj[0]["ethnicity"] + '">' + '</input>';
  document.getElementById("hair").innerHTML = '<input name="hair" value="' + jObj[0]["hair"] + '">' + '</input>';
  document.getElementById("eyes").innerHTML = '<input name="eyes" value="' + jObj[0]["eyes"] + '">' + '</input>';
}

function employeeUpdate() 
{
  // Grab the employee id.
  empId = getEmp();

  // This call will be a POST but the query method and employee ID will be GETted.
  reqUrl = "webservice.php?q=update&empId=" + empId;
  
  // Build the requestbody for the POST to PHP. Navigating the DOM old school JavaScript. Probably not best hard coding this way as it's not easily maintainable.
  reqBody = 
    "fullName=" + 
    document.forms[0][0].value + 
    "&species=" +
    document.forms[0][1].value +
    "&age=" +
    document.forms[0][2].value +
    "&gender=" +
    document.forms[0][3].value +
    "&occupation=" +
    document.forms[0][4].value +
    "&ethnicity=" +
    document.forms[0][5].value +
    "&hair=" +
    document.forms[0][6].value +
    "&eyes=" +
    document.forms[0][7].value;

  //console.log(reqBody);

  // Create the XMLHttpReq object.
  reqObj = new XMLHttpRequest();

  // Set up the async POST request.
  reqObj.open("POST", reqUrl, true);

  // Unlike the previous listener, this is set up as a self-calling function.
  reqObj.onreadystatechange = function()
    {
      // XMLHttpRequest obj has returned.
      if (reqObj.readyState == 4)
      {
        // SQL Update was successful.
        if (reqObj.response == "TRUE")
        {
          document.getElementById("editButton").disabled = false;  
          document.getElementById("editButton").style.visibility = "visible";  
          document.getElementById("submitButton").innerHTML = "<strong>Edit was successful!</strong>";  
        
          // Zero out the reqObj to avoid pre-edited data being rendered.
          reqObj = "";
        
          // Re-populate with the updated SQL data.
          employeeSelect(empId);
       }
       else
       {
        //document.getElementById("details").style.visibility = "hidden"; 
        // SQL update failed. 
        document.getElementById("submitButton").innerHTML = "<strong>Update was unsuccessful.</strong>";      
       }
      }
    }

    // Set headers for POST.
    reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //reqObj.setRequestHeader("Content-length", reqBody.length);
    //reqObj.setRequestHeader("Connection", "close");  
  
    // Send request with POST data.
    reqObj.send(reqBody);
}



// This will parse the SQL return and write out the employee details.
function ajaxResponse() 
{
  if (reqObj.readyState == 4)
  {
    jObj = JSON.parse(reqObj.response);
  
    imgUrl = "img/" + jObj[0]["profilePicFilename"];
  
    document.getElementById("employeeProfilePic").src = imgUrl;
  
    document.getElementById("fullName").innerHTML = jObj[0]["fullName"];
    document.getElementById("species").innerHTML = jObj[0]["species"];
    document.getElementById("age").innerHTML = jObj[0]["age"];
    document.getElementById("gender").innerHTML = jObj[0]["gender"];
    document.getElementById("occupation").innerHTML = jObj[0]["occupation"];
    document.getElementById("ethnicity").innerHTML = jObj[0]["ethnicity"];
    document.getElementById("hair").innerHTML = jObj[0]["hair"];
    document.getElementById("eyes").innerHTML = jObj[0]["eyes"];
  
  }
}

  // Not using this as I embedded it into the onreadystate.
  function ajaxUpdate()
  {
    if (reqObj.readyState == 4)
    {
     if (reqObj.response == "TRUE")
     {
        document.getElementById("editButton").disabled = false;  
        document.getElementById("editButton").style.visibility = "visible";  
        document.getElementById("submitButton").innerHTML = "<strong>Edit was successful!</strong>";  
      
        reqObj = "";
      
        employeeSelect(empId);
     }
     else
     {
      document.getElementById("details").style.visibility = "hidden";  
      document.getElementById("submitButton").innerHTML = "<strong>Update was unsuccessful.</strong>";      
     }
   }
  }
