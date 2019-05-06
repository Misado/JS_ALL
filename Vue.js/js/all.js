
const number = 60;

var app = new Vue({
    el: "#app",
    data: {
        content: "TEST",
        link: "LINK",
        score: number,
        site: kaoTravelSite,
        school: [
            {
                name: "BOB",
            },{
                name: "ALEX",
            }],
        colors: ["紅色","藍色","灰色","黃色","綠色"],
    },
    methods: {
        showAddr: function(address){
            alert("此景點地址為： "+address);
            console.log(this);
        },
        showName: function(name){
            alert("名字是： "+name);
        }
    }
});

console.log(app.colors);

console.log(app.colors.indexOf("灰色"));

app.colors.splice(app.colors.indexOf("灰色"),1);

console.log(app.colors);