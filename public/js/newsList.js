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
        $newsHeadA=$(".newsHeadA") 
        getHeadData()
      
      
    });
    getListData()
    $("#footer").load("http://localhost:3000/template/footer.html");
})
                         

function getListData(){
    var data = window.location.href.split('/').reverse();
    newsType = data[0].replace("#",""); 
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
        let time=new Date(newsData[n]["publishtime"]);
        timestr=[String(time.getFullYear()),String(time.getMonth()),time.getDate()].join('-')
        $p=$("<li class=\"list-group-item\"></li>")
        $a=$("<a href=#>"+title+"</a>")
        $a.attr("onclick","gotoNewsDetail("+nid+")")
        $span=$("<span>"+timestr+"</span>")
        $p.append($a).append($span)
        $newsUl.append($p)
        $p.slideUp(10).slideDown(500)
    }
}

function getHeadData(){
        var xmlhttp;
        if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
        else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
        xmlhttp.onreadystatechange=function(){  
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            res=xmlhttp.responseText;
            res=JSON.parse(res)
            for(i=0;i<res.length;i++){
                setNewsHead(res[i],i)
                headNews.push(res[i])
            }
           
           // setNewsHead(news,i)
        }
        }
        xmlhttp.open("GET",'/'+["title_news",newsType,3].join('/'),true);
        xmlhttp.send();
}
function setNewsHead(news,i){
    console.log(news)
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
    $($swiperYear[i]).html(year)
    $($swiperDayMonth[i]).html([month,date].join('-'))
    $($swiperTitle[i]).html(String(title))
    $($swiperNewsSum[i]).html(String(content))
    $($newsHeadA[i]).attr("onclick","gotoNewsDetail("+news['nid']+")")
    //设置轮播
    $('.img-count').each(function (index, element) {
        var imgH = $(this).height();
        var imgW = $(this).width();
        var $thisimg = $(this).find('img');
        var img = new Image();
        img.onload = function () {
            if ($thisimg.data("img") === false) {
                return '';
            }
            var imgWidth = img.width;
            var imgHeight = img.height;
            if ((imgWidth / imgHeight) < (imgW / imgH)) {
                $thisimg.css({'height': (imgW / imgH) * ((imgHeight * 1.00) / imgWidth) * imgH, 'max-height': (imgW / imgH) * ((imgHeight * 1.00) / imgWidth) * imgH, 'top': -((imgW / imgH) * ((imgHeight * 1.00) / imgWidth) - 1) / 2 * imgH})
            } else {
                $thisimg.css({'width': (imgH / imgW) * ((imgWidth * 1.00) / imgHeight) * imgW, 'max-width': (imgH / imgW) * ((imgWidth * 1.00) / imgHeight) * imgW, 'left': -((imgH / imgW) * ((imgWidth * 1.00) / imgHeight) - 1) / 2 * imgW})     
            }
        }
        img.src = $thisimg.attr("src");
    });
    var swiper = new Swiper('#newsList1', {
        effect : 'fade',
        fadeEffect: {
            crossFade: true,
        },
        direction : 'horizontal',
        loop: true,
        autoplay : {
            delay:5000,//滚动速度
            disableOnInteraction: false,
        },
        pagination: {
            el: '.adSN_page',
            clickable :true,
        },
        on:{
            init:function(){
                var total=this.slides.length-2;
                $('.swiper-num .total').text('0'+total);
                this.emit('transitionEnd');
            },
            transitionEnd:function(){
                var index=this.realIndex+1;
                $(".swiper-num .active").text("0"+index);
            }
        }
    });
    //imgCount();
    $(window).resize(function () {
        imgCount();
    });

}

function searchNew(){
    $keyWord=$("#keyWord")
    keyWord=$keyWord.val()
    searchNews=[];
    for(i in newsData){
        news=newsData[i]
        if(news["title"].search(keyWord)>=0){
            searchNews.push(news)
        }
    }
    setNewsList(searchNews)
}

function showAllNew(){
    setNewsList(newsData)
}

function gotoNewsDetail(nid){
    console.log(nid)
    //window.location.replace="http://localhost:3000/new/1"
    window.location.replace("http://localhost:3000/new/"+nid);
}