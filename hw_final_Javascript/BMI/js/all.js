/* ------ 主程式 ------ */


// 按下看結果按鈕
var sendBtnObj = document.querySelector(".sendBtn");
sendBtnObj.addEventListener("click",getInputData);

// 顯示結果的table
var resultTableObj = document.querySelector(".resultTable");
resultTableObj.addEventListener("click",removeData);

var dataInputHeightObj = document.getElementById("dataInputHeight");
var dataInputWeightObj = document.getElementById("dataInputWeight");


// 宣告BMI嚴重程度跟要套用的class
var bodyTypeArray = [{
    bodyType: "嚴重肥胖",
    bodyTypeClass: "bodyTypeClassSerious", 
},{
    bodyType: "重度肥胖",
    bodyTypeClass: "bodyTypeClassHeavy", 
},{
    bodyType: "中度肥胖",
    bodyTypeClass: "bodyTypeClassMedium", 
},{
    bodyType: "輕度肥胖",
    bodyTypeClass: "bodyTypeClassLittle", 
},{
    bodyType: "體重正常",
    bodyTypeClass: "bodyTypeClassFine", 
},{
    bodyType: "體重過輕",
    bodyTypeClass: "bodyTypeClassLight", 
},{
    bodyType: "中度過輕",
    bodyTypeClass: "bodyTypeClassMedium", 
},{
    bodyType: "嚴重過輕",
    bodyTypeClass: "bodyTypeClassSerious", 
}];

// 一開始要先顯示資料
showData();



/* ------ 函式宣告 ------ */


// 輸入值按下按鈕後要做的事
function getInputData(){
    // 取得現在時間
    var today = new Date();
    var todayMonth = today.getMonth()+1;
    todayMonth = JSON.stringify(todayMonth); //要轉字串才能知道長度
    var todayDay = today.getDate();
    todayDay = JSON.stringify(todayDay); //要轉字串才能知道長度
    // 日期如果只有1碼前面補0
    if ( todayMonth.length == 1 ){ todayMonth = "0"+todayMonth; }
    if ( todayDay.length == 1 ){ todayDay = "0"+todayDay; }
    var currentDateTime =(todayMonth)+"-"+todayDay+"-"+today.getFullYear();

    // 如果沒輸入值就跳警告視窗，後面不做
    if ( dataInputHeightObj.value == "" ){
        alert("請輸入身高！");
        return;
    }
    if ( dataInputWeightObj.value == "" ){
        alert("請輸入體重！");
        return;
    }
    
    var dataInputHeight = parseInt(dataInputHeightObj.value);
    var dataInputWeight = parseInt(dataInputWeightObj.value);

    var BMICalculateResult = dataInputWeight / (dataInputHeight/100 * dataInputHeight/100);
    BMICalculateResult = BMICalculateResult.toFixed(2); //取到小數點第2位

    var bodyType = "";
    if ( BMICalculateResult >= 40 ){ bodyType = "嚴重肥胖"; } 
    else if ( BMICalculateResult < 40 && BMICalculateResult >= 35 ){ bodyType="重度肥胖"; }
    else if ( BMICalculateResult < 35 && BMICalculateResult >= 30 ){ bodyType="中度肥胖"; }
    else if ( BMICalculateResult < 30 && BMICalculateResult >= 25 ){ bodyType="輕度肥胖"; }
    else if ( BMICalculateResult < 25 && BMICalculateResult >= 18.5 ){ bodyType="體重正常"; }
    else if ( BMICalculateResult < 18.5 && BMICalculateResult >= 16 ){ bodyType="體重過輕"; }
    else if ( BMICalculateResult < 16 && BMICalculateResult >= 15 ){ bodyType="中度過輕"; }
    else { bodyType="嚴重過輕"; }

    //把取到的資料傳給增加資料的函數
    addInputData(dataInputHeight,dataInputWeight,BMICalculateResult,bodyType,currentDateTime);

    // 清空輸入資料
    dataInputHeightObj.value = "";
    dataInputWeightObj.value = ""
}

// 增加輸入的資料
function addInputData(heightValue,weightValue,BMIValue,bodyTypeValue,currentDateTime){
    var localStorageDataStr = localStorage.getItem("result");
    var localStorageDataArray = JSON.parse(localStorageDataStr) || [];

    localStorageDataArray.push({
        bodyType: bodyTypeValue,
        BMI: BMIValue,
        weight: weightValue,
        height: heightValue,
        currentTime: currentDateTime,
    });
    
    localStorageDataStr = JSON.stringify(localStorageDataArray);
    localStorage.setItem("result",localStorageDataStr);

    showData();
}

// 顯示資料
function showData(){
    var localStorageDataStr = localStorage.getItem("result");
    var localStorageDataArray = JSON.parse(localStorageDataStr);

    if ( localStorageDataArray == null ){return;} //取到的值為null就跳出不做

    var resultTableStr = "" ;
    var bodyTypeClass = "" ;

    // 比對嚴重程度找到要套的class
    for ( var i=0; i<localStorageDataArray.length; i++){
        for ( var j=0; j<bodyTypeArray.length;j++){
            if ( localStorageDataArray[i].bodyType == bodyTypeArray[j].bodyType ){
                bodyTypeClass = bodyTypeArray[j].bodyTypeClass;
            }
        }
        resultTableStr += "<tr>";
        resultTableStr += "<td class='"+bodyTypeClass+"'>"+localStorageDataArray[i].bodyType+"</td>";
        resultTableStr += "<td><span class='smallText'>BMI</span>"+localStorageDataArray[i].BMI+"</td>";
        resultTableStr += "<td><span class='smallText'>weight</span>"+localStorageDataArray[i].weight+"kg</td>";
        resultTableStr += "<td><span class='smallText'>height</span>"+localStorageDataArray[i].height+"cm</td>";
        resultTableStr += "<td class='dateText'>"+localStorageDataArray[i].currentTime+"</td>";
        resultTableStr += "<td><input type='button' class='pure-button pure-button-primary pure-button-customized' value='刪除' data-num='"+i+"'></td>";
        resultTableStr += "</tr>";
    }
    resultTableObj.innerHTML = resultTableStr;
}

// 移除資料
function removeData(event){
    if ( event.target.nodeName != "INPUT" ){return;} //點到的不是INPUT就不做

    var removeDataNum = event.target.dataset.num;
    var localStorageDataStr = localStorage.getItem("result");
    var localStorageDataArray = JSON.parse(localStorageDataStr);

    localStorageDataArray.splice(removeDataNum,1);
    localStorageDataStr = JSON.stringify(localStorageDataArray);
    localStorage.setItem("result",localStorageDataStr);

    showData();
}