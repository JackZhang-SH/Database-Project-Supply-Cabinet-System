//用户菜单显示
var navbar = document.getElementById("navbar");
var menu = document.getElementById("menu");
var flag = 0;

function showList() {
    flag++;
    console.log(flag);
    if (flag % 2 == 0) {
        let hidden = document.getElementById("hidden");
        hidden.style.opacity = "0";
        hidden.style.width = "0";
        hidden.style.height = "0";
        hidden.style.overflow = "hidden";
        console.log(hidden.style.transition);
    }
    else {
        let hidden = document.getElementById("hidden");
        hidden.style.opacity = "1";
        hidden.style.width = "auto";
        hidden.style.height = "auto";
        hidden.style.overflow = "visible";
        console.log(hidden.style.transition);
    }
}

loadCart();
async function loadCart() {

    if(sessionStorage.items!==undefined){
        let IDs = JSON.parse(sessionStorage.items);
        let str = "";
        let cost = 0;
        for (let i = 0; i < IDs.length; i++) {
            str += await loadDetail(IDs[i], i);
            cost += Number(await Cost(IDs[i]));
        }      
        if(sessionStorage.cost==undefined){
            sessionStorage.setItem('cost',cost);
        }
        else{
            sessionStorage.cost=cost;
        }
        const cart = document.getElementsByClassName('ForItem')[0];
        cart.innerHTML = str;
        const check=document.getElementById('check');
        check.innerHTML=`结款：<span>${cost}$</span>`;
    }

}
function showAccount(name){

    var xhr = new XMLHttpRequest();
    console.log(xhr.readyState);

    xhr.open('GET', 'http://localhost:8080/account.php?name=' + name, false); 

    xhr.send(null);
    {
      "name":"yxz", 
      "cost":"100" 
    }
    let obj = JSON.parse(xhr.responseText);
    console.log(xhr.responseText)
    return obj.account;
}

let shoppingForm = document.getElementById("shoppingForm");
shoppingForm.addEventListener("submit", e => {
    e=e||window.Event;
    e.preventDefault();
    let name=sessionStorage.name;
    let cost=sessionStorage.cost;
    let address=sessionStorage.address;
    let tel=sessionStorage.tel;
    let amount = showAccount(name);
    let IDs = JSON.parse(sessionStorage.items);
    let check=true; //检查这些艺术品是否已售出
    for (let i = 0; i < IDs.length; i++) {
        let state=loadState(IDs[i]);
        if(state=='已售出'){
            check=false;
            break;
        }
    }   
    console.log(check);
    if(confirm(`购买者姓名：${name},消费金额：${cost},收货地址：'${address}',电话：${tel},账户余额:${amount},请确认`)){
       
        if(check==true){
            pay(name,IDs,cost);
        }
        else{
            alert('您购买的艺术品已售出！');
        }
    }
})

//一整个交易过程,包括扣款，改变艺术品状态，给卖家汇款
function pay(name,PaintingIDs,cost){
    const jsonheaders=new Headers({
    });
    var data=new FormData();
    data.append('name',name);
    data.append('cost',cost);

    fetch('http://localhost:8080/Pay.php',{
        method:'POST',
        body:data,
        headers:jsonheaders,
    }) 

    .then((response) => response.json())
    .then((data) => {
        if(data.code=='210'){
            alert('支付成功');
            for(let i=0;i<PaintingIDs.length;i++){
                TheItemIsSold(PaintingIDs[i],name);
            }
            sessionStorage.removeItem('items');
        }
        else if(data.code=='211'){
            alert('余额不足，支付失败！');
            return false;
        }
    });    
    
    window.location.reload();
}

//对购物车中某个艺术品，改变这个艺术品的状态并给owner汇款
function TheItemIsSold(PaintingID,name){
    const jsonheaders=new Headers({
        'Content-type':'application/json',
        'Access-Control-Allow-Origin':'http://127.0.0.1:8084',
    });
    const formBody=JSON.stringify({
        PaintingID:PaintingID,
        name:name,
    })
    fetch('http://localhost:8080/Sold.php',{
        method:'POST',
        body:formBody,
        headers:jsonheaders,
    }) 
    //先根据返回状态判断是否成功登录
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
}


async function Cost(PaintingID) {
    let cost = fetch('http://localhost:8080/Painting.php?PaintingID=' + PaintingID, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            return data.Cost;
        });
    let n = await cost;
    return n;
}


//index代表这是购物车中第几项
async function loadDetail(PaintingID, index) {
    //读取数据
    let str = await fetch('http://localhost:8080/Painting.php?PaintingID=' + PaintingID, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            return showDetail(data, index);
        });
    return str;
}

