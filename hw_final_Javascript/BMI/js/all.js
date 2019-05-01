
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

showData();

var dataInputHeightObj = document.getElementById("dataInputHeight");
var dataInputWeightObj = document.getElementById("dataInputWeight");

var sendBtnObj = document.querySelector(".sendBtn");

sendBtnObj.addEventListener("click",getInputData);


function getInputData(){
    
    var today=new Date();
    var currentDateTime =(today.getMonth()+1)+"-"+today.getDate()+"-"+today.getFullYear();


    if ( dataInputHeightObj.value == "" ){return;}
    if ( dataInputWeightObj.value == "" ){return;}

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
    else if ( BMICalculateResult < 16 && BMICalculateResult >= 15 ){ bodyType="嚴重體重不足"; }
    else { bodyType="非常嚴重的體重不足"; }

    addInputData(dataInputHeight,dataInputWeight,BMICalculateResult,bodyType,currentDateTime);
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
    var resultTableObj = document.querySelector(".resultTable");
    var localStorageDataStr = localStorage.getItem("result");
    var localStorageDataArray = JSON.parse(localStorageDataStr) || [];

    var resultTableStr ="";
    for ( var i=0; i<localStorageDataArray.length; i++){
        console.log(localStorageDataArray[i].bodyType);
        resultTableStr += "<tr>";
        resultTableStr += "<td class='typeClassFine'>"+localStorageDataArray[i].bodyType+"</td>";
        resultTableStr += "<td><span class='smallText'>BMI</span>"+localStorageDataArray[i].BMI+"</td>";
        resultTableStr += "<td><span class='smallText'>weight</span>"+localStorageDataArray[i].weight+"kg</td>";
        resultTableStr += "<td><span class='smallText'>height</span>"+localStorageDataArray[i].height+"cm</td>";
        resultTableStr += "<td class='dateText'>"+localStorageDataArray[i].currentTime+"</td>";
        resultTableStr += "</tr>";
        console.log(resultTableStr);
    }

    resultTableObj.innerHTML = resultTableStr;
}