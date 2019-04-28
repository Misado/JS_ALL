
var light = 'blue';
function lightFun(str){
    console.log('目前是'+str+'警戒');
}
switch(light){
    case 'red':
        alert('紅色警戒');
        alert('快跑！')
        break;
    case 'blue':
        lightFun(light);
        break;
    default:
        alert('沒有任何資料');
        break;
}

