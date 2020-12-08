newsNum=10;
newsType=undefined;
newsData=undefined;
newsHeadId=[];
headNews=[];
$swiperImg=undefined
$swiperYear=undefined
$swiperDayMonth=undefined
$swiperTitle=undefined
$swiperNewsSum=undefined
$newsHeadA=undefined
$(function (){
    $("#navigator").load("http://localhost:3000/template/navigator.html");
    $("#swiper").load("http://localhost:3000/template/swiper.html",function(){
        var data = window.location.href.split('/').reverse();
        newsType = data[0].replace("#",""); 
        $swiperImg=$(".swiperImg")
        $swiperYear=$(".year")
        $swiperDayMonth=$(".day_month")
        $swiperTitle=$(".news-h")
        $swiperNewsSum=$(".news-sum")
        $newsHeadA=$("#newsHeadA")    
        getData()
    });
    $("#footer").load("http://localhost:3000/template/footer.html");
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
            setNewsList(newsData);
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

function setNewsList(newsData){
    $newsUl=$("#newsUl");
    $newsUl.empty();
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
    title=news["title"]
    content=news["content"]
    publishtime=new Date(news["publishtime"])
    year=publishtime.getFullYear()
    month=publishtime.getMonth()
    date=publishtime.getDate()
    imgName=news["url"]!=undefined?news["url"]:"newsDefault.png"
    imgPath="http://localhost:3000/public/image/NEWSimage/"+imgName
    $($swiperImg[i]).attr("src",imgPath)
    $($swiperYear[i]).html(String(year))
    $($swiperDayMonth[i]).html(String(month)+"-"+String(date))
    $($swiperTitle[i]).html(String(title))
    $($swiperNewsSum[i]).html(String(content))
    $($newsHeadA[i]).attr("href")
    

}

function searchNew(){
    $keyWord=$("#keyWord")
    keyWord=$keyWord.val()
    console.log(keyWord)
    console.log(newsData)
    searchNews=[];
    for(i in newsData){
        news=newsData[i]
        if(news["title"].search(keyWord)>=0){
            console.log(news["title"].search(keyWord))
            console.log(news)
            searchNews.push(news)
        }
    }
    setNewsList(searchNews)
}

function showAllNew(){
    setNewsList(newsData)
}