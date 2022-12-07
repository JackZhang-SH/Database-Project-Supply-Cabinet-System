
let login = document.getElementById('login');
let register = document.getElementById('register');
let form_box = document.getElementsByClassName('form-box')[0];
let register_box = document.getElementsByClassName('register-box')[0];
let login_box = document.getElementsByClassName('login-box')[0];

register.addEventListener('click', () => {
    form_box.style.transform = 'translateX(80%)';
    login_box.classList.add('hidden');
    register_box.classList.remove('hidden');
})

login.addEventListener('click', () => {
    form_box.style.transform = 'translateX(0%)';
    register_box.classList.add('hidden');
    login_box.classList.remove('hidden');
})

//错误提示

var myValid = true;//一些人工的格式要求，比如两次密码输入一致和密码不与用户名相同，此时依靠此变量监测表单有效性

function RepasswordCheck() {
    var reg_repassword = document.getElementById("reg_repassword");
    var reg_password = document.getElementById("reg_password");
    let target = document.getElementById("repassword_invalid");
    if (reg_repassword.value != reg_password.value) {
        target.innerHTML = "<p id='repassword_invalid' class='noting'>与首次输入不一致</p> ";
        myValid = false;
    }
    else {
        target.innerText = "";
        myValid = true;
    }
}

function passwordCheck() {
    var reg_username= document.getElementById("reg_username");
    var reg_password = document.getElementById("reg_password");
    let target = document.getElementById("password_invalid");
    if (reg_username.value == reg_password.value) {
        target.innerHTML = "<p id='password_invalid' class='noting'>密码不可与用户名相同</p> ";
        myValid = false;
    }
    else {
        target.innerText = "";
        myValid = true;
    }
}

function note(item, name) {
    let origin = document.getElementById(item);
    let target = document.getElementById(name);
    if (origin.validity.valid != true) {
        if (name === "password_invalid") {
            target.innerText = "密码长度必须大于等于 6 位，且不得为纯数字";
        }
        else if (name === "username_invalid") {
            target.innerText = "用户名只能包含大小写字母、数字、_、-";
        }
        else if (name === "repassword_invalid") {
            target.innerText = "不可为空";
        }
        else if (name === "email_invalid") {
            target.innerText = "邮箱格式不正确";
        }
        else if (name === "tel_invalid") {
            target.innerText = "电话号码不正确";
        }
        else if (name === "address_invalid") {
            target.innerText = "地址不正确";
        }
        else if (name === "no_id") {
            target.innerText = "请输入用户名或邮箱";
        }
        else if (name === "no_password") {
            target.innerText = "请输入密码";
        }        
    }
    else {
        target.innerText = "";
        myValid = true;
        RepasswordCheck();
        passwordCheck();
    }
}

//提交表单时的验证
let RegisterForm = document.getElementById("RegisterForm");
RegisterForm.addEventListener("submit", e => {
    e=e||window.Event;
    e.preventDefault();
    const name=RegisterForm['name'].value;
    const password=RegisterForm['password'].value;
    const email=RegisterForm['email'].value;
    const tel=RegisterForm['tel'].value;
    const address=RegisterForm['address'].value;
    const jsonheaders=new Headers({
        'Content-type':'application/json',
        'Access-Control-Allow-Origin':'http://127.0.0.1:8084',
    });
    const formBody=JSON.stringify({
        name:name,
        password:password,
        email:email,
        tel:tel,
        address:address,
    })
    console.log(formBody);
    if(CheckBeforeSubmit('RegisterForm')){
        fetch('http://localhost:8080/register.php',{
            method:'POST',
            body:formBody,
            headers:jsonheaders,
        })
        .then((response) => response.json())
        .then((data) => {
            //根据返回状态code判断是否成功登录
            if(data.code==='203'){
                alert("注册成功");  
            }
            else if(data.code==='204'){
                alert("注册失败，存在相同邮箱或用户名");
            }
        });
    }
})

let LoginForm = document.getElementById("LoginForm");
LoginForm.addEventListener("submit", e => {
    e=e||window.Event;
    e.preventDefault();
    const name=LoginForm['name'].value;
    const password=LoginForm['password'].value;
    const jsonheaders=new Headers({
        'Content-type':'application/json',
        'Access-Control-Allow-Origin':'http://127.0.0.1:8084',
    });
    const formBody=JSON.stringify({
        name:name,
        password:password,
    })
    if(CheckBeforeLogin('LoginForm')){
        fetch('http://localhost:8080/login.php',{
            method:'POST',
            body:formBody,
            headers:jsonheaders,
        }) 
        //先根据返回状态判断是否成功登录
        .then((response) => response.json())
        .then((data) => {
            //将该用户信息写入本地
            if(data.code==='201'){
                sessionStorage.setItem('name',data.name);
                sessionStorage.setItem('email',data.email);
                sessionStorage.setItem('tel',data.tel);
                sessionStorage.setItem('address',data.address);
                //token为YAL意味着会员权限，可以登录所有界面，token为YXZ意味着游客权限，不可登录许多界面。
                //退出时，删除storage中信息且更改token即可。
                sessionStorage.setItem('token','YAL');
                window.location.href='HomeAfterLogin.html';
                alert("登录成功");  
            }
            else if(data.code==='202'){
                alert("登录失败，用户名与密码不符");
            }
        });
    }
})

function CheckBeforeSubmit(formname){
    let Form = document.getElementById(formname);
    if(myValid==true){
        Form.reset();
        return true;
    }
    else{
        alert("提交失败,表单存在格式错误"); 
    }
    return false;
}

function CheckBeforeLogin(formname){
    let Form = document.getElementById(formname);
    Form.reset();
    return true;
}
//提交完表单不允许跳转----要将提交方式变为ajax



