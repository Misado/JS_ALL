//-------------- 04/30

var backBtnObj = document.getElementById("backBtn");
backBtnObj.addEventListener("click",backToPrePage);

function backToPrePage(event){
    window.history.back();
}

var printBtnObj = document.getElementById("printBtn");
var locationBtnObj = document.getElementById("locationBtn");
var openBtnObj = document.getElementById("openBtn");

printBtnObj.addEventListener("click",function(){
    window.print();
})

locationBtnObj.addEventListener("click",function(){
    console.log(location);
})

openBtnObj.addEventListener("click",function(){
    window.open("https://www.hexschool.com/");
})


var str ="A";
var str ="B";
console.log(str);


