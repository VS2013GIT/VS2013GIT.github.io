function submit(rank)
{
    function check(comment)
    {
        if(comment.length>20)return true;
        let ilegal=["黄","兵","滨","哲","张","豪","妈","马","延"];
        for(word of ilegal)
        {
            
            if(comment.indexOf(word)!=-1)
            {
                return true;
            }
        }
        if((comment.indexOf("o")!=-1||comment.indexOf("O")!=-1)&&
        (comment.indexOf("s")!=-1||comment.indexOf("S")!=-1))return true;
        return false;
    }
    let comment=document.getElementById("comment");
    bestRecord.comment=comment.value;

    if(check(bestRecord.comment))
    {
        comment.value="";
        alert("请重新输入");
        return;
    }
    if(rank==undefined)
    {
        alert("排名加载失败");
        return;
    }
    if(bestRecord.scores<rank[rank.length-1].scores)
    {
        alert("分数没有超过最后一名");
        return;
    }
    if(bestRecord.scores==rank[rank.length-1].scores&&bestRecord.duration>rank[rank.length-1].duration)
    {
        alert("用时超过最后一名");
        return;
    }
    if(localStorage.getItem("submitted")=="true")
    {
        alert("你已经提交");
        return;
    }
    AV.Cloud.run('addRecord',bestRecord).then(
    function(data)
    {
        alert("提交成功");
        localStorage.setItem("submitted","true");
        window.location.reload();
    },
    function(error)
    {
        alert("由于网络原因提交失败");
    })
}
function GetBestRecord()
{
    if (localStorage.getItem("bestScores") && localStorage.getItem("bestDuration"))
    {
        return {
            scores:parseInt(localStorage.getItem("bestScores")),
            duration:parseInt(localStorage.getItem("bestDuration"))
        }
    }
}

function updateTable(records)
{
    let table = document.getElementById("records");
    let rows = table.rows;
    for (let i = 1; i <= records.length; i++)
    {
        let row = table.insertRow(rows.length);
        row.insertCell(0).innerHTML = records[i - 1].updatedAt;
        row.insertCell(0).innerHTML = records[i - 1].comment;
        row.insertCell(0).innerHTML = records[i - 1].duration;
        row.insertCell(0).innerHTML = records[i - 1].scores;
        row.insertCell(0).innerHTML = i;
    }
}
window.addEventListener("load",function()
{
    let bestScores=document.getElementById("bestScores");
    let bestDuration=document.getElementById("bestDuration");
   if(localStorage.getItem("bestScores")&&localStorage.getItem("bestDuration"))
    {
        bestScores.innerHTML=localStorage.getItem("bestScores");
        bestDuration.innerHTML=localStorage.getItem("bestDuration");
    }
})

AV.init(
{
    appId: "6Wp9wY2U2q4JOI0D2ruVtUg4-MdYXbMMI",
    appKey: "1e7Cqw4sPQpcIK7s6zYMvxyn"
});

localStorage.setItem('debug', 'leancloud*');

let bestRecord = GetBestRecord();

AV.Cloud.run('getRecords').then(
    function(data)
    {
        updateTable(data.rank);
        document.getElementById("submit").addEventListener("click",
        submit.bind(this,data.rank));
    },
    function(error)
    {
        alert("获取排名失败");
    })
