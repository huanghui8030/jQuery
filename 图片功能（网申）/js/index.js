
$(document).ready(function(){
	var $win = $(window),
		$con1 = $('.container1'),
		$main1 = $('.main1'),
		$showImg1 = $('.showImg1'),
		$imgBox1 = $('.imgBox1'),
		$img1 = $('.img1'),
		$chooseImg1_box = $('.chooseImg1_box'),
		$scale1 = $('.scale1'),
		$btnImgInit1 = $('.btnImgInit1'),
		$btnImgLeft = $('.btnImgLeft'),
		$btnImgRight = $('.btnImgRight');
	var winW = $win.width(),
		winH = $win.height();
	//图片处理事件
	var h1;
	var handle = {
		init1: function(){
			h1 = new HandleImage({
				box: $imgBox1,
				img: $img1
			});
		},
		setImg1: function(src,isNormal){
			h1.setImg(src,isNormal,function(){
				imgListEvent.setScaleText();
			});
		}
	};
	
	//窗口改变事件
	var envFunc = {
		fnSize: function(){
			$(window).on('resize',function(){
				winW = $win.width(),
				winH = $win.height();
				containEvent.setCon();
				containEvent.setShowImg1_height();
				h1.setBoxWH();
			});
		}
	};
	envFunc.fnSize();
	
	//cantanier事件
	var containEvent = {
		init: function(){
			this.setCon();
			this.setShowImg1_height();
            // 这里已经不变了。
			handle.init1();
		},
		//设置container宽高
		setCon: function(){
			$con1.css({
				'width': winW,
				'height': winH
			});
		},
		//设置图片控制区高
		setShowImg1_height: function(){
			$showImg1.css({
				'height': $main1.height() - $chooseImg1_box.height()
			})
		}
	};
	containEvent.init();
	
	//图片选择	普通的width：70+10, 选中active：80+10
	var index = 0;
	var imgListEvent = {
		init: function(){
			handle.setImg1( $('.imgBox1 .img1').attr('src') );
			this.scaleEvent();
			this.mouseWheelEvent();
			this.fnClick();
		},
		scaleEvent: function(){
			var timer = null;
			var btnPos = {
				x: null,
				y: null
			};
			var fnCallback = function(){
				imgListEvent.setScaleText();
			};
			$('.scaleAdd1').on('mousedown',function(e){
				h1.setScale('plus',fnCallback);
				checkBtnPos(e);
				timer = setTimeout(function(){
					fnAnimate('plus');
				},500);
			});
			$('.scaleReduce1').on('mousedown',function(e){
				h1.setScale('reduce',fnCallback);
				checkBtnPos(e);
				timer = setTimeout(function(){
					fnAnimate('reduce');
				},500);
			});
			$('.scaleAdd1').add($('.scaleReduce1')).on('mouseup',function(){
				clearInterval(timer);
				return false;
			});
			$('.scaleAdd1').add($('.scaleReduce1')).on('mousemove',function(e){
				if( Math.abs(e.pageX-btnPos.x)>=5 || Math.abs(e.pageY-btnPos.y)>=5 ){
					clearInterval(timer);
				};
				return false;
			});
			function checkBtnPos(e){
				btnPos.x = e.pageX;
				btnPos.y = e.pageY;
			};
			function fnAnimate(str){
				if( str == 'plus' ){
					timer = setInterval(function(){
						h1.setScale('plus',fnCallback);
					},30);
				}else if( str == 'reduce'){
					timer = setInterval(function(){
						h1.setScale('reduce',fnCallback);
					},30)
				};
			};
		},
		mouseWheelEvent: function(){
			var imgBox1 = $imgBox1.get(0);
			if( document.attachEvent ){
				imgBox1.attachEvent('onmousewheel',move)
			};
			if( document.addEventListener ){
				imgBox1.addEventListener('mousewheel',move,false);
				imgBox1.addEventListener('mousewheel',move,false);
			};
			var fnCallback = function(){
				imgListEvent.setScaleText();
			};
			function move(e){
				var up = true;
				if( e.wheelDelta ){
					up = e.wheelDelta > 0 ? true : false;
				};
				if( e.detail ){
					up = e.detail < 0 ? true : false;
				};
				if( up ){
					h1.setScale('plus',fnCallback);
				}else{
					h1.setScale('reduce',fnCallback);
				};
				if( e.preventDefault ){
					e.preventDefault();
				}else{
					e.returnValue = false;
				}
			};
		},
		setScaleText: function(){
			var scale = Math.round(h1.getScale()*100);
			$scale1.text(scale+'%');
		},
		fnClick: function(){
			$btnImgInit1.on('click',function(){
                handle.setImg1( $('.imgBox1 .img1').attr('src'), true );
			});
            $btnImgLeft.on('click',function(){
                var $img = $('.imgBox1 .img1');
                var rotate = parseInt($img.attr('rotate')) || 0;
                rotate -= 90;
                $img.attr('rotate',rotate);
                $img.css('transform','rotate(' + rotate + 'deg)');
			});
            $btnImgRight.on('click',function(){
                var $img = $('.imgBox1 .img1');
                var rotate = parseInt($img.attr('rotate')) || 0;
                rotate += 90;
                $img.attr('rotate',rotate);
                $img.css('transform','rotate(' + rotate + 'deg)');
                
			});
		}
	};
	imgListEvent.init();
});


















