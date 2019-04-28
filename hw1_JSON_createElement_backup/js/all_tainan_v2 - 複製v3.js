

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

var tainanDistrict = findDistrict(foodTainan);
var tainanDistrictTotal = tainanDistrict.length;
//console.log("tainanDistrictTotal: "+tainanDistrictTotal);

var districtFoodNumStr = "";
for (var i=0; i<tainanDistrict.length; i++){
    ////console.log(tainanDistrict[i].District+" "+tainanDistrict[i].Count+"個");
    districtFoodNumStr += tainanDistrict[i].District+" "+tainanDistrict[i].Count+"個, "; 
}

//console.log(districtFoodNumStr);
document.getElementById("districtFoodNum").textContent = districtFoodNumStr;

function findCategory(inputArray){
    var outputArray = [];
    var obj = []; //虛擬存不同的類別字串
    var objAll = []; //存類別字串跟出現次數
    

    for ( var i=0; i < foodTainan.length; i++){
        for ( var j=0; j < foodTainan[i].category.length; j++){
        // distinct出不同類別
        //console.log("[foodTainan[i].category[j]"+foodTainan[i].category[j]);
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
    var tainanCategory = findCategory(foodTainan);

    var categoryFoodNumStr = "";
    for ( var i=0; i<tainanCategory.length ;i++){
        categoryFoodNumStr += tainanCategory[i].Category+" "+tainanCategory[i].Count+"個, "; 
    }
    document.getElementById("categoryFoodNum").textContent = categoryFoodNumStr;
    
    
    

    ////console.log("outputArray"+outputArray);

    ////console.log("objAll"+objAll[5].Category+objAll[5].Count);
    var showCheck = 0;
    
    var pattern = new RegExp("區$"); 
     
    
        var resultNode = document.querySelector(".foodList");
        var liNode = document.createElement("li");
document.getElementById("submitBtn").onclick = function(){
    
        var foodNum = 0;

    if ( showCheck != 0 ){
        //strDistrictCategory = searchDistrict+""+searchCategory+" 好吃的有： ";
        //resultNode.removeChild(liNode);
       
        //liNode = resultNode.getElementsByTagName("li");
        //resultNode.removeChild(liNode);
        console.log("***resultNode.childNodes.length: "+resultNode.childNodes.length);
        resultNode = document.querySelector(".foodList");
        var resultNodeNum = resultNode.childNodes.length;
        for (var i=0; i<resultNodeNum; i++){
            //resultNodeNum = resultNode.childNodes.length;
            console.log("resultNodeNum: "+resultNodeNum);
            console.log("i= "+i+"resultNode.childNodes[i] "+resultNode.childNodes[i]);
            resultNode.removeChild(resultNode.childNodes[0]);
            console.log("remove"+liNode);
        }
    }

    if ( searchDistrict !="" && searchCategory!= ""){
        console.log("??");
        var searchDistrict = document.getElementById("districtId").value;
        var searchCategory = document.getElementById("categoryId").value;
        var strDistrictCategory = searchDistrict+""+searchCategory+" 好吃的有： ";
        //strDistrictCategory = searchDistrict+""+searchCategory+" 好吃的有： ";
        console.log("strDistrictCategory: "+strDistrictCategory);
        if ( searchDistrict.match(pattern) ){
            console.log("resultNode"+resultNode);
            for (var i=0; i<foodTainan.length; i++){
                for (var j=0; j<foodTainan[i].category.length; j++){
                    if( foodTainan[i].category[j] == searchCategory){
                        if ( foodTainan[i].district == searchDistrict){
                            var liNode = document.createElement("li");
                            liNode.textContent = foodTainan[i].name;
                            console.log("liNode.textContent "+liNode.textContent);
                            resultNode.appendChild(liNode);
                            foodNum += 1;
                        }
                    }    
                }
                
            }
            strDistrictCategory += " "+foodNum+" 個";
            document.getElementById("bothFoodNum").textContent = strDistrictCategory;
        } else{
            document.getElementById("bothFoodNum").textContent = "輸入格式有誤！區域必須為XX區。"
        }
        showCheck = 1;
    }
    
};

