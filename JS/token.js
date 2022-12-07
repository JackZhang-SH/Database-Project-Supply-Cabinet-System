function logout(){
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('tel');
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('items');
    //token为YAL意味着会员权限，可以登录所有界面，token为YXZ意味着游客权限，不可登录许多界面。
    //退出时，删除storage中信息且更改token即可。
    sessionStorage.setItem('token','YXZ');
    console.log(sessionStorage);
    window.location.href = 'HomeBeforeLogin.html';
    alert("您已退出登录");
}