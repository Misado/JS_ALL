
const bodyElement = document.body;
const roleElementGirl = document.querySelector(".girl");
const roleElementBoy = document.querySelector(".boy");
const roleElementMonster = document.querySelector(".monster");




const musicElement = document.getElementById("music");
console.log(musicElement["src"]);
console.log(musicElement["readyState"]);

musicElement.onprogress = function() {
    alert("Downloading music");
  };

musicElement.autoplay = true;
musicElement.loop = true;
musicElement.src = "mp3/happy.mp3";

musicElement.onloadeddata = function() {
    console.log("載入完畢！");
    console.log(musicElement["readyState"]);
    alert("載入完畢！");
    bodyElement.addEventListener("keydown",roleWalking);
}

function roleWalking(event){
    // alert("走一下");
    musicElement.play();
    if ( event.keyCode === 39 ){ // 往右走
        roleElementGirl.style.left = roleElementGirl.offsetLeft + 10 +"px";
        roleElementBoy.style.left = roleElementBoy.offsetLeft + 10 +"px";
        console.log("roleElementGirl.offsetLeft: "+roleElementGirl.offsetLeft);
        console.log("roleElementBoy.offsetLeft: "+roleElementBoy.offsetLeft);
    } else if ( event.keyCode === 37 ){ // 往左走
        roleElementGirl.style.left = roleElementGirl.offsetLeft - 10 +"px";
        roleElementBoy.style.left = roleElementBoy.offsetLeft - 10 +"px";
        console.log("roleElementGirl.offsetLeft: "+roleElementGirl.offsetLeft);
        console.log("roleElementBoy.offsetLeft: "+roleElementBoy.offsetLeft);
    }

    let posGirl = roleElementGirl.offsetLeft + roleElementGirl.offsetWidth;
    let posMonster = roleElementMonster.offsetLeft;

    console.log("posGirl: "+posGirl,"posMonster: "+posMonster);

    // 角色是否走到怪的偵測範圍確認，有走進怪就開始走動
    if ( posMonster - posGirl <= 100 ){
        console.log("快碰到了！");
        let roleMonsterClass = roleElementMonster.getAttribute("class");
        
        roleElementMonster.setAttribute("class","walk "+roleMonsterClass);
        console.log("roleMonsterClass: "+roleMonsterClass);
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
    musicElement.src = "mp3/battle02.mp3"; //這行一定要寫在外面，不然音樂不會改變
    musicElement.onloadeddata = function() {
        musicElement.play(); //測試中，先不要讓它播放XD
    };
    
}

