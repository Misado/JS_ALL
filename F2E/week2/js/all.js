$(document).ready(function() {

    $(".frame.left").hover(function() {
        $(".shinydollPic").removeClass("right");
    });

    $(".frame.right").hover(function() {
        $(".shinydollPic").addClass("right");
    });

});