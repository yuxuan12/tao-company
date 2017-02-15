/**
 * Created by yuxuan on 2017/2/7.
 */

$(document).ready(function(){

    //导航按钮点击的时候从左边出来导航项
    $(".nav").click(function(){
        $(".nav-body").animate({
            left:"0"
        },"300")
    });

    $(".nav-inner-close").click(function(){
        $(".nav-body").animate({
            left:"-80%"
        },"300")
    });


/*轮播图js开始*/
var lunbo= function () {
    var _act = $(".act").index();//当前li的索引
    var _length = $("#num li").length;//li的个数
    var _this, _after, _before, _run, _left, _left2;
    this.run = function () {    //自动轮播开始函数
        _left = ($("#box").width() - 600) / 2;  //盒子宽度-图片最大宽是600 /2   =得到两边空的距离 即：中间图片的left值
        _left2 = $("#box").width() - 530;
        //console.log($("#box").width());
        //console.log(_left2);
        _this = _act;     //将当前li的索引 赋值给_this
        clearTimeout(_run);  //清定时器
        (function _move() {  // _this：当前索引   _after：前一张图片索引    _before：后一张图片索引
            if (_this == 0) {   //索引为0  第一张图片
                _after = _this + 1;
                _before = _length - 1;
            } else if (_this == _length - 1) {   //索引为li的个数-1  最后一张图片
                _after = _this - 1;  //后一张是前面的
                _before = 0;    //前一张是第一个
            } else {
                _after = _this - 1;
                _before = _this + 1;
            }
            $("#num li").eq(_this).addClass("act").siblings().removeClass('act');  //当前li添加class
            $(".box_banner").eq(_this).css("z-index", 3).siblings().css("z-index", 2); //对应的图片z-index改变
            $(".box_banner").eq(_this).animate({  //对应的css改变
                left: _left + "px",   //中间图片的left值
                top: "-10px",
                width: "600px",
                height: "200px",
                opacity: "1"
            }, 500);
            $(".box_span").css("opacity", "1");   //黑色半透明遮罩
            $(".box_span").eq(_this).css("opacity", "0");  //当前的 黑色半透明遮罩去掉
            $(".box_banner").eq(_after).animate({   //前一个图片
                left: "0px",
                top: "10px",
                width: "530px",
                height: "180px",
                opacity: "1"
            }, 500);
            for (var i = 0; i < _length; i++) {
                if (i < _this - 1 || i > _this + 1) {  //小于前一个  大于后一个索引 隐藏
                    $(".box_banner").eq(i).animate({
                        left: "-530px",
                        top: "10px",
                        width: "530px",
                        height: "180px",
                        opacity: "0"
                    }, 500);
                }
            }
            $(".box_banner").eq(_before).animate({ //后一个图片
                left: _left2 + "px",
                top: "10px",
                width: "530px",
                height: "180px",
                opacity: "1"
            }, 500);
            _this++;
            if (_this == _length) {
                _this = 0;
            }
            _run = setTimeout(_move, 6000)
        })();
    };
    this.change = function (act) {
        _act = act;
        this.run();
    };
}/*轮播图js结束*/

    /*轮播图js开始*/
    var _lunbo=new lunbo();
    _lunbo.run(); //轮播自动滚动
    //点击下面的小原点切换到对应的轮播图
    $("#num li").on("click", function () {
        var index=$(this).index();  //点击的li的索引
        var _act=$(".act").index();  //当前li的索引
        if(_act===index){return;}   //如果相等不动
        _act=index;
        _lunbo.change(_act);  //不等 轮播图切换到点击li的索引
    });
    /*轮播图js结束*/

    //**********************************************************更多删选条件

    var flag=true;
    $("#search-row").css("display","none");
    $("#showToggle").on("click",function(){
        flag=!flag;
        console.log(flag)
        if(flag){
            $("#search-row").css("display","none");
            $("#showToggle").text("更多筛选条件");
        }else{
            $("#search-row").css("display","block");
            $("#showToggle").text("隐藏筛选条件");
        }
    });


//*****************************************************数据
    var data=[
        {"title":"上海**投资管理有限公司","leibie":"金融投资","area":"浦东","date":"2012-02-24","money":"万","zhuanrang":"￥3.2万元"},
        {"title":"**（上海）投资咨询合伙企业（有限合伙）","leibie":"金融投资","area":"嘉定","date":"2016-04-15","money":"万","zhuanrang":"￥3.5万元"},
        {"title":"上海**投资管理有限公司","leibie":"金融投资","area":"崇明","date":"2014-05-12","money":"万","zhuanrang":"￥3.5万元"},
        {"title":"上海***金融信息服务有限公司","leibie":"金融投资","area":"浦东","date":"2014-02-16","money":"万","zhuanrang":"￥15万元"},
        {"title":"上海**投资管理中心（普通合伙）","leibie":"金融投资","area":"浦东","date":"2015-11-25","money":"万","zhuanrang":"￥2.5万元"},
        {"title":"**投资管理（上海）有限公司","leibie":"金融投资","area":"崇明","date":"2015-07-08","money":"万","zhuanrang":"￥2.5万元"},
        {"title":"上海**服饰有限公司","leibie":"金融投资","area":"虹口","date":"2012-02-24","money":"万","zhuanrang":"￥10万元"},
        {"title":"**投资（上海）有限公司","leibie":"金融投资","area":"崇明","date":"2014-07-22","money":"万","zhuanrang":"￥2.5万元"},
        {"title":"上海**资产管理有限公司","leibie":"金融投资","area":"金山","date":"2015-06-15","money":"万","zhuanrang":"￥16万元"},
        {"title":"上海**金融信息服务有限公司","leibie":"金融投资","area":"金山","date":"2015-08-24","money":"万","zhuanrang":"￥16万元"},
        {"title":"**（上海）信息服务有限公司","leibie":"金融投资","area":"徐汇","date":"2016-02-24","money":"万","zhuanrang":"￥4.5万元"},
        {"title":"***（上海）投资有限公司","leibie":"金融投资","area":"崇明","date":"2016-02-17","money":"万","zhuanrang":"￥3万元"},
        {"title":"上海**投资咨询中心（有限合伙）","leibie":"金融投资","area":"崇明","date":"2012-02-24","money":"万","zhuanrang":"￥3万元"},
        {"title":"上海**投资中心（普通合伙）","leibie":"金融投资","area":"浦东","date":"2014-01-08","money":"万","zhuanrang":"￥5万元"},
        {"title":"上海**商务服务事务所","leibie":"金融投资","area":"浦东","date":"2010-11-25","money":"万","zhuanrang":"￥2万元"}
    ]
    //$.get("data.json",function(data){
        //console.log(data.length%6);
        var len=Math.ceil(data.length/6); //算出一共几页
        //var lastNum=data.length%6;   //最后一页是几个
        //console.log(lastNum);

       //*****************************************************
            $('.pageTest').page({
                leng: len,//分页总数
                activeClass: 'activP' , //active 类样式定义
            });

        ////判断当前显示的li的index
        $(".pageTest").on("click",function(ev){
            ev=ev||evevt;
//      var oElm=ev.target||ev.srcElement;       //判断点的是哪个对象
            findClass();
        });
        function findClass(){
            $("li").each(function(){
                if($(this).find("a").attr('class')=="activP"){
                    console.log($(this).index());//判断当前显示的li的index
                    var nowIndex=$(this).index();
                    //**********************------------------------  截取部分数组遍历
                    //便利json数组
                    var newData=data.slice(nowIndex*6,nowIndex*6+6);  //每页显示六个
                    $("#thelist").html("");  //先清空里面内容，再插入
                    $.each(newData,function(index,value){
                        $("#thelist").append('<li>'+
                            '<div class="search_content_campany_name">'+value.title+'</div>'+
                            '<div class="search_content_campany_details">'+
                            '<span>行业类别:'+value.leibie+'</span>'+
                            '<span>注册地区:'+value.area+'</span>'+
                            '<span>注册日期:'+value.date+'</span>'+
                            '<span>注册资金:'+value.money+'</span>'+
                            '<span class="campany_details_price">转让价: <span>'+value.zhuanrang+'</span></span>'+
                            '</div>'+
                            '</li>')
                    });

                }
            });
        }
        findClass();

        //})



});
