
var el = document.querySelectorAll('.box');

var Len = el.length;

for(var i = 0;i<Len;i++){
  el[i].addEventListener('mousemove',function(e){
    alert('你輸了！');
  });
}