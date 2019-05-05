
// 拿JSON資料練習
// var xhr = new XMLHttpRequest();

// xhr.open("get","https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97",true);
// // xhr.open("get","http://opendata.epa.gov.tw/webapi/Data/RainTenMin/?$orderby=PublishTime%20desc&$skip=0&$top=1000&format=json",true);

// xhr.send(null);

// var str = xhr.responseText;


// xhr.onload = function(){
//     console.log(xhr.responseText);
//     var str = JSON.parse(xhr.responseText);
//     console.log(str);
//     console.log(str.result.records[0]);
// }


// x-www-form-urlencoded 格式資料傳送
// var xhr = new XMLHttpRequest();
// xhr.open("post","https://hexschool-tutorial.herokuapp.com/api/signup",true);
// xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// xhr.send('email=abcde123@gmail.com&password=123465');

// xhr.onload = function(){
//     console.log(xhr.responseText);
// }


// // json 格式資料
// var xhr = new XMLHttpRequest();
// xhr.open("post","https://hexschool-tutorial.herokuapp.com/api/signup",true);
// xhr.setRequestHeader("Content-type","application/json");

// var account = {
//     email: "abcde1234567890@gmail.com",
//     password: "123456789",
// }

// var data = JSON.stringify(account);

// xhr.send(data);

// xhr.onload = function (){
//     console.log(xhr.responseText);
// }

var mailInputObj = document.getElementById("mailInput");
var pwdInputObj = document.getElementById("pwdInput");

var submitBtnObj = document.getElementById("submitBtn");

var messageObj = document.getElementById("message");

submitBtnObj.addEventListener("click",dataSend);

function dataSend(){
    console.log("HIHIHIHIH");
    
    if ( mailInputObj.value != "" && pwdInputObj.value != "" ){
        console.log(mailInputObj.value);
        console.log(pwdInputObj.value);
        var dataObj = {};
        dataObj.email = mailInputObj.value;
        dataObj.password = pwdInputObj.value;
        var dataStr = JSON.stringify(dataObj);

        var xhr = new XMLHttpRequest();
        xhr.open("post","https://hexschool-tutorial.herokuapp.com/api/signup",true);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.send(dataStr);

        xhr.onload = function(){
            console.log(xhr);
            var messageArray = JSON.parse(xhr.responseText);
            var messageStr = messageArray.message;
            messageObj.textContent = messageStr;
            // if ( xhr.status == 200){
            //     mailInputObj.value="";
            //     pwdInputObj.value="";
            // }
            if ( messageArray.success == true){
                mailInputObj.value="";
                pwdInputObj.value="";
            }
        }

    } else{
        alert("請將資料填寫完全！");
    }
}

