
var toDoList = new Vue({
    el: ".toDoList",
    data: {
        showMode: "ALL",
        thingArray: JSON.parse(localStorage.getItem("todolist")) || [],
        // thingArray: [],
        thingInput: "",
    },
    methods: {
        addTask: function(){
            console.log(event.target.parentNode);
            console.log("this.thingArray.length: "+this.thingArray.length);
            // let recordNum = this.thingArray.length;
            this.thingArray.push({completed: false,content:this.thingInput});
            this.addLocalStorage();
        },
        completeTask: function(item,index){
            // console.log(this.thingArray.indexOf(thingInput));
            console.log(item);
            console.log(this.thingArray.indexOf(item));
            // let indexNum = this.thingArray.indexOf(item);
            console.log(event.target.checked);
            console.log("勾起來的是: "+index);
            console.log("勾起來的是: "+this.thingArray[index].content);
            this.thingArray[index].completed = event.target.checked;

            if ( event.target.checked == true ){
                console.log("勾起來了");
                console.log("劃線的是:" +this.thingArray.indexOf(item));
                console.log(event.target.parentNode);
                event.target.parentNode.setAttribute("class","active");
                
            } else{
                event.target.parentNode.setAttribute("class","");
            }

            this.addLocalStorage();
        },
        removeTask: function(item,index){
            // console.log("要刪掉的是:" +this.thingArray.indexOf(item));
            console.log("要刪掉的是:" +index);
            console.log("this.thingArray[index]: "+this.thingArray);
            this.thingArray.splice(index,1);
            console.log(this.thingArray[0].content);
            this.addLocalStorage();
        },
        addLocalStorage: function(){
            console.log("TEST");
            let thingStr = JSON.stringify(this.thingArray);
            console.log(thingStr);
            console.log(typeof(thingStr));
            localStorage.setItem("todolist",thingStr);
        },
        classChange: function(completedCheck){
            if ( completedCheck ){
                return "active";
            }
        }
    }
})