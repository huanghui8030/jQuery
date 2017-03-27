/**
 * @description gulp配置文件
 * @author huanghui
 * @date 20170223
 */
var gulp = require('gulp'),                      //本地安装gulp所用到的地方
    rename = require('gulp-rename'),             //重命名
    watch = require('gulp-watch'),               //即时编译
    clean = require('gulp-clean'),               //删除文件，做操作前先删除文件
    imgmin = require('gulp-imagemin');           //图片压缩


var ArrAll = {     
    imgSrc : 'oldimages',   //原图片路径
    imgNew : 'images'       //新图片路径
};   

//图片处理
gulp.task('imgmin',function(){
  gulp.src(ArrAll.imgSrc+'/*.{png,jpg,jpeg,gif,ico}')
      .pipe(imgmin({
          optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
          progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
          interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
          multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
      }))
      .pipe(rename(function (path) {
        path.dirname += "./images";
        path.basename += "-new";
      }))
      .pipe(gulp.dest(ArrAll.imgSrc));
});

gulp.task('clean',function(){
  gulp.src([ArrAll.imgNew])
      .pipe(clean());
});

gulp.task('watch',function(){
	gulp.watch(ArrAll.imgSrc+'/*.{png,jpg,jpeg,gif,ico}',['imgmin']);  
});


gulp.task('default',function(){
	gulp.start(['clean','imgmin','watch']);
});

