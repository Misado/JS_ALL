
var bannerObj = document.querySelector(".banner");

// bannerObj.style.height = window.innerHeight+"px";


// window.onresize = function(){
//     bannerObj.style.height = window.innerHeight+"px";
// }

bannerObj.style.height = window.innerHeight+"px";
// bannerObj.style.width = window.innerWidth+"px";

window.onresize = function(){
    bannerObj.style.height = window.innerHeight+"px";
    // bannerObj.style.width = window.innerWidth+"px";

}