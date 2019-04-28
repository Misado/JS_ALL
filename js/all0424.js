
/*var emWord = document.querySelector(".title em");
console.log(emWord.length);
emWord.textContent = "CHANGE";

emWord = document.querySelector(".title1 em");
console.log(emWord.length);
emWord.textContent = "CHANGE2";*/

var emWord = document.querySelectorAll(".title em");
for ( var i=0; i<emWord.length; i++){
    emWord[i].textContent = "大家好我是"+i;
}

var elLink = document.querySelector(".paragraph a");
elLink.setAttribute("href","https://www.google.com");
elLink.setAttribute("target","_blank");

var elLinkContent = document.querySelector(".paragraph").innerHTML;
console.log(elLinkContent+" "+typeof(elLinkContent));

var emWord2 = document.querySelector(".paragraph2");
emWord2.innerHTML = elLinkContent+"<br>"+elLinkContent;
console.log(emWord2.innerHTML);

var elLinkTarget = elLink.getAttribute("target");
console.log("elLinkTarget: "+elLinkTarget);

var eltitleThree = document.getElementById("titleThree");
eltitleThree.innerHTML = "<span class='title'>1233</span>"

var parNode = document.querySelector(".paragraph3");
var str = document.createElement("a");
str.textContent = "1.連去六角學院";
str.setAttribute("target","_blank");
str.setAttribute("href","https://www.hexschool.com/");
parNode.appendChild(str);

var str = document.createElement("a");
str.textContent = "2.連去六角學院";
str.setAttribute("target","_blank");
str.setAttribute("href","https://www.hexschool.com/");
parNode.appendChild(str);

str = document.createElement("li");
str.textContent = "加段落";
parNode.appendChild(str);

//document.querySelector(".paragraph2").appendChild(str);

parNode.removeChild(parNode.childNodes[0]);
parNode.removeChild(parNode.childNodes[0]);

// var btnElement = document.querySelector(".btn");
// btnElement.onclick = function (event){
//     console.log(event);
// }

// btnElement.addEventListener("click",function(event){
//     console.log("HI");
//     console.log(event);
// },false);

var onClickBtnElement = document.querySelector(".onClickBtn");
var addEventListenerBtnElement = document.querySelector(".addEventListenerBtn");

onClickBtnElement.onmouseover = function(){
    alert("on - 1");
}

onClickBtnElement.onclick = function(){
    alert("on - 2");
    console.log(event);
}


addEventListenerBtnElement.addEventListener("click",function(){
    alert("add -1");
},false);

addEventListenerBtnElement.addEventListener("click",function(){
    alert("add -2");
},false);

var boxElement = document.querySelector(".box");
boxElement.addEventListener("click",function(event){
    event.stopPropagation();
    event.preventDefault();
    alert("點到BOX囉~");
    console.log(event);
    console.log("event.target: "+event.target);
    console.log("event.target.nodeName: "+event.target.nodeName);
},false);

var bodyElement = document.querySelector(".body");
bodyElement.addEventListener("click",function(){
    alert("點到BODY囉~");
},false);