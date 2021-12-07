$(document).ready(function() {
	

	$('#login').click(function(){
		var name = $('#loginId').val();
		var password = $('#loginPw').val();
		var id_check = isEmail(name);
		var pwd_check = isPwd(password);

		if(id_check == false){
			$('#loginId').val("");
			return
		}

		if(pwd_check == false){
			$('#loginPw').val("");
			return
		}

		var url 		= "user/login";
		var obj 		= new Object();
		obj.name 		= name;
		obj.password 	= password;

		postCall(url, obj);
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
		localStorage.setItem("access_token", json.accessToken);
		window.location = "themes.html";
	}) 
	.fail(function(xhr, status, errorThrown) { 
		console.log(xhr)  
		console.log(status)  
		console.log(errorThrown)  
	})
}