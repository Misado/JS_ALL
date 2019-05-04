console.log("HIHIHI");

console.log(kaoTravelSite[0].Name);

console.log(kaoTravelSite.length);

var siteBlockObj = document.querySelector(".siteBlock");
// console.log(siteBlockObj.innerHTML);

var districtSelected = "三民區"; //先給它一個預設值顯示結果
showDistrictSite();

function findDistrict(inputArray){
    var outputArray = [];
    var obj = []; //虛擬存不同的國家字串
    var objAll = []; //存區域字串跟出現次數

    for ( var i=0; i < inputArray.length; i++){
        // distinct出不同區域
        if ( !obj[inputArray[i].Zone] ){
            obj[inputArray[i].Zone] = 1;
            outputArray.push(inputArray[i].Zone);
            objAll.push({District:inputArray[i].Zone,Count:obj[inputArray[i].Zone]});
        }
        else{
            //存區域跟次數
            for (var j=0; j < objAll.length; j++){
                if( objAll[j].District == inputArray[i].Zone ){
                    objAll[j].Count += 1;
                }
            }
        }
    }
    return objAll;
}

var districtRecords = findDistrict(kaoTravelSite);

console.log(districtRecords[0].District,districtRecords[0].Count);

for ( var i=0; i<districtRecords.length; i++){
    console.log(districtRecords[i].District,districtRecords[i].Count);
}



// var siteBlockObjStr = "";
// for ( var i=0; i<kaoTravelSite.length; i++){

//     if ( kaoTravelSite[i].Zone == "甲仙區" ){
//         console.log(kaoTravelSite[i].Name);
//         console.log(kaoTravelSite[i].Picture1);

//         //圖片網址這部份設定要用跳脫字元
//         var sitePicUrl = "style='background-image:url(&quot;"+kaoTravelSite[i].Picture1+"&quot;)'>";
//         console.log("sitePicUrl: "+sitePicUrl);
        
//         siteBlockObjStr += "<li>";
//         siteBlockObjStr += "<div class='sitePic' "+sitePicUrl+"<div class='sitePicMask'><h3>"+kaoTravelSite[i].Name+"</h3><p>"+kaoTravelSite[i].Zone+"</p></div></div>";
//         siteBlockObjStr += "<table class='siteInfo'>";
//         siteBlockObjStr += "<tr><td><img src='img/icons_clock.png'></td><td><span>"+kaoTravelSite[i].Opentime+"</span></td></tr>";
//         siteBlockObjStr += "<tr><td><img src='img/icons_pin.png'></td><td><span>"+kaoTravelSite[i].Add+"</span></td></tr>";
//         siteBlockObjStr += "<tr><td><img src='img/icons_phone.png'></td><td><span>"+kaoTravelSite[i].Tel+"</span></td></tr>";
//         siteBlockObjStr += "</table>";
//         siteBlockObjStr += "<div class='tagInfo'><img src='img/icons_tag.png'><span>"+kaoTravelSite[i].Ticketinfo+"</span></div>";
//         siteBlockObjStr += "</li>";
//     }
    
// }
// siteBlockObj.innerHTML = siteBlockObjStr;


//顯示類別跟數量，並動態產生下拉式選單
// var tainandistrict = finddistrict(foodTainan);
// var districtFoodNumStr = "";
//動態產生下拉式選單，先取得類別的下拉式選單
var districtList = document.getElementById("districtOption");
districtList.addEventListener("change",changeDistrictSite);

for ( var i=0; i<districtRecords.length ;i++){
    // districtFoodNumStr += tainandistrict[i].district+" "+tainandistrict[i].Count+"個, "; 
    //動態產生下拉式選單
    var districtNode = document.createElement("option");
    districtNode.setAttribute("value",districtRecords[i].District);
    districtNode.textContent = districtRecords[i].District+"("+districtRecords[i].Count+")";
    districtList.appendChild(districtNode);
}

function changeDistrictSite(event){
    if ( event.target.value == 0){
        alert("請選擇行政區！");
        return;
    }
    districtSelected = event.target.value;
    showDistrictSite();
}

function showDistrictSite(){
    // console.log(event.target.value);
    console.log("districtSelected: "+districtSelected);
    var siteBlockObjStr = "";
    for ( var i=0; i<kaoTravelSite.length; i++){

        if ( kaoTravelSite[i].Zone == districtSelected ){
            console.log(kaoTravelSite[i].Name);
            console.log(kaoTravelSite[i].Picture1);

            //圖片網址這部份設定要用跳脫字元
            var sitePicUrl = "style='background-image:url(&quot;"+kaoTravelSite[i].Picture1+"&quot;)'>";
            console.log("sitePicUrl: "+sitePicUrl);
            
            siteBlockObjStr += "<li>";
            siteBlockObjStr += "<div class='sitePic' "+sitePicUrl+"<div class='sitePicMask'><h3>"+kaoTravelSite[i].Name+"</h3><p>"+kaoTravelSite[i].Zone+"</p></div></div>";
            siteBlockObjStr += "<table class='siteInfo'>";
            siteBlockObjStr += "<tr><td><img src='img/icons_clock.png'></td><td><span>"+kaoTravelSite[i].Opentime+"</span></td></tr>";
            siteBlockObjStr += "<tr><td><img src='img/icons_pin.png'></td><td><span>"+kaoTravelSite[i].Add+"</span></td></tr>";
            siteBlockObjStr += "<tr><td><img src='img/icons_phone.png'></td><td><span>"+kaoTravelSite[i].Tel+"</span></td></tr>";
            siteBlockObjStr += "</table>";
            siteBlockObjStr += "<div class='tagInfo'><img src='img/icons_tag.png'><span>"+kaoTravelSite[i].Ticketinfo+"</span></div>";
            siteBlockObjStr += "</li>";
        }
        
    }
    siteBlockObj.innerHTML = siteBlockObjStr;
}