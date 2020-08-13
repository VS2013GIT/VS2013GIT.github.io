let loader=
{
    'sources':[],
    callback:function ()
    {
        if(loader.sources.length==0)return;
        let script=document.createElement("script");
        script.src=loader.sources.shift();
        script.onload=loader.callback;
        document.body.appendChild(script);
    }
}

function load(sources)
{
    let script=document.createElement("script");
    script.src=sources.shift();
    script.onload=loader.callback;
    document.body.appendChild(script);
    loader.sources=sources;
}


window.addEventListener("load",load(["snakeEngine.js","menu.js"]));




