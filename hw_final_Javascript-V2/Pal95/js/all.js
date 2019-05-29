
const bodyElement = document.body;
const roleElementGirl = document.querySelector(".girl");
const roleElementBoy = document.querySelector(".boy");
const roleElementMonster = document.querySelector(".monster");

roleElementMonster.addEventListener("animationend",positionCheck);


const musicElement = document.getElementById("music");
console.log(musicElement["src"]);
console.log(musicElement["readyState"]);

musicElement.autoplay = true;
musicElement.loop = true;

musicElement.onloadeddata = function() {
    console.log("載入完畢！");
    console.log(musicElement["readyState"]);
    
}

function positionCheck(event){
    console.log("動畫結束");
    console.log(event.target.offsetLeft);
    console.log(event.target.offsetWidth);

    let posGirl = roleElementGirl.offsetLeft + roleElementGirl.offsetWidth;
    let posMonster = roleElementMonster.offsetLeft;

    console.log("posGirl: "+posGirl,"posMonster: "+posMonster);

    if ( posGirl > posMonster ){
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
    bodyElement.addEventListener("keydown",function(){    
        // musicElement.play(); //測試中，先不要讓它播放XD
    })
}

