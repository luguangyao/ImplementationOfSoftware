anNum=3;
anType=2;
tsType=5;
tsNum=7;
djType=3;
djNum=7;
xyType=1;
xyNum=7;
xsType=6;
xsNum=3;
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
        $a=$("<a href='/new/"+nid+"' class=\"noDec\"></a>")
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
        $a=$("<a href='/new/"+nid+"' class=\"noDec\"></a>")
        // $h5=$("<h5 class=\"mt-0\">"+title+"</h5>")
        // $sup=$("<sup>"+timestr+"</sup>")
        // $img=$("<img   src=\"/public/image/1.png\"  class=\" w-25\" >")
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
function getDjList(){
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
            setDjList(newsData);
        }
    }
    console.log(tsNum);
    xmlhttp.open("GET",'/'+["data",String(djType),String(djNum)].join('/'),true);
    xmlhttp.send();
}
function setDjList(newsData){
    $djDiv=$("#djDiv");
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
        $a=$("<a href='/new/"+nid+"' class=\"noDec\"></a>")
        // $h5=$("<h5 class=\"mt-0\">"+title+"</h5>")
        // $sup=$("<sup>"+timestr+"</sup>")
        // $img=$("<img   src=\"/public/image/1.png\"  class=\" w-25\" >")
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
        $djDiv.append($d)
        $djDiv.append($sp)
    }
}
function getXyList(){
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
            setXyList(newsData);
        }
    }
    console.log(tsNum);
    xmlhttp.open("GET",'/'+["data",String(xyType),String(xyNum)].join('/'),true);
    xmlhttp.send();
}
function setXyList(newsData){
    $xyDiv=$("#xyDiv");
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
        timestr1=[String(time.getMonth()),time.getDate()].join('-')
        timestr2=String(time.getFullYear())
        $t1=$("<div class=\"timerDate\">"+timestr1+"</div>")
        $t2=$("<div class=\"timerYear\">"+timestr2+"</div>")
        $tm=$("<div class=\"timer\"></div>")
        $tm.append($t1).append($t2)
        $db=$("<div class=\"media-body\"></div>")
        $a=$("<a href='/new/"+nid+"' class=\"noDec\"></a>")
        $h5=$("<h5 class=\"mt-0\">"+title+"</h5>")
        $a.append($h5)
        $db.append($a)
        $mn=$(" <div class=\"media news\"></div>")
        $mn.append($tm).append($db)
        $sp=$("<hr class='splitLine'>")
        $xyDiv.append($mn)
        $xyDiv.append($sp)
    }
}
function getXsList(){
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
            setXsList(newsData);
        }
    }
    xmlhttp.open("GET",'/'+["data",String(xsType),String(xsNum)].join('/'),true);
    xmlhttp.send();
}
function setXsList(newsData){
    $xsDiv=$("#xsDiv");
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
        $a=$("<a href='/new/"+nid+"' class=\"noDec\"></a>")
        $d=$("<div class=\"\"></div>")
        $p=$("<p>"+title+"</p>")
        $s=$("<small class=\"float-right mt-1\">"+timestr+"</small>")
        $p.append($s)
        $a.append($p)
        $d.append($a)
        $sp=$("<hr class='splitLine'>")
        $xsDiv.append($d)
        $xsDiv.append($sp)
    }
}
$(function (){
    getAnList();
    getTsList();
    getDjList();
    getXyList();
    getXsList();
})