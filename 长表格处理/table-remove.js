/**
 * 长表格处理：表头可拖动改变宽度；右键菜单可选择需要隐藏的列。
 * @param {String} id      表格id
 * huanghui 20180524
 */
function TableRmove(id) {
    var table = document.getElementById(id), //表格
        rightID = 'right',
        tableTr = table.rows[0], //表头
        tTD, //用来存储当前更改宽度的Table Cell
        menuArr = []
    $table = $("#" + id); //需要隐藏的列

    var thArr = [];
    $table.find('thead th').each(function() {
        thArr.push($.trim($(this).text()));
    });

    var menuHtml = "<div id='menu-right' style='display: none'>" +
        "<h3>隐藏选择列</h3>" +
        "<ul><li>";
    for (var i = 0; i < thArr.length; i++) {
        menuHtml += '<input type="checkbox" name="tableRightMenu">' + thArr[i] + '</li><li>';
    }
    menuHtml += '</ul></div>';
    $table.parent().append(menuHtml);

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
            if (tTD == undefined) {
                tTD = this;
            }
            tTD.mouseDown = false;
            tTD.style.cursor = 'default';
        };
        tableTr.cells[j].onmousemove = function(event) {
            var event = event || window.event;
            //更改鼠标样式
            if (event.offsetX > this.offsetWidth - 10) {
                this.style.cursor = 'col-resize';
            } else {
                this.style.cursor = 'default';
            }
            //取出暂存的Table Cell
            if (tTD == undefined) {
                tTD = this;
            }
            //调整宽度
            if (tTD.mouseDown != null && tTD.mouseDown == true) {
                tTD.style.cursor = 'default';
                if (tTD.oldWidth + (event.x - tTD.oldX) > 0) {
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


    document.onclick = function(event) {
        var event = event || window.event;
        var $target = $(event.target);
        if ($target[0].name !== 'tableRightMenu' &&
            !($target.parent().parent().attr('id') ||
                $target.parent().attr('id'))
        ) {
            $('#menu-right').css('display', 'none');
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
    //右键，位置固定，在目标元素的右侧。
    tableTr.oncontextmenu = function(event) {
        var $target = $((event || window.event).target);
        var offset = $target.offset(),
            top = offset.top - 6,
            left = offset.left + $target.width()
        $('#menu-right').css({
            'display': 'block',
            'left': left + "px",
            'top': top + "px"
        });
        //return false为了屏蔽默认事件  
        return false;
    }

    //菜单中的checkbox的change事件
    $('input[name="tableRightMenu"]').change(function(e) {
        var $this = $(this),
            index = $this.index('input'),
            $checkbox = $('input[name="tableRightMenu"]');

        if ($this.is(':checked')) {
            menuArr.push(index);
        } else {
            menuArr.splice(menuArr.indexOf(index), 1);
        }
        //如果剩下最后一个，则不允许选择
        if (menuArr.length === $checkbox.length - 1) {
            $checkbox.not(':checked').attr('disabled', true);
        } else {
            $checkbox.not(':checked').removeAttr('disabled');
        }
    });
    $(window).scroll(function(){
        scrollLis(id);
    });
}

function scrollLis(id) {
    var $table = $('#'+id);
    var toTop = $table.offset().top - $(window).scrollTop();
    if (toTop <= 0) {
        if (!$table.hasClass('table-fixed')) {
            $table.addClass('table-fixed')
        };
    } else {
        $table.removeClass('table-fixed');
    }
}