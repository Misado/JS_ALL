

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

document.getElementById("submitBtn").onclick = function(){
    var searchDistrict = document.getElementById("districtId").value;
    var searchCategory = document.getElementById("categoryId").value;
    var pattern = new RegExp("區$");    
    if ( searchDistrict.match(pattern) ){
        for (var i=0; i<foodTainan.length; i++){
            
                if( foodTainan[i].district == searchDistrict){
                    //console.log(searchDistrict+" 好吃的有: "+foodTainan[i].name);

            } 

        }
    } else{
        //console.log("輸入格式有誤(最後一個字必須為區)，請再輸入一次!!!");
    }
    //console.log("searchCategory: "+searchCategory);
    for (var i=0; i<foodTainan.length; i++){
        ////console.log("foodTainan[i].category: "+foodTainan[i].category);
        for (var j=0; j<foodTainan[i].category.length; j++){
            if( foodTainan[i].category[j] == searchCategory){
                //console.log(searchCategory+" 類別好吃的有: "+foodTainan[i].name);
            }    
        }
        
    }

    if ( searchDistrict !="" && searchCategory!= ""){
        //console.log("兩者皆有輸入!!!");
        var strDistrictCategory = searchDistrict+""+searchCategory+" 好吃的有： ";
        for (var i=0; i<foodTainan.length; i++){
            ////console.log("foodTainan[i].category: "+foodTainan[i].category);
            for (var j=0; j<foodTainan[i].category.length; j++){
                if( foodTainan[i].category[j] == searchCategory){
                    if ( foodTainan[i].district == searchDistrict){
                        //console.log(searchDistrict+" "+searchCategory+" 好吃的有: "+foodTainan[i].name);
                        strDistrictCategory += foodTainan[i].name+", ";
                    }
                }    
            }
            
        }
    }
    //console.log(strDistrictCategory);
    document.getElementById("bothFoodNum").textContent = strDistrictCategory;
};

//console.log(foodTainan[1].category[0]);

/*
for (var i=0; i<foodTainan.length; i++){
    for (var j=0; j<foodTainan[i].category.length; j++){
        if( foodTainan[i].category[j] == "甜點糕餅"){
            //console.log("甜點糕餅: "+foodTainan[i].name);
        }
    }


}*/


