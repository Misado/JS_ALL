var reposCommitVue = new Vue({
    el: "#reposBranch",
    data: {
        apiReposURL: "https://api.github.com/users/Misado/repos?per_page=", // 網址：取得我擁有的Repository
        apiBranchURL: "https://api.github.com/repos/Misado/", // 網址：取得我擁有的Repository的Branch
        branchURL: "https://github.com/Misado/", // 網址：該repository的Branch的URL
        recordNumPerPage: 3, // 最多撈出幾筆
        repos: [],
        branches: [],
        currentRepo: "", // 現在點到的 Repository
    },
    created: function(){
        this.fetchData(); // 一開始先跑一次
    },
    watch: {
        currentRepo: 'getBranch', // 只要 currentRepo 有更新，就去找該repos的branch
    },
    methods: {
        fetchData: function(){
            // 找repos
            let self = this; // 這行一定要加，因為onload的this不是Vue原本的this
            // 用ES6 `{$}`的方式字串相加
            let url = `${self.apiReposURL}${self.recordNumPerPage}`;
            let xhr = new XMLHttpRequest();
            xhr.open("GET",url,true);
            xhr.send();
            xhr.onload = function(){
                self.repos = JSON.parse(xhr.responseText);
                self.currentRepo = self.repos[0].name;
                self.getBranch(); // 先跑一次currentRepo的branch列表
            };
        },
        getBranch: function(){
            // 找branches
            let self = this; // 這行一定要加，因為onload的this不是Vue原本的this
            self.branches = []; // 先清空 branches 的結果
            // 用ES6 `{$}`的方式字串相加
            let url = `${self.apiBranchURL}${self.currentRepo}/branches?per_page=${self.recordNumPerPage}`;
            let xhr = new XMLHttpRequest();
            xhr.open("GET",url,true);
            xhr.send();
            xhr.onload = function(){
                self.branches = JSON.parse(xhr.responseText);
            };
        },
        getBranchURL: function(branch){
            // 取得該repository的Branch的URL
            // 用ES6 `{$}`的方式字串相加
            let url = `${this.branchURL}${this.currentRepo}/tree/${branch.name}`;
            return url;
        }
    }
});