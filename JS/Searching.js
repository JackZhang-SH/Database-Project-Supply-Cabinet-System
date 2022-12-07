//翻页和加载
var totalPages = 20;
let searchForm = document.getElementById("searchForm");
const ulTag = document.getElementById("ulTag");  //选择所有的ul(页码)
var size = 15;
//总页数
//加载函数，只需要当前页页码即可请求,先请求页总数，在请求当前页一页，15幅画
loadpaintingsNum(0);
//flag=0加载所有画,flag=1加载搜索画
function loadpaintingsNum(flag) {
    if(flag==0){
        fetch('http://localhost:8080/Count.php', { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            //一页最多size幅画
            totalPages = Math.trunc(data.total / size) + 1;
            element(totalPages, 1,flag);
        });
    }else{
        const input=searchForm['search'].value;
        fetch('http://localhost:8080/Searching.php?input=' +input+'&'+'current=' + 1, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => { 
            totalPages = Math.trunc(data.num / size) + 1;
            console.log(totalPages);
            element(totalPages, 1,flag);
            // searchForm.reset();
        });

    }
};
sessionStorage.setItem('filter','按浏览量排序');
let filter=document.getElementById('filter');
filter.addEventListener("change",e => {
    if(filter.value=='按浏览量排序'){
        sessionStorage.filter='按浏览量排序';
    }
    else if(filter.value=='按名称排序'){
        sessionStorage.filter='按名称排序';
    }
    else{
        sessionStorage.filter='按价格排序';
    }
    load(1,0);
})
//flag=0加载所有画,flag=1加载搜索画
function load(page,flag) {
    if(flag==0){
        if(sessionStorage.filter=='按浏览量排序'){
            fetch('http://localhost:8080/loadArt.php?current=' + page, { method: 'GET' })
            .then((response) => response.json())
            .then((dataTable) => {
                showPaintings(dataTable);
            });
        }
        else if(sessionStorage.filter=='按名称排序'){
            fetch('http://localhost:8080/loadArtByTitle.php?current=' + page, { method: 'GET' })
            .then((response) => response.json())
            .then((dataTable) => {
                showPaintings(dataTable);
            });
        }
        else{
            fetch('http://localhost:8080/loadArtByCost.php?current=' + page, { method: 'GET' })
            .then((response) => response.json())
            .then((dataTable) => {
                showPaintings(dataTable);
            });
        }
    }
    else{
        const input=searchForm['search'].value;
        fetch('http://localhost:8080/Searching.php?input=' +input+'&'+'current=' + 1, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
             showPaintings(data.data);
        });
    }
}

//异步请求必须使用await获取值，也必须在异步函数中获取
async function searchPainter(AritistID) {
    //异步请求获取值，必须在异步函数中调用await等到它被获取。
     let name=fetch('http://localhost:8080/Artist.php?ArtistID=' + AritistID, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            if(data.FirstName==null){
                data.FirstName="";
            }
            if(data.LastName==null){
                data.LastName="";
            }
            let name = data.FirstName + " " + data.LastName;
            return name;
        });
    let n= await name;
    return n;
}

//异步请求必须使用await获取值，也必须在异步函数中获取
async function showPaintings(data) {
    let paints = "";
    const container = document.getElementsByClassName('container')[0];
    for (let i = 0; i < data.length; i++) {
        if (data[i].Description != null) {
            data[i].Description = data[i].Description.slice(0, 120);
            data[i].Description += "...";
        }
        //异步请求必须使用await获取值，也必须在异步函数中获取
        // let name=await searchPainter(data[i].ArtistID).then((res)=>{
        //     return res;
        // })
        paints += ` 
        <a href='Detail.html/?PaintingID=${data[i].PaintingID}' onclick='Visit(${data[i].PaintingID})'>
        <div class='Board'>
            <div class='PaintBox'>
                <img src='../assets/medium/${data[i].ImageFileName}.jpg' alt='1'/>
            </div>
            <div class='ContentBox'>
                <h1>${data[i].Title}</h1>
                <div id="detail">
                <div class='slice'>
                    <p>作家:${data[i].Artist}</p>
                    <p>价格:${data[i].Cost}</p>
                    <p>访问量:${data[i].Visits}</p>
                    <p>喜欢:${data[i].Likes}</p>  
                    </div>
                <div class='slice'>
                    <p id='des'>简介:${data[i].Description}</p>
                </div>
                </div>
            </div>
        </div>
        </a>`
    }
    container.innerHTML = paints;
}

function Visit(PaintingID){
        //每次点击都要增加访问次数
        fetch('http://localhost:8080/Visit.php?PaintingID=' + PaintingID, { method: 'GET' })
        .then((response) => response.json())
        .then((dataTable) => {
            console.log(dataTable);
        });
}


searchForm.addEventListener("submit", e => {
    e=e||window.Event;
    e.preventDefault();
    const input=searchForm['search'].value;
    if(input==""){
        loadpaintingsNum(0);
    }
    else{
        loadpaintingsNum(1);
    }
})

//以下为翻页器
function element(totalPages, page,flag) {
    load(page,flag);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    let liTag = "";  //动态形成页码，通过js决定需要的页码
    let activeLi;
    let beforePages = page - 1;
    let afterPages = page + 1;
    if (page > 1) {    //此时可放置箭头，因为可以回退了
        liTag += '<li class="btnPrev" onclick="element(totalPages,' + (page - 1) + ','+flag+ ')";><span><svg  t="1649859842533" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2991" width="16" height="16"><path d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z" p-id="2992"></path></svg>Prev</span></li>';
    }
    if (page > 2) {
        liTag += '<li class="number" onclick="element(totalPages,' + 1  + ','+flag+ ');"><span>1</span></li>';   //此时可以放置第一页，即首页，实现首页的跳转就是将此函数的page调整为1
        if (page > 3) {
            liTag += '<li class="dots"><span>...</span></li>'
        }
    }
    
    if (page == totalPages) {
        beforePages = beforePages - 2;
    } else if (page == totalPages - 1) {
        beforePages = beforePages - 1;
    }

    if (page == 1) {
        afterPages = afterPages + 2;
    } else if (page == 2) {
        afterPages = afterPages + 1;
    }
    if(totalPages==1){
        beforePages=1;
        afterPages=1;
    }
    if(totalPages==2){
        beforePages=1;
        afterPages=2;
    }
    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
        if (pageLength > totalPages) {
            break;     //当循环到超过总页数的地方，直接退出，保证页码不超过总页数
        }
        if (pageLength == 0) {  //当循环从0开始，比1还小时，直接跳过不做这一次循环
            continue;
        }
        if (page == pageLength) {
            activeLi = "active";
        } else {
            activeLi = "";
        }
        liTag += '<li class="number ' + activeLi + '" onclick="element(totalPages,' + pageLength + ','+flag+ ');"><span>' + pageLength + '</span></li>';//实现当前页和前后页页码
    }

    if (page < totalPages - 1) {
        if (page < totalPages - 2) {
            liTag += '<li class="dots"><span>...</span></li>'
        }
        liTag += '<li class="number" onclick="element(totalPages,' + totalPages + ','+flag+ ');"><span>' + totalPages + '</span></li>';//末页，其跳转即令此函数page为20
    }
    if (page < totalPages) {  //当前页小于总页数，就能加上往后翻页的Next按钮
        liTag += '<li class="btnNext" onclick="element(totalPages,' + (page + 1) + ','+flag+ ');"><span>Next<svg t="1649859899562" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3219" width="16" height="16"><path d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z" p-id="3220"></path></svg></span></li>';
    }
    ulTag.innerHTML = liTag;
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
