var temp = "<tr> <td>#id#</td> <td><a href='' class='nav-link float-left'>#title#</a></td> <td><a href='#edit#' class='nav-link float-left'>编辑</a><a href='#' class='nav-link float-left' onclick='delNews(DelId)'>删除</a></td></tr>"
var init=  "<tr> <td>新闻id</td> <td>新闻标题</td> <td>操作</td> </tr>"

function showNews(type) {    //获取某个类型的新闻
    $.ajax({
        url: "/data/" + type + "/20",
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            // console.log(data);
            document.getElementById("NewsTable").innerHTML=init;
            for(let i=0;i<20;i++){
                var news = temp;
                news=news.replace("#id#",data[i].nid);
                news=news.replace("#title#",data[i].title);
                news=news.replace("#edit#","/edit/"+data[i].nid)
                news=news.replace("DelId",data[i].nid)
                console.log(news)
                document.getElementById("NewsTable").innerHTML+=news;
            }
        }
    });
}

function searchNews() {    //获取指定id的新闻
    var id=document.getElementById("inputid").value;
    $.ajax({
        url: "/data/" + "0/" + id,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            // console.log(data);
            document.getElementById("NewsTable").innerHTML=init;
            var news = temp;
            news= news.replace("#id#",data[0].nid);
            news=news.replace("#title#",data[0].title);
            console.log(news)
            document.getElementById("NewsTable").innerHTML+=news;
        }
    });
}

function delNews(id) {    //删除指定id的新闻
    $.ajax({
        url: "/del/" + id,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            // console.log(data);
            location.reload();
        }
    });
}