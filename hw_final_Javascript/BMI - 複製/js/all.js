
// var testData=[{
//         bodyType: "理想",
//         BMI: 20.90,
//         weight: 70,
//         height: 180,
//         currentTime: "06-19-2017",
//     },{
//         bodyType: "理想",
//         BMI: 20.90,
//         weight: 60,
//         height: 170,
//         currentTime: "06-19-2017",
//     },{
//         bodyType: "過重",
//         BMI: 20.90,
//         weight: 120,
//         height: 160,
//         currentTime: "06-19-2017",
//     },{
//         bodyType: "過輕",
//         BMI: 10.01,
//         weight: 40,
//         height: 170,
//         currentTime: "05-01-2019",
//     }
// ]

// // var testDataStr = JSON.stringify(testData);
// // localStorage.setItem("result",testDataStr);

// console.log(testData.length);
// console.log(testData[1].bodyType);

// var resultTableObj = document.querySelector(".resultTable");

// // var resultTableStr ="";
// // for ( var i=0; i<testData.length; i++){
// //     console.log(testData[i].bodyType);
// //     resultTableStr += "<tr>";
// //     resultTableStr += "<td class='typeClassFine'>"+testData[i].bodyType+"</td>";
// //     resultTableStr += "<td><span class='smallText'>BMI</span>"+testData[i].BMI+"</td>";
// //     resultTableStr += "<td><span class='smallText'>weight</span>"+testData[i].weight+"kg</td>";
// //     resultTableStr += "<td><span class='smallText'>height</span>"+testData[i].height+"cm</td>";
// //     resultTableStr += "<td class='dateText'>"+testData[i].currentTime+"</td>";
// //     resultTableStr += "</tr>";
// //     console.log(resultTableStr);
// // }

// // resultTableObj.innerHTML = resultTableStr;

// var testDataStr = localStorage.getItem("result");
// var testDataArray = JSON.parse(testDataStr) || [];

// var resultTableStr ="";
// for ( var i=0; i<testDataArray.length; i++){
//     console.log(testDataArray[i].bodyType);
//     resultTableStr += "<tr>";
//     resultTableStr += "<td class='typeClassFine'>"+testDataArray[i].bodyType+"</td>";
//     resultTableStr += "<td><span class='smallText'>BMI</span>"+testDataArray[i].BMI+"</td>";
//     resultTableStr += "<td><span class='smallText'>weight</span>"+testDataArray[i].weight+"kg</td>";
//     resultTableStr += "<td><span class='smallText'>height</span>"+testDataArray[i].height+"cm</td>";
//     resultTableStr += "<td class='dateText'>"+testDataArray[i].currentTime+"</td>";
//     resultTableStr += "</tr>";
//     console.log(resultTableStr);
// }

// resultTableObj.innerHTML = resultTableStr;


// ------ 上面都是測試的code ------ //

var resultTableObj = document.querySelector(".resultTable");
resultTableObj.addEventListener("click",removeData);

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
    bodyType: "重度過輕",
    bodyTypeClass: "bodyTypeClassHeavy", 
},{
    bodyType: "嚴重過輕",
    bodyTypeClass: "bodyTypeClassSerious", 
}];

showData();

var dataInputHeightObj = document.getElementById("dataInputHeight");
var dataInputWeightObj = document.getElementById("dataInputWeight");

var sendBtnObj = document.querySelector(".sendBtn");

sendBtnObj.addEventListener("click",getInputData);


function getInputData(){
    
    var today = new Date();
    var todayMonth = today.getMonth()+1;
    todayMonth = JSON.stringify(todayMonth);
    var todayDay = today.getDate();
    todayDay = JSON.stringify(todayDay);
    console.log("todayMonth.length: "+todayMonth.length);
    if ( todayMonth.length == 1 ){ todayMonth = "0"+todayMonth; }
    if ( todayDay.length == 1 ){ todayDay = "0"+todayDay; }
    var currentDateTime =(todayMonth)+"-"+todayDay+"-"+today.getFullYear();


    if ( dataInputHeightObj.value == "" ){
        alert("請輸入身高！");
        return;
    }
    if ( dataInputWeightObj.value == "" ){
        alert("請輸入體重！");
        return;
    }

    console.log(dataInputHeightObj.value);
    
    var dataInputHeight = parseInt(dataInputHeightObj.value);
    var dataInputWeight = parseInt(dataInputWeightObj.value);

    console.log(dataInputHeight);
    console.log(dataInputWeight);

    var BMICalculateResult = dataInputWeight / (dataInputHeight/100 * dataInputHeight/100);
    BMICalculateResult = BMICalculateResult.toFixed(2); //取到小數點第2位
    console.log("BMIValue: "+BMICalculateResult);
    var bodyType = "";
    if ( BMICalculateResult >= 40 ){ bodyType = "嚴重肥胖"; } 
    else if ( BMICalculateResult < 40 && BMICalculateResult >= 35 ){ bodyType="重度肥胖"; }
    else if ( BMICalculateResult < 35 && BMICalculateResult >= 30 ){ bodyType="中度肥胖"; }
    else if ( BMICalculateResult < 30 && BMICalculateResult >= 25 ){ bodyType="輕度肥胖"; }
    else if ( BMICalculateResult < 25 && BMICalculateResult >= 18.5 ){ bodyType="體重正常"; }
    else if ( BMICalculateResult < 18.5 && BMICalculateResult >= 16 ){ bodyType="體重過輕"; }
    else if ( BMICalculateResult < 16 && BMICalculateResult >= 15 ){ bodyType="重度過輕"; }
    else { bodyType="嚴重過輕"; }

    addInputData(dataInputHeight,dataInputWeight,BMICalculateResult,bodyType,currentDateTime);

    dataInputHeightObj.value = "";
    dataInputWeightObj.value = ""
}

function addInputData(heightValue,weightValue,BMIValue,bodyTypeValue,currentDateTime){
    console.log(heightValue+" "+weightValue+" "+BMIValue+" "+bodyTypeValue+" "+currentDateTime);

    var localStorageDataStr = localStorage.getItem("result");
    var localStorageDataArray = JSON.parse(localStorageDataStr) || [];

    // for ( var i=0; i<localStorageDataArray.length; i++){
    //     console.log(localStorageDataArray[i].bodyType);
    // }

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

function showData(){
    
    var localStorageDataStr = localStorage.getItem("result");
    var localStorageDataArray = JSON.parse(localStorageDataStr);

    if ( localStorageDataArray == null ){return;}

    var resultTableStr = "" ;
    var bodyTypeClass = "" ;
    for ( var i=0; i<localStorageDataArray.length; i++){
        console.log(localStorageDataArray[i].bodyType);
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
        console.log(resultTableStr);
    }

    resultTableObj.innerHTML = resultTableStr;
}



function removeData(event){
    
    if ( event.target.nodeName != "INPUT" ){return;}
    console.log(event.target.dataset.num);

    var removeDataNum = event.target.dataset.num;

    var localStorageDataStr = localStorage.getItem("result");
    var localStorageDataArray = JSON.parse(localStorageDataStr);

    

    localStorageDataArray.splice(removeDataNum,1);
    localStorageDataStr = JSON.stringify(localStorageDataArray);
    localStorage.setItem("result",localStorageDataStr);

    showData();
}