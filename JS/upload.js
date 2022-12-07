var change=0;  //为0是新增，为1是修改
sessionStorage.setItem('change',0);
sessionStorage.setItem('updateID','');  //存储现在要修改的那个PaintingID
let uploadForm = document.getElementById("uploadForm");

function changeForm(PaintingID){
    sessionStorage.change=1;
    fetch('http://localhost:8080/Painting.php?PaintingID=' + PaintingID, { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
        var modal = document.querySelector(".modal");
        modal.style.display = "block";
        uploadForm['paintName'].value=data.Title;
        uploadForm['author'].value=data.Artist;
        uploadForm['description'].value=data.Description;
        uploadForm['year'].value=data.YearOfWork;
        uploadForm['genre'].value=data.Medium;
        uploadForm['length'].value=data.Height;
        uploadForm['width'].value=data.Width;
        uploadForm['price'].value=data.Cost;
        let img=document.getElementById("photo");
        img.src=`../assets/medium/${data.ImageFileName}.jpg`;
        sessionStorage.updateID=PaintingID;
        let file=document.getElementById('file');
        file.required=false;
    });
};

function note(item, name) {
    let origin = document.getElementById(item);
    let target = document.getElementById(name);
    if (origin.validity.valid != true) {
        if (name === "paintName_invalid") {
            target.innerText = "不可为空";
        }
        else if (name === "author_invalid") {
            target.innerText = "不可为空";
        }
        else if (name === "description_invalid") {
            target.innerText = "不可为空";
        }
        else if (name === "year_invalid") {
            target.innerText = "不可为空，年份必须为整数";
        }
        else if (name === "month_invalid") {
            target.innerText = "不可为空，年份必须为整数";
        }
        else if (name === "day_invalid") {
            target.innerText = "不可为空，年份必须为整数";
        }
        else if (name === "genre_invalid") {
            target.innerText = "不可为空";
        }
        else if (name === "length_invalid") {
            target.innerText = "不可为空,必须为整数";
        }
        else if (name === "width_invalid") {
            target.innerText = "不可为空,必须为整数";
        }
        else if (name === "price_invalid") {
            target.innerText = "不可为空,价格必须为正整数";
        }
    }
    else {
        target.innerText = "";
    }
}

//预览
let file=document.getElementById("file");
let reader=new FileReader();
file.addEventListener("change",e => {
    console.log('预览');
    let img=document.getElementById("photo");
    const imageInput=uploadForm['imageInput'].files[0];
    let preview=window.URL.createObjectURL(imageInput);
    img.src=preview;
})

// function preview(file){
//     reader.readAsDataURL(file);
// }
// preview(uploadForm['imageInput'].files[0]);


uploadForm.addEventListener("submit", e => {
    e = e || window.Event;
    e.preventDefault();
    const imageInput=uploadForm['imageInput'].files[0];
    const paintName = uploadForm['paintName'].value;
    const author = uploadForm['author'].value;
    const description = uploadForm['description'].value;
    const year = uploadForm['year'].value;
    const genre = uploadForm['genre'].value;
    const length = uploadForm['length'].value;
    const width = uploadForm['width'].value;
    const price = uploadForm['price'].value;
    //切记不要写content-type，除非你能写的很对很完整！
    const jsonheaders = new Headers({
    });
    //这种传法可以直接用$_POST读取。file类型会直接存入$_FILES
    var data=new FormData();
    data.append('file',imageInput);
    data.append('paintName',paintName);
    data.append('author',author);
    data.append('description',description);
    data.append('year',year);
    data.append('genre',genre);
    data.append('length', length);
    data.append('width',width);
    data.append('price',price);
    data.append('publisher',sessionStorage.name);
    //这个在修改时才用得到
    data.append('PaintingID',sessionStorage.updateID);
    if(sessionStorage.change==0){
        fetch('http://localhost:8080/file_upload.php', {
            method: 'POST',
            body: data,
            headers:{},
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.code=='220'){
                    alert('成功上传');
                    window.location.reload();
                    sessionStorage.change=0;
                }
                else{
                    alert('上传失败，或许已存在此艺术品!')
                    window.location.reload();
                    
                }
            });
    }
    else{
        fetch('http://localhost:8080/file_update.php', {
            method: 'POST',
            body: data,
            headers:{},
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.code=='221'){
                    alert('成功修改');
                    window.location.reload();
                    sessionStorage.change=0;
                }
                else{
                    alert('修改失败')
                    window.location.reload();
                    sessionStorage.change=0;
                }
            });        
    }
    var modal = document.querySelector(".modal");
    modal.style.display = "none";
    let img=document.getElementById("photo");
    img.src='../assets/1.jpg';
})