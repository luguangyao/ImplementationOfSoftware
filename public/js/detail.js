$(function (){
	
	//引入头尾文件
	$(".header").load("/template/navigator.html");
	$(".htmltail").load("/template/footer.html");

	//主功能
	var nid=getid();
	checkid(nid);
	getnews(nid);  //获取当前新闻		
	getcommment();   //推荐新闻
				
	$("#pre").bind('click',function(){
		prenews(nid);
	});
				
	$("#next").bind('click',function(){
		nextnews(nid);
	});
				
});	
			
			
function getid(){   //获取当前新闻id
	var url=new Array();
	var url=window.location.href.split("/");
	var id=url[url.length-1];
	return id;
}
				
function getnews(id){    //获取当前的新闻
	$.ajax({
		url:"/data/0/"+id,
		dataType : 'json',
		type : 'GET',
		success : function(data) {
			//console.log(data);
			var time=Date(parseInt(data[0].publishtime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
			$("#content").html(data[0].content);
			$("#title").html(data[0].title);
			$("#visit").html(data[0].visit);
			$("#publishtime").html(time);
		}
	});
}
				
function findnews(id){    //获取指定id的新闻  
	var flag=-2;
	$.ajax({
		url:"/data/0/"+id,
		dataType : 'json',
		type : 'GET',
		async:false,
		success : function(data) {
			if(parseInt(data.nid)===-1){
				flag=-1;
			}
			else{
				flag=1;
			}
		}
	});
	return flag;
}
				
function getcommment(){  //推荐新闻
	var num=6;  //先找4条数据
	$.ajax({
		url:"/data/-1/"+num,
		dataType : 'json',
		type : 'GET',
		success : function(data) {
			//console.log(data);
			$("#thenews").html("");  //将ul赋值空
			console.log(data)				
			var dataOptions="";
			for(var i=0;i<data.length;i++){
				dataOptions+='<a href="/new/'+data[i].nid+'" class="list-group-item">'+data[i].title+"<span class='badge'>新</span></a>";
				
			}
			console.log(dataOptions);				
			$("#thenews").html(dataOptions); 
		}
	})
					
}
				
function prenews(id){
					
	var find=-1;  //找到标志 -1没找到
	for(;find==-1;){
		id--;
		find=findnews(id);
		// alert(id+"  "+find)
	}
	window.location.href="/new/"+id;
}
				
function nextnews(id){
					
	var find=-1;    //找到标志 -1没找到
	for(;find==-1;){
		id++;
		find=findnews(id);
	}
	window.location.href="/new/"+id;
}
				
function checkid(id){
	if(id==getminid()){
		$("#ll").css("cursor","not-allowed");
		$("#ll").css("color","#777");
		$("#rr").css("cursor","pointer");
	}
	else if(id==getmaxid()){
		$("#rr").css("cursor","not-allowed");
		$("#rr").css("color","#777");
		$("#ll").css("cursor","pointer");
	}
	else{
		$("#ll").css("cursor","pointer");
		$("#ll").css("color","#000000");
		$("#rr").css("cursor","pointer");
		$("#rr").css("color","#000000");
	}
					
}
				
function getmaxid(){  //获取max id新闻条目
	var maxid=1;
	$.ajax({
		url:"/data/-2/-2",
		dataType : 'json',
		type : 'GET',
		async:false,
		success : function(data) {
			maxid=data.max; 
		}
	})
	return maxid;
	//	return 27;
}
				
function getminid(){  //获取min id新闻条目
	var minid=1;
	$.ajax({
		url:"/data/-2/-2",
		dataType : 'json',
		type : 'GET',
		async:false,
		success : function(data) {
			minid=data.min; 
		}
	})
	return minid;
	//	return 1;
}
				
