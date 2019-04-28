var data = [{"schoolId":"124X9J","degree":1,"dist":107,"schoolName":"鳥松幼兒園"},{"schoolId":"124X9I","degree":1,"dist":105,"schoolName":"仁武幼兒園"},{"schoolId":"124X9H","degree":1,"dist":103,"schoolName":"大寮幼兒園"},{"schoolId":"124672","degree":3,"dist":206,"schoolName":"北嶺國小"},{"schoolId":"124X9S","degree":1,"dist":309,"schoolName":"桃源幼兒園"},{"schoolId":"124673","degree":3,"dist":206,"schoolName":"一甲國小"},{"schoolId":"573502","degree":4,"dist":2,"schoolName":"七賢國中"},{"schoolId":"124X9R","degree":1,"dist":307,"schoolName":"那瑪夏幼兒園"},{"schoolId":"124670","degree":3,"dist":206,"schoolName":"竹滬國小"},{"schoolId":"573501","degree":4,"dist":7,"schoolName":"前金國中"},{"schoolId":"124X9Q","degree":1,"dist":308,"schoolName":"茂林幼兒園"},{"schoolId":"124550","degree":4,"dist":101,"schoolName":"鳳翔國中"},{"schoolId":"124671","degree":3,"dist":206,"schoolName":"三埤國小"},{"schoolId":"124X9P","degree":1,"dist":305,"schoolName":"內門幼兒園"},{"schoolId":"124X9M","degree":1,"dist":207,"schoolName":"湖內幼兒園"},{"schoolId":"124X9L","degree":1,"dist":206,"schoolName":"路竹幼兒園"},{"schoolId":"124548","degree":4,"dist":309,"schoolName":"桃源國中"},{"schoolId":"124669","degree":3,"dist":206,"schoolName":"下坑國小"},{"schoolId":"124549","degree":4,"dist":101,"schoolName":"中崙國中"},{"schoolId":"124546","degree":4,"dist":201,"schoolName":"嘉興國中"},{"schoolId":"124667","degree":3,"dist":206,"schoolName":"路竹國小"},{"schoolId":"124547","degree":4,"dist":308,"schoolName":"茂林國中"},{"schoolId":"124668","degree":3,"dist":206,"schoolName":"大社國小"},{"schoolId":"124302","degree":12,"dist":107,"schoolName":"文山高中"},{"schoolId":"124544","degree":4,"dist":206,"schoolName":"一甲國中"},{"schoolId":"124665","degree":3,"dist":205,"schoolName":"中路國小"},{"schoolId":"124545","degree":4,"dist":105,"schoolName":"大灣國中"},{"schoolId":"124666","degree":3,"dist":205,"schoolName":"復安國小"},{"schoolId":"124542","degree":4,"dist":307,"schoolName":"那瑪夏國中"},{"schoolId":"124543","degree":4,"dist":101,"schoolName":"青年國中"}];

//console.log("test: "+data[0].schoolName);

//console.log("數量: "+data.length);

var patternElementary = new RegExp("國小$");
var patternHighSchool = new RegExp("高中$");
var listElementary = [];
var listHighSchool = [];

for ( var i = 0 ; i < data.length ; i++ ){
    //console.log("第"+(i+1)+"間學校是"+data[i].schoolName);
    /*if ( data[i].degree >= 3){
        console.log(">>"+data[i].schoolName+"為重要學校");
    }*/
    if ( data[i].schoolName.match(patternElementary) ){
        //console.log("國小有: "+data[i].schoolName);
        listElementary.push(data[i].schoolName);
    }
    if ( data[i].schoolName.match(patternHighSchool) ){
        listHighSchool.push(data[i].schoolName);
        
    }
}

var listString = "高雄市國小有：";
for ( var j = 0 ; j < listElementary.length ; j++ ){
    listString += listElementary[j]+", ";
}
console.log(listString);

console.log("---------");

listString = "高雄市高中有：";
for ( var j = 0 ; j < listHighSchool.length ; j++ ){
    listString += listHighSchool[j]+", ";
}

console.log(listString);