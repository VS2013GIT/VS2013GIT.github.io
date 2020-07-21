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

setCookie("screenLine",1,60);