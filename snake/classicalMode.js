/*function fullScreen()
{
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;

    //typeof rfs != "undefined" && rfs
    if (rfs)
    {
        rfs.call(el);
    }
    else if (typeof window.ActiveXObject !== "undefined")
    {
        //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null)
        {
            wscript.SendKeys("{F11}");
        }
    }
}*/
function GameDatas()
{
    this.scores=0;
    this.duration=0;
    this.flashTime=200;
    this.scoresDiv=document.getElementById("scores");
    this.durationDiv=document.getElementById("duration");
    this.flashTimeDiv=document.getElementById("flashTime");
    
    if(localStorage.getItem("bestScores")&&localStorage.getItem("bestDuration"))
    {
        
        this.bestScores=parseInt(localStorage.getItem("bestScores"));
        this.bestDuration=parseInt(localStorage.getItem("bestDuration"));
    }
    else
    {
        this.bestScores=0;
        this.bestDuration=0;
    }
}
GameDatas.prototype.updateHUD=function()
{
    this.scoresDiv.innerHTML=this.scores;
    this.durationDiv.innerHTML=this.duration+"ms";
    this.flashTimeDiv.innerHTML=this.flashTime+"ms";
}
GameDatas.prototype.saveBestRecord=function()
{
    if(this.scores>this.bestScores)
    {
        localStorage.setItem("bestScores",this.scores);
        localStorage.setItem("bestDuration",this.duration);
        localStorage.setItem("submitted","flase");
    }
}

GameArea.gameAreaDiv.innerHTML="";
GameArea.newCanva("main","red");

let gameDatas=new GameDatas();

let iniBody=[{x:6,y:6},{x:6,y:7},{x:6,y:8}];
let snake=new Snake(GameArea.canvasGrid["main"],iniBody,"up");
let cake=new Cake(GameArea.canvasGrid["main"],"green",snake.body)
Control.onDirectionKey=snake.onKeyboard.bind(snake);

function round()
{
    snake.move();
    gameDatas.duration+=gameDatas.flashTime;
    gameDatas.updateHUD();
    if(cake.isEaten(snake.body[0])==true)
    {
        gameDatas.scores+=5;
        snake.grow();
        cake.produce();
        if(gameDatas.flashTime>100)
        {
            gameDatas.flashTime-=5;
            clearInterval(loop);
            loop=setInterval(round,gameDatas.flashTime);
        }
    }
    if(snake.isCrash()==true)
    {
        clearInterval(loop);
        gameDatas.saveBestRecord();
        alert("游戏结束");
    }
}

let loop=setInterval(round,gameDatas.flashTime);

