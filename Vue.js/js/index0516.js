var app = new Vue({
    el: ".app",
    data: {
        score: 99,
    },
    components: {
        "appcomp": {
            template: "<span></span>",
        }
    }
});


Vue.component("appcomp2",{
    data: function(){
        return{
            count: 999,
        }
    },
    template: "<span>{{count}}</span>",
});

var app2 = new Vue({
    el: ".app2",
});

var app3 = new Vue({
    el: ".app3",
})