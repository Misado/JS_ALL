/* ------ 主程式 ------ */

// logo移掉原本event的事件
const bmiLogoObj = document.querySelector(".bmiLogo");
bmiLogoObj.addEventListener("click",function(){
    event.preventDefault();
});

// 按下看結果按鈕
const sendBtnObj = document.querySelector(".sendBtn");
sendBtnObj.addEventListener("click",getInputData);
// 點下去之後的結果元件
const resultBtnObj = document.querySelector(".resultBtn");
resultBtnObj.addEventListener("click",resetAction);

const resultCircleBMIObj = document.getElementById("resultCircleBMI");
const resultCircleTypeObj = document.getElementById("resultCircleType");

// 顯示結果的table
const resultTableObj = document.querySelector(".resultTable");
resultTableObj.addEventListener("click",removeData);

// 頁碼
const showPage = document.querySelector(".showPage");
showPage.addEventListener("click",showDataPage);
// 顯示總筆數的元素
const totalRecordNumObj = document.querySelector(".totalRecordNum");

// 輸入身高跟體重的Element
const dataInputHeightObj = document.getElementById("dataInputHeight");
const dataInputWeightObj = document.getElementById("dataInputWeight");

//每頁要顯示的筆數
let recordnumPerPage = 5;

// 初始值先把現在頁碼設為1
let currentPageNum = 1;

