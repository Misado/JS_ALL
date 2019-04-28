
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
    document.removeEventListener("keydown",attackCheck);
}

// check目前血量 帶血量id元素進去
function bloodCheck(bloodNumElement){
    var bloodStatus =  bloodNumElement.textContent;
    console.log("bloodStatus: "+bloodStatus);
    bloodStatus = parseInt(bloodStatus.split("/")[0]);
    //bloodBoyStatus.textContent += "/100";*/
    console.log("bloodStatus: "+bloodStatus);
    var bloodStatusTotal = bloodStatus+"/100";
    bloodNumElement.textContent = bloodStatusTotal;
    return bloodStatus;
}

var bloodNumElementBoy = document.getElementById("bloodNumBoy");
bloodCheck(bloodNumElementBoy);

var bloodNumElementGirl = document.getElementById("bloodNumGirl");
bloodCheck(bloodNumElementGirl);

var bloodNumElementMonster = document.getElementById("bloodNumMonster");
bloodCheck(bloodNumElementMonster);

var bloodActionElementBoy = document.getElementById("bloodActionNumBoy");
// attackActionBloodShow(bloodActionElementBoy,20);

var bloodActionElementGirl = document.getElementById("bloodActionNumGirl");
// attackActionBloodShow(bloodActionElementGirl,50);

var bloodActionElementMonster = document.getElementById("bloodActionNumMonster");
// attackActionBloodShow(bloodActionElementMonster,10);

// 攻擊血減少
function attackAction(bloodNumElement,bloodDecreaseNum){
    var bloodStatus =  bloodCheck(bloodNumElement);
    bloodStatus -=bloodDecreaseNum;
    var bloodStatusTotal = bloodStatus+"/100";
    bloodNumElement.textContent = bloodStatusTotal;
}


// 補血血增加
function protectAction(bloodNumElement,bloodDecreaseNum){
    var bloodStatus =  bloodCheck(bloodNumElement);
    bloodStatus +=bloodDecreaseNum;
    var bloodStatusTotal = bloodStatus+"/100";
    bloodNumElement.textContent = bloodStatusTotal;
}

//是否死亡確認
function deathCheck(bloodNumElement){
    var bloodStatus =  bloodCheck(bloodNumElement);
    if ( bloodStatus <=0 ){
        console.log("掛了");
        console.log(bloodNumElement);
    }
}

//一場戰鬥
function battleRound(event){
    if ( event.keyCode == 49 ){
        // attackAction(bloodNumElementMonster,20);
        // attackAction(bloodNumElementMonster,20);
        attackAction(bloodNumElementMonster,20);
        attackActionBloodShow(bloodActionElementMonster,-20);
        setTimeout(function() {
            attackAction(bloodNumElementGirl,60);
            attackActionBloodShow(bloodActionElementGirl,-60);

            attackAction(bloodNumElementBoy,15);
            attackActionBloodShow(bloodActionElementBoy,-15);
            
          }, 5000);
        

        
    }
    if ( event.keyCode == 50 ){
        protectAction(bloodNumElementGirl,70);
        attackActionBloodShow(bloodActionElementGirl,"+70");
    }
    deathCheck(bloodNumElementMonster);
    deathCheck(bloodNumElementGirl);
    document.removeEventListener("keydown",battleRound);
}

//battleRound();

document.addEventListener("keydown",battleRound);



function attackActionBloodShow(bloodActionElement,bloodDecreaseNum){
    //var bloodNum = bloodDecreaseNum;
    //var bloodActionBoy = document.getElementById("bloodActionNumBoy");

    bloodActionElement.textContent = bloodDecreaseNum;

    var bloodActionBoyClass = bloodActionElement.getAttribute("class");
    bloodActionElement.setAttribute("class",bloodActionBoyClass+" flash animated");
    //讓減少的血量晚點消失
      setTimeout(function() {
        bloodActionElement.textContent = "";
      }, 3000);
      
    
}

