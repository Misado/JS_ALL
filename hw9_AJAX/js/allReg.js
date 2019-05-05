

var emailObj = document.getElementById("email");
var pwdObj = document.getElementById("password");
var feedbackMsgObj = document.getElementById("feedbackMsg");

var submitBtnObj = document.getElementById("submitBtn");
submitBtnObj.addEventListener("click",sendLoginData);

function sendLoginData(){
    feedbackMsgObj.innerHTML =""; //一開始先清空訊息
    var hrefAll = window.location.href; // 取得現在的連結網址
    var hrefFile = hrefAll.split("/").pop(); // 取得以"/"分開最後的字串(檔案名稱) 要取第1個的話是shift()

    if ( emailObj.value != "" && pwdObj.value != "" ){

        var dataObj = {
            email: emailObj.value,
            password: pwdObj.value,
        }

        var dataStr = JSON.stringify(dataObj);

        var xhr = new XMLHttpRequest();

        // 註冊頁跟登入頁用的API不一樣
        if ( hrefFile == "register.html" ){
            xhr.open("post","https://hexschool-tutorial.herokuapp.com/api/signup",true);
        }
        if ( hrefFile == "login.html" ){
            xhr.open("post","https://hexschool-tutorial.herokuapp.com/api/signin",true);
        }
        
        xhr.setRequestHeader("Content-type","application/json");
        xhr.send(dataStr);
        
        xhr.onload = function(){
            if ( xhr.status == 200){
                var feedbackStr = xhr.responseText;
                var feedbackArray = JSON.parse(feedbackStr);
                if ( feedbackArray.success == true ){
                    emailObj.value = "";
                    pwdObj.value = "";
                    feedbackMsgObj.textContent = feedbackArray.message;
                } else{
                    // 註冊頁跟登入頁若動作失敗要顯示的內容不一樣
                    if ( hrefFile == "register.html" ){
                        if ( feedbackArray.message == "此帳號已被使用"){
                            feedbackMsgObj.innerHTML = feedbackArray.message+"<br>是否已有帳號？請至登入頁進行<a id='registerLink' href='login.html'>登入</a>。"
                        } else{
                            feedbackMsgObj.textContent = feedbackArray.message;
                        }
                    }
                    if ( hrefFile == "login.html" ){
                        if ( feedbackArray.message == "此帳號不存在或帳號密碼錯誤"){
                            feedbackMsgObj.innerHTML = feedbackArray.message+"<br>是否還沒有帳號？請至註冊頁進行<a id='registerLink' href='register.html'>註冊</a>。"
                        } else{
                            feedbackMsgObj.textContent = feedbackArray.message;
                        }
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