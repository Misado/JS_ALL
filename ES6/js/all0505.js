


// if (1){
//     let anum = 100;
// }

// console.log(anum);


for ( let i=0; i < 3; i++){
    let anum = 99;
    anum=i;
    console.log(anum);
}

// console.log(anum);

// if (1){
//     anum = 100;
// }

// console.log(anum);


const listObj = document.querySelectorAll(".list li");
console.log("listObj.length: "+listObj.length);

var i = 99;
for ( let i=0; i<listObj.length; i++){
    console.log("外面的i: "+i);
    listObj[i].addEventListener("click",function(event){
        console.log("裡面的i: "+i);
        console.log(event);
        listObj[i].textContent = i;
        alert(i+1);
    })
}

const num = 999;
console.log(num);


const numArray = [1,2,3,4];
Object.freeze(numArray);
numArray[0]=999;
console.log(numArray[0]);


// console.log(zzz);
const zzz=999;
console.log(zzz);

let xxx=1;
// let xxx=2;
console.log(xxx);

const list2Obj = document.querySelector(".list2");
let listStr ="";

for ( let i=0; i<5; i++){
    // listStr += `<li><a href="#">我是標題${i+1}</a></li>`;
    listStr += `
    <li><a href="#">我是標題${i+1}</a></li>
    `;
}
console.log("listStr: "+listStr);

list2Obj.innerHTML = listStr;