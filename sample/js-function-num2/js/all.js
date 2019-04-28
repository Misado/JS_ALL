/*document.getElementById("countId").onclick = function(){
    var hamPrice = 50;
    var cokePrice = 20;
    var hamNum = parseInt(document.getElementById("hamNumId").value);
    var cokeNum = parseInt(document.getElementById("cokeNumId").value);

    //console.log("hanNum: "+hanNum+"cokeNum: "+cokeNum);
    //console.log("hanNum+cokeNum: ",hanNum+cokeNum);
    //console.log(typeof(hanNum));

    var hamTotal = hamPrice * hamNum;
    var cokeTotal = cokePrice * cokeNum;

    var sumPrice = hamTotal + cokeTotal;

    document.getElementById("totalId").textContent = sumPrice;
}*/


function getTotalPrice(hamNum,cokeNum){
    var hamPrice = 50;
    var cokePrice = 30;

    var hamTotal = hamPrice * hamNum;
    var cokeTotal = cokePrice * cokeNum;

    var sumPrice = hamTotal + cokeTotal;

    return sumPrice;
}

document.getElementById("countId").onclick = function(){
    var hamNumKeyIn = parseInt(document.getElementById("hamNumId").value);
    var cokeNumKeyIn = parseInt(document.getElementById("cokeNumId").value);
    document.getElementById("totalId").textContent = getTotalPrice(hamNumKeyIn,cokeNumKeyIn);
}