//var imgData='';
$(document).ready(function(){
	var $win = $(window),
		$con1 = $('.container1'),
		$main1 = $('.main1'),
		$showImg1 = $('.showImg1'),
		$showImg1_btnLeft = $('.showImg1_btnLeft'),
		$showImg1_btnRight = $('.showImg1_btnRight'),
		$imgBox1 = $('.imgBox1'),
		$img1 = $('.img1'),
		$showImg1_btnLeft = $('.showImg1_btnLeft'),
		$showImg1_btnRight = $('.showImg1_btnRight'),
		$chooseImg1_btnLeft = $('.chooseImg1_btnLeft'),
		$chooseImg1_btnRight = $('.chooseImg1_btnRight'),
		$chooseImg1_box = $('.chooseImg1_box'),
		$scale1 = $('.scale1'),
		$btnImgInit1 = $('.btnImgInit1'),
		
	
		$imgListBox1 = $('.imgListBox1'),
		$imgList1 = $('.imgList1');
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
				imgListEvent.imgList1_position();
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
		},
		showText: function(data){
			$('.pTroTit1').text(data['src']);
			$('.pTroName1').text(data['title']);
		}
	};
	containEvent.init();
	
	//图片选择	普通的width：70+10, 选中active：80+10
	var $liActive_1;
	var index = 0;
	var imgListEvent = {
		init: function(){
			this.imgList1_add();
			this.imgList1_click();
			this.scaleEvent();
			this.mouseWheelEvent();
			this.fnClick();
		},
		imgList1_add: function(){
			var str = ''
			for( var i=0; i<imgData.length; i++ ){
				var tmp = imgData[i];
				str += '<li style="background-image:url('+ tmp.src +')" ></li>'
			};
			$imgList1.append(str);
			$imgList1.css({
				'width': (82)*imgData.length + 10
			});
		},
		imgList1_click: function(){
			var self = this;
			$imgList1.find('li').on('click',function(){
				if( $liActive_1 ) $liActive_1.removeClass('active');
				index = $(this).index();
				$(this).addClass('active');
				$liActive_1 = $(this);
				self.imgList1_position();
				handle.setImg1( imgData[index]['src'] );
				containEvent.showText( imgData[index] );
			});
			$imgList1.find('li').eq(0).trigger('click');
		},
		imgList1_position: function(){
			var boxWidth1 = $imgListBox1.width();
			var le = (boxWidth1/2 - index*80);
			le = Math.floor(le/80)*80;
			le = le>=0?0:le;
			var maxLe = (boxWidth1-$imgList1.width())+10;
			le = le<maxLe?maxLe:le;
            le = le>10?0:le;
			$imgList1.css({
				'left': le
			})
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
			$showImg1_btnRight.on('click',function(){
				$liActive_1.next().trigger('click');
			});
			$showImg1_btnLeft.on('click',function(){
				$liActive_1.prev().trigger('click');
			});
			$chooseImg1_btnLeft.on('click',function(){
				var w = $imgListBox1.width();
				var le = parseInt($imgList1.css('left')) + w;
				if( le > 0 ) le = 0;
				$imgList1.css({
					'left': le
				})
			});
			$chooseImg1_btnRight.on('click',function(){
				var w = $imgListBox1.width();
				var minLe = w - $imgList1.width();
				var le = parseInt($imgList1.css('left')) - w;
				if( le <  minLe ) le = minLe;
				$imgList1.css({
					'left': le
				})
			});
			$btnImgInit1.on('click',function(){
				handle.setImg1( imgData[index]['src'], true );
			});
		}
	};
	imgListEvent.init();
});


















