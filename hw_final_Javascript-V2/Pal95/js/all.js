$(document).ready(function() {


const bodyElement = document.body;
const roleElementGirl = document.querySelector(".girl");
const roleElementBoy = document.querySelector(".boy");
const roleElementMonster = document.querySelector(".monster");

/* 宣告角色跟怪的初始資料(名字/血量/法力/普攻/法攻/防禦) */
let roleData = [{
    name: "李逍遙",
    bloodNum: 150,
    magicNum: 50,
    attackPower: 20,
    magicPower: 0,
    protectPower: 20,
},{
    name: "趙靈兒",
    bloodNum: 100,
    magicNum: 100,
    attackPower: 10,
    magicPower: 30,
    protectPower: 10,
},{
    name: "怪",
    bloodNum: 100,
    magicNum: 0,
    attackPower: 10,
    magicPower: 0,
    protectPower: 10,
}];




const musicElement = document.getElementById("music");
console.log(musicElement["src"]);
console.log(musicElement["readyState"]);

musicElement.onprogress = function() {
    alert("Downloading music");
  };

musicElement.autoplay = true;
musicElement.loop = true;
// musicElement.src = "mp3/happy.mp3";
musicElement.pause();

musicElement.onloadeddata = function() {
    console.log("載入完畢！");
    console.log(musicElement["readyState"]);
    alert("載入完畢！");
    bodyElement.addEventListener("keydown",roleWalking);
}

function roleWalking(event){
    // alert("走一下");
    // musicElement.play(); //測試中，先不要讓它播放XD
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
    // musicElement.src = "mp3/battle02.mp3"; //這行一定要寫在外面，不然音樂不會改變
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
    console.log(`${roleData[0].name} 血量: ${roleData[0].bloodNum} 法力: ${roleData[0].magicNum}`);
    console.log(`${roleData[1].name} 血量: ${roleData[1].bloodNum} 法力: ${roleData[1].magicNum}`);
    $(".status").addClass('war');
    $(".menu").addClass('war');

    // 取值
    let thisValue = $(".option.movement").data('option');
    console.log("option: "+thisValue);
    thisValue = $(".option.item").data('option');
    console.log("option: "+thisValue);

    // let menuObj = document.querySelector(".menu");
    // for (let i=0; i<menuObj.childNodes.length; i++){
    //     console.log("我是子項目");
    //     console.log(menuObj.childNodes[i]);
    //     let menuChildClass = menuObj.getAttribute("class");
    //     console.log("menuChildClass: "+menuChildClass);
    //     // let menuChildClass = menuObj.childNodes[i].getAttribute("class");
    //     // console.log("menuChildClass: "+menuChildClass);

        

    // }
    const optionObj = document.querySelectorAll(".option");
    let optionObjClass;
    let optionObjClassFinal;
    let optionObjActive = "";
    let optionObjActiveObj = "";
    let optionObjActiveOption;
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
                console.log("optionObjActive: "+optionObjActive);
                // optionObjActiveObj = document
            }
            console.log("optionObjActive: "+optionObjActive);
            optionObjActiveObj = document.querySelector(`${optionObjActive}`);
            console.log(optionObjActiveObj.getAttribute("class"));
            thisValue = $(`${optionObjActive}`).data('option');
            console.log("option: "+thisValue);
        }
    }

}


});