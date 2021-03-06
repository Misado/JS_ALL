var wsPlayer = [
    {"Rank":"1","Land":"Taiwan","Speler":"TAI Tzu Ying","Lidnummer":"61427","Punten":"97867","Toernooien":"16","Confederation":"Asia"},
    {"Rank":"2","Land":"Japan","Speler":"Nozomi OKUHARA","Lidnummer":"96713","Punten":"88800","Toernooien":"20","Confederation":"Asia"},
    {"Rank":"3","Land":"China","Speler":"CHEN Yufei","Lidnummer":"78778","Punten":"88779","Toernooien":"16","Confederation":"Asia"},
    {"Rank":"4","Land":"Japan","Speler":"Akane YAMAGUCHI","Lidnummer":"96312","Punten":"83943","Toernooien":"19","Confederation":"Asia"},
    {"Rank":"5","Land":"Spain","Speler":"Carolina MARIN","Lidnummer":"18228","Punten":"77000","Toernooien":"10","Confederation":"Europe"},
    {"Rank":"6","Land":"India","Speler":"PUSARLA V. Sindhu","Lidnummer":"73173","Punten":"76740","Toernooien":"17","Confederation":"Asia"},
    {"Rank":"7","Land":"China","Speler":"HE Bingjiao","Lidnummer":"87434","Punten":"74177","Toernooien":"15","Confederation":"Asia"},
    {"Rank":"8","Land":"Thailand","Speler":"Ratchanok INTANON","Lidnummer":"35642","Punten":"73547","Toernooien":"20","Confederation":"Asia"},
    {"Rank":"9","Land":"India","Speler":"Saina NEHWAL","Lidnummer":"52748","Punten":"69254","Toernooien":"16","Confederation":"Asia"},
    {"Rank":"10","Land":"Korea","Speler":"SUNG Ji Hyun","Lidnummer":"76594","Punten":"62076","Toernooien":"19","Confederation":"Asia"},
    {"Rank":"11","Land":"U.S.A.","Speler":"Beiwen ZHANG","Lidnummer":"53806","Punten":"57560","Toernooien":"17","Confederation":"Pan America"},
    {"Rank":"12","Land":"China","Speler":"HAN Yue","Lidnummer":"92967","Punten":"53686","Toernooien":"20","Confederation":"Asia"},
    {"Rank":"13","Land":"Japan","Speler":"Sayaka TAKAHASHI","Lidnummer":"34890","Punten":"52507","Toernooien":"19","Confederation":"Asia"},
    {"Rank":"14","Land":"China","Speler":"LI Xuerui","Lidnummer":"64643","Punten":"52182","Toernooien":"15","Confederation":"Asia"},
    {"Rank":"15","Land":"Canada","Speler":"Michelle LI","Lidnummer":"84523","Punten":"51571","Toernooien":"23","Confederation":"Pan America"},
    {"Rank":"16","Land":"Indonesia","Speler":"Gregoria Mariska TUNJUNG","Lidnummer":"83802","Punten":"50790","Toernooien":"17","Confederation":"Asia"},
    {"Rank":"17","Land":"China","Speler":"CAI Yanyan","Lidnummer":"89700","Punten":"49673","Toernooien":"23","Confederation":"Asia"},
    {"Rank":"18","Land":"Denmark","Speler":"Line Hojmark KJAERSFELDT","Lidnummer":"63437","Punten":"49543","Toernooien":"18","Confederation":"Europe"},
    {"Rank":"19","Land":"Japan","Speler":"Aya OHORI","Lidnummer":"95189","Punten":"48204","Toernooien":"20","Confederation":"Asia"},
    {"Rank":"20","Land":"Thailand","Speler":"Pornpawee CHOCHUWONG","Lidnummer":"84062","Punten":"48192","Toernooien":"18","Confederation":"Asia"},
    {"Rank":"21","Land":"Denmark","Speler":"Mia BLICHFELDT","Lidnummer":"91224","Punten":"48069","Toernooien":"18","Confederation":"Europe"},
    {"Rank":"22","Land":"China","Speler":"GAO Fangjie","Lidnummer":"78116","Punten":"46476","Toernooien":"14","Confederation":"Asia"},
    {"Rank":"23","Land":"China","Speler":"CHEN Xiaoxin","Lidnummer":"58637","Punten":"46180","Toernooien":"18","Confederation":"Asia"},
    {"Rank":"24","Land":"Thailand","Speler":"Busanan ONGBAMRUNGPHAN","Lidnummer":"58271","Punten":"45069","Toernooien":"20","Confederation":"Asia"},
    {"Rank":"25","Land":"Scotland","Speler":"Kirsty GILMOUR","Lidnummer":"48528","Punten":"43095","Toernooien":"15","Confederation":"Europe"}
    ];

function findLand(inputArray){
    var outputArray = [];
    var obj = []; //虛擬存不同的國家字串
    var objAll = []; //存國家字串跟出現次數

    for ( var i=0; i < inputArray.length; i++){
        // distinct出不同國家
        if ( !obj[inputArray[i].Land] ){
            obj[inputArray[i].Land] = 1;
            outputArray.push(inputArray[i].Land);
            objAll.push({Country:inputArray[i].Land,Count:obj[inputArray[i].Land]});
        }
        else{
            //存國家跟次數
            for (var j=0; j < objAll.length; j++){
                if( objAll[j].Country == inputArray[i].Land ){
                    objAll[j].Count += 1;
                }
            }
        }
    }
    return objAll;
}

