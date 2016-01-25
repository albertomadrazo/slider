var img_qty = 5;
var curr_img = 1;
var leap_front_without_increment = '-400px';
var leap_front = "-=400px";
var leap_back = "+=400px";

var images = '<div id="img-container"><img id="1" src="images/01.jpg"><img id="2" src="images/02.jpg"><img id="3" src="images/03.jpg"><img id="4" src="images/04.jpg"><img id="5" src="images/05.jpg"></div>';

(function addDots(){
	for(var i = 1; i <= img_qty; i++){
		var circle = '<div class="circle clickable button" id="_'+i+'"></div>';

		$("#circles-container").append(circle);
	}
})();

function gotoSquare(n){
	colorCircleOfCurrentImage(n);

	old_image = curr_img;
	var new_images_set = '';
	var temp = '';
	var leap = '';

	// If desired photo is ahead in the pictures order
	if(n > curr_img){
		temp += '<img id="'+curr_img+'" src="images/0'+curr_img+'.jpg">';
		temp += '<img id="'+n+'" src="images/0'+n+'.jpg">';
	}

	// If desired photo is behind in the pictures order
	else if(n < curr_img){
		temp += '<img id="'+n+'" src="images/0'+n+'.jpg">';
		temp += '<img id="'+curr_img+'" src="images/0'+curr_img+'.jpg">';
	}

	else if(n === curr_img){
		return;
	}

	$('#img-container').empty();
	$('#img-container').append(temp);

	if(n < curr_img){
		$('#img-container').css('left', leap_front_without_increment);
		leap = leap_back;
	}

	else if(n > curr_img){
		leap = leap_front;
	}


	$('#img-container').animate({'left': leap}, 1000, function(){
		new_images_set += '<div id="img-container">';
		for(var i = n; i <= img_qty; i++){
			new_images_set += '<img id="'+i+'" src="images/0'+i+'.jpg">';
		}

		for(var i = 1; i < n; i++){
			new_images_set += '<img id="' + i + '" src="images/0' + i + '.jpg">';
		}

		new_images_set += '</div>';
		$('#img-container').remove();
		$('#container').append(new_images_set);
	});

	curr_img = n;
}

function putNewImgSequence(n){
	new_images_set += '<div id="img-container">';
	for(var i = n; i <= img_qty; i++){
		new_images_set += '<img id="'+i+'" src="images/0'+i+'.jpg">';
	}

	for(var i = 1; i < n; i++){
		new_images_set += '<img id="' + i + '" src="images/0' + i + '.jpg">';
	}

	new_images_set += '</div>';
	$('#img-container').remove();
	$('#container').append(new_images_set);
}

function colorCircleOfCurrentImage(n){
	$('.circle').each(function(){
		$(this).css('background-color', 'rgba(0,0,0,0.0)');
		var temp_selector = "#_" + n;
		$(temp_selector).css('background-color', '#de1d09');
	});
}
$(document).ready(function(){
	var intervalo = setInterval(paLante, 3000);
	console.log("intervalo = " + intervalo);
	colorCircleOfCurrentImage(1);

	$("#container").append(images);

	// pa'lante///////////////
	function paLante(){

		deactivateButtons();

		var curr_img_tag = '<img id="'+curr_img+'" src="images/0'+curr_img+'.jpg" class="mierda">';

		var make_selector = "#"+curr_img;

		$('#img-container').animate({left: leap_front}, 1000, function(){

			$('#img-container').append(curr_img_tag);
				$("#img-container :first").remove();
			$('#img-container').css('left', leap_back);

			if(curr_img >= img_qty){

				curr_img = 1;

				$('#img-container').remove();
				$("#container").append(images);
			}
			else{
				curr_img += 1;
			}
			colorCircleOfCurrentImage(curr_img);
			activateButtons();
		});

	}

	// pa'tras ///////////////
	function paTras(){
		deactivateButtons();

		if(curr_img <= 1){
			curr_img = img_qty;
		}
		else{
			curr_img -= 1;
		}

		var curr_img_tag = '<img id="'+curr_img+'" src="images/0'+curr_img+'.jpg">';
		var temp = $('#img-container').clone(true);

		temp.prepend(curr_img_tag);

		var leap ='-'+(1)*400+'px';
		$(temp).css('left', leap);

		$('#img-container').remove();
		$('#container').append(temp);

		$('#img-container').animate({left: leap_back}, 1000, function(){
			$('#img-container :last').remove();
			activateButtons();
			colorCircleOfCurrentImage(curr_img);

		});
	}

	$('#buttonx').on('click', paLante);
	$('#buttony').on('click', paTras);

	// deactivate buttons while animation is running
	function deactivateButtons(){
		$('#buttonx').unbind("click");
		$('#buttony').unbind("click");
	}

	function activateButtons(){
		$('#buttonx').bind("click", paLante);
		$('#buttony').bind("click", paTras);
	}

	$('#circles-container').on('click', 'div', function(){
		var n = parseInt($(this).attr('id')[1]);
		var select_current_circle = "_" + n;
		$(select_current_circle).css('background-color', 'red');
		gotoSquare(n);
	})


	$('.button').on('click', function(){
		var timo = new Date();
		console.log(timo.getTime()+ intervalo);
		console.log(intervalo);

		clearInterval(intervalo);
		intervalo = setInterval(paLante, 3000);
	});
});
