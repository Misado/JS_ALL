
var toDoList = new Vue({
    el: ".toDoList",
    data: {
        showMode: "ALL", //一開始 showMode 預設為 ALL
        // thingArray去取localStorage的值，取不到就設為[]空陣列
        thingArray: JSON.parse(localStorage.getItem("todolist")) || [],
        thingInput: "",
    },
    methods: {
        addTask: function(){
            if (  this.thingInput !== "" ){
                // 取得現在時間
                let today = new Date();
                let todayMonth = today.getMonth()+1;
                todayMonth = JSON.stringify(todayMonth); //要轉字串才能知道長度
                let todayDay = today.getDate();
                todayDay = JSON.stringify(todayDay); //要轉字串才能知道長度
                // 月/日如果只有1碼前面補0
                if ( todayMonth.length === 1 ){ todayMonth = "0"+todayMonth; }
                if ( todayDay.length === 1 ){ todayDay = "0"+todayDay; }
                let currentDateTime = today.getFullYear()+"/"+(todayMonth)+"/"+todayDay;

                this.thingArray.push({date: currentDateTime,completed: false,content:this.thingInput});
                this.updateLocalStorage(); //更新localStorage

                this.thingInput = ""; // 清空輸入的字串
            } else{
                alert("請輸入任務！");
            }
        },
        completeTask: function(index){
            // 把點到的那筆資料的completed設為 event.target.checked的值
            this.thingArray[index].completed = event.target.checked;

            // 點到的那筆資料的completed如果是true，li的class就設為active
            if ( event.target.checked ){
                event.target.parentNode.setAttribute("class","active"); 
            } else{
                event.target.parentNode.setAttribute("class","");
            }
            this.updateLocalStorage(); //更新localStorage
        },
        removeTask: function(index){
            this.thingArray.splice(index,1); // 把點到的那筆資料移掉
            this.updateLocalStorage(); //更新localStorage
        },
        classChange: function(completedCheck){
            // 如果completed是true，就要回傳"active"，表示要加"active"這個class
            if ( completedCheck ){
                return "active";
            }
        },
        modeCheck: function(showMode,item){
            // 如果showMode是COMP表示只有要看已完成的
            // v-if就要給條件是item.completed
            if ( showMode === "COMP" ){
                return item.completed;
            } else if ( showMode === "UNDO" ){
                // 如果showMode是COMP表示只有要看未完成的
                // v-if就要給條件是!item.completed
                return !item.completed;
            } else if ( showMode === "ALL" ){
                // 如果showMode是ALL表示要看全部
                // v-if就不用給特地條件
                return true;
            }
        },
        clearTask: function(){
            for ( let i=0; i<this.thingArray.length;){
                // 如果有找到已完成的，splice完刪掉後面那一筆的index會變成剛剛刪掉的index，所以不需要i++
                if ( this.thingArray[i].completed ){
                    this.thingArray.splice(i,1);
                } else{
                    // 沒找到已完成的才要往下一筆找(i++)
                    i++;
                }
            }
            this.updateLocalStorage(); //全部跑完再更新localStorage
            this.showMode = "ALL"; // 清空完已完成任務，頁面跳回顯示全部
        },
        updateLocalStorage: function(){
            // 把目前 thingArray 轉成字串
            let thingStr = JSON.stringify(this.thingArray);
            // 再把localStorage裡面的值更新
            localStorage.setItem("todolist",thingStr);
        },
    }
})