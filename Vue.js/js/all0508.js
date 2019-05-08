
var NTD = new Vue({
    el: ".app",
    data: {
        NTD: 100,
    },
    computed: {
        changeJapan: function(){
            return this.NTD/0.2717;
        },
        changeAmerica: function(){
            return this.NTD/30.495;
        },
        updateTime: function(){
            let total = this.NTD;
            // 取得現在時間
            let nowTime = new Date();
            let nowTimeHour = nowTime.getHours();
            nowTimeHour = JSON.stringify(nowTimeHour); //要轉字串才能知道長度
            let nowTimeMin = nowTime.getMinutes();
            nowTimeMin = JSON.stringify(nowTimeMin); //要轉字串才能知道長度
            let nowTimeSec = nowTime.getSeconds();
            nowTimeSec = JSON.stringify(nowTimeSec); //要轉字串才能知道長度

            // 時/分/秒如果只有1碼前面補0
            if ( nowTimeHour.length === 1 ){ nowTimeHour = "0"+nowTimeHour; }
            if ( nowTimeMin.length === 1 ){ nowTimeMin = "0"+nowTimeMin; }
            if ( nowTimeSec.length === 1 ){ nowTimeSec = "0"+nowTimeSec; }
            let currentDateTime = nowTimeHour+":"+nowTimeMin+":"+nowTimeSec;

            return currentDateTime;
        }
    }
});

var myVue = new Vue({
    el: ".test",
    data: {
        a: "A內容",
    },
    computed: {
        updateTime: function(){
            // let total = this.NTD;
            // 取得現在時間
            let nowTime = new Date();
            let nowTimeHour = nowTime.getHours();
            nowTimeHour = JSON.stringify(nowTimeHour); //要轉字串才能知道長度
            let nowTimeMin = nowTime.getMinutes();
            nowTimeMin = JSON.stringify(nowTimeMin); //要轉字串才能知道長度
            let nowTimeSec = nowTime.getSeconds();
            nowTimeSec = JSON.stringify(nowTimeSec); //要轉字串才能知道長度

            // 時/分/秒如果只有1碼前面補0
            if ( nowTimeHour.length === 1 ){ nowTimeHour = "0"+nowTimeHour; }
            if ( nowTimeMin.length === 1 ){ nowTimeMin = "0"+nowTimeMin; }
            if ( nowTimeSec.length === 1 ){ nowTimeSec = "0"+nowTimeSec; }
            let currentDateTime = nowTimeHour+":"+nowTimeMin+":"+nowTimeSec;

            return currentDateTime;
        },
    },
    beforeCreate: function(){
        console.log(new Date());
        console.log("屬性未載入前");
        console.log(this.a);
        console.log(this.updateTime);
    },
    created: function (){
        console.log(new Date());
        console.log("資料 $data 已可取得，但 $el 屬性還未被建立");
        console.log(this.a);
        console.log(this.updateTime);
    },
    beforeMount: function(){
        console.log(new Date());
        console.log("還沒抓到 el 資料");
        console.log(this.a);
        console.log(this.updateTime);
    },
    mounted: function(){
        console.log(new Date());
        console.log("已掛上 DOM，並取得 el 資料");
        console.log(this.a);
        console.log(this.updateTime);
    }
});


var reposCommitVue = new Vue({
    el: ".reposCommit",
    data: {
        apiURL: "https://api.github.com/repos/Misado/JS_ALL/commits?per_page=3&sha=",
        apiBranchURL: "https://api.github.com/repos/Misado/JS_ALL/branches",
        // branches: ["master","hw_vue_v1"],
        branches: [],
        currentBranch: "master",
        commits: null,
    },
    created: function(){
        this.fetchData();
        this.branchGet();
    },
    watch: {
        currentBranch: 'fetchData'
      },
    methods: {
        fetchData: function(){
            let self = this;
            let xhr = new XMLHttpRequest();
            xhr.open("GET",self.apiURL+self.currentBranch,true);
            // xhr.setRequestHeader("Content-type","application/json");
            xhr.send();
            xhr.onload = function(){
                // console.log(xhr.response);
                // self.commit = xhr.responseText;
                self.commits = JSON.parse(xhr.responseText);
                console.log(self.commits[0].html_url);
                console.log("self.commits.length: "+self.commits.length)
            };
            
        },
        branchGet: function(){
            let self = this;
            let xhr = new XMLHttpRequest();
            xhr.open("GET",self.apiBranchURL,true);
            xhr.send();
            xhr.onload = function(){
                let branchesArray = JSON.parse(xhr.responseText);
                for ( let i=branchesArray.length-1; i>0; i--){
                    self.branches.push(branchesArray[i].name);
                }
            };
        }
    }
});
    
// reposCommit.fetchData();