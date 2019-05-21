console.log("HIHIHI");

console.log(kaoTravelSite[0].Name);

console.log(kaoTravelSite.length);

var districtRecords = findDistrict(kaoTravelSite);

var siteBlockObj = document.querySelector(".siteBlock");
// console.log(siteBlockObj.innerHTML);
var distrctTitleObj = document.getElementById("distrctTitle");

//每頁要顯示的筆數
var recordnumPerPage = 8;
var currentPageNum = 1; //現在所在頁數
var pageMenuObj = document.querySelector(".pageMenu");
pageMenuObj.addEventListener("click",showDataPage);
// showTotalPageMenu();


var districtSelected = "三民區"; //先給它一個預設值顯示結果
showDistrictSite();

var hotClass =["firstHotClass","secondHotClass","thirdHotClass","fourthHotClass","fifthHotClass"];

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



console.log(districtRecords[0].District,districtRecords[0].Count);

for ( var i=0; i<districtRecords.length; i++){
    console.log(districtRecords[i].District,districtRecords[i].Count);
}

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
    currentPageNum = 1; //換選項後頁碼初始值一定要先設為1
    showDistrictSite();
}

function showDistrictSite(){

    var totalResultNum;
    for ( var i=0; i<districtRecords.length; i++){
        if ( districtSelected == districtRecords[i].District ){
            totalResultNum = districtRecords[i].Count;
            console.log("districtSelected: "+districtSelected,"totalResultNum: "+totalResultNum);
            break;
        }
    }



    var recordCount = 1;
    var fromResultNum = (currentPageNum-1)*recordnumPerPage+1; //該頁的起始點
    var toResultNum = currentPageNum*recordnumPerPage; //該頁的結束點
    if ( toResultNum >= totalResultNum){toResultNum = totalResultNum};
    
    

    console.log("recordCount: "+recordCount,"fromResultNum: "+fromResultNum,"toResultNum: ",toResultNum);

    // console.log(event.target.value);
    console.log("districtSelected: "+districtSelected);
    distrctTitleObj.textContent = districtSelected;
    var siteBlockObjStr = "";
    for ( var i=0; i<kaoTravelSite.length; i++){
            if ( kaoTravelSite[i].Zone == districtSelected ){
                console.log("recordCount: "+recordCount);
                // recordCount如果大於等於起始點 且 小於等於結束點才真的產生html
                if ( recordCount >= fromResultNum && recordCount <= toResultNum ){
                console.log(kaoTravelSite[i].Name);
                console.log(kaoTravelSite[i].Picture1);

                //圖片網址這部份設定要用跳脫字元
                var sitePicUrl = "style='background-image:url(&quot;"+kaoTravelSite[i].Picture1+"&quot;)'>";
                console.log("sitePicUrl: "+sitePicUrl);
                
                siteBlockObjStr += "<li>";
                siteBlockObjStr += "<div class='sitePic' "+sitePicUrl+"<div class='sitePicMask'><h3>"+kaoTravelSite[i].Name+"</h3><p>"+kaoTravelSite[i].Zone+"</p></div></div>";
                siteBlockObjStr += "<div class='siteInfo'>";
                siteBlockObjStr += "<img src='img/icons_clock.png'><span>"+kaoTravelSite[i].Opentime+"</span><br>";
                siteBlockObjStr += "<img src='img/icons_pin.png'><span>"+kaoTravelSite[i].Add+"</span><br>";
                siteBlockObjStr += "<img src='img/icons_phone.png'><span>"+kaoTravelSite[i].Tel+"</span><br>";
                siteBlockObjStr += "</div>";
                siteBlockObjStr += "<div class='tagInfo'><img src='img/icons_tag.png'><span>"+kaoTravelSite[i].Ticketinfo+"</span></div>";
                siteBlockObjStr += "</li>";
                
                } 
                recordCount += 1; //只要有符合區域 recordCount+1
            }  
    }
    siteBlockObj.innerHTML = siteBlockObjStr;
    showTotalPageMenu();
}

console.log("----- before -----");
console.log(districtRecords);
// 要做熱門TOP5，所以把陣列照數量順序排序
districtRecordsSort = districtRecords.sort(function (a, b) {
    return a.Count < b.Count ? 1 : -1;
   });
console.log("----- after -----");
console.log(districtRecords);


//動態產生熱門行政區
var districtMenuOptionObj = document.querySelector(".districtMenuOption");
districtMenuOptionObj.addEventListener("click",showHotDistrictSite);

