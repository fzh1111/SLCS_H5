



var query = function () {
    this.maxResults = 20;
    this.currentpageIndex = 1;
    this.totalCount;
    this.isOrderBy;

    this.queryId = this.getQueryString("roomid");



    this.waitHTML = '<div style="padding: 20px;"><img src="../../../Images/loading.gif" /></div>';
}

 
query.prototype.buildTable = function (result) {

    var $this = this;

    var tpl = $('#Ttable').html(); //读取模版  

    //方式一：异步渲染（推荐）
    laytpl(tpl).render(result, function (html) {
        $('#faultdiv').html(html);
    });
}

query.prototype.searchPage = function (index) {
    var $this = this;

    $this.currentpageIndex = index;
     

    $.ajax({
        type: "post",
        url: "../Room/GetModel",
        data: {// filters: { RoomId:1}
            id: $this.queryId
        },
        dataType: "json",
        success: function (result) {
            if (result != null) {
                $this.buildTable(result.data); 
            }
        }
    });

}


query.prototype.UpdateClean = function (roomId, roomName) {

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
}

query.prototype.cancel = function () {

    location.href = "bartable.html";
}
query.prototype.save = function () {
    var storeId = $("#storeId").html();
    var storeName = $("#storeName").html();
    var roomId = $("#roomId").html();
    var roomName = $("#roomName").html();


    var startTime = $("#startTime").val();
    var startHours = $("#startHours").val();

    var endTime = $("#endTime").val();
    var endHours = $("#endHours").val();



    var description = $("#description").val();
    var faultPic = $("#faultPic").attr('src');

    var userName = $("#userName").val();
    var remark = $("#remark").val();

     
     
    $.ajax({
        type: "post",
        url: "../RoomFault/Save",
        data: {
            storeId: storeId, storeName: storeName, roomId: roomId, roomName: roomName, description: description
            , faultPic: faultPic, userName: userName, remark: remark, startTime: startTime, endTime: endTime
            , endHours: endHours, startHours: startHours
        },
        dataType: "json",
        async: true,
        success: function (result) {
            if (result.code == 1) {
                layer.msg("房间：" + roomName +" 故障上报成功！");
            }
        }
    });
    setTimeout(' location.href = "bartable.html"', 2000);
    

     
}


query.prototype.init = function () {
    var $this = this;

    $this.queryId = this.getQueryString("id");

    $this.searchPage(1);
     
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

query.prototype.picUpLoad = function (className ) {
     var button = $('#' + className), interval;
    new AjaxUpload(button, {
        action: '../Api/Upload',
        name: 'myfile',
        async: false,
        responseType: 'json',
        onSubmit: function (file, ext) {
            if (!(ext && /^(jpg|png)$/.test(ext))) {
                alert('对不起请上传jpg格式', '系统提示');
                return false;
            }
             
            this.disable();
              
        },
        onComplete: function (file, response) { 

            $("#faultPic").attr('src', response.data.url)

            this.enable();
             


        }
    });
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
