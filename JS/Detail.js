window.addEventListener("load", () => {
    if(sessionStorage.name==undefined){
        let buy=document.getElementById('buy');
        buy.style.display='none';
        let like=document.getElementById('like');
        like.style.display='none';        
    }
    loadDetail();
})
//从url中的参数中找到想要的那个variable
function getQueryVariable(variable) {
    //删掉'?'
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
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

function searchShape(ShapeID) {
    var xhr = new XMLHttpRequest();
    console.log(xhr.readyState);//准备状态
    //打开请求
    xhr.open('GET', 'http://localhost:8080/Shape.php?ShapeID=' + ShapeID, false); //同步请求
    // 发送请求
    xhr.send(null);
    // 判断响应状态
    let obj = JSON.parse(xhr.responseText);
    console.log(xhr.responseText)
    return obj.ShapeName;
}

async function loadDetail() {
    let PaintingID = getQueryVariable('PaintingID');
    //读取数据
    fetch('http://localhost:8080/Painting.php?PaintingID=' + PaintingID, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            showDetail(data);
        });
}

async function showDetail(data) {
    let painting = "";
    // let name = await searchPainter(data.ArtistID).then((res) => {
    //     return res;
    // })
    // let shape = await searchPainter(data.ShapeID).then((res) => {
    //     return res;
    // })
    let shape = searchShape(data.ShapeID);
    const content = document.getElementsByClassName('content')[0];
    painting = `<div class="paint">
            <img src="../../assets/medium/${data.ImageFileName}.jpg"/>
                </div>
    <div class="detail">
    <p id="nameOfPaint"><span>${data.Title}</span></p>
    <p>作者:<span>${data.Artist}</span></p>
    <p>价格:<span>${data.Cost}</span></p>
    <p>访问量:<span>${data.Visits}</span></p>
    <p>状态:<span>${data.State}</span></p>
    <p>发布日期:<span>${data.Time}</span></p>
    <p>发布者用户名:<span>${data.Publisher}</span></p>
    <p>年份:<span>${data.YearOfWork}</span></p>
    <p>大小:<span>${data.Width} x ${data.Height} cm</span></p>
    <p>手法:<span>${shape}</span></p>
    <p>媒介:<span>${data.Medium}</span></p>
    <div class='like_buy'>
    <button onclick='AddToCart()' id='buy'>
    <svg t="1653403848987" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7163" width="48" height="48"><path d="M246.4 912a2.1 2.1 0 1 0 134.4 0 2.1 2.1 0 1 0-134.4 0Z" p-id="7164"></path><path d="M716.8 912a2.1 2.1 0 1 0 134.4 0 2.1 2.1 0 1 0-134.4 0Z" p-id="7165"></path><path d="M905.6 764.8l-537.6 0c-28.8 0-57.6-25.6-64-54.4l-96-566.4c-9.6-54.4-60.8-96-115.2-96l-22.4 0c-12.8 0-25.6 12.8-25.6 25.6 0 12.8 12.8 25.6 25.6 25.6l22.4 0c28.8 0 57.6 25.6 64 54.4l96 566.4c9.6 54.4 60.8 96 115.2 96l537.6 0c12.8 0 25.6-12.8 25.6-25.6C931.2 777.6 921.6 764.8 905.6 764.8z" p-id="7166"></path><path d="M880 179.2l-572.8 0c-12.8 0-25.6 12.8-25.6 25.6 0 12.8 12.8 25.6 25.6 25.6l572.8 0c25.6 0 38.4 16 32 41.6l-70.4 281.6c-6.4 32-41.6 57.6-73.6 60.8l-396.8 28.8c-12.8 0-25.6 12.8-22.4 28.8 0 12.8 12.8 25.6 28.8 22.4l396.8-28.8c54.4-3.2 105.6-48 118.4-99.2l70.4-281.6C976 230.4 937.6 179.2 880 179.2z" p-id="7167"></path></svg>
        <p >加入购物车</p>
    </button>
    <button onclick='like()' id='like'><svg t="1653403884186" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8079" width="48" height="48"><path d="M669.781333 130.752c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z" fill="#3D3D3D" p-id="8080"></path></svg>
    </button>
    </div>
    </div>
`;
    content.innerHTML = painting;
    if(data.State=='已售出'){
        console.log(data.State)
        let buy=document.getElementById('buy');
        buy.style.display='none';
    }
}
var likes = 0;
//喜欢和加入购物车
function like() {
    if(sessionStorage.name!==undefined){
        let like = document.getElementById('like');
        console.log(likes);
        //likes为奇数数，则喜欢。
        if ((likes % 2) == 0) {
            like.innerHTML = `<svg t="1653403884186" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8079" width="48" height="48"><path d="M669.781333 130.752c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z" fill="#d81e06" p-id="8080"></path></svg>
            `;
            likes++;
        }
        else {
            like.innerHTML = `<svg t="1653403884186" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8079" width="48" height="48"><path d="M669.781333 130.752c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z" fill="#3D3D3D" p-id="8080"></path></svg>`;
            likes++;
        }
        let addLike = likes % 2;
        let PaintingID = getQueryVariable('PaintingID');
        let likeBefore=Number(sessionStorage.like);
        //每次点击都要增加访问次数
        if(addLike==1&&likeBefore==0){
            fetch('http://localhost:8080/Like.php?PaintingID='+PaintingID, { method: 'GET' })
                .then((response) => response.json())
                .then((dataTable) => {
                    console.log(dataTable);
                });
                sessionStorage.setItem('like',1);
                alert('谢谢您的喜欢!');
        }
        else if(addLike==0){
            fetch('http://localhost:8080/Dislike.php?PaintingID='+PaintingID, { method: 'GET' })
                .then((response) => response.json())
                .then((dataTable) => {
                    console.log(dataTable);
                });
                sessionStorage.setItem('like',0);
                alert('喜欢已取消');
        }
    }
    else{
        let like = document.getElementById('like');
        like.style.display='none';
    }
}

function AddToCart(){
        let PaintingID = getQueryVariable('PaintingID');
        if(sessionStorage.items==undefined){
            let items=[PaintingID,];
            sessionStorage.setItem('items',JSON.stringify(items));
            alert('添加成功');
        }
        else{
            let arr=JSON.parse(sessionStorage.items);
            if(!arr.includes(PaintingID)){
                arr.push(PaintingID);
                sessionStorage.setItem('items',JSON.stringify(arr));
                alert('添加成功');
            }
            else{
                alert('该艺术品已在购物车中');
            }
        }
}


//用户菜单显示
var navbar = document.getElementById("navbar");
var menu = document.getElementById("menu");
var flag = 0;

window.onscroll = function () {
    if (window.pageYOffset >= (menu.offsetTop + 20)) {
        navbar.classList.add("sticky");
    }
    else {
        navbar.classList.remove("sticky");
    }
}

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
