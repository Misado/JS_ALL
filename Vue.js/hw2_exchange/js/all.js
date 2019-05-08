var exchangeCalculatorObj = new Vue({
    el: "#exchangeCalculator",
    data: {
        // 先給預設值
        inputMoney: 0, // 輸入金額
        result: 0, // 計算結果
        currentCountry: "美金", // 幣值，預設為美金
        currentCurrency: 30.865, // 匯率，預設為美金的匯率
        exchangeRate: [ // 各國匯率資料
            {"Country":"美金","buyIn":"30.495","sellOut":"30.865"},
            {"Country":"港幣","buyIn":"3.772","sellOut":"3.908"},
            {"Country":"英鎊","buyIn":"39.13","sellOut":"40.13"},
            {"Country":"澳幣","buyIn":"21.32","sellOut":"21.59"},
            {"Country":"加拿大幣","buyIn":"22.47","sellOut":"22.86"},
            {"Country":"新加坡幣","buyIn":"22.15","sellOut":"22.64"},
            {"Country":"瑞士法郎","buyIn":"29.56","sellOut":"30.22"},
            {"Country":"日圓","buyIn":"0.2715","sellOut":"0.2788"},
            {"Country":"瑞典幣","buyIn":"2.85","sellOut":"3.19"},
            {"Country":"紐元","buyIn":"19.91","sellOut":"20.29"},
            {"Country":"泰幣","buyIn":"0.8493","sellOut":"0.9579"},
            {"Country":"菲國比索","buyIn":"0.5198","sellOut":"0.6541"},
            {"Country":"印尼幣","buyIn":"0.00183","sellOut":"0.00253"},
            {"Country":"歐元","buyIn":"33.83","sellOut":"34.45"},
            {"Country":"韓元","buyIn":"0.0247","sellOut":"0.02859"},
            {"Country":"越南盾","buyIn":"0.00095","sellOut":"0.00145"},
            {"Country":"馬來幣","buyIn":"6.36","sellOut":"7.992"},
            {"Country":"人民幣","buyIn":"4.457","sellOut":"4.529"}
        ],
    },
    computed: {
        calculateMoney: function () {
            // 計算完兌換的幣值後，小數點取到第2位，存到結果
            this.result = parseFloat(this.inputMoney/this.currentCurrency).toFixed(2);
            return this.result;
        }
    },
    methods: {
        getCurrentData: function(item){
            // 將國家(幣值)及匯率設定成點到的國家(幣值)及對應的匯率
            this.currentCountry = item.Country;
            this.currentCurrency = item.sellOut;
        },
        changeClass: function(item){
            // 將點到的class設為active
            if ( item.Country == this.currentCountry ){
                return "active";
            }
        }
    }
});

