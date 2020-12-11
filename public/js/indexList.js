anNum=3;
anType=2;
tsType=4;
tsNum=5;
function getAnList(){
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            res=xmlhttp.responseText;
            newsData=JSON.parse(res);
            console.log(newsData);
            setAnList(newsData);
        }
    }
    console.log(anNum);
    xmlhttp.open("GET",'/'+["data",String(anType),String(anNum)].join('/'),true);
    xmlhttp.send();
}
function setAnList(newsData){
    $anDiv=$("#anDiv");
    if(newsData.length<=0){
        $p=$("<li class=\"list-group-item\"></li>")
        $a=$("<a href=\"\">"+"暂无消息"+"</a>")
        $span=$("<span></span>")
        $p.append($a).append($span)
        $newsUl.append($p)
        $p.slideUp(10).slideDown(500)
        return
    }
    for(let n in newsData){
        let title=newsData[n]["title"]
        if (title.length>36){
            title=title.slice(0,36)
        }
        let nid=newsData[n]["nid"]
        let time=new Date(newsData[n]["publishtime"]);
        let url=newsData[n]["url"]
        timestr=[String(time.getFullYear()),String(time.getMonth()),time.getDate()].join('-')
        $a=$("<a href='http://localhost:3000/new/"+nid+"' class=\"noDec\"></a>")
        $d=$("<div class=\"\"></div>")
        $p=$("<p>"+title+"</p>")
        $s=$("<small class=\"float-right mt-1\">"+timestr+"</small>")
        $p.append($s)
        $a.append($p)
        $d.append($a)
        $sp=$("<hr class='splitLine'>")
        $anDiv.append($d)
        $anDiv.append($sp)
    }
}
function getTsList(){
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            res=xmlhttp.responseText;
            newsData=JSON.parse(res);
            console.log(newsData);
            setTsList(newsData);
        }
    }
    console.log(tsNum);
    xmlhttp.open("GET",'/'+["data",String(tsType),String(tsNum)].join('/'),true);
    xmlhttp.send();
}
function setTsList(newsData){
    $tsDiv=$("#tsDiv");
    if(newsData.length<=0){
        $p=$("<li class=\"list-group-item\"></li>")
        $a=$("<a href=\"\">"+"暂无消息"+"</a>")
        $span=$("<span></span>")
        $p.append($a).append($span)
        $newsUl.append($p)
        $p.slideUp(10).slideDown(500)
        return
    }
    for(let n2 in newsData){
        let title=newsData[n2]["title"]
        if (title.length>36){
            title=title.slice(0,36)
        }
        let nid=newsData[n2]["nid"]
        let time=new Date(newsData[n2]["publishtime"]);
        let url=newsData[n2]["url"]
        timestr2=[String(time.getFullYear()),String(time.getMonth()),time.getDate()].join('-')
        $a=$("<a href='http://localhost:3000/new/"+nid+"' class=\"noDec\"></a>")
        // $h5=$("<h5 class=\"mt-0\">"+title+"</h5>")
        // $sup=$("<sup>"+timestr+"</sup>")
        // $img=$("<img   src=\"http://localhost:3000/public/image/1.png\"  class=\" w-25\" >")
        $d=$("<div class=\"news\"></div>")
        $p=$("<p>"+title+"</p>")
        $sm=$("<small class=\"float-right mt-1\" >"+timestr2+"</small>")
        $sp=$("<hr class='splitLine'>")
        // $a.append($h5)
        // $a.append($sup)
        $p.append($sm)
        $a.append($p)
        $d.append($a)
        // $db=$("<div class=\"media-body ml-3\"></div>")
        // $db.append($a)
        // $d.append($db)
        $tsDiv.append($d)
        $tsDiv.append($sp)
    }
}
$(function (){
    getAnList();
    getTsList();
    // getStList();
    // getXyList();
})