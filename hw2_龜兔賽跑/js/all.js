

var turtleElement = document.querySelector(".turtle");
var rabbitElement = document.querySelector(".rabbit");
var messageElement = document.querySelector(".message");
var goalElement = document.querySelector(".goalLine");

function run(event){
    // console.log(event.keyCode);
    if ( event.keyCode == 39 ){
        // console.log("RUN");
        var rabbitClass = rabbitElement.getAttribute("class");
        rabbitClass += " runRight";
        rabbitElement.setAttribute("class",rabbitClass);
        var turtleClass = turtleElement.getAttribute("class");
        turtleClass += " runRight";
        turtleElement.setAttribute("class",turtleClass);
    }
}

document.addEventListener("keydown",run);

//console.log(turtleElement.offsetLeft+turtleElement.clientWidth);
//console.log(rabbitElement.offsetLeft);

// var catchEvent = window.addEventListener("click",catchrabbit);
document.addEventListener("transitionend",catchrabbit);
// document.addEventListener("transitionend",function(){
//     var turtlePosition = turtleElement.offsetLeft+turtleElement.clientWidth;
//     var rabbitPosition = rabbitElement.offsetLeft;
//     if ( turtlePosition>= rabbitPosition){
//         console.log("抓到了！");
//         messageElement.setAttribute("class","message messageWarning");
//         messageElement.textContent = "抓到了！";

//     }
// });
// document.addEventListener("transitionrun")


function catchrabbit(event){
    console.log(turtleElement.offsetLeft+turtleElement.clientWidth);
    console.log(rabbitElement.offsetLeft);

    var turtlePosition = turtleElement.offsetLeft+turtleElement.clientWidth;
    var rabbitPosition = rabbitElement.offsetLeft+rabbitElement.clientWidth;
    var goalPosition = goalElement.offsetLeft;
    if ( turtlePosition >= goalPosition && turtlePosition > rabbitPosition ){
        goalElement.setAttribute("class","goalLine reach");
        messageElement.setAttribute("class","message messageWarning");
        messageElement.textContent = "此次龜兔賽跑勝利者是烏龜！";
    } else if ( rabbitPosition >= goalPosition && rabbitPosition > turtlePosition ){
        goalElement.setAttribute("class","goalLine reach");
        messageElement.setAttribute("class","message messageWarning");
        messageElement.textContent = "此次龜兔賽跑勝利者是兔子！";
    } else if ( turtlePosition < goalPosition && rabbitPosition < goalPosition ){
        messageElement.setAttribute("class","message messageWarning");
        messageElement.textContent = "烏龜和兔子都還沒到終點線，加油！";
    }
}