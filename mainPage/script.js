
function getCookie(name) 
{                   
    cookieList=document.cookie.split("; ");
    for(let i=0;i<cookieList.length;i++)
    {
        cookieName=cookieList[i].split("=")[0];
        if(cookieName==name)
        return cookieList[i].split("=")[1];
    }
    return null;
}

if(getCookie("screenLine")!=null)
{
    let screenLine=document.createElement("div");
    screenLine.id="screenLine";
    document.body.appendChild(screenLine);
}

document.getElementById("content4").addEventListener("click",function()
{
    document.location.href="../screenTest/screenTest.html";
   
})
document.getElementById("content3").addEventListener("click",function()
{
    document.location.href="../astronomia/index.html";
   
})

document.oncontextmenu=function(event){event.returnValue=false};
document.onselectstart=function(event){event.returnValue=false};


var draw = document.getElementById("coordination").getContext("2d");
draw.translate(150,150);
const r=20,R=60,l=1000;

let theta=0;
let x=(R+r)*Math.cos(theta)-l/r*Math.cos((R/r+1)*theta);
let y=(R+r)*Math.sin(theta)-l/r*Math.sin((R/r+1)*theta);

draw.moveTo(x,y);

function print()
{
    theta+=0.05;
    x=(R+r)*Math.cos(theta)-l/r*Math.cos((R/r+1)*theta);
    y=(R+r)*Math.sin(theta)-l/r*Math.sin((R/r+1)*theta);
    draw.lineTo(x,y);
    draw.stroke();
    if(theta<2*Math.PI)return setTimeout(print,800);
}
print();
