var screenX = document.querySelector('.screenX');        
var screenY = document.querySelector('.screenY');        
var pageX = document.querySelector('.pageX');        
var pageY = document.querySelector('.pageY');        
var clientX = document.querySelector('.clientX');        
var clientY = document.querySelector('.clientY');        

function getPosition(e) {                 
  screenX.textContent = e.screenX;                    
  screenY.textContent = e.screenY;                    
  pageX.textContent = e.pageX;                   
  pageY.textContent = e.pageY;                     
  clientX.textContent = e.clientX;                   
  clientY.textContent = e.clientY;                  
}

var el = document.body;      
el.addEventListener('mousemove', getPosition, false); 