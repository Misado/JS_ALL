//處理各區域跟數量，存成陣列
function findDistrict(inputArray){
    var outputArray = [];
    var obj = []; //虛擬存不同的區域字串
    var objAll = []; //存區域字串跟出現次數
    for ( var i=0; i < inputArray.length; i++){
        // distinct出不同區域
        if ( !obj[inputArray[i].district] ){
            obj[inputArray[i].district] = 1;
            outputArray.push(inputArray[i].district);
            //存區域跟次數
            objAll.push({District:inputArray[i].district,Count:obj[inputArray[i].district]});
        }
        else{
            //已存在的區域就+1
            for (var j=0; j < objAll.length; j++){
                if( objAll[j].District == inputArray[i].district ){
                    objAll[j].Count += 1;
                }
            }
        }
    }
    return objAll;
}

//處理各類別跟數量，存成陣列
//類別是陣列，所以要雙層迴圈
function findCategory(inputArray){
    var outputArray = [];
    var obj = []; //虛擬存不同的類別字串
    var objAll = []; //存類別字串跟出現次數
    for ( var i=0; i < foodTainan.length; i++){
        for ( var j=0; j < foodTainan[i].category.length; j++){
        // distinct出不同類別
            if ( !obj[foodTainan[i].category[j]] ){
                obj[foodTainan[i].category[j]] = 1;
                outputArray.push(foodTainan[i].category[j]);
                //存類別跟次數
                objAll.push({Category:foodTainan[i].category[j],Count:obj[foodTainan[i].category[j]]});
            } else{
                for (var x=0; x<objAll.length; x++){
                    if ( objAll[x].Category == foodTainan[i].category[j] ){
                        objAll[x].Count += 1;
                    }
                }
            }
            
        }
    }
    return objAll;
}


//顯示區域跟數量，並動態產生下拉式選單
var tainanDistrict = findDistrict(foodTainan);
var districtFoodNumStr = "";
//動態產生下拉式選單，先取得區域的下拉式選單
var districtList = document.getElementById("districtId");

for (var i=0; i<tainanDistrict.length; i++){
    districtFoodNumStr += tainanDistrict[i].District+" "+tainanDistrict[i].Count+"個, "; 
    //動態產生下拉式選單
    var districtNode = document.createElement("option");
    districtNode.setAttribute("value",tainanDistrict[i].District);
    districtNode.textContent = tainanDistrict[i].District;
    districtList.appendChild(districtNode);
}
//顯示區域跟數量
document.getElementById("districtFoodNum").textContent = districtFoodNumStr;

//顯示類別跟數量，並動態產生下拉式選單
var tainanCategory = findCategory(foodTainan);
var categoryFoodNumStr = "";
//動態產生下拉式選單，先取得類別的下拉式選單
var categoryList = document.getElementById("categoryId");

for ( var i=0; i<tainanCategory.length ;i++){
    categoryFoodNumStr += tainanCategory[i].Category+" "+tainanCategory[i].Count+"個, "; 
    //動態產生下拉式選單
    var categoryNode = document.createElement("option");
    categoryNode.setAttribute("value",tainanCategory[i].Category);
    categoryNode.textContent = tainanCategory[i].Category;
    categoryList.appendChild(categoryNode);
}
//顯示類別跟數量
document.getElementById("categoryFoodNum").textContent = categoryFoodNumStr;


//顯示結果

var showCheck = 0; //是否有顯示過
var resultNode = document.querySelector(".foodList"); //取得顯示結果ul的元素

//送出的按鈕如果被點要執行的
document.getElementById("submitBtn").onclick = function(){

    var foodNum = 0; //先初始化食物數量為0

    //如果已經顯示過，就要先把之前的結果清空
    if ( showCheck != 0 ){
        var resultNodeNum = resultNode.childNodes.length;
        for (var i=0; i<resultNodeNum; i++){
            //因為移掉第一個之後，第二個的index就會變成0，所以都要一直帶[0]
            resultNode.removeChild(resultNode.childNodes[0]);
        }
    }

    //取得選擇的區域跟類別的值
    var searchDistrict = document.getElementById("districtId").value;
    var searchCategory = document.getElementById("categoryId").value;
    var strDistrictCategory = searchDistrict+""+searchCategory+" 好吃的有： ";
    
    //增加顯示結果ul foodList的li
    for (var i=0; i<foodTainan.length; i++){
        for (var j=0; j<foodTainan[i].category.length; j++){
            if( foodTainan[i].category[j] == searchCategory){
                if ( foodTainan[i].district == searchDistrict){
                    //每新增一個li就要重新宣告一次，所以前面一定要加var
                    var liNode = document.createElement("li");
                    liNode.textContent = foodTainan[i].name;
                    console.log("liNode.textContent "+liNode.textContent);
                    resultNode.appendChild(liNode);
                    foodNum += 1; //食物數量+1
                }
            }    
        }
        
    }
    strDistrictCategory += " "+foodNum+" 個";
    document.getElementById("bothFoodNum").textContent = strDistrictCategory;

    //作完就把showCheck設為1
    showCheck = 1;
};

