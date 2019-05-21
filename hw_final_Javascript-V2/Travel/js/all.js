
// ****** 主程式 ****** //

// 把高雄景點找出各區及數量
let districtRecords = findDistrict(kaoTravelSite);

// 顯示景點結果的地方
let siteBlockObj = document.querySelector(".siteBlock");
// 顯示現在是什麼區
let distrctTitleObj = document.getElementById("distrctTitle");

// 頁碼
let pageMenuObj = document.querySelector(".pageMenu");
pageMenuObj.addEventListener("click",showDataPage);

// 動態產生下拉式選單，先取得類別的下拉式選單
let districtList = document.getElementById("districtOption");
districtList.addEventListener("change",changeDistrictSite);

// 熱門行政區
let districtMenuOptionObj = document.querySelector(".districtMenuOption");
districtMenuOptionObj.addEventListener("click",showHotDistrictSite);

// 熱門行政區 class宣告
let hotClass =["firstHotClass","secondHotClass","thirdHotClass","fourthHotClass","fifthHotClass"];

// --- 給初始值 --- //
let recordnumPerPage = 8; //每頁要顯示的筆數
let currentPageNum = 1; //現在所在頁數
let districtSelected = "三民區"; //先給它一個預設值顯示結果

// 一開始根據初始值先顯示景點結果
showDistrictSite();

// 動態產生區域下拉式選單
for ( let i=0; i<districtRecords.length ;i++){
    let districtNode = document.createElement("option");
    districtNode.setAttribute("value",districtRecords[i].District);
    districtNode.textContent = districtRecords[i].District+"("+districtRecords[i].Count+")";
    districtList.appendChild(districtNode);
}

// 要做熱門TOP5，所以把陣列 照數量順序 排序
districtRecordsSort = districtRecords.sort(function (a, b) {
    return a.Count < b.Count ? 1 : -1;
});

// 動態產生熱門行政區
for ( let i=0; i<5; i++){
    let districtNode = document.createElement("li");
    let districtNodeLink = document.createElement("a");
    districtNode.setAttribute("class",hotClass[i]);
    districtNodeLink.setAttribute("href","#");
    districtNodeLink.textContent = districtRecords[i].District;
    districtNode.appendChild(districtNodeLink);
    districtMenuOptionObj.appendChild(districtNode);
}


// ****** 函式 ****** //

// 找出各區域並存次數
function findDistrict(inputArray){
    let outputArray = [];
    let obj = []; //虛擬存不同的區域字串
    let objAll = []; //存區域字串跟出現次數

    for ( let i=0; i < inputArray.length; i++){
        // distinct出不同區域
        if ( !obj[inputArray[i].Zone] ){
            obj[inputArray[i].Zone] = 1;
            outputArray.push(inputArray[i].Zone);
            objAll.push({District:inputArray[i].Zone,Count:obj[inputArray[i].Zone]});
        }
        else{
            //存區域跟次數
            for (let j=0; j < objAll.length; j++){
                if( objAll[j].District == inputArray[i].Zone ){
                    objAll[j].Count += 1;
                }
            }
        }
    }
    return objAll;
}


// 偵測選擇區域的值是否有改變，有改變就將現在區域的值改變
function changeDistrictSite(event){
    if ( event.target.value == 0){
        alert("請選擇行政區！");
        return;
    }
    districtSelected = event.target.value;
    currentPageNum = 1; //換選項後頁碼初始值一定要先設為1
    showDistrictSite();
}


