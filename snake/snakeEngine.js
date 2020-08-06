function Grid(canva, gridLen, color)
{
    this.canva = canva;
    this.context = canva.getContext("2d");
    this.gridLen = gridLen;
    this.color = color;
    // this.gridLen=parseInt(canva.clientWidth/n);
    this.context.fillStyle = this.color;
}

Grid.prototype.fillGrid = function (pos,color)
{
    if (color != undefined)
        this.context.fillStyle = color;
    this.context.fillRect((pos.y - 1) * this.gridLen, (pos.x - 1) * this.gridLen, this.gridLen, this.gridLen);
    if (color != undefined)
        this.context.fillStyle = this.color;
}
Grid.prototype.cleanGrid = function (pos)
{
    this.context.clearRect((pos.y - 1) * this.gridLen, (pos.x - 1) * this.gridLen, this.gridLen, this.gridLen);
}
Grid.prototype.offset = function (posA, direction, steps)
{
    let posB = {};
    posB.x = posA.x;
    posB.y = posA.y;
    switch (direction)
    {
        case "up":
            posB.x -= steps;
            break;
        case "down":
            posB.x += steps;
            break;
        case "left":
            posB.y -= steps;
            break;
        case "right":
            posB.y += steps;
            break;
    }
    return posB;
}

let GameArea =
{
    gameAreaDiv: document.getElementById("gameArea"),
    gameAreaWidth: document.getElementById("gameArea").clientWidth,
    gameAreaHeight:null,
    canvasGrid:{},

    newCanva: function (canvaId,divs,color)
    {
        let canva = document.createElement("canvas");
        canva.id = canvaId;
        canva.width = this.gameAreaWidth;
        canva.height = 400;
        this.gameAreaDiv.appendChild(canva);
        
        this.canvasGrid[canvaId]=new Grid(canva,parseInt(this.gameAreaWidth/divs),color);
    },
    iniGameArea: function ()
    {
        this.gameAreaDiv.style.height="400px";
        this.gameAreaHeight=400;
    }
}

GameArea.iniGameArea();

let Control =
{
    onKeyboard: function (e) 
    { 
       let target = e.target|| e.srcElement;
       return this.onDirectionKey(target.id);
    },
    onDirectionKey: null,
    onFunctionKey: null
}

for(button of document.getElementsByClassName("controlButton"))
{
    button.addEventListener("click",Control.onKeyboard.bind(Control));
}

function Snake(grid,iniBody,iniDirection,color)
{
    this.body=iniBody;
    this.direction=iniDirection;
    this.grid=grid;
    this.preTail=iniBody[iniBody.length-1];

    for(node of this.body)
    {
        this.grid.fillGrid(node);
    }
}
Snake.prototype.move=function()
{
    this.grid.cleanGrid(this.body[this.body.length-1]);
    this.preTail=this.body.pop();
    let head=this.grid.offset(this.body[0],this.direction,1);
    this.body.unshift(head);
    this.grid.fillGrid(this.body[0]);
}
Snake.prototype.onKeyboard=function(direction)
{
    if(["up","down","left","right"].includes(direction)==false)return;
    if(this.direction=="left"&&direction=="right")return;
    if(this.direction=="right"&&direction=="left")return;
    if(this.direction=="up"&&direction=="down")return;
    if(this.direction=="down"&&direction=="up")return;
    this.direction=direction;
}

function Cake()
{
    
}