function fullScreen()
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
}

GameArea.newCanva("main",30,"red");
GameArea.newCanva("second",30,"green");

let iniBody=[{x:6,y:6},{x:6,y:7},{x:6,y:8}];
let snake=new Snake(GameArea.canvasGrid["main"],iniBody,"up");
let snake2=new Snake(GameArea.canvasGrid["second"],iniBody,"up");
Control.onDirectionKey=snake.onKeyboard.bind(snake);

setInterval(snake.move.bind(snake),300);

