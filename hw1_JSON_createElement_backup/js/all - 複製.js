var player = [
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

    console.log(player[0].Speler);


function findLand(inputArray){
    var outputArray = [];
    var obj = [];
    var objAll = [];

    for ( var i=0; i < inputArray.length; i++){
    console.log("inputArray[i].Land obj[inputArray[i]]: "+inputArray[i].Land+" "+obj[inputArray[i].Land]);
        if ( !obj[inputArray[i].Land] ){
            obj[inputArray[i].Land] = 1;
            outputArray.push(inputArray[i].Land);
            objAll.push({Country:inputArray[i].Land,Count:obj[inputArray[i].Land]});
        }
        else{
            for (var j=0; j < objAll.length; j++){
                if( objAll[j].Country == inputArray[i].Land ){
                    objAll[j].Count += 1;
                }
            }
        }
    }

    //return outputArray;
    return objAll;
}

var countryList = findLand(player);
var objAll = findLand(player);

//console.log("countryList: "+countryList[0]);

/*for ( var i=0; i < countryList.length; i++){
    //console.log(player[i].Speler);
    //console.log("countryList: "+countryList[i]);
}*/

for ( var i=0; i < objAll.length; i++){
    //console.log(player[i].Speler);
    console.log("objAll: "+objAll[i].Country+" "+objAll[i].Count);
}
