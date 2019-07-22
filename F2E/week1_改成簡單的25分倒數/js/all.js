/* 範例網址: https://blog.patw.me/archives/198/jquery-countdown-as-well-as-x-x-x-minutes-x-seconds/ */

// let today=new Date();
// let currentDateTime =today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
// console.log("currentDateTime: "+currentDateTime);
// let startDate = new Date(currentDateTime);
// let endDate = new Date('2019/7/22 11:59:59');
// let spantime = (endDate - startDate)/1000;



//   $(document).ready(function () {
//     $(this).everyTime('1s', function(i) {
//        spantime --;
//        let d = Math.floor(spantime / (24 * 3600));
//        let h = Math.floor((spantime % (24 * 3600)) / 3600);
//        let m = Math.floor((spantime % 3600) / (60));
//        let s = Math.floor(spantime % 60);

//       if (spantime > 0) {
//         $('#hour').text(h + (d*24));
//         $('#min').text(m);
//         $('#sec').text(s);
//       } else { // 避免倒數變成負的
//         $('#hour').text(0);
//         $('#min').text(0);
//         $('#sec').text(0);
//       }
//     });
//   });

/* ------ 我是範例分隔線 END ------ */

// let today=new Date();
// let currentDateTime =today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
// console.log("currentDateTime: "+currentDateTime);
// let startDate = new Date(currentDateTime);
// let endDate = new Date('2019/7/22 11:59:59');
// let spantime = (endDate - startDate)/1000;

let startDate = new Date('2019/7/22 00:00:00');
let endDate = new Date('2019/7/22 00:25:00');
let spantime = (endDate - startDate)/1000;


  $(document).ready(function () {
    $(".playBtn").click(function(event) {
		/* Act on the event */
        console.log("有點到");
        // sendBtnObj.style.display = "block";
        // resultBtnObj.style.display = "none";
        $(".playBtn").hide();
        $(".pauseBtn").show();
        countDownPlay();
        
    });

    $(".pauseBtn").click(function(event) {
		/* Act on the event */
        console.log("點下暫停!!!!");
        // $(".playBtn").show();
        // $(".pauseBtn").hide();
        $(document).stopTime('tomatoClock');
        
    });
    
    function countDownPlay(){
        $(this).everyTime('1s', 'tomatoClock',function(i) {
            spantime --;
        //    let d = Math.floor(spantime / (24 * 3600));
        //    let h = Math.floor((spantime % (24 * 3600)) / 3600);
            let m = Math.floor((spantime % 3600) / (60));
            let s = Math.floor(spantime % 60);
    
        if (spantime > 0) {
            // $('#hour').text(h + (d*24));
            $('#min').text(m);
            $('#sec').text(s);
        } else { // 避免倒數變成負的
            // $('#hour').text(0);
            $('#min').text(0);
            $('#sec').text(0);
        }
        });
    }


    
  });