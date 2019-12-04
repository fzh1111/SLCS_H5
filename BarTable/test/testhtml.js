var query = function () {
    this.maxResults = 20;
    this.currentpageIndex = 1;
    this.totalCount;
    this.isOrderBy;

    this.startTime = $("#startTime").val();

    this.userName = this.getQueryString("userName");

    this.waitHTML = '<div style="padding: 20px;"><img src="../../../Images/loading.gif" /></div>';
}


query.prototype.appendPage = function (totalCount, pageIndex) {
    var html = paging(Math.ceil(this.totalCount / this.maxResults), pageIndex, "ll.searchPage", 0);
    $('.page').empty();

    var span = '<span id="lb_page2" class="lbPage"></span>';
    $('.page').append(span);

    if ((pageIndex) * this.maxResults < this.totalCount) {
        $('.lbPage').text("显示 " + ((pageIndex - 1) * this.maxResults + 1) + "-" + (pageIndex) * this.maxResults + "，共" + this.totalCount + "条");
    } else {
        $('.lbPage').text("显示 " + ((pageIndex - 1) * this.maxResults + 1) + "-" + this.totalCount + "，共" + this.totalCount + "条");
    }

    $('.page').append(html);
}

query.prototype.hover = function () {
    $("#DetailView").hover(function () {
        $(this).find(".odd").hover(function () {
            $(this).css({ "background-color": "#73a3cc", "cursor": "pointer" });
        }, function () {
            $(this).removeAttr("style");
        });

        $(this).find(".even").hover(function () {
            $(this).css({ "background-color": "#73a3cc", "cursor": "pointer" });
        }, function () {
            $(this).removeAttr("style");
        });
    });
}

query.prototype.buildTable = function (result) {

    var $this = this;

    var tpl = $('#roomtp').html(); //读取模版  

    //方式一：异步渲染（推荐）
    laytpl(tpl).render(result, function (html) {
        $('#faultlist').html(html);
    });
}

query.prototype.searchPage = function (index) {
    var $this = this;

    $this.currentpageIndex = index;


    $.ajax({
        type: "post",
        url: "../../receiptinfo/GetorderList",
        data: {// filters: { RoomId:1}
            pageNo: 1, pageSize: 20, isAsc: true
        },
        dataType: "json",
        success: function (result) {
            if (result != null) {
                $this.buildTable(result.data.rows);

                $this.totalCount = result.data.rowCount;

                $this.appendPage($this.totalCount, $this.currentpageIndex);
            }
        }
    });
}


query.prototype.UpdateClean = function (roomId, roomName, storeId, storeName) {

    layer.msg("房间：" + roomName + ' 完成打扫！');
    $.ajax({
        type: "post",
        url: "../Room/UpdateIsClean",
        data: {
            id: roomId, flag: 2
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 1) {
                layer.msg("房间：" + roomName + ' 完成打扫！');
            }
        }
    });

    $.ajax({
        type: "post",
        url: "../RoomClean/UpdateIsClean",
        data: {
            id: roomId, roomName: roomName, storeId: storeId, storeName: storeName, userName: this.userName
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 1) {
                layer.msg("房间：" + roomName + ' 完成打扫！');
            }
        }
    });


}


query.prototype.fault = function (roomId) {
    location.href = "RoomFault.html?id=" + roomId;
}

query.prototype.init = function () {
    var $this = this;

    $("#startTime").val((new Date()).Format("yyyy-MM-dd"));

    $("#picbutton").bind("click", function () {

        $this.startTime = $("#startTime").val();

        $this.searchPage(1);
    });

    $("#picbutton").click();
}

query.prototype.getQueryString = function (paramName) {
    paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]").toLowerCase();
    var reg = "[\\?&]" + paramName + "=([^&#]*)";
    var regex = new RegExp(reg);
    var regResults = regex.exec(window.location.href.toLowerCase());
    if (regResults == null) return "";
    else return regResults[1];
}

var ll;
$(function () {

    ll = new query();
    ll.init();

});





// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}  