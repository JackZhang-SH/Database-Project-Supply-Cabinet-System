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

// Methods for "cbranch"

function cbranch_create(){
var data = new FormData(document.getElementById("cbranch-create-form"));
var uID = getUserID();
if (uID != ""){
	data.append("C_user_id",uID);
}
else {
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/c_branch", { method : "POST",
 body: data })
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => console.log('Sucess:',data))
.catch((error) => alert('Error:' + error)
);
return true;
}



function cbranch_edit(){
var data = new FormData(document.getElementById("cbranch-edit-form"));
var branchID = data.get(C_branch_id);
data.delete(C_branch_id);
var uID = getUserID();
if (uID == ""){
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/c_branch?C_user_id="+uID+"&C_branch_id="+branchID, { method : "POST",
 body: data })
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => console.log('Sucess:',data))
.catch((error) => alert('Error:' + error)
);
return true;
}



function cbranch_delete(){
var data = new FormData(document.getElementById("cbranch-delete-form"));
var branchID = data.get(C_branch_id);
var uID = getUserID();
if (uID == ""){
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/c_branch?C_user_id="+uID+"&C_branch_id="+branchID, { method : "DELETE",
 body: none })
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => console.log('Sucess:',data))
.catch((error) => alert('Error:' + error)
);
return true;
}

// Methods for "company_vendorview"

function vendorview(){
var data = new FormData(document.getElementById("company_vendorview"));
var branchID = data.get(v_branch_id);
fetch("localhost:8080/good/"+branchID)
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => {
	data.map(function(C_branch_id) {
		let list = document.createElement('li');
		let good_id = document.createElement('h2');
		
		good_id.innerHTML = '${data.good_id}';
		
		list.appendChild(good_id);
		
		if (data.has('name')){
		let name = document.createElement('span');
		name.innerHTML = '${data.location}';
		list.appendChild(name);
		}
	});
})
.catch((error) => alert('Error:' + error)
);
document.getElementById('vgood_list').appendChild(list);
return true;
}

// Methods for vbranch

function vbranch_create(){
var data = new FormData(document.getElementById("vbranch-create-form"));
var uID = getUserID();
if (uID != ""){
	data.append("V_user_id",uID);
}
else {
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/v_branch", { method : "POST",
 body: data })
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => console.log('Sucess:',data))
.catch((error) => alert('Error:' + error)
);
return true;
}



function vbranch_edit(){
var data = new FormData(document.getElementById("vbranch-edit-form"));
var branchID = data.get(V_branch_id);
data.delete(V_branch_id);
var uID = getUserID();
if (uID == ""){
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/v_branch?V_user_id="+uID+"&V_branch_id="+branchID, { method : "POST",
 body: data })
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => console.log('Sucess:',data))
.catch((error) => alert('Error:' + error)
);
return true;
}



function vbranch_delete(){
var data = new FormData(document.getElementById("vbranch-delete-form"));
var branchID = data.get(V_branch_id);
var uID = getUserID();
if (uID == ""){
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/v_branch?V_user_id="+uID+"&V_branch_id="+branchID, { method : "DELETE",
 body: none })
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => console.log('Sucess:',data))
.catch((error) => alert('Error:' + error)
);
return true;
}

//  Methods of "prices"

function add_good(){
var data = new FormData(document.getElementById("add-good-form"));
var uID = getUserID();
if (uID != ""){
	data.append("V_user_id",uID);
}
else {
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/good", { method : "POST",
 body: data })
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => console.log('Sucess:',data))
.catch((error) => alert('Error:' + error)
);
return true;
}



function update_good(){
var data = new FormData(document.getElementById("update-good-form"));
var goodID = data.get(good_id)
data.delete(good_id);
var uID = getUserID();
if (uID != ""){
	data.append("V_user_id",uID);
}
else {
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/good/good_id"+goodID, { method : "POST",
 body: data })
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => console.log('Sucess:',data))
.catch((error) => alert('Error:' + error)
);
return true;
}



function vbranch_delete(){
var data = new FormData(document.getElementById("delete-good-form"));
var goodID = data.get(good_id)
var uID = getUserID();
if (uID == ""){
	alert('Error: userID could not be found in local memory');
	return false;
}
fetch("localhost:8080/good/"+goodID, { method : "DELETE",
 body: none })
 .then(
    response => response.text()) // .json(), etc.
    // same as function(response) {return response.text();}
.then(
    data => console.log('Sucess:',data))
.catch((error) => alert('Error:' + error)
);
return true;
}