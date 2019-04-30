/* --- 主程式 --- */

//getElement
var boardCategory = document.getElementById("boardCategory"); //類別
var filterCategory = document.getElementById("filter"); //類別篩選
var boardTaskInput = document.getElementById("boardTaskInput"); //輸入的文字
var resultShow = document.getElementById("resultShowId"); //顯示結果的地方
var addBtn = document.getElementById("addBtn"); //新增按鈕
//初始化選擇類別為0
var selectCategory="0";

//監聽事件
boardCategory.addEventListener("change",getCategory); //當類別有change時，取得類別
addBtn.addEventListener("click",addAction); //按下新增按鈕時，新增資料到localStorage
resultShow.addEventListener("click",removeAction); //按下刪除按鈕時，刪除localStorage的按鈕
filterCategory.addEventListener("click",filterShowAction); //點選篩選器時要篩選結果


// 動態產生類別的下拉式選單
var categoryObj = [{
    category: "娛樂",
    categoryClass: "categoryFun",
},{
    category: "勉強",
    categoryClass: "categoryStudy",
},{
    category: "外出",
    categoryClass: "categoryOutdoor",
},{
    category: "雜事",
    categoryClass: "categorySth",
},{
    category: "其他",
    categoryClass: "categoryOther",
}];

for ( var i=0; i<categoryObj.length; i++){
    var categoryOption = document.createElement("option");
    categoryOption.setAttribute("value",categoryObj[i].category);
    categoryOption.textContent = categoryObj[i].category;
    boardCategory.appendChild(categoryOption);

    var categoryLi = document.createElement("li");
    var categoryLiLink = document.createElement("a");
    
    categoryLiLink.setAttribute("class",categoryObj[i].categoryClass);
    categoryLiLink.setAttribute("href","#");
    //先放i圖示再放文字
    categoryLiLink.innerHTML = "<i class='fas fa-filter'></i>"+categoryObj[i].category;

    categoryLi.appendChild(categoryLiLink); //再LI增加A
    filterCategory.appendChild(categoryLi); //在把外面的UL增加LI
}

//一開始要先顯示localStorage所有結果
showAction();



// ------ function ------ //

// 當類別下拉式選單有改變就取值
function getCategory(event){
    selectCategory = event.target.value;
}

// 顯示所有localStorage裡面的結果
function showAction(){
    var toDoListStr = localStorage.getItem("toDoList");
    var toDoListArray = JSON.parse(toDoListStr);
    var resultShowHtml = "";
    
    if ( toDoListArray == null ){return;} //如果localStorage裡完全沒值就跳出不做
    
    for ( var i=0; i<toDoListArray.length; i++){
        var categoryTd = toDoListArray[i].category;
        
        // 增加類別顏色
        var categoryClass;
        for(var j=0; j<categoryObj.length; j++){
            if ( toDoListArray[i].category == categoryObj[j].category){
                categoryClass = categoryObj[j].categoryClass;
            }
        }
        resultShowHtml += "<tr data-num='"+i+"'><td style='width: 20%'>"+toDoListArray[i].time+"<td style='width: 10%' class='"+categoryClass+"'>"+toDoListArray[i].category+"</td><td style='width: 70%'>"+toDoListArray[i].task+"</td><td style='width: 10%'><input type='button' value='刪除'></td></tr>"
    }
    resultShow.innerHTML = resultShowHtml;
}

//新增項目
function addAction(event){
    var today=new Date();
    var currentDateTime =today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate();
    console.log("currentDateTime: "+currentDateTime);
    if ( selectCategory == "0"){
        alert("請選擇類別");
        return; //如果使用者沒有選擇類別就跳出警告視窗，並且後面不做
    }
    var toDoListStr = localStorage.getItem("toDoList");
    var toDoListArray = JSON.parse(toDoListStr);

    //如果localStorage裡完全沒值就給它初始值
    if ( toDoListArray == null ){
        toDoListArray = [];
    }
    toDoListArray.push({
        time: currentDateTime,
        category: selectCategory,
        task: boardTaskInput.value,
    })
    toDoListStr = JSON.stringify(toDoListArray);
    localStorage.setItem("toDoList",toDoListStr);
    showAction();
}

//移除項目
function removeAction(event){
    //如果點到的不是INPUT後面跳出不做
    if ( event.target.nodeName != "INPUT"){return;}
    
    //取得tr的data-num
    var listNum = parseInt(event.target.parentNode.parentNode.dataset.num);
    var toDoListStr = localStorage.getItem("toDoList");
    var toDoListArray = JSON.parse(toDoListStr);

    toDoListArray.splice(listNum,1);
    toDoListStr = JSON.stringify(toDoListArray);
    localStorage.setItem("toDoList",toDoListStr);
    
    showAction();
}

// 有篩選類別的顯示
function filterShowAction(event){
    event.preventDefault(); //取消連結事件
    if ( event.target.nodeName != "A"){return;} //點到的不是A就跳出
    
    var toDoListStr = localStorage.getItem("toDoList");
    var toDoListArray = JSON.parse(toDoListStr);
    var resultShowHtml = "";
    
    if ( toDoListArray == null ){return;} //如果localStorage裡完全沒值就跳出不做
    
    for ( var i=0; i<toDoListArray.length; i++){
        var categoryTd = toDoListArray[i].category;
            if ( event.target.textContent == "全部"){
                showAction();
                return;
            }
            if ( event.target.textContent == toDoListArray[i].category ){
            // 增加類別顏色
            var categoryClass;
            for(var j=0; j<categoryObj.length; j++){
                if ( toDoListArray[i].category == categoryObj[j].category){
                    categoryClass = categoryObj[j].categoryClass;
                }
            }
            resultShowHtml += "<tr data-num='"+i+"'><td style='width: 20%'>"+toDoListArray[i].time+"<td style='width: 10%' class='"+categoryClass+"'>"+toDoListArray[i].category+"</td><td style='width: 70%'>"+toDoListArray[i].task+"</td><td style='width: 10%'><input type='button' value='刪除'></td></tr>"
        }
    }
    resultShow.innerHTML = resultShowHtml;
}



