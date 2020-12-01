$(function(){
	//将有关于扫码的信息隐藏
	pwdcode();
	//将提示信息隐藏	
	$(".infocontent").hide();
						
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
					