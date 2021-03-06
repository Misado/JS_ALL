$(document).ready(function() {


const bodyElement = document.body;
const roleElementGirl = document.querySelector(".role.girl");
const roleElementBoy = document.querySelector(".role.boy");
const roleElementMonster = document.querySelector(".role.monster");

const optionObj = document.querySelectorAll(".option");

let optionActiveValue = 1; //預設為1 - 攻擊模式
let roleActive = 1; // 目前作動的角色是誰，預設第1個是李逍遙

let monsterDeath = 0; // 怪是否掛了，預設為否(0)
let roleDeath = 0; // 角色是否全掛了，預設為否(0)

/* 宣告角色跟怪的初始資料(名字/血量/法力/普攻/法攻/防禦) */
let roleData = [{
    name: "李逍遙",
    bloodNum: 150,
    bloodTotalNum: 150,
    magicNum: 50,
    magicTotalNum: 50,
    attackPower: 20,
    magicPower: 0,
    protectPower: 20,
    actionAndNum: [0,0],
},{
    name: "趙靈兒",
    bloodNum: 100,
    bloodTotalNum: 100,
    magicNum: 100,
    magicTotalNum: 100,
    attackPower: 10,
    magicPower: 30,
    protectPower: 10,
    actionAndNum: [0,0],
},{
    name: "怪",
    bloodNum: 100,
    bloodTotalNum: 100,
    magicNum: 0,
    magicTotalNum: 0,
    attackPower: 30,
    magicPower: 0,
    protectPower: 10,
    actionAndNum: [0,0],
}];




const musicElement = document.getElementById("music");
console.log(musicElement["src"]);
console.log(musicElement["readyState"]);

musicElement.onprogress = function() {
    // alert("Downloading music");
  };

musicElement.autoplay = true;
musicElement.loop = true;
// musicElement.src = "mp3/happy.mp3";
musicElement.pause();

musicElement.onloadeddata = function() {
    console.log("載入完畢！");
    console.log(musicElement["readyState"]);
    // alert("載入完畢！");
    bodyElement.addEventListener("keydown",roleWalking);
}

function roleWalking(event){
    // alert("走一下");
    musicElement.play(); //測試中，先不要讓它播放XD
    if ( event.keyCode === 39 ){ // 往右走
        roleElementGirl.style.left = roleElementGirl.offsetLeft + 20 +"px";
        roleElementBoy.style.left = roleElementBoy.offsetLeft + 20 +"px";
        console.log("roleElementGirl.offsetLeft: "+roleElementGirl.offsetLeft);
        console.log("roleElementBoy.offsetLeft: "+roleElementBoy.offsetLeft);

        $(".role.girl").toggleClass('walk');
        $(".role.boy").toggleClass('walk');
        $(".role.girl").removeClass('walk_backward');
        $(".role.boy").removeClass('walk_backward');
    } else if ( event.keyCode === 37 ){ // 往左走
        roleElementGirl.style.left = roleElementGirl.offsetLeft - 20 +"px";
        roleElementBoy.style.left = roleElementBoy.offsetLeft - 20 +"px";
        console.log("roleElementGirl.offsetLeft: "+roleElementGirl.offsetLeft);
        console.log("roleElementBoy.offsetLeft: "+roleElementBoy.offsetLeft);

        $(".role.girl").toggleClass('walk');
        $(".role.boy").toggleClass('walk');
        $(".role.girl").addClass('walk_backward');
        $(".role.boy").addClass('walk_backward');
    }

    let posGirl = roleElementGirl.offsetLeft + roleElementGirl.offsetWidth;
    let posMonster = roleElementMonster.offsetLeft;

    console.log("posGirl: "+posGirl,"posMonster: "+posMonster);

    // 角色是否走到怪的偵測範圍確認，有走進怪就開始走動
    if ( posMonster - posGirl <= 100 ){
        console.log("快碰到了！");

        $(".role.monster").toggleClass('walk');
    } 
    // else{
    //     roleElementMonster.style.animation-play-state  "paused";
    // }
};


// 怪開始走動時，角色就不能移動了，強制進入戰鬥XD
roleElementMonster.addEventListener("animationstart",meetCheck);
function meetCheck(event){
    console.log("開始了");
    // 角色一走到怪的偵測範圍，角色就不能移動了，強制進入戰鬥XD
    bodyElement.removeEventListener("keydown", roleWalking);
}

// 動畫結束，看角色的座標是否有大於等於怪的，是的話就進入戰鬥
roleElementMonster.addEventListener("animationend",positionCheck);
function positionCheck(event){
    console.log("動畫結束");
    console.log(event.target.offsetLeft);
    console.log(event.target.offsetWidth);

    let posGirl = roleElementGirl.offsetLeft + roleElementGirl.offsetWidth;
    let posMonster = roleElementMonster.offsetLeft;

    console.log("posGirl: "+posGirl,"posMonster: "+posMonster);

    if ( posGirl >= posMonster ){
        console.log("碰到了！");
        // 因為role monster後面還有動畫，這邊就要先移除監聽，免得再次觸發
        roleElementMonster.removeEventListener("animationstart",meetCheck);
        roleElementMonster.removeEventListener("animationend",positionCheck);
        battleStart();
    }
}

function battleStart(){
    console.log("戰鬥開始");
    console.log(musicElement["readyState"]);
    // musicElement.autoplay = true;
    // musicElement.load();

    // https://neighborhood999.github.io/2019/03/17/autoplay-policy-note/
    // Autoplay Policy
    // 那麼，影音在 Web 上，預設到底可不可以讓聲音自動播放呢？在早期瀏覽器是允許這個行為的，但現在是不允許的，
    // 但在一些條件下，還是可以自動播放的：

    // 靜音允許自動播放（Muted autoplay is always allowed）
    // 使用者與瀏覽器有所互動（例如：click, touch 事件）
    // 頂部 frame 可以將自動播放權限委託給他們的 iframe，允許自動播放聲音
    
    //測試中，先不要讓它播放XD
    musicElement.src = "mp3/battle02.mp3"; //這行一定要寫在外面，不然音樂不會改變
    musicElement.onloadeddata = function() {
        // musicElement.play(); //測試中，先不要讓它播放XD
    };
    $("body").css("background-image","url('img/war05.png')");
    $(".role.girl").hide();
    $(".role.boy").hide();
    $(".role.monster").addClass('war');

    battleInitial();
}

function battleInitial(){
    console.log("戰鬥資料初始化");
    // console.log(`${roleData[0].name} 血量: ${roleData[0].bloodNum} 法力: ${roleData[0].magicNum}`);
    // console.log(`${roleData[1].name} 血量: ${roleData[1].bloodNum} 法力: ${roleData[1].magicNum}`);
    $(".menu").css("opacity",1);

    $(".status").addClass('war');
    $(".menu").addClass('war');

    optionActiveValue = 1; //預設為1 - 攻擊模式
    $(".menu .center .option.attack").addClass('active');
    
    $(".status .boy .arrowFlag").addClass('index');

    bodyElement.addEventListener("keydown", battleActionChange);
    // battleGetActiveAction();
    battleRoleDataShow();

}

function battleRoleDataShow(){
    console.log(`${roleData[0].name} 血量: ${roleData[0].bloodNum}/${roleData[0].bloodTotalNum} 法力: ${roleData[0].magicNum}/${roleData[0].magicTotalNum}`);
    console.log(`${roleData[1].name} 血量: ${roleData[1].bloodNum}/${roleData[1].bloodTotalNum} 法力: ${roleData[1].magicNum}/${roleData[1].magicTotalNum}`);
    console.log(`${roleData[2].name} 血量: ${roleData[2].bloodNum}/${roleData[2].bloodTotalNum} 法力: ${roleData[2].magicNum}/${roleData[2].magicTotalNum}`);
    $(".status .boy .bodyStatus .bloodNum").text(`${roleData[0].bloodNum}/${roleData[0].bloodTotalNum}`);
    $(".status .boy .bodyStatus .magicNum").text(`${roleData[0].magicNum}/${roleData[0].magicTotalNum}`);
    $(".status .girl .bodyStatus .bloodNum").text(`${roleData[1].bloodNum}/${roleData[1].bloodTotalNum}`);
    $(".status .girl .bodyStatus .magicNum").text(`${roleData[1].magicNum}/${roleData[1].magicTotalNum}`);
    
    // let monsterBloodNum = $(".role.monster").data("blood");
    // console.log("monsterBloodNum: "+monsterBloodNum);
    $(".role.monster").data("blood", roleData[2].bloodNum);
    let monsterBloodNum = $(".role.monster").data("blood");
    console.log("monsterBloodNum: "+monsterBloodNum);
    $(".role.monster .bloodShow").css("width",`${monsterBloodNum}%`);
    // thisValue = $(".option.item").data('option');
    // console.log("option: "+thisValue);

    for ( i=0; i< roleData.length-1; i++ ){
        switch(i){
            case 0:
                if ( roleData[i].bloodNum <= roleData[i].bloodTotalNum/2){
                    $(".status .boy .bodyStatus .bloodNum").addClass("dangerSituation"); // 角色瀕死狀態(OOC)
                }
                if ( roleData[i].bloodNum <= roleData[i].bloodTotalNum/4){
                    $(".status .boy .bodyStatus .bloodNum").addClass("verydangerSituation"); // 角色瀕死狀態(OOS)
                }
                break;
            case 1:
                if ( roleData[i].bloodNum <= roleData[i].bloodTotalNum/2){
                    $(".status .girl .bodyStatus .bloodNum").addClass("dangerSituation"); // 角色瀕死狀態(OOC)
                }
                if ( roleData[i].bloodNum <= roleData[i].bloodTotalNum/4){
                    $(".status .girl .bodyStatus .bloodNum").addClass("verydangerSituation"); // 角色瀕死狀態(OOS)
                }
                break;
            default:
                break;
        }
    }
}

// 取得現在active的值，remove active class
function battleRemoveActive(){
    // 取值
    let thisValue = $(".option.movement").data('option');
    console.log("option: "+thisValue);
    thisValue = $(".option.item").data('option');
    console.log("option: "+thisValue);

    let optionObjClass;
    let optionObjClassFinal;
    let optionObjActive = "";
    let optionObjActiveObj = "";
    // let optionActiveValue;
    for ( i=0; i< optionObj.length; i++){
        console.log("我是option");
        console.log(optionObj[i]);
        optionObjClass = optionObj[i].getAttribute("class");
        console.log("我的class是"+optionObjClass);
        optionObjClassFinal = optionObjClass.split(" ").pop();
        console.log("最後的class是: "+optionObjClassFinal);

        if ( optionObjClassFinal === "active" ){
            console.log("正在選擇: "+optionObjClass);
            for ( i=0; i< optionObjClass.split(" ").length; i++){
                console.log(optionObjClass.split(" ")[i]);
                optionObjActive += `.${optionObjClass.split(" ")[i]}`;
                $(`${optionObjActive}`).removeClass("active");
            }
        }
    }
    
}


// 戰鬥選單，動作選擇
// 1: 普通攻擊 - 2: 法術 - 3: 防禦 - 4: 聯合攻擊
function battleActionChange(event){
    battleRemoveActive(); //一開始要先remove active的class
    
    if ( optionActiveValue === 1 || optionActiveValue === 3 ){
        switch(event.keyCode){
            case 37:
                console.log("往左");
                optionActiveValue = 2;
                console.log("optionActiveValue: "+optionActiveValue);
                break;
            case 39:
                console.log("往右");
                optionActiveValue = 4;
                console.log("optionActiveValue: "+optionActiveValue);
                break;
            default:
                break;
        }
    }
    if ( optionActiveValue === 1 ){
        switch(event.keyCode){
            case 40:
                console.log("往下");
                optionActiveValue = 3;
                console.log("optionActiveValue: "+optionActiveValue);
                break;
            default:
                break;
        }
    }
    if ( optionActiveValue === 3 ){
        switch(event.keyCode){
            case 38:
                console.log("往上");
                optionActiveValue = 1;
                console.log("optionActiveValue: "+optionActiveValue);
                break;
            default:
                break;
        }
    }

        if ( optionActiveValue === 2 || optionActiveValue === 4 ){
            switch(event.keyCode){
                case 38:
                    console.log("往上");
                    optionActiveValue = 1;
                    console.log("optionActiveValue: "+optionActiveValue);
                    break;
                case 40:
                    console.log("往下");
                    optionActiveValue = 3;
                    console.log("optionActiveValue: "+optionActiveValue);
                    break;
                default:
                    console.log("都不是");
                    console.log("optionActiveValue: "+optionActiveValue);
                    break;
            }
        }
        if ( optionActiveValue === 2 ){
            switch(event.keyCode){
                case 39:
                    console.log("往右");
                    optionActiveValue = 4;
                    console.log("optionActiveValue: "+optionActiveValue);
                    break;
                default:
                    break;
            }
        }
        if ( optionActiveValue === 4 ){
            switch(event.keyCode){
                case 37:
                    console.log("往左");
                    optionActiveValue = 2;
                    console.log("optionActiveValue: "+optionActiveValue);
                    break;
                default:
                    break;
            }
        }
        console.log("optionActiveValue: "+optionActiveValue);
        battleShowActive(); // 更新active值後要加active class
        battleActionConfirm();

        if( event.keyCode === 13){
            console.log("按下ENTER，塵埃落定！");
            console.log("目前作動角色: "+roleData[roleActive-1].name);
            console.log(`目前作動角色的動作及數量: ${roleData[roleActive-1].actionAndNum[0]}/${roleData[roleActive-1].actionAndNum[1]}`);

            

            bodyElement.removeEventListener("keydown", battleActionChange);
            console.log(`${roleActive}選擇的動作是: ${optionActiveValue}`); 
            if ( roleActive === 1 ){
                $(".status .boy .arrowFlag").removeClass('index');
                $(".status .girl .arrowFlag").addClass('index');
            }
            if ( roleActive < 2 ){
            
                roleActive += 1;
                bodyElement.addEventListener("keydown", battleActionChange);
                console.log(`換成${roleActive}選擇動作`);
            } else{
                roleActive += 1;
                console.log("李逍遙跟仙女姐姐選擇動作完畢");
                $(".status .girl .arrowFlag").removeClass('index');
                $(".menu").css("opacity",0);
                battleActionExec();
                // battleActionExecMonster();
            }
            
        }

        
        
    
}



// 取得改之後現在active的值，加active class
function battleShowActive(){
    console.log("------------");
    console.log("optionActiveValue: "+optionActiveValue);
    console.log("------------");

    for ( let i=0; i< optionObj.length; i++){
        let optionObjClass;
    let optionObjOption;
    let optionObjClassFinal;
    let optionObjActive = "";
    let optionObjActiveObj = "";

        console.log("我是option");
        console.log(optionObj[i]);

        optionObjClass = optionObj[i].getAttribute("class");
        console.log("optionObjClass: "+optionObjClass);

        for ( let j=0; j< optionObjClass.split(" ").length; j++){
        optionObjActive += `.${optionObjClass.split(" ")[j]}`;
        console.log("optionObjActive: "+optionObjActive);
        }
        optionObjOption = parseInt($(`${optionObjActive}`).data('option'));
            console.log("optionObjOption: "+optionObjOption);
            console.log("optionActiveValue: "+optionActiveValue);
        
        if ( optionObjOption === optionActiveValue ){
            console.log("一樣哦");
            $(`${optionObjActive}`).addClass('active');
        }
    }
}

// 戰鬥選單，動作選擇
// 1: 普通攻擊 - 2: 法術 - 3: 防禦 - 4: 聯合攻擊
function battleActionConfirm(){
    console.log("執行動作！");
    console.log("目前作動角色: "+roleData[roleActive-1].name);
    console.log(`目前作動角色的動作及數量: ${roleData[roleActive-1].actionAndNum[0]}/${roleData[roleActive-1].actionAndNum[1]}`);
    // roleActive = 2;
    // console.log("目前作動角色: "+roleData[roleActive-1].name);
    // console.log(`目前作動角色的動作及數量: ${roleData[roleActive-1].actionAndNum[0]}/${roleData[roleActive-1].actionAndNum[1]}`);
    
    switch(optionActiveValue){
        case 1:
            roleData[roleActive-1].actionAndNum[0] = 1;
            roleData[roleActive-1].actionAndNum[1] = roleData[roleActive-1].attackPower;
            console.log(`attackPower: ${roleData[roleActive-1].attackPower}`);
            
            console.log("普通攻擊");
            console.log("optionActiveValue: "+optionActiveValue);
            console.log(`數量： ${roleData[roleActive-1].actionAndNum[1]}`);
            break;
        case 2:
            roleData[roleActive-1].actionAndNum[0] = 2;
            roleData[roleActive-1].actionAndNum[1] = roleData[roleActive-1].magicPower;
            console.log(`attackPower: ${roleData[roleActive-1].magicPower}`);
            // console.log("目前作動角色: "+roleData[roleActive-1].name);
            // console.log(`目前作動角色的動作及數量: ${roleData[roleActive-1].actionAndNum[0]}/${roleData[roleActive-1].actionAndNum[1]}`);
            
            console.log("法術");
            console.log("optionActiveValue: "+optionActiveValue);
            console.log(`數量： ${roleData[roleActive-1].actionAndNum[1]}`);
            break;
        case 3:
            roleData[roleActive-1].actionAndNum[0] = 3;
            roleData[roleActive-1].actionAndNum[1] = roleData[roleActive-1].protectPower;
            console.log(`attackPower: ${roleData[roleActive-1].protectPower}`);
            // console.log("目前作動角色: "+roleData[roleActive-1].name);
            // console.log(`目前作動角色的動作及數量: ${roleData[roleActive-1].actionAndNum[0]}/${roleData[roleActive-1].actionAndNum[1]}`);
            
            console.log("防禦");
            console.log("optionActiveValue: "+optionActiveValue);
            console.log(`數量： ${roleData[roleActive-1].actionAndNum[1]}`);
            break;
        case 4:
            roleData[roleActive-1].actionAndNum[0] = 4;
            roleData[roleActive-1].actionAndNum[1] = roleData[roleActive-1].attackPower;
            console.log(`attackPower: ${roleData[roleActive-1].attackPower}`);
            // console.log("目前作動角色: "+roleData[roleActive-1].name);
            // console.log(`目前作動角色的動作及數量: ${roleData[roleActive-1].actionAndNum[0]}/${roleData[roleActive-1].actionAndNum[1]}`);
            
            console.log("聯合攻擊");
            console.log("optionActiveValue: "+optionActiveValue);
            console.log(`數量： ${roleData[roleActive-1].actionAndNum[1]}`);
            break;
        default:
            break;
    }
}

function battleActionExec(){
    console.log("角色開始動作");
    battleRemoveActive(); //一開始要先remove active的class
    eachAction();
    // setTimeout(function() {
    // for ( let i=0; i<2; i++){
        

    //         setTimeout(eachAction(i),(i+1)*1000);
            
    //     }
    // },2000);

    
}

// function eachAction(i){
//     console.log("我開始做動了~");
//     console.log("目前作動角色: "+roleData[i].name);
//         console.log(`目前作動角色的動作及數量: ${roleData[i].actionAndNum[0]}/${roleData[i].actionAndNum[1]}`);
//         $(".role.monster .attackNumShow").text(`-${roleData[i].actionAndNum[1]}`);
//         $(".role.monster .attackNumShow").addClass("flash animated");
//         setTimeout(function() {
//             console.log("移除CLASS flash animated")
//             $(".role.monster .attackNumShow").removeClass("flash animated");
//             $(".role.monster .attackNumShow").hide();
//         }, 2000);
// }
function eachAction(){
    setTimeout(eachActionBoy(),3000);
    
}
function eachActionBoy(){
    console.log("1我開始做動了~");
    console.log("目前作動角色: "+roleData[0].name);
    console.log(`目前作動角色的動作及數量: ${roleData[0].actionAndNum[0]}/${roleData[0].actionAndNum[1]}`);
    $(".role.monster .attackNumShow").text(`-${roleData[0].actionAndNum[1]}`);
    $(".role.monster .attackNumShow").show();
    $(".role.monster .attackNumShow").addClass("flash animated");
    
    roleData[2].bloodNum -= roleData[0].actionAndNum[1];
    $(".role.monster").data("blood", roleData[2].bloodNum);
    let monsterBloodNum = $(".role.monster").data("blood");
    console.log("monsterBloodNum: "+monsterBloodNum);
    $(".role.monster .bloodShow").css("width",`${monsterBloodNum}%`);

    setTimeout(function() {
        console.log("移除CLASS flash animated")
        $(".role.monster .attackNumShow").removeClass("flash animated");
        $(".role.monster .attackNumShow").hide();
        monsterDeathCheck();
        if ( monsterDeath === 0 ){
            setTimeout(eachActionGirl,600);
        }
    }, 2000);
    
    
    
}

function eachActionGirl(){
    $(".role.monster .attackNumShow").show();
    console.log("2我開始做動了~");
    console.log("目前作動角色: "+roleData[1].name);
    console.log(`目前作動角色的動作及數量: ${roleData[1].actionAndNum[0]}/${roleData[1].actionAndNum[1]}`);
    $(".role.monster .attackNumShow").text(`-${roleData[1].actionAndNum[1]}`);
    $(".role.monster .attackNumShow").show();
    $(".role.monster .attackNumShow").addClass("flash animated");

    roleData[2].bloodNum -= roleData[1].actionAndNum[1];
    $(".role.monster").data("blood", roleData[2].bloodNum);
    let monsterBloodNum = $(".role.monster").data("blood");
    console.log("monsterBloodNum: "+monsterBloodNum);
    $(".role.monster .bloodShow").css("width",`${monsterBloodNum}%`);

    setTimeout(function() {
        console.log("移除CLASS flash animated")
        $(".role.monster .attackNumShow").removeClass("flash animated");
        $(".role.monster .attackNumShow").hide();
        monsterDeathCheck();
        if ( monsterDeath === 0 ){
            setTimeout(eachActionMonster,600);
        }
    }, 2000);
    // roleActive = 1;
    // monsterDeathCheck();
    // setTimeout(eachActionMonster,3000);
    
    
}

function eachActionMonster(){
    console.log("roleActive: "+roleActive);
    console.log("換怪攻擊了!!!");
    
    roleData[2].actionAndNum[0] = 1;
    roleData[2].actionAndNum[1] = roleData[2].attackPower;

    

    console.log("3我開始做動了~");
    console.log("目前作動角色: "+roleData[2].name);
    console.log(`目前作動角色的動作及數量: ${roleData[2].actionAndNum[0]}/${roleData[2].actionAndNum[1]}`);
    
    $(".status .girl .attackNumShow").text(`-${roleData[2].actionAndNum[1]}`);
    // $(".status .girl .attackNumShow").show();
    // $(".status .girl .attackNumShow").addClass("flash animated");
    $(".status .girl .bodyStatus .bloodNum").addClass("flash animated dangerSituation");
    // monsterDeathCheck();
    // if ( roleData[2].bloodNum >0 ){
    //     console.log("怪還沒死！");
    //     roleData[1].bloodNum -= roleData[2].attackPower;
    //     battleInitial();
    // } else{
    //     console.log("你死了ㄍㄋㄇㄉ");
    //     $(".role.monster").hide();
    //     setTimeout(function() {
    //         $(".menu").hide();
    //         $(".status").hide();
    //     }, 300);
        
    //     setTimeout(function() {
    //         $("body").addClass("success");
    //         $(".successMsg").addClass("pulse animated");
    //         //測試中，先不要讓它播放XD
    //         musicElement.src = "mp3/victory.mp3"; //這行一定要寫在外面，不然音樂不會改變
    //         musicElement.loop = false;
    //     }, 300);

    if ( roleData[2].bloodNum >0 && roleActive === 3){
        console.log("怪還沒死！");
        roleData[1].bloodNum -= roleData[2].attackPower;
        if ( roleData[1].bloodNum < 0){
            roleData[1].bloodNum = 0;
        }
        battleRoleDataShow(); // 角色被攻擊完後，更新角色的血量
        roleDeathCheck();
            // roleActive = 1;
            // battleInitial();
    }
    setTimeout(function() {
        console.log("移除CLASS flash animated");
        $(".status .girl .bodyStatus .bloodNum").removeClass("flash animated dangerSituation");
        roleActive = 1;
        battleInitial();
    }, 2000);
}

function monsterDeathCheck(){
    if ( roleData[2].bloodNum <= 0){
        console.log("提早把怪打死了!!!");
        console.log("你死了ㄍㄋㄇㄉ");
        monsterDeath = 1;

        $(".role.monster").hide();
        setTimeout(function() {
            $(".menu").hide();
            $(".status").hide();
        }, 600);
        
        setTimeout(function() {
            $("body").addClass("success");
            $(".successMsg").addClass("pulse animated");
            //測試中，先不要讓它播放XD
            musicElement.src = "mp3/victory.mp3"; //這行一定要寫在外面，不然音樂不會改變
            musicElement.loop = false;
        }, 600);
    }
}

function roleDeathCheck(){
    if ( roleData[0].bloodNum <= 0 || roleData[1].bloodNum <= 0){
        console.log("被怪打死了");
        console.log("你死了ㄍㄋㄇㄉ");
        roleDeath = 1;

        // $(".role.monster").hide();
        setTimeout(function() {
            $(".menu").hide();
            $(".status").hide();
            $(".role.monster .bloodShow").hide();
        }, 600);
        
        setTimeout(function() {
            // $("body").css("background-image","url('img/war05.png')");
            // $(".wrap").css("background-color","#78100d");
            // $(".wrap").css("opacity",0.7);
            $("body").addClass("fail");
            // $("body").addClass("success");
            // $(".successMsg").addClass("pulse animated");
            //測試中，先不要讓它播放XD
            musicElement.src = "mp3/fail.mp3"; //這行一定要寫在外面，不然音樂不會改變
            musicElement.loop = false;
        }, 600);
    }
}



});