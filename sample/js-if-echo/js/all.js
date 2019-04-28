var sayYes = "對哦~";
var sayNo = "嗯係哦~";

function sayBirthAnswer(response){
    if ( response == true ){
        document.getElementById("birthdayId").textContent = sayYes;
    } else{
        document.getElementById("birthdayId").textContent = sayNo;
    }
}
function sayPeopleAnswer(response){
    if ( response == true ){
        document.getElementById("peopleId").textContent = sayYes;
    } else{
        document.getElementById("peopleId").textContent = sayNo;
    }
}

var canEat = "我要吃~";
var cannotEat = "我現在飽到爆炸，什麼也不想吃";

function hungryCheck(hungryDegree){
    var foodEat = foodOrder(hungryDegree);
    if ( hungryDegree <= 3 ){
        document.getElementById("foodId").textContent = canEat + foodEat;
    } else if ( hungryDegree > 3 && hungryDegree <= 7 ){
        document.getElementById("foodId").textContent = canEat + "早午餐就好";
    } else{
        document.getElementById("foodId").textContent = cannotEat;
    }
}

function foodOrder(hungryDegree){
    switch(hungryDegree){
        case 1:
            return foodPrefer = "牛排";
            break;
        case 2:
            return foodPrefer = "漢堡";
            break;
        default:
            return foodPrefer = "雞塊";
            break;
    }

}

var thisMonth = 4;
var myBirthMonth = 12;

var birthMonthCheck = thisMonth == myBirthMonth;
console.log("birthMonthCheck: ",birthMonthCheck);
//document.getElementById("birthdayId").textContent = birthMonthCheck;
sayBirthAnswer(birthMonthCheck);

var nowPeople = 1 ;
var reservePeople = 2 ;

var allComeHereCheck = nowPeople !== reservePeople;
console.log("allComeHereCheck: ",allComeHereCheck);
//document.getElementById("peopleId").textContent = allComeHereCheck;
sayPeopleAnswer(allComeHereCheck);

var hungryDegree = 3;

hungryCheck(hungryDegree);