// 宣告BMI嚴重程度跟要套用的class
let bodyTypeArray = [{
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


showData(); // 一開始要先顯示資料&頁碼


/* ------ 函式宣告 ------ */

// 顯示資料
function showData(){
    let localStorageDataStr = localStorage.getItem("result");
    let localStorageDataArray = JSON.parse(localStorageDataStr);

    if ( localStorageDataArray == null ){return;} //取到的值為null就跳出不做

    let resultTableStr = "" ;
    let bodyTypeClass = "" ;

    let totalResultNum = localStorageDataArray.length;
    totalRecordNumObj.textContent = `總筆數：${totalResultNum}`;

    let fromResultNum = (currentPageNum-1)*recordnumPerPage+1; //該頁的起始點
    let toResultNum = currentPageNum*recordnumPerPage; //該頁的結束點
    if ( toResultNum >= totalResultNum){toResultNum = totalResultNum};

    // 比對嚴重程度找到要套的class
    for ( let i=fromResultNum-1; i<toResultNum; i++){
        for ( let j=0; j<bodyTypeArray.length;j++){
            if ( localStorageDataArray[i].bodyType == bodyTypeArray[j].bodyType ){
                bodyTypeClass = bodyTypeArray[j].bodyTypeClass;
            }
        }
        resultTableStr += "<tr>";
        resultTableStr += `<td class='bodyTypeClass ${bodyTypeClass}'>${localStorageDataArray[i].bodyType}</td>`;
        resultTableStr += `<td><span class='smallText'>BMI</span>${localStorageDataArray[i].BMI}</td>`;
        resultTableStr += `<td><span class='smallText'>weight</span>${localStorageDataArray[i].weight}kg</td>`;
        resultTableStr += `<td><span class='smallText'>height</span>${localStorageDataArray[i].height}cm</td>`;
        resultTableStr += `<td class='dateText'>${localStorageDataArray[i].currentTime}</td>`;
        resultTableStr += `<td><input type='button' class='pure-button pure-button-primary pure-button-customized' value='刪除' data-num='${i}'></td>`;
        resultTableStr += "</tr>";
    }
    resultTableObj.innerHTML = resultTableStr;

    showTotalPageMenu(); // 重新顯示頁碼
}


// 動態產生頁碼
function showTotalPageMenu(){
    let localStorageDataStr = localStorage.getItem("result");
    let localStorageDataArray = JSON.parse(localStorageDataStr);

    let totalResultNum = localStorageDataArray.length;
    let totalPageNum = parseInt(totalResultNum/recordnumPerPage);
    
    if ( totalResultNum%recordnumPerPage > 0 ){
        totalPageNum = totalPageNum+1;
    }
    
    let showPageStr = "";

    // 如果是第1頁，往上頁 / 跳到最前頁 就不要有連結
    if ( currentPageNum == 1 ){
        showPageStr += "<li><a data-page='top'>⟽</a></li>";
        showPageStr += "<li><a data-page='prev'>⟸</a></li>";
    } else {
        showPageStr += "<li><a href='#' class='showPageNum' data-page='top'>⟽</a></li>";
        showPageStr += "<li><a href='#' class='showPageNum' data-page='prev'>⟸</a></li>";
    }

    for ( let i=1; i<=totalPageNum; i++){
        // 如果 i 跟現在頁面一樣，就不要有連結，且套用樣式讓使用者知道目前在那一頁
        if ( i == currentPageNum ){
            showPageStr += `<li><a class='showCurrentPage' data-page='${i}'>${i}</a></li>`;
        } else {
            showPageStr += `<li><a href='#' class='showPageNum' data-page='${i}'>${i}</a></li>`;
        }
    }

     // 如果是最後1頁，往下頁 / 跳到最後頁就不要有連結
    if ( currentPageNum == totalPageNum ){
        showPageStr += "<li><a data-page='next' >⟹</a></li>";
        showPageStr += "<li><a data-page='bottom' >⟾</a></li>";
    } else {
        showPageStr += "<li><a href='#' class='showPageNum' data-page='next' >⟹</a></li>";
        showPageStr += "<li><a href='#' class='showPageNum' data-page='bottom' >⟾</a></li>";
    }
    showPage.innerHTML = showPageStr;
}


// 輸入值按下按鈕後要做的事
function getInputData(){
    // 如果沒輸入值就跳警告視窗，後面不做
    if ( dataInputHeightObj.value == "" ){
        alert("請輸入身高！");
        return;
    }
    if ( dataInputWeightObj.value == "" ){
        alert("請輸入體重！");
        return;
    }

    // 看結果按鈕隱藏，顯示結果圓圈
    sendBtnObj.style.display = "none";
    resultBtnObj.style.display = "flex";

    // 取得現在時間
    let today = new Date();
    let todayMonth = today.getMonth()+1;
    todayMonth = JSON.stringify(todayMonth); //要轉字串才能知道長度
    let todayDay = today.getDate();
    todayDay = JSON.stringify(todayDay); //要轉字串才能知道長度
    // 日期如果只有1碼前面補0
    if ( todayMonth.length == 1 ){ todayMonth = "0"+todayMonth; }
    if ( todayDay.length == 1 ){ todayDay = "0"+todayDay; }
    let currentDateTime =(todayMonth)+"-"+todayDay+"-"+today.getFullYear();
    
    let dataInputHeight = parseFloat(dataInputHeightObj.value).toFixed(1); //取到小數點第1位
    let dataInputWeight = parseFloat(dataInputWeightObj.value).toFixed(1); //取到小數點第1位

    // 如果小數點後面是0就去掉
    if ( dataInputHeight.split(".")[1] == 0 ){ dataInputHeight = dataInputHeight.split(".")[0]; }
    if ( dataInputWeight.split(".")[1] == 0 ){ dataInputWeight = dataInputWeight.split(".")[0]; }

    let BMICalculateResult = dataInputWeight / (dataInputHeight/100 * dataInputHeight/100);
    BMICalculateResult = BMICalculateResult.toFixed(2); //取到小數點第2位

    let bodyType = "";
    if ( BMICalculateResult >= 40 ){ bodyType = "嚴重肥胖"; } 
    else if ( BMICalculateResult < 40 && BMICalculateResult >= 35 ){ bodyType="重度肥胖"; }
    else if ( BMICalculateResult < 35 && BMICalculateResult >= 30 ){ bodyType="中度肥胖"; }
    else if ( BMICalculateResult < 30 && BMICalculateResult >= 25 ){ bodyType="輕度肥胖"; }
    else if ( BMICalculateResult < 25 && BMICalculateResult >= 18.5 ){ bodyType="體重正常"; }
    else if ( BMICalculateResult < 18.5 && BMICalculateResult >= 16 ){ bodyType="體重過輕"; }
    else if ( BMICalculateResult < 16 && BMICalculateResult >= 15 ){ bodyType="中度過輕"; }
    else { bodyType="嚴重過輕"; }

    resultCircleBMIObj.innerHTML = BMICalculateResult+"<br><span class='smallText'>BMI</span>";
    resultCircleTypeObj.textContent = bodyType;


    //把取到的資料傳給增加資料的函數
    addInputData(dataInputHeight,dataInputWeight,BMICalculateResult,bodyType,currentDateTime);
}


// 增加輸入的資料
function addInputData(heightValue,weightValue,BMIValue,bodyTypeValue,currentDateTime){
    let localStorageDataStr = localStorage.getItem("result");
    let localStorageDataArray = JSON.parse(localStorageDataStr) || [];

    localStorageDataArray.push({
        bodyType: bodyTypeValue,
        BMI: BMIValue,
        weight: weightValue,
        height: heightValue,
        currentTime: currentDateTime,
    });
    
    localStorageDataStr = JSON.stringify(localStorageDataArray);
    localStorage.setItem("result",localStorageDataStr);

    // 結果圓圈的樣式套用
    let loopIconClass = resultBtnObj.childNodes[5].getAttribute("class");
    let resultBtnObjClass = resultBtnObj.getAttribute("class");
    for ( let i=0; i<bodyTypeArray.length; i++){
        if ( bodyTypeValue == bodyTypeArray[i].bodyType ){
            loopIconClass = loopIconClass +" "+bodyTypeArray[i].bodyTypeClass;
            resultBtnObjClass = resultBtnObjClass+" "+bodyTypeArray[i].bodyTypeClass;
        }
    }
    resultBtnObj.childNodes[5].setAttribute("class",loopIconClass);
    resultBtnObj.setAttribute("class",resultBtnObjClass);

    showData();
}


// 移除資料
function removeData(event){
    if ( event.target.nodeName != "INPUT" ){return;} //點到的不是INPUT就不做

    let removeDataNum = event.target.dataset.num;
    let localStorageDataStr = localStorage.getItem("result");
    let localStorageDataArray = JSON.parse(localStorageDataStr);

    localStorageDataArray.splice(removeDataNum,1);
    localStorageDataStr = JSON.stringify(localStorageDataArray);
    localStorage.setItem("result",localStorageDataStr);

    let totalResultNum = localStorageDataArray.length;
    let totalPageNum = parseInt(totalResultNum/recordnumPerPage);
    
    if ( totalResultNum%recordnumPerPage > 0 ){
        totalPageNum = totalPageNum+1;
    }

    // 當刪完後現在頁數比總頁數大時，就要把現在頁碼設為最大頁碼
    if ( currentPageNum >= totalPageNum ){
        currentPageNum = totalPageNum;
    }

    showData();
}


//  點頁碼後的動作，並把現在頁碼設定成點到的頁碼值
function showDataPage(event){
    event.preventDefault();
    if ( event.target.nodeName != "A" ){return;}

    //如果點到的頁碼是現在的頁碼，後面就不做
    if ( event.target.dataset.page == currentPageNum ){return;}

    let localStorageDataStr = localStorage.getItem("result");
    let localStorageDataArray = JSON.parse(localStorageDataStr);

    let totalResultNum = localStorageDataArray.length;
    let totalPageNum = parseInt(totalResultNum/recordnumPerPage);
    
    // 除於recordnumPerPage如果有餘數表示會跑到下一頁
    if ( totalResultNum%recordnumPerPage > 0 ){
        totalPageNum = totalPageNum+1;
    }

    // 點第1頁點往上就不處理，點最後1頁點往下就不處理
    if ( currentPageNum == 1 && event.target.dataset.page == "prev" ){return;}
    if ( currentPageNum == totalPageNum && event.target.dataset.page == "next" ){return;}
    
    // 點往上一頁就把頁碼-1 下一頁頁碼+1 
    // 點到top表示要跳到最前頁 點到bottom表示要跳到最後頁
    // 都不是就設為點到的頁數
    if ( event.target.dataset.page == "prev"){
        currentPageNum = currentPageNum - 1;
    } else if ( event.target.dataset.page == "next"){
        currentPageNum = currentPageNum + 1;
    } else if ( event.target.dataset.page == "top"){
        currentPageNum = 1;
    } else if ( event.target.dataset.page == "bottom"){
        currentPageNum = totalPageNum;
    } else {
        currentPageNum = parseInt(event.target.dataset.page);
    }

    showData();
}

function resetAction(event){
    if ( event.target.nodeName != "IMG" ){return;}

    // 清空輸入資料
    dataInputHeightObj.value = "";
    dataInputWeightObj.value = "";

    // 清空結果圓圈的內容
    resultCircleBMIObj.innerHTML = "";
    resultCircleTypeObj.textContent = "";

    // 清空結果圓圈的class(不然會疊加)
    resultBtnObj.childNodes[5].setAttribute("class","loopIcon");
    resultBtnObj.setAttribute("class","resultBtn");

    // 結果圓圈隱藏，顯示看結果按鈕
    sendBtnObj.style.display = "block";
    resultBtnObj.style.display = "none";
}