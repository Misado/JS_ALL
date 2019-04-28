console.log("TEST");

var exeCheck = 0;

// while( !exeCheck ){

// }
var today=new Date();
var currentDateTime =today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日('+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+')';
console.log("currentDateTime: "+currentDateTime);


var testBtn = document.getElementById("testBtn");
var test = document.getElementById("test");
testBtn.addEventListener("click",exec);

var a_finish = false; 
var b_finish = false; 

// setTimeout(a, 1000); 
// setTimeout(a, 2000); 
// setTimeout(a, 3000); 

function a() { 
    console.log("a_finish: "+a_finish);
    for ( var i=1; i<=10; i++){
        var today=new Date();
        var currentDateTime =today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日('+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+')';
        console.log("currentDateTime: "+currentDateTime);
        console.log("a: "+i);
    }
  a_finish = true; 
  if( a_finish == true ) {
    console.log("a_finish if: "+a_finish);
    setTimeout(b,2000);  
    
  }
} 
function b() { 
    var today=new Date();
    var currentDateTime =today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日('+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+')';
    console.log("currentDateTime: "+currentDateTime);
    console.log("b: a_finish: "+a_finish);
    a_finish = false; 
    b_finish = true;
    if( b_finish == true ) {
        console.log("b_finish if: "+b_finish);
        setTimeout(c,10000);  
    }
    // if( a_finish == false ) { 
    //     console.log("bbb");
    //     setTimeout(b,1000); 
    // } else{
    //     b();
    // }
} 

function c() { 
    var today=new Date();
    var currentDateTime =today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日('+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+')';
    console.log("currentDateTime: "+currentDateTime);
    console.log("c: b_finish: "+b_finish);
    b_finish = false; 
    // if( a_finish == false ) { 
    //     console.log("bbb");
    //     setTimeout(b,1000); 
    // } else{
    //     b();
    // }
} 

function exec(event){
    for (var i=1;i<=3;i++){
        console.log("setTimeout(a, 1000);");
        console.log(1000*i);
        var time = 2000*i;
        // setTimeout(a, time); 
        setTimeout(a, 2000*i); 
    }
}



// var snd = new Audio("../mp3/battle.mp3");
// snd.loop = true; //設定循環播放

// //停止
// function myStop(){
//     snd.pause();
//     snd.currentTime = 0;
// }

// var bgmAudioElement = document.getElementById("bgm");
// bgmAudioElement.loop = true;

var snd = new Audio("mp3/battle02.mp3");
//snd.loop = true; //設定循環播放
//snd.autoplay = true;

var body = document.querySelector("body");
body.appendChild(snd);

console.log(snd.src);