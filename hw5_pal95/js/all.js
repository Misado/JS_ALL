
var boyElement = document.querySelector(".imgBoy");
//var boyElement = document.getElementById("imgBoy");
var girlElement = document.querySelector(".imgGirl");
var monsterlElement = document.querySelector(".imgMonster");
var bodyElement = document.body;
console.log(bodyElement.style.backgroundImage);

/*var bloodBoyElement = document.querySelector(".bloodBoy");
var bloodGirlElement = document.querySelector(".bloodGirl");*/
var bloodMonsterElement = document.querySelector(".bloodMonster");

document.addEventListener("animationend",positionCheck);

function positionCheck(event){
    //var boyPosition = event.targ
    console.log(event);
    //console.log(boyElement.);
    console.log("event.target.offsetLeft: "+event.target.offsetLeft);
    console.log("offsetTop: "+event.target.offsetTop);
    console.log("offsetLeft: "+event.target.offsetLeft);
    //console.log(boyElement.clientLeft);
    //this.textContent(this.style.top);
    var boyPosition = boyElement.clientLeft;
    var monsterPosition = monsterlElement.clientLeft;
    if ( boyPosition >= monsterPosition){
        console.log("碰到了！");
        //console.log(bodyElement.style);
         var str = "url('img/war04.png')";
         bodyElement.style.backgroundImage = str;
        //console.log(bodyElement.style.background-image.url);
        //console.log(event.target.parentNode.parentNode.style.backgroundImage);
        /*boyElement.setAttribute("class","hideRole");
        girlElement.setAttribute("class","hideRole");
        monsterlElement.setAttribute("class","hideRole");*/
        bodyElement.setAttribute("class","war");
        bloodMonsterElement.style.width = "100%";
        /*bloodBoyElement.style.width = "100%";
        bloodGirlElement.style.width = "100%";*/
    }
}

document.addEventListener("keydown",attackCheck);

function attackCheck(event){
    if ( event.keyCode == 49 ){
        console.log(event.keyCode);
        //console.log(bloodBoyElement);
        var bloodMonsterNum = bloodMonsterElement.style.width.split("%");
        console.log("bloodMonsterNum: "+parseInt(bloodMonsterNum[0]));
        //bloodMonsterNum -="20%";
        bloodMonsterNum = parseInt(bloodMonsterNum[0]);
        bloodMonsterNum -=20;
        var bloodMonsterNumPert = bloodMonsterNum+"%";
        console.log(bloodMonsterNum,bloodMonsterNumPert);
        bloodMonsterElement.style.width = bloodMonsterNumPert;
    }
    if ( bloodMonsterNum <= 0){
        console.log("沒血了！");
        document.removeEventListener("keydown",attackCheck);
    }
}

// check目前血量 帶血量id元素進去
function bloodCheck(bloodNumElement){
    var bloodBoyStatus =  bloodNumElement.textContent;
    console.log("bloodBoyStatus: "+bloodBoyStatus);
    bloodBoyStatus = parseInt(bloodBoyStatus.split("/")[0]);
    //bloodBoyStatus.textContent += "/100";*/
    console.log("bloodBoyStatus: "+bloodBoyStatus);
    var bloodBoyStatusTotal = bloodBoyStatus+"/100";
    bloodNumElement.textContent = bloodBoyStatusTotal;
}

var bloodNumElementBoy = document.getElementById("bloodNumBoy");
bloodCheck(bloodNumElementBoy);

var bloodNumElementGirl = document.getElementById("bloodNumGirl");
bloodCheck(bloodNumElementGirl);


var bloodNumElementMonster = document.getElementById("bloodNumMonster");
bloodCheck(bloodNumElementMonster);


