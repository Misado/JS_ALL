//document.onreadystatechange(function(){
    document.getElementById('title1').textContent ='修改後的標題一';
//})
//alert('QQ');

var cookiePrice = 80;
document.getElementById('price').textContent = cookiePrice;

var drinkPrice = 20;
var threedrinkPrice = drinkPrice * 3;
var myMoney = 118;
var remainMoney = myMoney - threedrinkPrice;

document.getElementById("drinkPrice").textContent = drinkPrice ;
document.getElementById("threedrinkPrice").textContent = threedrinkPrice ;
document.getElementById("myMoney").textContent = myMoney ;
document.getElementById("remainMoney").textContent = remainMoney ;

function greet(yourName){
    console.log("哈囉, "+yourName);
    console.log("請問您想要點什麼?");
}

greet("Ado");

// ------

var cornField = [9,8,2];
console.log(cornField);

var secField = cornField[1];
console.log("secField: ",secField);

var vegField = [];
cornField.push(999);
vegField[0] = 1234;
vegField[2] = 5678;

console.log(cornField);
console.log(cornField[3]);

console.log(vegField);

console.log(vegField[0]);
console.log(vegField[1]);
console.log(vegField[2]);

// ------

var hexSchool= [{
        teacher: "料尾節",
        course: ["HTML","jQuery","RWD"],
        student: 15897,
        goClass: function(){
            console.log(hexSchool[0].teacher+"老師，您好！");
        },
        addStudent: function(stuNum){
            var totalStuNum = stuNum + hexSchool[0].student;
            return totalStuNum;
        }
    },{
        teacher: "王智成",
        course: ["HTML","Vue.js","jQuery","RWD"],
        student: 15000,
        goClass: function(){
            console.log(hexSchool[1].teacher+"老師，您好！");
        },
        addStudent: function(stuNum){
            var totalStuNum = stuNum + hexSchool[0].student;
            return totalStuNum;
        }
    },
];


console.log("-----------");
console.log(hexSchool[0]);
console.log(hexSchool[0].course);
console.log(hexSchool[0].course[2]);


console.log(hexSchool[0]);
console.log(hexSchool[0].student);

var courseName = hexSchool[0].course[1];
console.log("courseName: ",courseName);

hexSchool[0].course.push("Javascript");
console.log(hexSchool[0].course);
console.log("我正在上的課是"+hexSchool[0].course[3]);

var courseNum = hexSchool[0].course.length;
console.log("六角學院總共有"+courseNum+"門課");

hexSchool[0].goClass();
var totalStuNum = hexSchool[0].addStudent(100);
console.log("六角學院的學生原本有"+hexSchool[0].student+"後來新增至"+totalStuNum+"位");

hexSchool[1].goClass();
courseNum = hexSchool[1].course.length;
console.log(hexSchool[1].teacher+"老師總共有"+courseNum+"門課");

for ( var i=1; i<10; i++ ){
    if ( i%2 == 1 ){
        continue;
    }  
    for ( var j=1; j<10; j++ ){
        if ( j%3 == 0 ){
            break;
        }
        console.log(i+"x"+j+"="+i*j);
    }
}


var schoolTotal = hexSchool.length;
var studentTotal = 0;

for ( var i=0; i<schoolTotal; i++ ){
    var courseTotal = hexSchool[i].course.length;
    studentTotal += hexSchool[i].student;
    console.log("第"+(i+1)+"個老師是"+hexSchool[i].teacher);
    for ( var j=0; j<courseTotal; j++ ){
        console.log(hexSchool[i].teacher+"老師教的課程是: "+hexSchool[i].course[j]);
    }
}

console.log("六角學院總學生數:" +studentTotal);

var test = ["ADO","DO","ADO","XYZ","XYZ"];
var result = [];
var obj = [];

for ( var i=0; i < test.length; i++){
console.log("test[i] obj[test[i]]: "+test[i]+" "+obj[test[i]]);
    if ( !obj[test[i]] ){
        obj[test[i]] = 1;
        result.push(test[i]);
    }
}

console.log(result);
console.log(obj["XYZ"]);
console.log(obj.length);
console.log(obj);