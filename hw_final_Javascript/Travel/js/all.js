console.log("HIHIHI");

console.log(kaoTravelSite[0].Name);

console.log(kaoTravelSite.length);

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

var siteBlockObj = document.querySelector(".siteBlock");
console.log(siteBlockObj.innerHTML);

var siteBlockObjStr = "";
for ( var i=0; i<kaoTravelSite.length; i++){

    if ( kaoTravelSite[i].Zone == "三民區" ){
        console.log(kaoTravelSite[i].Name);
        siteBlockObjStr += "<li>";
        siteBlockObjStr += "<div class='sitePic'><div class='sitePicMask'><h3>"+kaoTravelSite[i].Name+"</h3><p>"+kaoTravelSite[i].Zone+"</p></div></div>";
        siteBlockObjStr += "<table class='siteInfo'>";
        siteBlockObjStr += "<tr><td><img src='img/icons_clock.png'></td><td><span>"+kaoTravelSite[i].Opentime+"</span></td></tr>";
        siteBlockObjStr += "<tr><td><img src='img/icons_pin.png'></td><td><span>"+kaoTravelSite[i].Add+"</span></td></tr>";
        siteBlockObjStr += "<tr><td><img src='img/icons_phone.png'></td><td><span>"+kaoTravelSite[i].Tel+"</span></td></tr>";
        siteBlockObjStr += "</table>";
        siteBlockObjStr += "<div class='tagInfo'><img src='img/icons_tag.png'><span>"+kaoTravelSite[i].Ticketinfo+"</span></div>";
        siteBlockObjStr += "</li>";
    }
    
}

// var siteBlockObj = document.querySelector(".siteBlock");
siteBlockObj.innerHTML = siteBlockObjStr;
console.log(siteBlockObj.innerHTML);

for ( var i=0; i<siteBlockObj.childNodes.length; i++){
    console.log(siteBlockObj.childNodes[i]);
    console.log(siteBlockObj.childNodes[i].childNodes[0].getAttribute("class"));
    siteBlockObj.childNodes[i].childNodes[0].style = "background-image:url('img/Hero.png')";
}