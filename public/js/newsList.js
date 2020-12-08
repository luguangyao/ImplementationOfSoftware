newsNum=10;
newsType=undefined;
newsData=undefined;
newsHeadId=[];
headNews=[];
$(function (){
    $("#navigator").load("http://localhost:3000/template/navigator.html");
    $("#swiper").load("http://localhost:3000/template/swiper.html");
    $("#footer").load("http://localhost:3000/template/footer.html");

    var data = window.location.href.split('/').reverse();
    newsType = data[0].replace("#","");
    getData()
})

function getData(){
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
            newsNum=newsData.length;
            for(i=newsData.length-1;i>=newsData.length-3;i--){
                newsHeadId.push(newsData[i]['nid'])
            }
            for(nt=0;nt<newsHeadId.length;nt++){
                getHeadData(nt);
            }
            
        }
    }
    xmlhttp.open("GET",'/'+["data",String(newsType),String(newsNum)].join('/'),true);
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

function getHeadData(i){
    
        
        var xmlhttp;
        if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
        else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
        xmlhttp.onreadystatechange=function(){  
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            res=xmlhttp.responseText;
            news=JSON.parse(res)[0];
            headNews.push(news)
            setNewsHead(news,i)
        }
        }
        xmlhttp.open("GET",'/'+["data","0",String(newsHeadId[i])].join('/'),true);
        xmlhttp.send();
   
    
}
function setNewsHead(news,i){
    //console.log(news)
    //console.log(i)
    $swiperImg=$(".swiperImg")
    $swiperYear=$(".year")
    $swiperDayMonth=$(".day_month")
    $swiperTitle=$(".news-h")
    $swiperNewsSum=$(".news-sum")
    $newsHeadA=$(".newsHeadA")
    
    title=news["title"]
    content=news["content"]
    publishtime=new Date(news["publishtime"])
    year=publishtime.getFullYear()
    month=publishtime.getMonth()
    date=publishtime.getDate()
    imgName=news["url"]!=undefined?news["url"]:"1606135527117580.png"
    imgPath="http://localhost:3000/public/image/NEWSimage/"+imgName
    $($swiperImg[i]).attr("src",imgPath)
    $($swiperYear[i]).html(String(year))
    $($swiperDayMonth[i]).html(String(month)+"-"+String(year))
    $($swiperTitle[i]).html(String(title))
    $($swiperNewsSum[i]).html(String(content))
    $($newsHeadA[i]).attr("href")
    

}