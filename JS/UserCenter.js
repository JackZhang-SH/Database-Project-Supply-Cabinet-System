//给出发布信息
function Published(name){
    const jsonheaders=new Headers({
        'Content-type':'application/json',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true
    });
    fetch('http://localhost:8080/item', { method: 'GET' ,  headers:jsonheaders})
    .then((response) => response.json())
    .then((dataTable) => {
        showPublished(dataTable);
    });
}

function showPublished(data){
    const publish=document.getElementById('publish');
    let str=`<p>Item-id:</p>`;
    
    let item=JSON.stringify(data.data)
    console.log(item);
    for(let i=0;i<data.data.length;i++){
      
            str+=`                <div class="item">
             <p>Item-id：<span>${data.data[i].item_id}</span></p>
            <p>Item-name：<span>${data.data[i].item_name}</span></p>
        </div>`
    }
    publish.innerHTML=str;
}

function Purchased(name){
    const jsonheaders=new Headers({
        'Content-type':'application/json',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true
    });
    fetch('http://localhost:8080/v_branch/all', { method: 'GET',headers:jsonheaders})
    .then((response) => response.json())
    .then((dataTable) => {
        showPurchased(dataTable);
    });
}

function showPurchased(data){
    const deal=document.getElementById('deal');
    console.log(data.data);
    let str=`<p>V-Branch:</p>`;
    for(let i=0;i<data.data.length;i++){
        str+=`                <div class="item">
        <p>Vendor：<span>${data.data[i].v_user_id}</span></p>
        <p>Branch：<span>${data.data[i].v_branch_id}</span></p>
        <p>Locationx：<span>${data.data[i].locationx}</span></p>
        <p>Locationy：<span>${data.data[i].locationy}</span></p>
    </div>`
    }
    deal.innerHTML=str;
}

// function DeleteThisPaint(PaintingID){
//     fetch('http://localhost:8080/DeleteYourPaint.php?PaintingID=' + PaintingID, { method: 'GET' })
//     .then((response) => response.json())
//     .then((dataTable) => {
//             if(dataTable.code=='215'){
//                 alert('删除成功');
//             }
//             window.location.reload();
//     });    
// }
// function Sold(name){
//     fetch('http://localhost:8080/FindSeller.php?name=' + name, { method: 'GET' })
//     .then((response) => response.json())
//     .then((dataTable) => {
//         showSold(dataTable);
//     });
// }

// function showSold(data){
//     const selling=document.getElementById('selling');
//     let str=` <p>我卖出的艺术品:</p>`;
//     for(let i=0;i<data.length;i++){
//         str+=`                <div class="item">
//         <p>艺术品名称：${data[i].Title}</p>
//         <p>卖出日期：${data[i].Time}</p>
//         <p>售价：${data[i].Cost}</p>
//         <p>购买人：${data[i].name}</p>
//         <p>购买人邮箱：<span>${data[i].email}</span></p>
//         <p>购买人电话：<span>${data[i].tel}</span></p>
//         <p>购买人地址：<span>${data[i].address}</span></p>
//     </div>`
//     }
//     selling.innerHTML=str;
// }

Published('zyx');
Purchased('zyx');
// Sold(sessionStorage.name);




let chargeForm = document.getElementById("chargeForm");
let strategy=document.getElementById("Strategy");   
let price=document.getElementById("priceCalculation");  
chargeForm.addEventListener("submit", e => {
    e=e||window.Event;
    e.preventDefault();
    console.log(chargeForm);
    const amount=chargeForm['amount'].value.split(",");
    const item_idList=chargeForm['item_idList'].value.split(",");
    const user_x=chargeForm['user_x'].value;
    const user_y=chargeForm['user_y'].value;
    console.log("did");
    const jsonheaders=new Headers({
        'Content-type':'application/json',
        'Access-Control-Allow-Origin':'*',
        
        "Access-Control-Allow-Credentials" : true
      
    });
    const formBody=JSON.stringify({
        amount:amount,
        item_idList:item_idList,
        user_x:user_x,
        user_y:user_y
    })
    console.log(formBody);

        fetch('http://localhost:8080/map/strategy',{
            method:'POST',
            body:formBody,
            headers:jsonheaders,
    
        })
        .then((response) => response.json())
        .then((data) => {
            strategy.innerText=data.data;
            if(data.code=='202'){
                alert("Succeed");  
                
            }
            
        });
        fetch('http://localhost:8080/map/price',{
            method:'POST',
            body:formBody,
            headers:jsonheaders,

        })
        .then((response) => response.json())
        .then((data) => {
            price.innerText=data.data;
            //根据返回状态code判断是否成功登录
            if(data.code=='202'){
                alert("Succeed");  
              
            }
        });
        
})