function loadState(PaintingID) {
    //读取数据
    // let state = await fetch('http://localhost:8080/Painting.php?PaintingID=' + PaintingID, { method: 'GET' })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         return data.State;
    //     });
    // return state;
    var xhr = new XMLHttpRequest();
    //打开请求
    xhr.open('GET', 'http://localhost:8080/Painting.php?PaintingID=' + PaintingID, false); //同步请求
    // 发送请求
    xhr.send(null);
    // 判断响应状态
    let obj = JSON.parse(xhr.responseText);
    return obj.State;
}

async function showDetail(data, index) {

    let str = "";
    if (data.Description != null) {
        data.Description = data.Description.slice(0, 50);
        data.Description += "...";
    }
    if (data.State == '未出售') {
        if (data.BeingChanged == 0) {
            str = `                <div class="item">
            <div class="paint">
                <img src="../../assets/medium/${data.ImageFileName}.jpg"/>
            </div>
            <div class="detail">
                <span id="nameOfPaint">${data.Title}</span>
                <span id="author">${data.Artist}</span>
                <span id="price">价格: ${data.Cost + '$'}</span>
                <span id="price">简介：${data.Description}</span>
                <span class="state"></span>
                <button type="reset" onclick="deleteItem(${index})">删除</button>
            </div>
        </div>`;
        }
        else {
            str = `                <div class="item">
            <div class="paint">
                <img src="../../assets/medium/${data.ImageFileName}.jpg"/>
            </div>
            <div class="detail">
                <span id="nameOfPaint">${data.Title}</span>
                <span id="author">${data.Artist}</span>
                <span id="price">价格: ${data.Cost + '$'}</span>
                <span class="state"></span>
                <span class="state">该艺术品信息存在变动</span>
                <button type="reset" onclick="deleteItem(${index})">删除</button>
            </div>
        </div>`;
        }

    }
    else {
        if (data.BeingChanged == 0) {
            str = `                <div class="item">
            <div class="paint">
                <img src="../../assets/medium/${data.ImageFileName}.jpg"/>
            </div>
            <div class="detail">
                <span id="nameOfPaint">${data.Title}</span>
                <span id="author">${data.Artist}</span>
                <span id="price">价格: ${data.Cost + '$'}</span>
                <span class="state">${data.State}</span>
                <button type="reset" onclick="deleteItem(${index})">删除</button>
            </div>
        </div>`;
        }
        else {
            str = `                <div class="item">
            <div class="paint">
                <img src="../../assets/medium/${data.ImageFileName}.jpg"/>
            </div>
            <div class="detail">
                <span id="nameOfPaint">${data.Title}</span>
                <span id="author">${data.Artist}</span>
                <span id="price">价格: ${data.Cost + '$'}</span>
                <span class="state">${data.State}</span>
                <span class="state">该艺术品信息存在变动</span>
                <button type="reset" onclick="deleteItem(${index})">删除</button>
            </div>
        </div>`;
        }
    }
    return str;
}

function deleteItem(index) {
    let cart = JSON.parse(sessionStorage.items);
    cart.splice(index, 1);
    sessionStorage.setItem('items', JSON.stringify(cart));
    if (cart.length == 0) {
        const carthtml = document.getElementsByClassName('ForItem')[0];
        carthtml.innerHTML =
            `                <div class="item">
        <div class="paint">
            <img src="../assets/2.jpg"/>
        </div>
        <div class="detail">
            <span id="nameOfPaint">您尚未进行购物！</span>
        </div>
    </div>`;
    }
    window.location.reload();
}

async function searchPainter(AritistID) {
    //异步请求获取值，必须在异步函数中调用await等到它被获取。
    let name = fetch('http://localhost:8080/Artist.php?ArtistID=' + AritistID, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            if (data.FirstName == null) {
                data.FirstName = "";
            }
            if (data.LastName == null) {
                data.LastName = "";
            }
            let name = data.FirstName + " " + data.LastName;
            return name;
        });
    let n = await name;
    console.log(n)
    return n;
}

window.onscroll = function () {
    if (window.pageYOffset >= (menu.offsetTop + 20)) {
        navbar.classList.add("sticky");
    }
    else {
        navbar.classList.remove("sticky");
    }
}





// 打开弹窗
var button = document.getElementById("open");
button.onclick = function () {
    var modal = document.querySelector(".modal");
    modal.style.display = "block";
}
// 点击取消 关闭弹窗
var paint_cancel = document.getElementById("paint_cancel");
paint_cancel.onclick = function () {
    var modal = document.querySelector(".modal");
    modal.style.display = "none";
    let uploadForm = document.getElementById("uploadForm");
    let img=document.getElementById("photo");
    img.src='../assets/1.jpg';
    uploadForm.reset();
}
