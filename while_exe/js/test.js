console.log("TEST");

var exeCheck = 0;

// while( !exeCheck ){

// }

var testBtn = document.getElementById("testBtn");
var test = document.getElementById("test");
testBtn.addEventListener("click",exec);

var a_finish = false; 
function a() { 
    console.log("a_finish: "+a_finish);
    for ( var i=1; i<=10; i++){
        console.log("a: "+i);
    }
  a_finish = true; 
  if( a_finish == true ) {
    console.log("a_finish if: "+a_finish);
    b();  
    
  }
} 
function b() { 
    console.log("b: a_finish: "+a_finish);
    a_finish = false; 
    // if( a_finish == false ) { 
    //     console.log("bbb");
    //     setTimeout(b,1000); 
    // } else{
    //     b();
    // }
} 

function exec(event){
    for (var i=0;i<3;i++){
        console.log("setTimeout(a, 1000);");
        setTimeout(a, 1000); 
    }
}