// function noteOR(item, name) {
//     let origin = document.getElementById(item);
//     let target = document.getElementById(name);
//     if (origin.validity.valid != true) {
//         if (name === "password_invalid") {
//             target.innerText = "密码长度必须大于等于 6 位，且不得为纯数字";
//         }
//         else if (name === "username_invalid") {
//             target.innerText = "用户名只能包含大小写字母、数字、_、-";
//         }
//         else if (name === "no_amount") {
//             target.innerText = "充值金额必须为数字";
//         }
//         else if (name === "repassword_invalid") {
//             target.innerText = "不可为空";
//         }
//         else if (name === "email_invalid") {
//             target.innerText = "邮箱格式不正确";
//         }
//         else if (name === "tel_invalid") {
//             target.innerText = "电话号码不正确";
//         }
//         else if (name === "address_invalid") {
//             target.innerText = "地址不正确";
//         }
//         else if (name === "no_id") {
//             target.innerText = "请输入用户名或邮箱";
//         }
//         else if (name === "no_password") {
//             target.innerText = "请输入密码";
//         }        
//     }
//     else {
//         target.innerText = "";
//         myValid = true;
//         RepasswordCheck();
//         passwordCheck();
//     }
// }

// function showAccount(name){
//     //异步请求获取值，必须在异步函数中调用await等到它被获取。
//     // let amount = fetch('http://localhost:8080/account.php?name=' + name, { method: 'GET' })
//     //     .then((response) => response.json())
//     //     .then((data) => {
//     //         return data;
//     //     });
//     // let n = await amount;
//     // console.log(n)
//     // return n;
//     var xhr = new XMLHttpRequest();
//     console.log(xhr.readyState);//准备状态
//     //打开请求
//     xhr.open('GET', 'http://localhost:8080/account.php?name=' + name, false); //同步请求
//     // 发送请求
//     xhr.send(null);
//     // 判断响应状态
//     let obj = JSON.parse(xhr.responseText);
//     console.log(xhr.responseText)
//     return obj;
// }

// function showUser(){
//     let user =document.getElementsByClassName('user')[0];
//     let data=showAccount(sessionStorage.name);
//     user.innerHTML=`<p>用户名：<span>${data.name}</span></p>
//     <p>邮箱：<span>${data.email}</span></p>
//     <p>电话：<span>${data.tel}</span></p>
//     <p>地址：<span>${data.address}</span></p>
//     <p>账户余额：<span>${data.account}</span></p>
//     <button id="charge">充值</button>`;
// }
// showUser();
// //用户菜单显示
// var navbar =document.getElementById("navbar");
// var menu =document.getElementById("menu");
// var flag=0;

// window.onscroll = function(){
//     if(window.pageYOffset>=(menu.offsetTop+20)){
//         navbar.classList.add("sticky");
//     }
//     else{
//         navbar.classList.remove("sticky");
//     }
// }

// function showList(){
//     flag++;
//     console.log(flag);
//     if(flag%2==0){
//         let hidden=document.getElementById("hidden");
//         hidden.style.opacity="0";
//         hidden.style.width="0";
//         hidden.style.height="0";
//         hidden.style.overflow="hidden";
//         console.log(hidden.style.transition);
//     }
//     else{
//         let hidden=document.getElementById("hidden");
//         hidden.style.opacity="1";
//         hidden.style.width="auto";
//         hidden.style.height="auto";
//         hidden.style.overflow="visible";
//         console.log(hidden.style.transition);
//     }
// }

// //弹窗
//         // 打开弹窗
//         var button = document.getElementById("open");
//         button.onclick = function(){
// 	        var modal = document.querySelector(".modal");
//             modal.style.display = "block";
//         }
//         var button_another = document.getElementById("another_open");
//         button_another.onclick = function(){
// 	        var modal = document.querySelector(".modal");
//             modal.style.display = "block";
//         }
//         // 点击取消 关闭弹窗
//         var paint_cancel = document.getElementById("paint_cancel");
//         paint_cancel.onclick = function(){
// 	        var modal = document.querySelector(".modal");
//             modal.style.display = "none";
//             let uploadForm = document.getElementById("uploadForm");
//             let img=document.getElementById("photo");
//             img.src='../assets/1.jpg';
//             uploadForm.reset();
//         }

//         var charge = document.getElementById("charge");
//         charge.onclick = function(){
// 	        var charge = document.querySelector(".charge");
//             charge.style.display = "block";
            
//         }
//         // 点击取消 关闭弹窗
//         var charge_cancel = document.getElementById("charge_cancel");
//         charge_cancel.onclick = function(){
// 	        var charge = document.querySelector(".charge");
//             charge.style.display = "none";
//         }
//         var charge_admit = document.getElementById("charge_admit");
//         charge_admit.onclick = function(){
//             var msg = "确认充值？";
//             if (confirm(msg)==true){
//                 var charge = document.querySelector(".charge");
//                 charge.style.display = "none"; //你也可以在这里做其他的操作
//             }
//         }