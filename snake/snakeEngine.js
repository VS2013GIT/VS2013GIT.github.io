function Grid(canva, gridLen, color)  //网格坐标从1开始
{
    this.canva = canva;
    this.context = canva.getContext("2d");
    this.gridLen = gridLen;
    this.color = color;
    // this.gridLen=parseInt(canva.clientWidth/n);
    this.context.fillStyle = this.color;
}

Grid.prototype.fillGrid = function(pos, color)
{
    if (color != undefined)
        this.context.fillStyle = color;
    this.context.fillRect((pos.y - 1) * this.gridLen, (pos.x - 1) * this.gridLen, this.gridLen, this.gridLen);
    if (color != undefined)
        this.context.fillStyle = this.color;
}
Grid.prototype.cleanGrid = function(pos)
{
    this.context.clearRect((pos.y - 1) * this.gridLen, (pos.x - 1) * this.gridLen, this.gridLen, this.gridLen);
}
Grid.prototype.offset = function(posA, direction, steps)
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

let HUD=
{
    HUDDiv:document.getElementById("informationBox")
    
}

let GameArea = {
    gameAreaDiv: document.getElementById("gameArea"),
    gameAreaWidth: undefined,
    gameAreaHeight: undefined,
    hGridDivs:30,
    vGridDivs:35,
    gridLen: undefined,
    canvasGrid:
    {},

    newCanva: function(canvaId, color)
    {
        let canva = document.createElement("canvas");
        canva.id = canvaId;
        canva.width = this.gameAreaWidth;
        canva.height = this.gameAreaHeight;
        this.gameAreaDiv.appendChild(canva);

        this.canvasGrid[canvaId] = new Grid(canva, this.gridLen, color);
    },
    iniGameArea: function()
    {
        const gameAreaMinMargin = 10; //最小边距
        const gameAreaBorder = 2;
        const hGridDivs = this.hGridDivs; //水平网格数
        const vGridDivs = this.vGridDivs; //垂直网格数
        const screenWidth = document.body.clientWidth;

        this.gridLen = parseInt((screenWidth - 2 * (gameAreaMinMargin + gameAreaBorder)) / hGridDivs);

        let fixedMargin = (screenWidth - this.gridLen * hGridDivs - 2 * gameAreaBorder) / 2;

        this.gameAreaDiv.style.marginLeft = fixedMargin + "px";
        this.gameAreaDiv.style.marginRight = fixedMargin + "px";
        this.gameAreaDiv.style.width = hGridDivs * this.gridLen + "px";
        this.gameAreaDiv.style.height = vGridDivs * this.gridLen + "px";
        this.gameAreaWidth=hGridDivs * this.gridLen;
        this.gameAreaHeight=vGridDivs * this.gridLen;
    }
}

GameArea.iniGameArea();

let Control = {
    onKeyboard: function(e)
    {
        let target = e.target || e.srcElement;
        return this.onDirectionKey(target.id);
    },
    onDirectionKey: null,
    onFunctionKey: null
}

for (button of document.getElementsByClassName("controlButton"))
{
    button.addEventListener("click", Control.onKeyboard.bind(Control));
}

function Snake(grid, iniBody, iniDirection, color)
{
    this.body = iniBody;
    this.direction=iniDirection;
    this.turn = iniDirection;
    this.grid = grid;
    this.preTail = iniBody[iniBody.length - 1];

    for (node of this.body)
    {
        this.grid.fillGrid(node);
    }
}
Snake.prototype.move = function()
{
    this.direction=this.turn;
    this.grid.cleanGrid(this.body[this.body.length - 1]);
    this.preTail = this.body.pop();
    let head = this.grid.offset(this.body[0], this.direction, 1);
    this.body.unshift(head);
    this.grid.fillGrid(this.body[0]);
}
Snake.prototype.onKeyboard = function(direction)
{
    if (["up", "down", "left", "right"].includes(direction) == false) return;
    if (this.direction == "left" && direction == "right") return;
    if (this.direction == "right" && direction == "left") return;
    if (this.direction == "up" && direction == "down") return;
    if (this.direction == "down" && direction == "up") return;
    this.turn = direction;
}
Snake.prototype.isCrash=function()
{
    let x=this.body[0].x;
    let y=this.body[0].y;
    /* 检查是否超出边界 */
    if(x<1||y<1||x>GameArea.vGridDivs||y>GameArea.hGridDivs)
        return true;
    /*检查是否身体碰撞 */
    for(let i=1;i<this.body.length;i++)
    {
        if(this.body[i].x==x&&this.body[i].y==y)
        return true;
    }
}
Snake.prototype.grow=function()
{
    this.grid.fillGrid(this.preTail);
    this.body.push(this.preTail);
}

function Cake(grid,color,unreachable)
{
    this.grid=grid;
    this.color=color;
    this.unreachable=unreachable;
    this.pos={x:0,y:0};

    this.produce();
}
Cake.prototype.Random=function(min,max)
{
    return parseInt(Math.random()*(max-min+1)+min,10);
}
Cake.prototype.isEaten=function(pos)
{
    if(pos.x==this.pos.x&&pos.y==this.pos.y)
    return true;
    else
    return false;
}
Cake.prototype.produce=function()
{
    do
    {
        this.pos.x=this.Random(1,GameArea.vGridDivs);
        this.pos.y=this.Random(1,GameArea.hGridDivs);
    }while((()=>
    {
        for(pos of this.unreachable)
        {
            if(this.pos.x==pos.x&&this.pos.y==pos.y)
            return true;
        }
        return false;
    })())
    this.grid.fillGrid(this.pos,this.color);
}