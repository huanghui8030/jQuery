// JavaScript Document
var pie = {
    run:function(opts){
        if(!opts.id) throw new Error("must be canvas id.");
        var canvas = document.getElementById(opts.id), ctx;
        if(canvas && (ctx = canvas.getContext("2d"))){
            canvas.width = canvas.height = "200";
            var noop = function(){};
            var before = opts.onBefore || noop;
            var after = opts.onAfter || noop;
            before(ctx);
            if(opts.percent<0.5){
                ctx.fillStyle = opts.color || '#f9684b';
            }else{
                ctx.fillStyle = opts.color || '#48B325';
            }
            
            var step = opts.step || 1;
            var delay = opts.delay || 3;
            var i = 0, rage = 360 * (opts.percent || 0);
            var sRage = -Math.PI * 0.5;
            var djs = function(){
                i = i + step;
                if(i <= rage){
                    ctx.beginPath();
                    ctx.moveTo(100, 100);   
                    ctx.arc(100, 100, 100, sRage, Math.PI * 2 * (i/360)+sRage);
                    ctx.fill();
                    setTimeout(djs, delay);
                } else {
                    after(ctx);
                }
            };
            djs();
        }
    }
};
var p=0;
var len=$(".jqm-round-wrap").length;
for(p=0;p<len;p++){
    //获取百分比
	var k=$("#jqm-round-sector"+p).next(".jqm-round-circle").find("p").html();
		k=percentTofloat(k);
    //设置pie中opts的值
	pie.run({
		id:"jqm-round-sector"+p,
		percent: k,
        delay:parseFloat($("#jqm-round-sector"+p).attr('delay')),
		onBefore:function(ctx){
			ctx.fillStyle = '#ebebeb';
			ctx.beginPath();
			ctx.moveTo(100, 100);   
			ctx.arc(100, 100, 100, 0, Math.PI * 2);
			ctx.fill();
		}
	});
}
//处理百分数，转为小数。
function percentTofloat(km){
		if(km.substring(km.length-1,km.length)=="%"){
			km = km.substring(0,km.length-1);
			km = km/100;
		}
		return km;
	}