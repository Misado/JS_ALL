var exchangeCalculatorObj = new Vue({
    el: "#exchangeCalculator",
    data: {
        inputMoney: 0,
        exchangeRate: [{Exrate: 30.938104,
            UTC: "2019-05-08 09:59:59"
            }],
            result: null,
    },
    created: function(){
        // this.getExchangeData();
    },
    computed: {
        calculateTWD: function () {
            this.result = this.inputMoney/this.exchangeRate[0].Exrate;
            return this.result;
        }
    },
    methods: {
        getExchangeData: function(){
            let self = this;
            // var xhr = new XMLHttpRequest();
            // xhr.open("GET","https://tw.rter.info/capi.php",true);
            // xhr.send();
            // xhr.onload = function(){
            //     // console.log(xhr.responseText);
            //     self.exchangeRate = JSON.parse(xhr.responseText);
            //     console.log(self.exchangeRate);
            //     console.log(self.exchangeRate.USDTWD.Exrate);
            // }
            let fso=new ActiveXObject(Scripting.FileSystemObject);
            let f=fso.opentextfile("../data/capi.json",1,true);
            self.exchangeRate = f.ReadAll();
            console.log(self.exchangeRate);
            // self.exchangeRate = JSON.parse(f.ReadAll());
            // console.log(self.exchangeRate);
        }
    }
});

function test(){
    console.log("TEST");
    var xhr = new XMLHttpRequest();
    xhr.open("GET","readLocal capi.json",true);
    xhr.send();
    xhr.onload = function(){
        console.log(xhr.responseText);
    }
};

test();