var element = document.documentElement;

var style=document.body.style;
const colorList=["black","red","yellow","green","pink"];
var i=0;
setInterval(function()
{
    style.backgroundColor=colorList[i];
    i=(i+1)%colorList.length;
},50);

function setCookie(name, value,maxAge) 
{                   
    document.cookie=name+"="+value+";max-age="+maxAge+";path=/";
} 

document.body.addEventListener("click",function()
{
    var element=document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}
)

setCookie("screenLine",1,60);