// 顯示區域景點結果
function showDistrictSite(){

    // 要先找出所點到的區總共有幾筆資料，將 totalResultNum 設為該數量
    let totalResultNum;
    for ( let i=0; i<districtRecords.length; i++){
        if ( districtSelected == districtRecords[i].District ){
            totalResultNum = districtRecords[i].Count;
            break;
        }
    }

    // 存 處理到該區域的第幾筆了，初始值是1
    let recordCount = 1;
    // 因為有分頁數的關係，必須要知道該頁的起始點跟結束點
    let fromResultNum = (currentPageNum-1)*recordnumPerPage+1; //該頁的起始點
    let toResultNum = currentPageNum*recordnumPerPage; //該頁的結束點
    // 如果上面算出的結束點 > totalResultNum，就直接把結束點設為 totalResultNum
    if ( toResultNum >= totalResultNum){toResultNum = totalResultNum};
    
    distrctTitleObj.textContent = districtSelected; // 將區域標題改成現在的值

    let siteBlockObjStr = "";
    for ( let i=0; i<kaoTravelSite.length; i++){
            // 目前處理到該區域的筆數 > 總筆數，就跳出迴圈不做
            if ( recordCount > totalResultNum ) {
                break;
            }

            if ( kaoTravelSite[i].Zone == districtSelected ){
                // recordCount如果大於等於起始點 且 小於等於結束點才真的產生html
                if ( recordCount >= fromResultNum && recordCount <= toResultNum ){

                    //圖片網址這部份設定要用跳脫字元
                    let sitePicUrl = `style='background-image:url(&quot;${kaoTravelSite[i].Picture1}&quot;)'>`;
                    
                    siteBlockObjStr += "<li>";
                    siteBlockObjStr += `<div class='sitePic' ${sitePicUrl}<div class='sitePicMask'><h3>${kaoTravelSite[i].Name}</h3><p>${kaoTravelSite[i].Zone}</p></div></div>`;
                    siteBlockObjStr += "<div class='siteInfo'>";
                    siteBlockObjStr += `<img src='img/icons_clock.png'><span>${kaoTravelSite[i].Opentime}</span><br>`;
                    siteBlockObjStr += `<img src='img/icons_pin.png'><span>${kaoTravelSite[i].Add}</span><br>`;
                    siteBlockObjStr += `<img src='img/icons_phone.png'><span>${kaoTravelSite[i].Tel}</span><br>`;
                    siteBlockObjStr += "</div>";
                    siteBlockObjStr += `<div class='tagInfo'><img src='img/icons_tag.png'><span>${kaoTravelSite[i].Ticketinfo}</span></div>`;
                    siteBlockObjStr += "</li>";
                } 
                recordCount += 1; //只要有符合區域 recordCount+1
            }
    }
    siteBlockObj.innerHTML = siteBlockObjStr;
    showTotalPageMenu();
}


// 點選熱門行政區後的行為：現在所點的區域要改變，頁數設為第1頁
function showHotDistrictSite(event){
    event.preventDefault();
    if ( event.target.nodeName != "A" ){return;}
    districtSelected = event.target.textContent;
    currentPageNum = 1; //換選項後頁碼初始值一定要先設為1
    showDistrictSite();
}


// 動態產生頁碼
function showTotalPageMenu(){
    let totalResultNum;
    // 把總筆數設為該區域的筆數
    for ( let i=0; i<districtRecords.length; i++){
        if ( districtSelected == districtRecords[i].District ){
            totalResultNum = districtRecords[i].Count;
            break;
        }
    }
    // 算出總頁數
    let totalPageNum = parseInt(totalResultNum/recordnumPerPage);
    
    // 如果總筆數除以每頁顯示筆數>0 表示有餘數 會多一頁
    if ( totalResultNum%recordnumPerPage > 0 ){
        totalPageNum = totalPageNum+1;
    }
    
    let pageMenuStr = "";

    // 如果是第1頁，往上頁就不要有連結
    if ( currentPageNum == 1 ){
        pageMenuStr += "<li><a data-page='prev'>⟸</a></li>";
    } else {
        pageMenuStr += "<li><a href='#' class='pageMenuNum' data-page='prev'>⟸</a></li>";
    }

    for ( let i=1; i<=totalPageNum; i++){
        // 如果 i 跟現在頁面一樣，就不要有連結，且套用樣式讓使用者知道目前在那一頁
        if ( i == currentPageNum ){
            pageMenuStr += `<li><a class='showCurrentPage' data-page='${i}'>${i}</a></li>`;
        } else {
            pageMenuStr += `<li><a href='#' class='pageMenuNum' data-page='${i}'>${i}</a></li>`;
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

    let totalResultNum = 1;
    for ( let i=0; i<districtRecords.length; i++){
        if ( districtSelected == districtRecords[i].District ){
            totalResultNum = districtRecords[i].Count;
            break;
        }
    }
    let totalPageNum = parseInt(totalResultNum/recordnumPerPage);
      
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
    
    showDistrictSite();
}