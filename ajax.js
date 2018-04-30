// Fires when user selects an employee in the dropdown.
function loadEmployee() {
  // Find which employee the user selected.
  empId = document.getElementById("employeeDropdown").value;
  
  // Execute query
  querySelect(empId);
  
  // Debugging...
  document.getElementById("debug").innerHTML = "You selected: " + empId;

}

function querySelect(empId) {
  reqUrl = "webservice.php" + "?empId=" + empId;
  reqObj = new XMLHttpRequest();
  
  reqObj.open("GET", reqUrl, false);
  
  
  reqObj.send();
  
  jObj = JSON.parse(reqObj.response);
  
  imgUrl = "img/" + jObj[0]["profile_pic_filename"];
  
  document.getElementById("employeeProfilePic").src = imgUrl;
  
  document.getElementById("name").innerHTML = jObj[0]["name"];
  document.getElementById("species").innerHTML = jObj[0]["species"];
  document.getElementById("age").innerHTML = jObj[0]["age"];
  document.getElementById("gender").innerHTML = jObj[0]["gender"];
  document.getElementById("occupation").innerHTML = jObj[0]["occupation"];
  document.getElementById("ethnicity").innerHTML = jObj[0]["ethnicity"];
  document.getElementById("hair").innerHTML = jObj[0]["hair"];
  document.getElementById("eyes").innerHTML = jObj[0]["eyes"];
  
}