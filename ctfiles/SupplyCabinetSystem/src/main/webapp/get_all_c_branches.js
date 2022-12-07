function getUserID(){
var userID = "";
if (localStorage.hasOwnProperty("username")) {
   	var username = localStorage.getItem("username");
   	}
if (localStorage.hasOwnProperty("password")) {
   	var password = localStorage.getItem("password");
   	}
 fetch("localhost:8080/user?user_name="+username+"&user_password="+password, { method: "POST",
 body: data })
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => {return(data)})
.catch((error) => alert('Error:' + error)
);
}



function get_all_c_branches(){
var uID = getUserID();
if (uID != ""){
	data.append("C_user_id",uID);
}
else {
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/c_branch/"+uID)
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => {
	data.map(function(C_branch_id) {
		let list = document.createElement('li');
		let c_id = document.createElement('h2');
		let location = document.createElement('span');
		
		c_id.innerHTML = '${data.C_branch_id}';
		location.innerHTML = '${data.location}';
		
		list.appendChild(c_id);
		list.appendChild(location);
	});
})
.catch((error) => alert('Error:' + error)
)
document.getElementById('cbranch_list').appendChild(list);
return true;
}
