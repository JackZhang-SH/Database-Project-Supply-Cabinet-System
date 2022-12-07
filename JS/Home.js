
//轮播图

var imgList = new Array(5);   //装载所展示的图片的url
var count = 0;          //决定哪个图在页面上
imgList[0] = "../assets/medium/132030.jpg";
imgList[1] = "../assets/medium/106020.jpg";
imgList[2] = "../assets/medium/019070.jpg";
imgList[3] = "../assets/medium/131040.jpg";
imgList[4] = "../assets/medium/131030.jpg";
var Home_Background = document.getElementsByClassName("Home")[0];
Home_Background.style.backgroundImage = "url('" + imgList[count] + "')";


function nextImg() {
    if (count <= 3) {
        count++;
    }
    else {
        count = 0;   //最后一张到第一张
    }
    Home_Background.style.backgroundImage = "url('" + imgList[count] + "')";
}

function lastImg() {
    if (count >= 1) {
        count--;
    }
    else {
        count = 4;   //最后一张到第一张
    }
    Home_Background.style.backgroundImage = "url('" + imgList[count] + "')";
}
//构造函数，用来创造画对象,可再加入method如进入详情页和增加浏览量等
class Paint {
    constructor(name, price, visit, like, img) {
        this.name = name;
        this.price = price;
        this.visit = visit;
        this.like = like;
        this.img = img;
    }
}

let obj = new Paint("paint", 100, 100, 100, "ppt");
console.log(obj);

// 打开弹窗,以下部分需要拆分使结构更清晰

// var openBut = document.getElementById("open");
// openBut.onclick = function () {
//     var modal = document.querySelector(".modal");
//     modal.style.display = "block";
// }
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



//用户信息
let afterlogin_name = document.getElementById("afterlogin_name");
afterlogin_name.innerText = sessionStorage.name;


