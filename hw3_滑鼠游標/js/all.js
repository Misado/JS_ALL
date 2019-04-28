console.log("我要讓蜜兒出現！");

var bodyElement = document.body;
var angelElement = document.querySelector(".pointerImg");
var messageElement = document.querySelector(".message");

bodyElement.addEventListener("mousemove",getPosition);

function getPosition(event){
    console.log(angelElement.style.top);
    console.log("event.pageY: "+event.pageY);
    console.log("event.clientY: "+event.clientY);
    console.log("event.clientX: "+event.clientX);
    
    console.log("angelElement.clientTop: "+angelElement.style.top);

    angelElement.style.top = event.clientY+"px";
    angelElement.style.left = event.clientX+"px";

    if ( event.pageY > 3700){
        console.log("好可怕");
        messageElement.textContent = "好可怕，娘親快來救我QQ";
    } else{
        messageElement.textContent = "我現在在探險，好好玩~";
    }
}