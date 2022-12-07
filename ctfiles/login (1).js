function login () {
	const uname = document.getElementById("username").value;
	const pwd = document.getElementById("password").value;
	
	localStorage.setItem("username", uname);
	localStorage.setItem("password", pwd);
	
	var loginURL =  "localhost:8080/user?user_name=" + uname "&user_password=" + pwd;
	fetch(loginURL, { method:"POST" })
	.then(result => { return result.text(); })
	.then((data) => {
		if(data == "OK") {
			location.href = "PLACEHOLDER.html";
		}
		else {
			alert(data);
		}
	});
}

