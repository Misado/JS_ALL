var boxElement = document.querySelectorAll(".box");
var gamePoint = 5;

for ( var i=0; i < boxElement.length; i++){
  //console.log(boxElement[i]);
  boxElement[i].addEventListener("mouseover",lostGame);
}

function lostGame(event){
  console.log(event.target.textContent);
  console.log("你輸了~~~~因為你碰到第 "+event.target.textContent+" 個箱子！");
  alert("你輸了~~~~因為你碰到第 "+event.target.textContent+" 個箱子！");
  gamePoint-=1;
}

var boxFrameElement = document.querySelector(".boxFrame");

boxFrameElement.addEventListener("mouseleave",passGameCheck);

function passGameCheck(event){
  alert("恭喜通關遊戲！獲得 "+gamePoint+" 分");
}