newsNum=10;
newsType=undefined;
newsData=undefined;
headNews=[]
$(function (){
    $("#navigator").load("http://localhost:3000/template/navigator.html");
    $("#swiper").load("http://localhost:3000/template/swiper.html");
    $("#footer").load("http://localhost:3000/template/footer.html");

    var data = window.location.href.split('/').reverse();
    newsType = data[0];
    getListData()
})

function getListData(){
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
            setNewsList();
        }
    }
    xmlhttp.open("GET",'/'+['data',1,String(newsNum)].join('/'),true);
    xmlhttp.send();
}

function setNewsList(){
    $newsUl=$("#newsUl");
    $newsUl.empty();
    for(let n in newsData){
        let title=newsData[n]["title"]
        let nid=newsData[n]["nid"]
        $p=$("<li class=\"list-group-item\"></li>")
        $a=$("<a href=\"\">"+title+"</a>")
        $span=$("<span>2018/2/05</span>")
        $p.append($a).append($span)
        $newsUl.append($p)
        $p.slideUp(10).slideDown(500)
    }
    

    
}

