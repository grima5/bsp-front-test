$(document).ready(function() {

	$("#id").blur(function() {
		var name = $('#id').val();
		console.log(name);
		if(isEmail(name) == false){
			$('#err_id').text("email 형식이 잘못되었습니다.");
			$("#err_id").css("display","block"); 
			return
		} else {
			$('#err_id').text("");
			$("#err_id").css("display","none"); 
			return
		}
	});

	$("#pswd1").blur(function() {
		var password = $('#pswd1').val();
		if(isPwd(password) == false){
			$('#err_pwd').text("password 형식이 잘못되었습니다.");
			$("#err_pwd").css("display","block"); 
			return
		} else {
			$('#err_pwd').text("");
			$("#err_pwd").css("display","none"); 
			return
		}
	});

	$("#pswd2").blur(function() {
		var password1 = $('#pswd1').val();
		var password2 = $('#pswd2').val();

		if(password1 != password2){
			$('#err_pwd2').text("password가 서로 다릅니다.");
			$("#err_pwd2").css("display","block"); 
			return
		}else{
			$('#err_pwd2').text("");
			$("#err_pwd2").css("display","none"); 
		}

		if(password1 =! null && isPwd(password2) == false){
			$('#err_pwd2').text("password 형식이 잘못되었습니다.");
			$("#err_pwd2").css("display","block"); 
			return
		} else {
			$('#err_pwd2').text("");
			$("#err_pwd2").css("display","none"); 
			return
		}
	});

	$('#btnJoin').click(function(){
		var name = $('#id').val();
		var password = $('#pswd1').val();
		var password2 = $('#pswd2').val();

		if(isEmail(name) == false){
			$('#id').focus();
			return
		}

		if(isPwd(password) == false){
			$('#pswd1').focus();
			return
		}

		if(isPwd(password2) == false){
			$('#pswd2').focus();
			return
		}

		if(password == password2){
			var url 		= "user/create";
			var obj 		= new Object();
			obj.name 		= name;
			obj.password 	= password;

			postCall(url, obj);
		}else{
			$('#pswd2').focus();
			return
		}
	});
});

function isPwd(password) {
	var regex  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
	return regex.test(password);
}  

function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function postCall(use_url, use_param){
	var url = "http://Lotto-env.eba-tbzzcndk.ap-northeast-2.elasticbeanstalk.com/v1/" + use_url;
	var access_token = localStorage.getItem("access_token");
	var result;

	$.ajax({ 
		url: url, 
		method: "POST", 
		data: JSON.stringify(use_param),
		dataType: "json",
		async: false,
		headers: {
			"accept" : "application/json",
			"content-type" : "application/json;charset=UTF-8"
		}
	}) 
	.done(function(json) {
		console.log(json) 
		if(json.code == 400){
			$('#err_id').text("중복된 아이디 입니다.");
			$("#err_id").css("display","block"); 
			$('#id').focus();
		}else if(json.code == 200){
			window.location = "index.html";
		}
	}) 
	.fail(function(xhr, status, errorThrown) { 
		console.log(xhr)  
		console.log(status)  
		console.log(errorThrown)  
	})
}