//當選項改變時就將該國的選手顯示出來
function countryShow(event){
    var pageElement = document.getElementById("playerList");
    var pageString = "";
    if ( event.target.value == 0){
        var pageString = "請選擇國家名字！";
        pageElement.innerHTML = pageString;
    } else {
        for (var i=0; i<wsPlayer.length; i++){
            if ( event.target.value == wsPlayer[i].Land ){
                pageString += "<li data-order='"+i+"' data-point='"+wsPlayer[i].Punten+"'>"+wsPlayer[i].Speler+"</li>";
            }
        }
        pageElement.innerHTML = pageString;
    }
}

var objAll = findLand(wsPlayer);

var countryList = document.querySelector("#countryId");
// var countryNode = document.createElement("option");
// countryNode.textContent = "台灣";
// countryList.appendChild(countryNode);

//動態產生國家下拉式選單
for (var i=0; i<objAll.length; i++){
    //console.log(objAll[i].Country+objAll[i].Count);
    var countryNode = document.createElement("option");
    countryNode.setAttribute("value",objAll[i].Country);
    countryNode.textContent = objAll[i].Country;
    countryList.appendChild(countryNode);
}

//當選項改變時就執行countryShow
countryList.addEventListener("change",countryShow);



document.getElementById("submutBtn").onclick = function(){
    //取得輸入的項目
    //var selectItem = parseInt(document.getElementById("selectItem").value);
    var selectItem = parseInt(document.getElementById("selectItem").value);
    var pageString = "";
    var pageElement;
    switch(selectItem){
        case 1:
            pageString = "<tr><th>名次</th><th>選手</th><th>差距(分)</th></tr>";
            for ( var i=1; i < wsPlayer.length; i++){
                var diffScore = wsPlayer[0].Punten - wsPlayer[i].Punten;
                //document.write("<table style=\"border-bottom: 1px solid #000\"><tr><td>"+wsPlayer[i].Speler+" 跟 "+wsPlayer[0].Speler+" 差距： "+"</td><td>"+diffScore+" 分</td></tr></table>");
                pageString += "<tr><td>"+wsPlayer[i].Rank+"</td>"+"<td>"+wsPlayer[i].Speler+"</td><td>"+diffScore+"</td></tr>";
            }
            pageElement = document.getElementById("diffScroreResult");
            pageElement.innerHTML = pageString;
            break;
        case 2:
            pageString = "<tr><th>國家</th><th>選手數(人)</th></tr>";
            for ( var i=0; i < objAll.length; i++){
                //document.write("<table style=\"border-bottom: 1px solid #000\"><tr><td>"+objAll[i].Country+" 有：</td><td>"+objAll[i].Count+" 人</td></tr></table>");
                pageString+="<tr><td data-num='"+i+"'>"+objAll[i].Country+"</td><td>"+objAll[i].Count+"</td></tr>";
            }
            pageElement = document.getElementById("countryResult");
            pageElement.innerHTML = pageString;
            break;
        case 3:
            //var countryInput = document.getElementById("countryInput").value;
            
            // if ( countryInput != "" ){ 
            //     pageString = countryInput+" 選手有：";
            //     for ( var i=0; i < wsPlayer.length; i++){
            //         if ( wsPlayer[i].Land == countryInput){
            //             pageString += "<li>"+wsPlayer[i].Speler+"</li>" ;
            //         }
            //     }
            // } else{
            //     pageString = "請選擇國家名字！";
            // }
            pageElement = document.getElementById("playerList");
            pageString = "請選擇國家名字！";
            pageElement.innerHTML = pageString;
            break;
        default:
            document.getElementById("selectMsg").textContent = "輸入有誤請再輸入一次!!!";
            break;
    }
}

var selectElement = document.querySelector("#selectItem");
selectElement.addEventListener("blur",selectCheck);

function selectCheck(event){
    var selectItem = parseInt(document.getElementById("selectItem").value);
    if ( selectItem == 3){
        alert("請記得到下面選擇國家，方可正常顯示結果！");
    }
}


var playerListElement = document.querySelector("#playerList");
playerListElement.addEventListener("click",showPoint);

function showPoint(event){
    console.log(event.target.nodeName);
    if ( event.target.nodeName !="LI" ){return;}
    console.log(event.target.textContent+" 分數是: "+event.target.dataset.point)
}

console.log(objAll);

var pageElement = document.getElementById("countryResult");
pageElement.addEventListener("click",removeCountry);

function removeCountry(event){
    var pageString ="";
    pageString = "<tr><th>國家</th><th>選手數(人)</th></tr>";
    console.log(event.target.nodeName);
    if ( event.target.nodeName != "TD" ){return;}
    var countryNum = event.target.dataset.num;
    console.log(countryNum);
    objAll.splice(countryNum,1);
    for ( var i=0; i < objAll.length; i++){
        //document.write("<table style=\"border-bottom: 1px solid #000\"><tr><td>"+objAll[i].Country+" 有：</td><td>"+objAll[i].Count+" 人</td></tr></table>");
        pageString+="<tr><td data-num='"+i+"'>"+objAll[i].Country+"</td><td>"+objAll[i].Count+"</td></tr>";
    }
    pageElement = document.getElementById("countryResult");
    pageElement.innerHTML = pageString;
}