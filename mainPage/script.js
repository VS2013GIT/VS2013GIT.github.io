
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
console.log(getCookie("screenLine"));
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


