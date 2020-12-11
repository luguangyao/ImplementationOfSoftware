titleNewsNum=4;
newsType=1;
var docWidth=null;
var $wrap = null;
var $images = null;
var slidesWidth = null;
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
            console.log(newsData);
            setNewsList(newsData);
        }
    }
    // /data/:type/:num === 根据需求返回数据
    // /title_news/:type/:num
    xmlhttp.open("GET",'/'+["title_news",String(newsType),String(titleNewsNum)].join('/'),true);
    xmlhttp.send();
}
function setNewsList(newsData){
    $newsDiv=$("#wrap");
    $newsDiv.empty();
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
        // let description=newsData[n]["content"]
        let nid=newsData[n]["nid"]
        let time=new Date(newsData[n]["publishtime"]);
        let url=newsData[n]["url"]
        // console.log(url)
        // timestr=[String(time.getFullYear()),String(time.getMonth()),time.getDate()].join('-')
        // $p=$("<li class=\"list-group-item\"></li>")
        $a=$("<a href='http://localhost:3000/new/"+nid+"' class=\"hb\"></a>")
        $d=$("<div class=\"c\"></div>")
        $img=$("<img src='http://localhost:3000/public/image/NEWSimage/"+url+"' alt=''></img>")
        $d2=$("<div class=\"txt\"></div>")
        $h=$("<h1>"+title+"</h1>")
        $a.attr("onclick","gotoNewsDetail("+nid+")")
        $d2.append($h)
        $d.append($img).append($d2)
        $a.append($d)
        $newsDiv.append($a)
    }
    docWidth = $('body').width();
    $wrap = $('#wrap');
    $images = $('#wrap .hb');
    console.log($images.length);
    slidesWidth = $wrap.width();
    $(document).mousemove(function(e) {
        if ($('#wrap').is(":hover")){
            let mouseX = e.pageX
            let slidesWidth=$wrap.width()
            let offset = mouseX / docWidth * slidesWidth - mouseX / 2;

            $images.css({
                '-webkit-transform': 'translate3d(' + -offset + 'px,0,0)',
                'transform': 'translate3d(' + -offset + 'px,0,0)'
            });
        }

    });
    $(window).on('resize', function(){
        docWidth = $('body').width();
        slidesWidth = $wrap.width();

    })
}

$(function (){
    getListData();
})