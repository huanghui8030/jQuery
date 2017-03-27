var jsonData = [];
getJsonFn();
//获取json格式数据，然后根据id来添加div.
function getJsonFn(){
    $.getJSON('js/my.json',function(data,status) {
        var cotHtml = '';
        if(!jQuery.isEmptyObject(data.zymyd)){
            cotHtml = '';
            for (var i = 0 ,j = data.zymyd.length; i < j; i++) {
                cotHtml += '<div id="'+data.zymyd[i].id+'"></div>';
            };
            $('#zymyd').append($(cotHtml));
        }
        if(!jQuery.isEmptyObject(data.yxmyd)){
            cotHtml = '';
            for (var i = 0; i < data.yxmyd.length; i++) {
                cotHtml += '<div id="'+data.yxmyd[i].id+'"></div>';
            };
            $('#yxmyd').append($(cotHtml));
        }
        getChart(data.zymyd,'本专业综合满意度');
        getChart(data.yxmyd,'本');
    });
};
//获取chart
function getChart(strArr){
    console.log(strArr.length);
    for(var i=0,j=strArr.length; i<j ;i++){
        var dateStr = strArr[i];
        var strChart = echarts.init(document.getElementById(dateStr.id));
        var option = setOptionFn(dateStr);
        strChart.setOption(option);
    }
};
    //设置参数
    function setOptionFn(date){
        var text = date.text;
        var subtext = date.subtext;
        var _ption = {
            title : {
                text: text,
                subtext: subtext,
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['⭐️','⭐️⭐️','⭐️⭐⭐️','⭐️⭐⭐️⭐','⭐️⭐⭐️⭐⭐️']
            },
            series : [
                {
                    name: text,
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:12, name:'⭐️'},
                        {value:2, name:'⭐️⭐'},
                        {value:15, name:'⭐️⭐⭐️'},
                        {value:23, name:'⭐️⭐⭐️⭐'},
                        {value:55, name:'⭐️⭐⭐️⭐⭐️'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return _ption;
    }
//专业满意度
var zyldtChart = echarts.init(document.getElementById('zyldt'));
var zyldtOption  = {
    title: {
        text: '专业满意度'
    },
    tooltip: {},
    legend: {
        data: ['本专业综合满意度',
        '本专业办学条件（硬件设施、师资力量等）️',
        '本专业教学质量（授课水平、专业知识结构设置、专业实践等）️',
        '本专业就业（就业环境、就业去向等）️']
    },
    radar: {
        // shape: 'circle',
        indicator: [
           { name: '⭐️', max: 10},
           { name: '⭐️⭐️', max:50},
           { name: '⭐️⭐️⭐️', max: 50},
           { name: '⭐️⭐️⭐️⭐️', max:45},
           { name: '⭐️⭐️⭐️⭐️⭐️', max: 56}
        ]
    },
    series: [{
        name: '专业满意度',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [8, 46, 23, 34, 56],
                name : '本专业综合满意度'
            },
             {
                value : [6, 25, 50, 45, 35],
                name : '本专业办学条件（硬件设施、师资力量等）️'
            },
             {
                value : [4, 50, 43, 23, 15],
                name : '本专业教学质量（授课水平、专业知识结构设置、专业实践等）️'
            },
             {
                value : [10, 7, 13, 15, 57],
                name : '本专业就业（就业环境、就业去向等）️'
            }
        ]
    }]
};
zyldtChart.setOption(zyldtOption);

//院校满意度
var yxChart = echarts.init(document.getElementById('yxldt'));
var yxOption  = {
    title: {
        text: '院校满意度'
    },
    tooltip: {},
    legend: {
        data: ['院校综合满意度',
        '校园环境',
        '生活（费用、食宿条件、业余生活等）']
    },
    radar: {
        // shape: 'circle',
        indicator: [
           { name: '⭐️', max: 10},
           { name: '⭐️⭐️', max:50},
           { name: '⭐️⭐️⭐️', max: 50},
           { name: '⭐️⭐️⭐️⭐️', max:45},
           { name: '⭐️⭐️⭐️⭐️⭐️', max: 56}
        ]
    },
    series: [{
        name: '院校满意度',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [8, 46, 23, 34, 56],
                name : '院校综合满意度'
            },
             {
                value : [6, 25, 50, 45, 35],
                name : '校园环境'
            },
             {
                value : [4, 50, 43, 23, 15],
                name : '生活（费用、食宿条件、业余生活等）'
            }
        ]
    }]
};
yxChart.setOption(yxOption);

