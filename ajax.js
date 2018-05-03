// Fires when user selects an employee in the dropdown.
function loadEmployee() 
{
  document.getElementById("editButton").innerHTML = '<button type="button" onclick="employeeEdit();">EDIT</button>'; 
  document.getElementById("editButton").style.display = "block";      
  document.getElementById("submitButton").style.display = "none";  
  
  // Find which employee the user selected.
  getEmp();
  
  // Execute query
  employeeSelect(empId);
  
  // Debugging...
  // document.getElementById("debug").innerHTML = "You selected: " + empId;

}

function employeeSelect(empId) 
{
  reqUrl = "webservice.php?q=select&empId=" + empId;
  reqObj = new XMLHttpRequest();
  
  reqObj.onreadystatechange = ajaxResponse; 
  
  reqObj.open("GET", reqUrl, true);
  
  reqObj.send();
}

function employeeEdit() 
{
  document.getElementById("editButton").disabled = true;  
  document.getElementById("editButton").style.display = "none";  
  document.getElementById("submitButton").style.display = "block";  
  document.getElementById("submitButton").innerHTML = '<input type="submit" value="SUBMIT">';  

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
  empId = getEmp();
  reqUrl = "webservice.php?q=update&empId=" + empId;
  
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

  reqObj = new XMLHttpRequest();
  
  reqObj.open("POST", reqUrl, true);

  reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //reqObj.setRequestHeader("Content-length", reqBody.length);
  //reqObj.setRequestHeader("Connection", "close");  
  
  reqObj.send(reqBody);
  
  document.getElementById("editButton").disabled = false;  
  document.getElementById("editButton").style.display = "block";  
  document.getElementById("submitButton").innerHTML = "<strong>Edit was successful!</strong>";  
  
  employeeSelect(empId);
  
}

// Find which employee the user selected.
function getEmp() 
{
  empId = document.getElementById("employeeDropdown").value;
  return empId;
}

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