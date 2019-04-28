
var rocket1 = document.querySelector(".rocket-1");
var rocket2 = document.querySelector(".rocket-2");
var rocket3 = document.querySelector(".rocket-3");


var keydownEvent = document.addEventListener("keydown",function(event){
    if ( event.keyCode == 49 ){
        var rocketClass = rocket1.getAttribute("class");
        rocketClass += " rocket_up";
        rocket1.setAttribute("class",rocketClass);
    }
    if ( event.keyCode == 50 ){
        var rocketClass = rocket2.getAttribute("class");
        rocketClass += " rocket_up";
        rocket2.setAttribute("class",rocketClass);
    }
    if ( event.keyCode == 51 ){
        var rocketClass = rocket3.getAttribute("class");
        rocketClass += " rocket_up";
        rocket3.setAttribute("class",rocketClass);
    }
    if ( event.keyCode == 38 ){
        var rocketClass = rocket1.getAttribute("class");
        rocketClass += " rocket_up";
        rocket1.setAttribute("class",rocketClass);
        var rocketClass = rocket2.getAttribute("class");
        rocketClass += " rocket_up";
        rocket2.setAttribute("class",rocketClass);
        var rocketClass = rocket3.getAttribute("class");
        rocketClass += " rocket_up";
        rocket3.setAttribute("class",rocketClass);
    }
    if ( event.keyCode == 40 ){
        var rocketClass = "rocket rocket-1";
        rocket1.setAttribute("class",rocketClass);
        rocketClass = "rocket rocket-2";
        rocket2.setAttribute("class",rocketClass);
        rocketClass = "rocket rocket-3";
        rocket3.setAttribute("class",rocketClass);
    }
})