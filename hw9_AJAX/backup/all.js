var emailObj = document.getElementById("email");
var pwdObj = document.getElementById("password");
var feedbackMsgObj = document.getElementById("feedbackMsg");

var submitBtnObj = document.getElementById("submitBtn");
submitBtnObj.addEventListener("click",sendLoginData);

function sendLoginData(){
    console.log("CLICK");
    

    if ( emailObj.value != "" && pwdObj.value != "" ){
        console.log(emailObj.value);
        console.log(pwdObj.value);

        var dataObj = {
            email: emailObj.value,
            password: pwdObj.value,
        }

        var dataStr = JSON.stringify(dataObj);

        var xhr = new XMLHttpRequest();
        xhr.open("post","https://hexschool-tutorial.herokuapp.com/api/signin",true);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.send(dataStr);
        
        xhr.onload = function(){
            console.log(xhr);
            if ( xhr.status == 200){
                var feedbackStr = xhr.responseText;
                var feedbackArray = JSON.parse(feedbackStr);
                console.log(feedbackArray);
                if ( feedbackArray.success == true ){
                    emailObj.value = "";
                    pwdObj.value = "";
                    feedbackMsgObj.textContent = feedbackArray.message;
                } else{
                    if ( feedbackArray.message == "此帳號不存在或帳號密碼錯誤"){
                        feedbackMsgObj.innerHTML = feedbackArray.message+"<br>是否還沒有帳號？請至註冊頁進行<a id='registerLink' href='register.html'>註冊</a>。"
                    } else{
                        feedbackMsgObj.textContent = feedbackArray.message;
                    }
                }
            } else{
                feedbackMsgObj.textContent = "系統錯誤已發生，請洽系統工程師處理！";
            }
        }

    } else{
        feedbackMsgObj.textContent = "請將資料填寫完全！";
        alert("請將資料填寫完全！");
    }
}