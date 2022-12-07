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



function get_all_v_branches(){
var uID = getUserID();
if (uID != ""){
	data.append("V_user_id",uID);
}
else {
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/v_branch/"+uID)
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => {
	data.map(function(V_branch_id) {
		let list = document.createElement('li');
		let v_id = document.createElement('h2');
		let location = document.createElement('span');
		
		v_id.innerHTML = '${data.V_branch_id}';
		location.innerHTML = '${data.location}';
		
		list.appendChild(v_id);
		list.appendChild(location);
	});
})
.catch((error) => alert('Error:' + error)
)
document.getElementById('vbranch_list').appendChild(list);
return true;
}