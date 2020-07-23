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
