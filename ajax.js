// Fires when user selects an employee in the dropdown.
function loadEmployee() {
  // Find which employee the user selected.
  empId = document.getElementById("employeeDropdown").value;
  
  // Create
  querySelect(empId);
  
  // Debugging...
  document.getElementById("debug").innerHTML = "You selected: " + empId;

}

function querySelect(empId) {
  reqUrl = "webservice.php" + "?empId=" + empId;
  reqObj = new XMLHttpRequest();
  
  reqObj.open("GET", reqUrl, false);
  
  reqObj.send();
  
  imgUrl = "img/" + reqObj.responseText;
  
  document.getElementById("employeeProfilePic").src = imgUrl;
}