var query = function () {
    this.maxResults = 20;
    this.currentpageIndex = 1;
    this.totalCount;
    this.isOrderBy;  

    this.queryId = this.getQueryString("id");
    this.userName = this.getQueryString("userName");


    this.roomId, this.roomName, this.storeId, this.storeName;


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
        $('#bardiv').html(html); 
    });
}

query.prototype.searchPage = function (index) {
    var $this = this; 
    $this.currentpageIndex = index;
    var filter = {};
    if ($this.queryId * 1 > 0)
            eval("filter.RoomId=" + $this.queryId ); 
    $.ajax({
        type: "post",
        url: "../RoomClean/GetRoomList",
        data: {// 
            pageNo: 1, pageSize: 2000, isAsc: true, filters:filter
        
            
    },
        dataType: "json", 
        success: function (result) {
            if (result != null) {
                $this.buildTable(result.data.rows);
                 
            }
        }
    });
}
 
 
query.prototype.QrCode = function (storeId,storeName,roomId,roomName) {

    var $this = this;

    $this.roomId = roomId;
    $this.roomName = roomName;
    $this.storeId = storeId;
    $this.storeName = storeName;
     
    var roomCode;
    var validTime;

    $.ajax({
        type: "post",
        url: "../RoomClean/GetRoomCleanCode",
        async: false,
        data: {// 
            storeId: storeId, storeName: storeName, roomId: roomId, roomName: roomName 
        },
        dataType: "json",
        success: function (result) {
            if (result != null) {
                roomCode = result.data;
                validTime = roomCode.ValidTime*1;
            }
        }
    });


    jQuery('.room').html(roomCode.RoomName);

    jQuery('.time').html(roomCode.StartTime + "至" + roomCode.EndTime);

    jQuery('.code').html("").qrcode({
        width: 300,
        height: 300,
        render: 'canvas', //设置渲染方式 table canvas 
        typeNumber: -1, //计算模式 
        correctLevel: 0,//纠错等级 
        background: '#ffffff',//背景颜色 
        foreground: '#000000',//前景颜色 
        text: roomCode.QrCode//链接
    });


    layer.open({
        type: 1,
        area: ['320px', '450px'],
        title: "开门码",
        shadeClose: true, //点击遮罩关闭 
        closeBtn: 1, 

        content: $("#tea"),

        end: function () {//无论是确认还是取消，只要层被销毁了，end都会执行，不携带任何参数。layer.open关闭事件
            $('.a').html(validTime);
            $('.b').html('00');
            clearInterval(countTime);
        }
    }); 
    this.SetTime(validTime);
}



query.prototype.SpecialQrCode = function (storeId, storeName, roomId, roomName) {

    var $this = this;

    $this.roomId = roomId;
    $this.roomName = roomName;
    $this.storeId = storeId;
    $this.storeName = storeName;

    var roomCode;
    var validTime;

    $.ajax({
        type: "post",
        url: "../RoomClean/GetSpecialRoomCode",
        async: false,
        data: {// 
            storeId: storeId, storeName: storeName, roomId: roomId, roomName: roomName
        },
        dataType: "json",
        success: function (result) {
            if (result != null) {
                roomCode = result.data;
                validTime = roomCode.ValidTime * 1;
            }
        }
    });


    jQuery('.room').html(roomCode.RoomName);

    jQuery('.time').html(roomCode.StartTime + "至" + roomCode.EndTime);

    jQuery('.code').html("").qrcode({
        width: 300,
        height: 300,
        render: 'canvas', //设置渲染方式 table canvas 
        typeNumber: -1, //计算模式 
        correctLevel: 0,//纠错等级 
        background: '#ffffff',//背景颜色 
        foreground: '#000000',//前景颜色 
        text: roomCode.QrCode//链接
    });


    layer.open({
        type: 1,
        area: ['320px', '450px'],
        title: "开门码",
        shadeClose: true, //点击遮罩关闭 
        closeBtn: 1,

        content: $("#tea"),

        end: function () {//无论是确认还是取消，只要层被销毁了，end都会执行，不携带任何参数。layer.open关闭事件
            $('.a').html(validTime);
            $('.b').html('00');
            clearInterval(countTime);
        }
    }); 
}


query.prototype.UpdateClean = function (roomId,roomName,storeId,storeName) {
     
    $.ajax({
        type: "post",
        url: "../Room/UpdateIsClean",
        data: {
            id: roomId,flag:2
        },
        async: false,
        dataType: "json",
        success: function (result) {
            if (result.code==1) {  
                layer.msg("房间："+roomName+' 完成打扫！');
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
        async: false,
        success: function (result) {
            if (result.code == 1) {
                layer.msg("房间：" + roomName + ' 完成打扫！');
            }
        }
    });

    this.searchPage(1);
}


query.prototype.CleanRoom = function () {

    var $this = this;

    $.ajax({
        type: "post",
        url: "../Room/UpdateIsClean",
        data: {
            id: $this.roomId, flag: 2
        },
        async: false,
        dataType: "json",
        success: function (result) {
            if (result.code == 1) {
                layer.msg("房间：" + $this.roomName + ' 完成打扫！');
            }
        }
    });

    $.ajax({
        type: "post",
        url: "../RoomClean/UpdateIsClean",
        data: {
            id: $this.roomId, roomName: $this.roomName, storeId: $this.storeId, storeName: $this.storeName, userName: $this.userName
        },
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.code == 1) {
                layer.msg("房间：" + $this.roomName + ' 完成打扫！'); 
            }
        }
    });

    setTimeout(function () {
        layer.closeAll();
    }, 1000); 


    this.searchPage(1);
}


query.prototype.SetTime = function (obj) {
    var times = obj * 60; // 60秒
    countTime = setInterval(function () {
        times = --times < 0 ? 0 : times;
        var ms = Math.floor(times / 60).toString();

        if (ms.length <= 1) {
            ms = "0" + ms;
        }
        var hm = Math.floor(times % 60).toString();
        if (hm.length <= 1) {
            hm = "0" + hm;
        }
        if (times == 0) { 
            clearInterval(countTime);
        }
        // 获取分钟、毫秒数
        $("#min").html(ms);
        $("#secend").html(hm);
    }, 1000);

}




query.prototype.fault = function (roomId) {
    location.href = "RoomFault.html?id=" + roomId;
}

query.prototype.init = function () {
    var $this = this;

    $this.queryId = this.getQueryString("id");

    $this.searchPage(1);




}
 

query.prototype.getQueryString = function(paramName) {
    paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]").toLowerCase();
    var reg = "[\\?&]" + paramName + "=([^&#]*)";
    var regex = new RegExp(reg);
    var regResults = regex.exec(window.location.href.toLowerCase());
    if (regResults == null) return "";
    else return regResults[1];
}
var t1 = ""
var ll;
$(function () {
      
    ll = new query();
    ll.init();

    t1 = setInterval("ll.searchPage(1)", 300000); 
});



