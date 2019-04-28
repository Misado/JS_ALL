
var isVIP = false;
var myBill = 1999;
/*
var andCheck = isVIP && myBill > 1000;
console.log("andCheck: "+andCheck);
document.getElementById("andId").textContent = andCheck;

var orCheck = isVIP || myBill > 1000;
console.log("orCheck: "+orCheck);
document.getElementById("orId").textContent = orCheck;
*/

var sayYes = "我有哦";
var sayNo = "都沒有捏~";

if ( isVIP && myBill > 1000 ){
    document.getElementById("andId").textContent = sayYes;
} else{
    document.getElementById("andId").textContent = sayNo;
}

if ( isVIP || myBill > 1000 ){
    document.getElementById("orId").textContent = sayYes;
} else{
    document.getElementById("andId").textContent = sayNo;
}