for ( var i=0; i<5; i++){
    var districtNode = document.createElement("li");
    var districtNodeLink = document.createElement("a");
    districtNode.setAttribute("class",hotClass[i]);
    districtNodeLink.setAttribute("href","#");
    districtNodeLink.textContent = districtRecords[i].District;
    districtNode.appendChild(districtNodeLink);
    districtMenuOptionObj.appendChild(districtNode);
}

function showHotDistrictSite(event){
    event.preventDefault();
    console.log(event.target.nodeName);
    if ( event.target.nodeName != "A" ){return;}
    console.log(event.target.textContent);
    districtSelected = event.target.textContent;
    currentPageNum = 1; //換選項後頁碼初始值一定要先設為1
    showDistrictSite();
}



// 動態產生頁碼
function showTotalPageMenu(){
    // var localStorageDataStr = localStorage.getItem("result");
    // var localStorageDataArray = JSON.parse(localStorageDataStr);
    var totalResultNum = 1;
    for ( var i=0; i<districtRecords.length; i++){
        if ( districtSelected == districtRecords[i].District ){
            totalResultNum = districtRecords[i].Count;
            break;
        }
    }
    // var totalResultNum = localStorageDataArray.length;
    var totalPageNum = parseInt(totalResultNum/recordnumPerPage);
    
    if ( totalResultNum%recordnumPerPage > 0 ){
        totalPageNum = totalPageNum+1;
    }
    
    var pageMenuStr = "";

    // 如果是第1頁，往上頁就不要有連結
    if ( currentPageNum == 1 ){
        pageMenuStr += "<li><a data-page='prev'>⟸</a></li>";
    } else {
        pageMenuStr += "<li><a href='#' class='pageMenuNum' data-page='prev'>⟸</a></li>";
    }

    for ( var i=1; i<=totalPageNum; i++){
        // 如果 i 跟現在頁面一樣，就不要有連結，且套用樣式讓使用者知道目前在那一頁
        if ( i == currentPageNum ){
            pageMenuStr += "<li><a class='showCurrentPage' data-page='"+i+"'>"+i+"</a></li>";
        } else {
            pageMenuStr += "<li><a href='#' class='pageMenuNum' data-page='"+i+"'>"+i+"</a></li>";
        }
    }

     // 如果是最後1頁，往下頁就不要有連結
    if ( currentPageNum == totalPageNum ){
        pageMenuStr += "<li><a data-page='next' >⟹</a></li>";
    } else {
        pageMenuStr += "<li><a href='#' class='pageMenuNum' data-page='next' >⟹</a></li>";
    }
    pageMenuObj.innerHTML = pageMenuStr;
}



//  點頁碼後的動作，並把現在頁碼設定成點到的頁碼值
function showDataPage(event){
    event.preventDefault();
    if ( event.target.nodeName != "A" ){return;}

    //如果點到的頁碼是現在的頁碼，後面就不做
    if ( event.target.dataset.page == currentPageNum ){return;}

    var totalResultNum = 1;
    for ( var i=0; i<districtRecords.length; i++){
        if ( districtSelected == districtRecords[i].District ){
            totalResultNum = districtRecords[i].Count;
            break;
        }
    }
    var totalPageNum = parseInt(totalResultNum/recordnumPerPage);
    console.log("未+1前的totalPageNum: "+totalPageNum);
      
    // 除於recordnumPerPage如果有餘數表示會跑到下一頁
    if ( totalResultNum%recordnumPerPage > 0 ){
        totalPageNum = totalPageNum+1;
    }

    // 點第1頁點往上就不處理，點最後1頁點往下就不處理
    if ( currentPageNum == 1 && event.target.dataset.page == "prev" ){return;}
    if ( currentPageNum == totalPageNum && event.target.dataset.page == "next" ){return;
    }
    
    // 點往上一頁就把頁碼-1 下一頁頁碼+1 都不是就設為點到的頁數
    if ( event.target.dataset.page == "prev"){
        currentPageNum = currentPageNum - 1;
    } else if ( event.target.dataset.page == "next"){
        currentPageNum = currentPageNum + 1;
    } else {
        currentPageNum = parseInt(event.target.dataset.page);
    }

    console.log("totalPageNum: "+totalPageNum);
    console.log("currentPageNum: "+currentPageNum);

    showDistrictSite();
}