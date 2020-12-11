$(function(){
	
	//初始化验证码
	getVerify();
	
	//将有关于扫码的信息隐藏
	pwdcode();
	
	//将提示信息隐藏	
	//$(".infocontent").hide();
	$(".infocontent").css("color","#ffffff");
	$(".infocontent").css("background-color","#ffffff");
	$(".infocontent").css("border-color","#ffffff");
	
	//后台验证
	$("#tijiao").click(function(){
			var userid=$("input[name='userid']").val();
			var password=$("input[name='password']").val();
			var verify=$("input[name='verify']").val();
			//alert(username+" "+password+" "+verify);
			$.ajax({
				url : "/loginCheck",//调用后台接口
				dataType : 'json',
				type : 'POST',
				data:{"userid":userid,"password":password,"yzm":verify},
				success : function(data) {
					if(data=="0"){
						$('#alertModal').modal('show'); //显示modal
						$("#alertModal").on('shown.bs.modal',function(){  //alert框
							$("#backinfo").html("请输入UserId");
						}); 
						$("#alertModal").on('hide.bs.modal',function(){  //alert框
							$("#backinfo").html(""); //modal赋空
							getVerify(); //重新生成验证码
							$("#vf").val("")//文本框清空
						});
					} 
					else if(data=="1"){
						$('#alertModal').modal('show'); //显示modal
						$("#alertModal").on('shown.bs.modal',function(){  //alert框
							$("#backinfo").html("请输入Password");
						}); 
						$("#alertModal").on('hide.bs.modal',function(){  //alert框
							$("#backinfo").html(""); //modal赋空
							getVerify(); //重新生成验证码
							$("#vf").val("")//文本框清空
						});
					}
					else if(data=="2"){
						$('#alertModal').modal('show'); //显示modal
						$("#alertModal").on('shown.bs.modal',function(){  //alert框
							$("#backinfo").html("请输入验证码");
						}); 
						$("#alertModal").on('hide.bs.modal',function(){  //alert框
							$("#backinfo").html(""); //modal赋空
							getVerify(); //重新生成验证码
							$("#vf").val("")//文本框清空
						});
					}
					else if(data=="3"){
						$('#alertModal').modal('show'); //显示modal
						$("#alertModal").on('shown.bs.modal',function(){  //alert框
							$("#backinfo").html("用户名密码错误");
						}); 
						$("#alertModal").on('hide.bs.modal',function(){  //alert框
							$("#backinfo").html(""); //modal赋空
							getVerify(); //重新生成验证码
							$("#vf").val("")//文本框清空
							$("input[name='password']").val("");
						});
					}
					else if(data=="4"){
						$('#alertModal').modal('show'); //显示modal
						$("#alertModal").on('shown.bs.modal',function(){  //alert框
							$("#backinfo").html("验证码错误");
						}); 
						$("#alertModal").on('hide.bs.modal',function(){  //alert框
							$("#backinfo").html(""); //modal赋空
							getVerify(); //重新生成验证码
							$("#vf").val("")//文本框清空
						});
					}
					else{
						//console.log(data);
						sessionStorage.setItem("username",data);
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
	$("input[name='userid']").blur(function(){  //用户名验证
		if($("input[name='userid']").val().trim()==""){
			$(".infocontent").css("color","#721c24");
			$(".infocontent").css("background-color","#f8d7da");
			$(".infocontent").css("border-color","#f5c6cb");
			$("#info_mation").text("用户名不能为空");
		} 
		else{
			$(".infocontent").css("color","#ffffff");
			$(".infocontent").css("background-color","#ffffff");
			$(".infocontent").css("border-color","#ffffff");
			$("#info_mation").text("123");
		}
	});
	
	//密码验证
	$("input[name='password']").blur(function(){  
		if($("input[name='password']").val()==""){
			$(".infocontent").css("color","#721c24");
			$(".infocontent").css("background-color","#f8d7da");
			$(".infocontent").css("border-color","#f5c6cb");
			$("#info_mation").text("密码不能为空");
		} 
		else{
			$(".infocontent").css("color","#ffffff");
			$(".infocontent").css("background-color","#ffffff");
			$(".infocontent").css("border-color","#ffffff");
			$("#info_mation").text("123");
		}
	});
	//验证码验证
	$("input[name='verify']").blur(function(){  
		if($("input[name='verify']").val().trim()==""){
			$(".infocontent").css("color","#721c24");
			$(".infocontent").css("background-color","#f8d7da");
			$(".infocontent").css("border-color","#f5c6cb");
			$("#info_mation").text("验证码不能为空");
		} 
		else{
			$(".infocontent").css("color","#ffffff");
			$(".infocontent").css("background-color","#ffffff");
			$(".infocontent").css("border-color","#ffffff");
			$("#info_mation").text("123");
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
					