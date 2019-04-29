var resultShow = document.getElementById("resultShowId");
 showAction();

// 動態產生類別的下拉式選單
var category = ["娛樂","勉強","外出","雜事","其他"];
var boardCategory = document.getElementById("boardCategory");

for ( var i=0; i<category.length; i++){
    var categoryOption = document.createElement("option");
    categoryOption.setAttribute("value",category[i]);
    categoryOption.setAttribute("data-num",i);
    categoryOption.textContent = category[i];
    boardCategory.appendChild(categoryOption);
}

var selectCategory="0";

boardCategory.addEventListener("change",getCategory);
function getCategory(event){
    // if ( event.target.value == "0" ){
    //     return;
    // }
    console.log(event.target.value);
    selectCategory = event.target.value;
}

var addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click",addAction);

var boardTaskInput = document.getElementById("boardTaskInput");

function addAction(event){
    console.log(boardTaskInput.value);
    console.log(boardCategory);
    
    // localStorage.setItem("task",boardTaskInput.value);
    if ( selectCategory == "0"){
        alert("請選擇類別");
        return;
    }
    var toDoListStr = localStorage.getItem("toDoList");
    var toDoListArray = JSON.parse(toDoListStr);
    if ( toDoListArray == null ){
        toDoListArray = [];
    }
    toDoListArray.push({
        category: selectCategory,
        task: boardTaskInput.value,
    })
    toDoListStr = JSON.stringify(toDoListArray);
    console.log(toDoListStr);
    localStorage.setItem("toDoList",toDoListStr);
    showAction();
}



function showAction(){
    var toDoListStr = localStorage.getItem("toDoList");
    var toDoListArray = JSON.parse(toDoListStr);
    var resultShowHtml = "";
    // for ( var i=0; i<toDoListArray.length; i++){
    //     console.log("task: "+toDoListArray[i].task);
    //     resultShowHtml += "<li data-num='"+i+"'>"+toDoListArray[i].task+"</li>"
    // }
    // resultShow.innerHTML = resultShowHtml;
    console.log(toDoListArray);
    if ( toDoListArray == null ){return;}
    for ( var i=0; i<toDoListArray.length; i++){
        console.log("task: "+toDoListArray[i].task);
        resultShowHtml += "<tr data-num='"+i+"'><td>"+toDoListArray[i].category+"</td><td>"+toDoListArray[i].task+"</td><td><input type='button' value='刪除'></td></tr>"
    }
    resultShow.innerHTML = resultShowHtml;

    
    
}


resultShow.addEventListener("click",removeAction);

function removeAction(event){
    console.log(event.target.nodeName);
    if ( event.target.nodeName != "INPUT"){return;}
    console.log(event.target.parentNode.parentNode.dataset.num);
    var listNum = parseInt(event.target.parentNode.parentNode.dataset.num);

    var toDoListStr = localStorage.getItem("toDoList");
    var toDoListArray = JSON.parse(toDoListStr);

    toDoListArray.splice(listNum,1);
    toDoListStr = JSON.stringify(toDoListArray);

    localStorage.setItem("toDoList",toDoListStr);
    
    showAction();
}