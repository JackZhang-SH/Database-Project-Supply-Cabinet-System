var xmlHttpRequest =  new XMLHttpRequest();
function login () {
  var data = new FormData(document.getElementById("login-form"));
  
  fetch("dummy.js", { method:"POST", body:data })
  .then((res) => { return res.text(); })
  .then((txt) => {
    if (txt == "OK") { location.href = "home.html"; }
    else { alert(txt); }
  });
  return false;
}