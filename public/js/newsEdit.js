
newsId=undefined;
newsTitle=undefined;
newsContent=undefined;
finalHeadImg="";
isUploadImage=false;
nid=-1;
newsTypeMapper={
    "学院动态":1,
    "通知公告":2,
    "党建工作":3,
    "本科生培养":4,
    "研究生教育":5,
    "科学研究":6
}
newsType=undefined;
$(function (){
    $("#navigator").load("http://localhost:3000/template/navigator.html");
    $("#footer").load("http://localhost:3000/template/footer.html");
    tinymce.init({
        selector: '#tinymce', //容器，可使用css选择器
        language:'zh_CN', //调用放在langs文件夹内的语言包
        toolbar: true, //工具栏
        menubar: true, //菜单栏
        branding:false, //右下角技术支持
        inline: false, //开启内联模式
        elementpath: false,
        min_height:1200, //最小高度
        height: 800,  //高度
        skin: 'oxide',
        toolbar_sticky:true,
        visualchars_default_state:true, //显示不可见字符
        image_caption: true,
        paste_data_images: true,
        relative_urls : false,
        // remove_script_host : false,
        removed_menuitems: 'newdocument',  //清除“文件”菜单
        plugins: "lists,hr, advlist,anchor,autolink,autoresize,charmap,code,codesample,emoticons,fullscreen,image,media,insertdatetime,link,pagebreak,paste,preview,print,searchreplace,table,textcolor,toc,visualchars,wordcount", //依赖lists插件
        toolbar: 'bullist numlist anchor charmap emoticons fullscreen hr image imagetools insertdatetime link media pagebreak paste preview print searchreplace textcolor wordcount',
        //选中时出现的快捷工具，与插件有依赖关系
        //images_upload_url:'a.php', /*后图片上传接口*/ /*返回值为json类型 {'location':'uploads/jpg'}*/
        //images_upload_url:'http://localhost:3000/public/js/test.js',
        images_upload_handler: function(blobInfo, success, failure) {
            var form = new FormData();
            //var uploadTime = formatTime(new Date().getTime(),"Y-M-D");
            //console.log(blobInfo.blob())
            form.append('img', blobInfo.blob());
            //, blobInfo.filename()
            $.ajax({
                    url: "http://localhost:3000/upload_img",
                    type: "post",
                    data: form,
                    processData: false,
                    contentType: false,
                    success: function(data) {
						console.log(data);
						//backData = JSON.parse(data);
//                        success(data.location);
						var imgUrl = "/public/image/NEWSimage/"+data.img;
						//console.log(imgUrl);
                        success(imgUrl);

                    },
                    error: function(e) {
                        alert("图片上传失败");
                    }
                });
         }
        
        

    });
    // 获取最后参数
    getData();
    setNewsypeOption();
    nid=window.location.href.split('/').reverse()[0]=='0'?nid:window.location.href.split('/').reverse()[0];
    
    
    

});
/*填入初始数据*/
//tinyMCE.activeEditor.setContent("<h1>测试</h1><hr><h2>这是测试的数据<h2>");
/*
1、如果当前页面只有一个编辑器：
    获取内容：tinyMCE.activeEditor.getContent()
    设置内容：tinyMCE.activeEditor.setContent(“需要设置的编辑器内容”)
2、如果当前页面有多个编辑器（下面的“[0]”表示第一个编辑器，以此类推）：
    获取内容：tinyMCE.editors[0].getContent()
    设置内容：tinyMCE.editors[0].setContent(“需要设置的编辑器内容”)
*/
function setcontent(){
    tinyMCE.activeEditor.setContent("");
    //tinyMCE.editors[0].setContent("<h1>设置内容2</h1>");
}
function getcontent(){
    alert(tinyMCE.activeEditor.getContent());
    console.log(tinyMCE.activeEditor.getContent())
}
/*3、获取不带HTML标记的纯文本内容：
 var activeEditor = tinymce.activeEditor;
 var editBody = activeEditor.getBody();
 activeEditor.selection.select(editBody);
 var text = activeEditor.selection.getContent( {'format' : 'text' } );*/
function getbody(){
    var activeEditor = tinymce.activeEditor;
    var editBody = activeEditor.getBody();
    activeEditor.selection.select(editBody);
    var text = activeEditor.selection.getContent( {'format' : 'text' } );
    alert(text);
}

function getData(){
    var data = window.location.href.split('/').reverse();
    if(data[0]==0){
        return;
    }
    newsId=data[0];
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
            res=JSON.parse(res)[0];
            newsId=res['nid'];
            newsTitle=res['title'];
            newsContent=res['content'];
            setData(newsTitle,newsContent);
            
            


        }
    }
    xmlhttp.open("GET",'/'+['data','0',newsId].join('/'),true);
    xmlhttp.send();


}

function setData(){
    $("#newsTitle").val(newsTitle);
    $('#tinymce').html(newsContent);
}

function uploadHeadImg(){
    headImg=$("#imgFile")[0].files[0]
    var form = new FormData();
    form.append('img', headImg);
    $.ajax({
        url: "http://localhost:3000/upload_img",
        type: "post",
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
			var imgUrl = "/public/image/NEWSimage/"+data.img
            $("#headImg").attr("src",imgUrl)
            finalHeadImg=data.img;
        },
        error: function(e) {
            alert("图片上传失败");
        }
    });
}

function addHeadImg(){
    $isHeadNewsCheckbox=$("#isHeadNewsCheckbox")
    $imgFile=$("#imgFile")
    $headImgDiv=$("#headImgDiv")
    if($isHeadNewsCheckbox.prop("checked")){
        $imgFile.show(500)
        $headImgDiv.show(500)
    }
    else{
        $imgFile.hide(500)
        $headImgDiv.hide(500)
    }
}

function setNewsypeOption(){
    $newsType=$("#newsType")
    $newsType.empty()
    for(i in newsTypeMapper){
        $newsType.append($("<option>"+i+"</option>"))   
    }
}

function uploadNews(){
    newsTitle=$("#newsTitle").val();
    console.log(newsTitle)
    isUploadImage=$("#isHeadNewsCheckbox").prop("checked")
    newsType=newsTypeMapper[$("#newsType").val()]
    newsContent=tinyMCE.activeEditor.getContent()
    if(isUploadImage==true&&finalHeadImg==undefined){
        alert("您还没有上传头条新闻的照片！")
        return
    }
    if(newsTitle.trim()==""||newsContent.trim()==""){
        alert("新闻内容和新闻标题不能为空!")
        return
    }
    form=new FormData()
    form.append("nid",nid);
    form.append("title",newsTitle)
    form.append("context",newsContent)
    form.append("type",newsType)
    if(isUploadImage){
        form.append('url',finalHeadImg)
        console.log(finalHeadImg)
    }
    console.log(form)
    $.ajax({
        url: "http://localhost:3000/EditNew",
        type: "post",
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            console.log("上传成功")
            console.log(data)
        },
        error: function(e) {
            alert("新闻上传失败")
        }
    });
    
}