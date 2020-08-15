


document.getElementsByClassName("mode")[0].getElementsByClassName("classical")[0].addEventListener("click",
()=>
{
    load(["classicalMode.js"]);
});

document.getElementsByClassName("mode")[0].getElementsByClassName("rank")[0].addEventListener("click",
()=>
{
    window.location.href="rank/rank.html";
});
