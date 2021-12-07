var saveNum;

$(document).ready(function() {    
	winnumCall();
	recommendationCall();

	$('#logout').click(function(){
		logoutCall();
	});

	$('#retry').click(function(){
		runnumCall();
	});

	$('#save').click(function(){
		usenumSave();
	});
});

function logoutCall(){
	var url 	= "user/out";
	var obj 	= new Object();

	obj.token 	= localStorage.getItem("access_token");

	var data = postCall(url, obj);

	console.log("data : " + data);

	if(data.code == 200){
		localStorage.clear();
		window.location = "index.html";
	}
}

function recommendationCall(){
	var result;
	data = usenumCall();
	if(data.result == null){
		runnumCall();
	}else{
		usenumSet(data.result)
	}
}

function usenumCall(){
	var url = "lotto/user/num";
	var result = getCall(url);
	console.log("usenumCall " + result);
	return result;
}

function usenumSet(data){
	$('#rannum1').text(data.lottoNum1);
	$('#rannum2').text(data.lottoNum2);
	$('#rannum3').text(data.lottoNum3);
	$('#rannum4').text(data.lottoNum4);
	$('#rannum5').text(data.lottoNum5);
	$('#rannum6').text(data.lottoNum6);
	$('#rannum7').text(data.lottoNumBnus);
}

function usenumSave(){
	var url = "lotto/save/num";
	var obj = new Object();
	obj.lottoNum		= saveNum.drwNo;
	obj.lottoNum1 		= saveNum.drwtNo1;
	obj.lottoNum2 		= saveNum.drwtNo2;
	obj.lottoNum3 		= saveNum.drwtNo3;
	obj.lottoNum4 		= saveNum.drwtNo4;
	obj.lottoNum5 		= saveNum.drwtNo5;
	obj.lottoNum6 		= saveNum.drwtNo6;
	obj.lottoNumBnus 	= saveNum.bnusNo;

	postCall(url, obj);
}

function runnumCall(){
	var url = "lotto/random/num";
	var result = getCall(url);
	rannumSet(result);
}

function rannumSet(data){
	$('#rannum1').text(data.drwtNo1);
	$('#rannum2').text(data.drwtNo2);
	$('#rannum3').text(data.drwtNo3);
	$('#rannum4').text(data.drwtNo4);
	$('#rannum5').text(data.drwtNo5);
	$('#rannum6').text(data.drwtNo6);
	$('#rannum7').text(data.bnusNo);
}

function winnumCall(){
	var url = "lotto/num";
	var result = getCall(url);
	winnumSet(result);
}

function winnumSet(data){
	$('.firstAccumamnt').text("a prize money : " + data.firstAccumamnt + "￦");
	$('#winnum1').text(data.drwtNo1);
	$('#winnum2').text(data.drwtNo2);
	$('#winnum3').text(data.drwtNo3);
	$('#winnum4').text(data.drwtNo4);
	$('#winnum5').text(data.drwtNo5);
	$('#winnum6').text(data.drwtNo6);
	$('#winnum7').text(data.bnusNo);
}

function rannumSet(data){
	$('#rannum1').text(data.drwtNo1);
	$('#rannum2').text(data.drwtNo2);
	$('#rannum3').text(data.drwtNo3);
	$('#rannum4').text(data.drwtNo4);
	$('#rannum5').text(data.drwtNo5);
	$('#rannum6').text(data.drwtNo6);
	$('#rannum7').text(data.bnusNo);
	saveNum = data;
}

function refrashToken(use_url){
	var url = "http://Lotto-env.eba-tbzzcndk.ap-northeast-2.elasticbeanstalk.com/v1/" + use_url;
	var access_token = localStorage.getItem("access_token");
	var refresh_token = localStorage.getItem("refresh_token");

	$.ajax({ 
		url: url, 
		method: "GET", 
		dataType: "json",
		async: false,
		headers: {"Authorization" : "Bearer " + refresh_token}
	}) 
	.done(function(json) {
		console.log(json)
	}) 
	.fail(function(xhr, status, errorThrown) { 
		console.log(xhr)  
		console.log(status)  
		console.log(errorThrown)  
	})
	.always(function(xhr, status) { 
		console.log(status) 
	})
}

function getCall(use_url){
	var url = "http://Lotto-env.eba-tbzzcndk.ap-northeast-2.elasticbeanstalk.com/v1/" + use_url;
	var access_token = localStorage.getItem("access_token");
	var result;

	$.ajax({ 
		url: url, 
		method: "GET", 
		dataType: "json",
		async: false,
		headers: {"Authorization" : "Bearer " + access_token}
	}) 
	.done(function(json) {
		console.log(json);
		result = json;
	}) 
	.fail(function(xhr, status, errorThrown) { 
		console.log(xhr)  
		console.log(status)  
		console.log(errorThrown)  
	})
	return result;
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
			"Authorization" : "Bearer " + access_token,
			"accept" : "application/json",
			"content-type" : "application/json;charset=UTF-8"
		}
	}) 
	.done(function(json) {
		console.log(json) 
		result = json;
	}) 
	.fail(function(xhr, status, errorThrown) { 
		console.log(xhr)  
		console.log(status)  
		console.log(errorThrown)  
	})

	return result;
}