$(document).ready(function() {
	// Initialize Swiper
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 3,
		spaceBetween: 5,
		loop: true,
		autoplay: {
			delay: 5000,
		},
		breakpoints: {
	    // when window width is <= 414px
	    414: {
	      slidesPerView: 1,
	      spaceBetween: 0
	    },
	    // when window width is <= 480px
	    /*480: {
	      slidesPerView: 2,
	      spaceBetween: 5
	    },*/
	    // when window width is <= 640px
	    640: {
	      slidesPerView: 2,
	      spaceBetween: 5
	    }
	  }
	});

	// Banner Cycle setting
	$(".banner").cycle({
		fx: 'fade',
		speed: 3000,
	});

	// navbar 1stmenu setting
	$(".mainMenu > a").click(function(event) {
		event.preventDefault();
		// submenu slideToggle
		$(this).parent().find("ul").slideToggle();
		$(this).toggleClass('active');
		// other submenu slideUp
		$(this).parent().siblings().find("ul").slideUp();
		$(this).parent().siblings().find("a").removeClass('active');
	});

	// navbar 2ndmenu setting
	$(".subMenu a").click(function(event) {
		$(this).toggleClass('active');
		$(this).parent().siblings().find("a").removeClass('active');
	});

	/* hamburger menu setting */
	$(".showmenu").click(function(event) {
		event.preventDefault();
		$("body").toggleClass('mobile');
	});

	// Back to top of the page
	$(".backtotopBtn").click(function(event) {
		event.preventDefault();
		$("html,body").animate({scrollTop:0}, 500);
	});

	// 空心愛心跟實心愛心互換
	$(".cuisineHeart").click(function(event) {
		$(this).find("i").toggleClass('far fa-heart').toggleClass('fas fa-heart');
	});

	// 會員註冊條款 setting
	$(".registerRuleMobile a").click(function(event) {
		event.preventDefault();
		$(".registerRuleMobile p").slideToggle();
	});
});

//------------------------------------------

var heartElement = document.querySelectorAll(".fa-heart");

for (var i=0; i<heartElement.length; i++){
	console.log(heartElement[i]);
	heartElement[i].addEventListener("click",function(){
		console.log(event);
		console.log(event.target.parentNode.parentNode);
		var heartParentNode = event.target.parentNode.parentNode.childNodes;
		for (var j=0; j<heartParentNode.length; j++){
			console.log("---------"+j);
			console.log(heartParentNode[j].nodeName);
			if ( heartParentNode[j].nodeName == "H4" ){
				console.log(heartParentNode[j].innerText);
				var loveFoodList = localStorage.getItem("loveFood");
				if (loveFoodList == null){
					loveFoodList="";
				}
				var productStr = heartParentNode[j].innerText;
				localStorage.setItem("loveFood",loveFoodList+", "+productStr);
			}
		}
	});
}

for (var i=0; i<heartElement.length; i++){
	console.log(heartElement[i].parentNode);
}


var child = heartElement[0].parentNode.childNodes;
console.log(child);

for (var i=0; i<child.length; i++){
	//console.log(child[i].nodeName);
	if ( child[i].nodeName == "H4" ){
		console.log(child[i].innerText);
	}
}




// for (var i=0; i<heartElement.length; i++){
// 	var child = heartElement[i].parentNode.childNodes;
// 	for (var j=0; j<child.length; j++){
// 		if ( child[j].nodeName == "H4" ){
// 			var loveFoodList = localStorage.getItem("loveFood");
// 			console.log(child[j].innerText);
// 			var productStr = child[j].innerText;
// 			localStorage.setItem("loveFood",loveFoodList+", "+productStr);
// 		}
// 	}
// }