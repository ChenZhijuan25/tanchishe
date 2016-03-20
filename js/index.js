$(function(){
	var s = '';
	for(var i = 0 ; i < 20; i++){
		for(var j = 0; j < 20; j++ ){
			var id = i+'_'+j;
			s += '<div id="'+id+'" class="block"></div>'
		}
	}
	$('#sence').html(s);
	var snake = [ {x:0,y:0},{x:0,y:1},{x:0,y:2} ];
	var data =  {'0_0':true,'0_1':true,'0_2':true};
	var huashe  = function(){
		$.each(snake,function(index,value){
			$('#'+ value.x + '_'+ value.y).css({backgroundImage:'url(./images/qiu1.png)',backgroundSize:'29px 29px'});
		})
	}
	huashe();

	var dropFood = function() {
		var x = Math.floor(Math.random()*20);		
		var y = Math.floor(Math.random()*20);		
		while( data[x+'_'+y] ){
			x = Math.floor(Math.random()*20);		
			y = Math.floor(Math.random()*20);		
		}
		$('#'+x+'_'+y).css({backgroundImage:'url(./images/apple1.png)',backgroundSize:'30px 30px'});
		return {x:x,y:y};
	}
    var score=0;
	var ss=$('#score').text("score"+score);	
	var food = dropFood();
	$("#0_2").css({backgroundSize:"29px 29px",backgroundImage:"url(./images/sanke2.png)"});
	var fangxiang = 39;
	var move = function () {
		var oldTou = snake[snake.length-1];
		$("#"+oldTou.x+"_"+oldTou.y).css({backgroundSize:"29px 29px",backgroundImage:"url(./images/qiu1.png)"});

		if(fangxiang == 39){
			var newTou = {x:oldTou.x,y:oldTou.y+1};
			$("#"+newTou.x+"_"+newTou.y).css({backgroundSize:"29px 29px",backgroundImage:"url(./images/sanke2.png)"});
		}
		if(fangxiang == 40 ){
			var newTou = {x:oldTou.x+1,y:oldTou.y};
			$("#"+newTou.x+"_"+newTou.y).css({backgroundSize:"29px 29px",backgroundImage:"url(./images/sanke3.png)"});
		}
		if(fangxiang == 37){
			var newTou = {x:oldTou.x,y:oldTou.y-1};
			$("#"+newTou.x+"_"+newTou.y).css({backgroundSize:"29px 29px",backgroundImage:"url(./images/sanke4.png)"});
		}
		if(fangxiang == 38){
			var newTou = {x:oldTou.x-1,y:oldTou.y};
			$("#"+newTou.x+"_"+newTou.y).css({backgroundSize:"29px 29px",backgroundImage:"url(./images/sanke1.png)"});
		}
		if(newTou.x<0||newTou.y<0||newTou.x>19||newTou.y>19||data[newTou.x+'_'+newTou.y]){
			
			alert("撞死了");
			clearInterval(timeid);
			var ab=confirm("是否再来一次");
			if(ab){
				location.reload();
			}
			else{
				return false;
			}
			return;
		}
		if(newTou.x == food.x && newTou.y == food.y){
			food = dropFood();
		    score+=5;
		    ss=$('#score').text("scrore:"+score);
		}else{
			var weiba = snake.shift();
			delete data[weiba.x+'_'+weiba.y];
			$('#'+weiba.x+'_'+weiba.y).css({backgroundImage:'url(./images/weiba.png)'});
		}
		snake.push(newTou)
		data[newTou.x + '_' + newTou.y] = true;
		// $('#'+newTou.x + '_' + newTou.y).css({backgroundImage:'url(./images/snake.png)',backgroundSize:'29px 29px'})
	}	
	var timeid;
   	$("#start").click(function(){
		 timeid=setInterval(move,100);
	})
	$("#end").click(function(){
		 clearInterval(timeid);
	})
	$(document).keydown(function(e){
		if( Math.abs(e.keyCode - fangxiang) == 2 ){
			return;
		}
		if( !(e.keyCode>=37 && e.keyCode<=40 ) ){
			return;
		}
	    fangxiang = e.keyCode;
	})	

	
      touch.on( '#sence' ,'swipe', function(e){
        e.preventDefault();
        if(e.direction){
          direct =  e.direction;
        }
      })
})