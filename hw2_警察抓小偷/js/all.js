

var carElement = document.querySelector(".car");
var thiefElement = document.querySelector(".thief");
var messageElement = document.querySelector(".message");

function run(event){
    // console.log(event.keyCode);
    if ( event.keyCode == 39 ){
        // console.log("RUN");
        var thiefClass = thiefElement.getAttribute("class");
        thiefClass += " runRight";
        thiefElement.setAttribute("class",thiefClass);
        var carClass = carElement.getAttribute("class");
        carClass += " runRight";
        carElement.setAttribute("class",carClass);
    }
}

document.addEventListener("keydown",run);

console.log(carElement.offsetLeft+carElement.clientWidth);
console.log(thiefElement.offsetLeft);

// var catchEvent = window.addEventListener("click",catchThief);
document.addEventListener("transitionend",catchThief);
// document.addEventListener("transitionend",function(){
//     var carPosition = carElement.offsetLeft+carElement.clientWidth;
//     var thiefPosition = thiefElement.offsetLeft;
//     if ( carPosition>= thiefPosition){
//         console.log("抓到了！");
//         messageElement.setAttribute("class","message messageWarning");
//         messageElement.textContent = "抓到了！";

//     }
// });
// document.addEventListener("transitionrun")


function catchThief(event){
    console.log(carElement.offsetLeft+carElement.clientWidth);
    console.log(thiefElement.offsetLeft);

    var carPosition = carElement.offsetLeft+carElement.clientWidth;
    var thiefPosition = thiefElement.offsetLeft;
    if ( carPosition>= thiefPosition){
        console.log("抓到了！");
        messageElement.setAttribute("class","message messageWarning");
        messageElement.textContent = "抓到了！";
    }
}