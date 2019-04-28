var battleFinishCheck = false;


var boyElement = document.querySelector(".imgBoy");
//var boyElement = document.getElementById("imgBoy");
var girlElement = document.querySelector(".imgGirl");
var monsterlElement = document.querySelector(".imgMonster");
var bodyElement = document.body;
console.log(bodyElement.style.backgroundImage);

var warMenuElement = document.querySelector("#warMenuId");
var messageElement = document.querySelector(".message");

/*var bloodBoyElement = document.querySelector(".bloodBoy");
var bloodGirlElement = document.querySelector(".bloodGirl");*/
var bloodMonsterElement = document.querySelector(".bloodMonster");

var snd = new Audio("mp3/battle02.mp3");
snd.volume = 0.7;
snd.loop = false; //設定循環播放
snd.autoplay = true;




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
         var str = "url('img/war05.png')";
         bodyElement.style.backgroundImage = str;
        //console.log(bodyElement.style.background-image.url);
        //console.log(event.target.parentNode.parentNode.style.backgroundImage);
        /*boyElement.setAttribute("class","hideRole");
        girlElement.setAttribute("class","hideRole");
        monsterlElement.setAttribute("class","hideRole");*/
        bodyElement.setAttribute("class","war");
        //bloodMonsterElement.style.width = "100%";
        /*bloodBoyElement.style.width = "100%";
        bloodGirlElement.style.width = "100%";*/
        warMenuElement.setAttribute("class","warMenu battleIng");
        monsterlElement.style.top = "240px"; 
        // var snd = new Audio("mp3/battle02.mp3");
        // snd.loop = true; //設定循環播放
        //snd.autoplay = true;
        // if ( snd.autoplay == false ){
        //     console.log("snd.src:" +snd.src);
        //     console.log("snd.autoplay:" +snd.autoplay);
        //     snd.autoplay = true;
        // }

        //var body = document.querySelector("body");
        // bodyElement.appendChild(snd);

        console.log("snd.src:" +snd.src);
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
        /*messageElement.style.display = "block";*/
        return true;
    }
    return false;
}

//一場戰鬥
function battleRound(event){
    battleFinishCheck = false;
    if (battleFinishCheck == false){
        if ( event.keyCode == 49 ){
            // attackAction(bloodNumElementMonster,20);
            // attackAction(bloodNumElementMonster,20);
            attackAction(bloodNumElementMonster,20);
            attackActionBloodShow(bloodActionElementMonster,-20);
            bloodShowMonster(bloodNumElementMonster);
            
            

            
        }
        if ( event.keyCode == 50 ){
            protectAction(bloodNumElementGirl,70);
            attackActionBloodShow(bloodActionElementGirl,"+70");
        }
        console.log("deathMonster: "+deathMonster);
        deathMonster = deathCheck(bloodNumElementMonster);
        if ( deathMonster == false ){
            warMenuElement.style.display = "none";
            document.removeEventListener("keydown",battleRound);
            console.log("removeEventListener");
            //攻擊/補血後換怪攻擊要晚點觸發
            setTimeout(function() {
                attackAction(bloodNumElementGirl,25);
                attackActionBloodShow(bloodActionElementGirl,-25);

                attackAction(bloodNumElementBoy,15);
                attackActionBloodShow(bloodActionElementBoy,-15);
                deathCheck(bloodNumElementMonster);
                deathCheck(bloodNumElementGirl);
            }, 4000);
        } else{
            document.removeEventListener("keydown",battleRound);
            warMenuElement.style.display = "none";
            // monsterlElement.setAttribute("class",monsterlElement.getAttribute("class")+" animated fadeOut");
            setTimeout(function() {
                monsterlElement.setAttribute("class","animated fadeOutDown");
            },3500);
            
            setTimeout(function() {
            var messageSuccess1EL1 = document.querySelector(".messageSuccess1");
            var messageSuccess1EL2 = document.querySelector(".messageSuccess2");
            messageSuccess1EL1.style.display = "block";
            messageSuccess1EL2.style.display = "block";
            messageSuccess1EL1.setAttribute("class", messageSuccess1EL1.getAttribute("class")+" animated pulse");
            messageSuccess1EL2.setAttribute("class", messageSuccess1EL2.getAttribute("class")+" animated pulse");
            
            snd.src = "mp3/victory.mp3";
            snd.volume = 1;
            return;
            }, 4000);
        }
        
        // setTimeout(function() {
        //     warMenuElement.setAttribute("class","warMenu");
        //     console.log("HI");
        //     console.log("warMenuElement class:" +warMenuElement.getAttribute("class"));
        // }, 6000);
        
        // battleIngCheck = 1;
        battleFinishCheck = true;
    }
}

//battleRound();
console.log("第一回合");
document.addEventListener("keydown",battleRound);


setTimeout(exec, 10000);
setTimeout(exec, 20000);
setTimeout(exec, 30000);

// setTimeout(10000,function(){
//     for ( var i=1; i<=2; i++){
//         console.log("第"+i+"個 battleFinishCheck = "+battleFinishCheck);
//         if ( battleFinishCheck == true ){
//             console.log("第"+i+"個 battleFinishCheck = "+battleFinishCheck);
//                 setTimeout(exec, 10000*i);
//             }
//     }
// })

var deathMonster = false;
function exec() {
    deathMonster = deathCheck(bloodNumElementMonster);
    
    if ( battleFinishCheck == true && deathMonster == false ){
        console.log("第二回合");
        console.log("addEventListener");
        warMenuElement.style.display = "block";
        document.addEventListener("keydown",battleRound);
        
        
            snd.autoplay = true;

        
    }
}

// setTimeout(function() {
//     console.log("第三回合");
//     console.log("addEventListener");
//     warMenuElement.style.display = "block";
//     document.addEventListener("keydown",battleRound);
// }, 20000);


function attackActionBloodShow(bloodActionElement,bloodDecreaseNum){
    //var bloodNum = bloodDecreaseNum;
    //var bloodActionBoy = document.getElementById("bloodActionNumBoy");

    bloodActionElement.textContent = bloodDecreaseNum;

    var bloodActionBoyClass = bloodActionElement.getAttribute("class");
    bloodActionElement.setAttribute("class",bloodActionBoyClass+" flash animated");
    //讓減少的血量晚點消失
      setTimeout(function() {
        bloodActionElement.textContent = "";
        
        bloodActionElement.setAttribute("class",bloodActionBoyClass);
      }, 3000);
      
    
}

function bloodShowMonster(bloodNumElement){
    var bloodNum = bloodCheck(bloodNumElement);
    console.log("bloodNum" +bloodNum);
    bloodMonsterElement.style.width = bloodNum+"%";
    //bloodMonsterElement.style.width = "10%";
}

bloodShowMonster(bloodNumElementMonster);