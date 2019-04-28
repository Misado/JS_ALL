var total;

function greet(){
    console.log('Hello');
    console.log('請問您想要點什麼？');
    var greetWords = "Hello, 請問您想要點什麼？";
    document.getElementById("greetId").textContent = greetWords;
}

function order(hamNum,colaNum){
    var orderWords = "我要"+hamNum+"個漢堡，還有"+colaNum+"杯可樂";
    document.getElementById("orderId").textContent = orderWords;
    var totalPrice = hamNum * 50 + colaNum * 20;
    total = totalPrice; //表示是外面的全域變數宣告為totalPrice的值
    var summaryWords = "一共是"+totalPrice+"元";
    document.getElementById("totalId").textContent = summaryWords;
}



greet();
order(3,5);

console.log(total);