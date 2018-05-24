/**
 * 长表格处理：表头可拖动改变宽度；右键菜单可选择需要隐藏的列。
 * @param {String} id      表格id
 * @param {String} rightID 右键菜单的id
 * huanghui 20180524
 */
function TableRmove(id,rightID) {
    var table = document.getElementById(id), //表格
        tableTr = table.rows[0], //表头
        tTD,   //用来存储当前更改宽度的Table Cell
        forRight = document.getElementById(rightID),
        menuArr = []; //需要隐藏的列
    for (j = 0; j < tableTr.cells.length; j++) {

        tableTr.cells[j].onmousedown = function(event) { //记录单元格
            var event = event || window.event;
            tTD = this;
            if (event.offsetX > tTD.offsetWidth - 10) {
                tTD.mouseDown = true;
                tTD.oldX = event.x;
                tTD.oldWidth = tTD.offsetWidth;
            }
        };
        tableTr.cells[j].onmouseup = function() {
            //结束宽度调整
            if (tTD == undefined){
                tTD = this;
            }
            tTD.mouseDown = false;
            tTD.style.cursor = 'default';
        };
        tableTr.cells[j].onmousemove = function(event) {
            var event = event || window.event;
            //更改鼠标样式
            if (event.offsetX > this.offsetWidth - 10){
                this.style.cursor = 'col-resize';
            }else{
                this.style.cursor = 'default';
            }
            //取出暂存的Table Cell
            if (tTD == undefined) {
                tTD = this;
            }
            //调整宽度
            if (tTD.mouseDown != null && tTD.mouseDown == true) {
                tTD.style.cursor = 'default';
                if (tTD.oldWidth + (event.x - tTD.oldX) > 0){
                    tTD.width = tTD.oldWidth + (event.x - tTD.oldX);
                }
                //调整列宽
                tTD.style.width = tTD.width;
                tTD.style.cursor = 'col-resize';
                //调整该列中的每个Cell
                table = tTD;
                while (table.tagName != 'TABLE') {
                    table = table.parentElement;
                }
                for (j = 0; j < table.rows.length; j++) {
                    table.rows[j].cells[tTD.cellIndex].width = tTD.width;
                }
            }
        };   
    } 


    document.onclick=function(event){  
        var event = event || window.event;
        var $target = $(event.target);
        if($target[0].name !=='tableRightMenu' &&
            !($target.parent().parent().attr('id')
                ||$target.parent().attr('id'))
        ){
            forRight.style.display = "none";  
            for (var i = 0; i < table.rows.length; i++) {
                var tr = table.rows[i];
                for (var j = 0; j < tr.cells.length; j++) {
                    tr.cells[j].style.display = 'table-cell';
                }
                for (var k = 0; k < menuArr.length; k++) {
                    tr.cells[menuArr[k]].style.display = 'none';
                }
            }
        }
    };
    //右键
    tableTr.oncontextmenu =function(event){
        var event = event || window.event;
        forRight.style.display = "block";  
        //菜单定位  
        forRight.style.left = event.pageX+"px";  
        forRight.style.top = event.pageY+"px";  
        //return false为了屏蔽默认事件  
        return false;  
    }

    //菜单中的checkbox的change事件
    $('input[name="tableRightMenu"]').change(function(e){
        var $this = $(this),
            index = $this.index('input'),
            $checkbox = $('input[name="tableRightMenu"]');
        
        if($this.is(':checked')){
            menuArr.push(index);
        }else{
            menuArr.splice(menuArr.indexOf(index),1);
        }
        //如果剩下最后一个，则不允许选择
        if(menuArr.length === $checkbox.length-1){
            $checkbox.not(':checked').attr('disabled',true);
        }else{
            $checkbox.not(':checked').removeAttr('disabled');
        }
    });
 }