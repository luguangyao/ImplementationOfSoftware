$(function(){
	
	//初始化验证码
	getVerify();
	
	//将有关于扫码的信息隐藏
	pwdcode();
	
	//将提示信息隐藏	
	$(".infocontent").hide();
	
	//后台验证
	$("#tijiao").click(function(){
			var username=$("input[name='username']").val().trim();
			var password=$("input[name='password']").val().trim();
			var verify=$("input[name='verify']").val().trim();
			//alert(username+" "+password+" "+verify);
			$.ajax({
				url : "/loginCheck",//调用后台接口
				dataType : 'json',
				type : 'POST',
				data:{"username":username,"password":password,"yzm":verify},
				success : function(data) {
					if(data=="0"){
						alert("请输入Username");
						getVerify(); //重新生成验证码
					} 
					else if(data=="1"){
						alert("请输入Password");
						getVerify(); //重新生成验证码
					}
					else if(data=="2"){
						alert("请输入验证码");
						getVerify(); //重新生成验证码
					}
					else if(data=="3"){
						alert("用户名密码错误")
						getVerify(); //重新生成验证码
					}
					else if(data=="4"){
						alert("验证码错误");
						getVerify(); //重新生成验证码
					}
					else if(data=="5"){
						//验证成功后记得把session.captcha清空
						window.location.href="/";
					}
				}
			});
		});
		
	//点击更新验证码
	$('#code').on('click',function(){
	    getVerify();
	})
				
	//用户名验证
	$("input[name='username']").blur(function(){  //用户名验证
		if($("input[name='username']").val().trim()==""){
			$(".infocontent").show();
			$("#info_mation").text("用户名不能为空");
		} 
		else{
			$(".infocontent").hide();
			$("#info_mation").text("");
		}
	});
	
	//密码验证
	$("input[name='password']").blur(function(){  
		if($("input[name='password']").val()==""){
			$(".infocontent").show();
			$("#info_mation").text("密码不能为空");
		} 
		else{
			$(".infocontent").hide();
			$("#info_mation").text("");
		}
	});
	//验证码验证
	$("input[name='verify']").blur(function(){  
		if($("input[name='verify']").val().trim()==""){
			$(".infocontent").show();
			$("#info_mation").text("验证码不能为空");
		} 
		else{
			$(".infocontent").hide();
			$("#info_mation").text("");
		}
	});
})
//获取验证码
function getVerify(){
	$.ajax({
		url:'/captcha?t='+Math.random(),
		type:'get',
		success:function(data){
			$('#code').html(data);
		}
	})
}
			
//将与密码有关的隐藏					
function qrcode(){
	$('.password_login').hide();
	$('.code_login').show();
}
//将与扫码有关的隐藏
function pwdcode(){
	$('.code_login').hide();
	$('.password_login').show();
}
					