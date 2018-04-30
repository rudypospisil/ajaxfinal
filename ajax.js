// Fires when user selects an employee in the dropdown.
function loadEmployee() {
  // Find which employee the user selected.
  empId = document.getElementById("employeeDropdown").value;
  
  // Create
  querySelect();
  
  // Debugging...
  document.getElementById("debug").innerHTML = "You selected: " + empId;

}

function querySelect(empId) {
  reqUrl = "webservice.php" + "?emp=" + empId;
  reqObj = new XMLHttpRequest();
  
  reqObj.open("GET", reqUrl, true);
  
  reqObj.setRequestHeader("Cache-Control", "no-cache");
  reqObj.setRequestHeader("Pragma", "no-cache");
  reqObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  reqObj.send();
}