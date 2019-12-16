import $ from 'jquery';
//import Mycomponent from './mycomponent.jsx';
import React from 'react';
let common = {
    ajax: function (path, data, callBack) {
        path=' http://101.132.47.71'+path
        if (typeof data == 'object') {
            data = JSON.stringify(data);
        }
        $.ajax({
            url: path,
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: data,
            success: function (result) {
                if (result.code == -1) {
                    location.href = result.data;
                    // if(sessionStorage.isReceive){
                    //     location.href = "/#/users/daijinquan";
                    //     sessionStorage.isReceive = false;
                    // }else{
                    //     location.href = result.data;
                    // }
                } else {
                    callBack(result);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(jqXHR.status);
            }
        });
    },
    ajaxget: function (path, data, callBack) {
        if (typeof data == 'object') {
            data = JSON.stringify(data);
        }
        $.ajax({
            url: path,
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                // if (result.code == -1) {
                //     location.href = result.data;
                // } else {
                //     callBack(result);
                // }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(jqXHR.status);
            }
        });
    },
    init: function (that, callBack, ctrl) {
        if (!ctrl)
            ctrl = that.props.location.pathname;
        common.ajax('init', {}, function (result) {
            if ($.isFunction(callBack))
                callBack(result);
            that.setState({
                init: result.data
            });
        }, ctrl)
    },
    add: function (that, callBack) {
        common.empty(that.state.model);
        that.state.model.Items = [];
        that.state.model.Dels = [];
        if ($.isFunction(callBack))
            callBack();
        that.setState({
            action: 'add',
            showMain: false,
            showFrom: true,
            validate: {},
            mes: null
        });
    },
    cancel: function (that) {
        that.setState({
            showMain: true,
            showFrom: false,
            mes: null
        });
    },
    setModel: function (that, e) {
        that.state.model[e.target.name] = e.target.value;
        that.setState({});
    },
    setModelChecked: function (that, e) {
        that.state.model[e.target.name] = e.target.checked;
        that.setState({});
    },
    setItem: function (row, that, e) {
        row[e.target.name] = e.target.value;
        that.setState({});
    },
    update: function (that) {
        that.setState({
            action: 'update'
        });
    },
    submit: function (that, formId, action, ctrl, host, callBack) {
        if (!formId)
            formId = 'form1';
        if (!action)
            action = that.state.action;
        if (!ctrl)
            ctrl = that.props.location.pathname;
        if (common.formValidate(formId, that.state.validate)) {
            that.setState({
                btnTxt: '数据提交中...'
            });
            common.ajax(action, that.state.model, function (result) {
                that.state.btnTxt = null;
                if (result.code == 1) {
                    that.setState({
                        code: 1,
                        mes: '操作成功！' + result.mes,
                        showMain: true,
                        showFrom: false
                    });
                    if ($.isFunction(that.getList))
                        that.getList();
                    if ($.isFunction(callBack))
                        callBack(result);
                } else {
                    that.setState({
                        code: 0,
                        mes: '操作失败！' + result.mes
                    });
                }
            }, ctrl, host);
        }
        else {
            that.setState({
                code: 0,
                mes: '输入有误，请看提示！'
            });
        }
        setTimeout(function () {
            that.setState({
                mes: null
            });
        }, 10000)
    },
    getModel: function (modelFilter, that, callBack) {
        common.empty(that.state.model);
        that.state.model.Items = [];
        that.setState({
            code: 2,
            mes: '数据加载中...',
            validate: {},
            showMain: false,
            showFrom: false
        });
        common.ajax('getModel', modelFilter, function (result) {
            if ($.isFunction(callBack))
                callBack(result);
            that.setState({
                action: 'view',
                model: result.data.model,
                showFrom: true,
                mes: null,
            });
        }, that.props.location.pathname);
    },
    getList: function (that, action) {
        var tab = that.state.tab;
        tab.code = 0;
        tab.rows = [];
        if (!tab.pageNo)
            tab.pageNo = 1;
        if (!tab.pageSize)
            tab.pageSize = 15;
        that.setState({});
        if (!action)
            action = 'getList';
        common.ajax(action, {
            pageNo: tab.pageNo,
            pageSize: tab.pageSize,
            filters: tab.filters,
            sortField: tab.sortField,
            isAsc: tab.isAsc
        }, function (result) {
            that.setState({
                tab: result.data.table
            });
        }, that.props.location.pathname);
    },
    setFilter: function (that, e) {
        if (!that.state.filters)
            that.state.filters = {};
        that.state.filters[e.target.name] = e.target.value;
    },
    search: function (that, action) {
        that.state.tab.pageNo = 1;
        that.state.tab.filters = that.state.filters;
        that.getList(that, action);
    },
    batch: function (keys, rows, action, mes, that) {
        var ids = common.getChecked(keys, rows);
        common.batchIds(ids, action, mes, that);
    },
    batchIds: function (ids, action, mes, that) {
        if (ids.length > 0) {
            if (confirm("确认" + mes + "选中的项？")) {
                common.ajax(action, ids, function (result) {
                    if (result.code == 1) {
                        that.setState({
                            code: 1,
                            mes: '操作成功！' + result.mes
                        })
                        that.getList();
                    }
                    else {
                        that.setState({
                            code: 0,
                            mes: '操作失败！' + result.mes
                        })
                    }
                }, that.props.location.pathname)
                setTimeout(function () {
                    that.setState({
                        mes: null
                    });
                }, 10000)
            }
        }
        else
            alert("请选择要" + mes + "的项！");
    },
    validate: function (name, val, regs, result) {
        //console.log(name + ':' + val);
        var mes = null;
        if (regs) {
            var arrReg = regs.split(',');
            for (var i in arrReg) {
                var regs = arrReg[i].split(':');
                if (regs.length > 1)
                    mes = regs[1];
                var reg = regs[0];
                switch (reg) {
                    case "required":
                        reg = /\S/;
                        if (!mes)
                            mes = "不能为空";
                        break;
                    case "number":
                        reg = /^\d+$/;
                        if (!mes)
                            mes = "必须是数字";
                        break;
                }
                var regObj = new RegExp(reg);
                if (regObj.test(val))
                    mes = null;
                else
                    break;
            }
        }
        result[name] = mes;
    },
    isEmpty: function (val) {
        if (val == null)
            return true;
        else {
            var regObj = new RegExp(/\S/);
            return !regObj.test(val);
        }
    },
    regexpTest: function (val, test) {
        if (val == null)
            return true;
        else {
            var regObj = new RegExp(test);
            return !regObj.test(val);
        }
    },
    formValidate: function (formId, result) {
        $("#" + formId).find("input,select,textarea").each(function () {
            common.validate($(this).attr('name'), $(this).val(), $(this).attr('data-validate'), result);
        })
        return common.IsValidate(result);
    },
    IsValidate: function (result) {
        for (var i in result) {
            if (result[i])
                return false
        }
        return true;
    },
    format: function (num, fixed) {
        if (num != null) {
            var numDec = '';
            if (fixed == null)
                fixed = 2;
            num = Number(num);
            if (fixed > 0) {
                num = num.toFixed(fixed);
                numDec = '.' + num.toString().split('.')[1];
            }
            var sign = num >= 0 ? '' : '-'; //如果num是负数,转为正数,结尾前头+“-”
            num >= 0 || (num = Math.abs(num));
            var numInt = num.toString().split('.')[0];
            var numNew = '';
            var n = 0;
            for (var i = numInt.length - 1; i >= 0; i--) {
                n++;
                numNew = numInt.charAt(i).toString() + numNew.toString();
                if (i > 0 && n % 3 == 0) {
                    numNew = ',' + numNew.toString();
                }
            }
            return sign + numNew + numDec;
        } else {
            return '0.00';
        }
    },
    filter: function (list, condition) {
        var listNew = [];
        for (var i in list) {
            var equal = true;
            for (var key in condition) {
                if (condition[key] != list[i][key]) {
                    equal = false;
                    break;
                }
                if (equal)
                    listNew.push(list[i]);
            }
        }
        return listNew;
    },
    contain: function (list, condition) {
        for (var i in list) {
            var equal = true;
            for (var key in condition) {
                if (condition[key] != list[i][key]) {
                    equal = false;
                    break;
                }
                if (equal)
                    return true;
            }
        }
        return false;
    },
    empty: function (json) {
        for (var key in json) {
            json[key] = '';
        }
    },
    abbr: function (txt, len) {
        if (txt.length > len)
            return txt.substr(0, len) + '...'
        else
            return txt;
    },
    allChecked: function (rows, that, e) {
        for (var i in rows) {
            rows[i].checked = e.target.checked;
        }
        that.setState({});
    },
    resetChecked: function (rows) {
        for (var i in rows) {
            rows[i].checked = false;
        }
    },
    cbChecked: function (row, that, e) {
        row.checked = e.target.checked;
        that.setState({});
    },
    getChecked: function (keys, rows) {
        var arrV = [];
        var arrK = keys.split(',');
        for (var r in rows) {
            if (rows[r].checked) {
                var v = {};
                for (var k in arrK) {
                    v[arrK[k]] = rows[r][arrK[k]];
                }
                arrV.push(v);
            }
        }
        return arrV;
    },
    join: function (key, rows, separator) {
        var arrV = new Array();
        for (var r in rows) {
            arrV.push(rows[r][key]);
        }
        if (separator)
            return arrV.join(separator);
        else
            return arrV;
    },
    setChecked: function (key, rows, vals) {
        if (vals != null) {
            var arrVal = vals.split(",");
            for (var r in rows) {
                var boolEqual = false;
                for (var v in arrVal) {
                    if (rows[r][key] == arrVal[v]) {
                        boolEqual = true;
                        break;
                    }
                }
                rows[r].checked = boolEqual;
            }
        }
    },
    exports: function (that, action) {
        if (!action)
            action = 'export';
        var titles = [];
        $("#tabMain").find("tr:eq(0) th").each(function () {
            var field = $(this).data("field");
            var name = $(this).text();
            var objA = $(this).find('a:eq(0)');
            if (!field && objA) {
                field = objA.data("field");
                name = objA.text();
            }
            if (field) {
                var arrField = field.split('.');
                titles.push({ field: arrField[arrField.length - 1], name: name });
            }
        });
        if (!that.state.filters)
            that.state.filters = {};
        var params = '?sessionId=' + common.getCookie('SessionId') + '&filters=' + JSON.stringify(that.state.filters) + '&titles=' + JSON.stringify(titles);
        window.open($('#baseApp').data('api') + that.props.location.pathname + '/' + action + params);
    },
    getCookie: function (key) {
        var val = '';
        if (document.cookie) {
            var arrCookie = document.cookie.split(';');
            arrCookie.forEach(function (cookie) {
                var arr = cookie.trim().split('=');
                if (arr[0] == key)
                    val = arr[1];
            }, this);
        }
        return val;
    },
    setCookie:function(){
        var url = "/#/users/daijinquan";
        document.cookie = "redirect_url="+url;
    },
    upload: function (api, file, callBack) {
        let formData = new FormData();
        formData.append("file", file);
        fetch(api, { method: 'POST', body: formData })
            .then((response) => response.json())
            .then((responseJson) => {
                if (callBack != null) {
                    callBack(responseJson);
                }
            })
            .catch((error) => {
                console.error('error', error);
            });
    },
    mes: function (that, mes, second, callBack) {
        second = second ? second : 3;
        that.setState({ mes: mes });
        setTimeout(() => {
            that.setState({ mes: null });
            if (callBack != null)
                callBack();
        }, second * 1000);
    },
    prompt: function (that, Prompt, second, callBack) {
        second = second ? second : 5;
        that.setState({ Prompt: Prompt });
        setTimeout(() => {
            that.setState({ Prompt: null });
            if (callBack != null)
                callBack();
        }, second * 1000);
    },
    sum: function (rows, key) {
        let total = 0;
        rows.map((row) => {
            total = total + row[key];
        })
    },
    sums: function (rows, multiplier1, multiplier2) {
        let total = 0;
        rows.map((row) => {
            total = total + (Number(row[multiplier1]) * Number(row[multiplier2]));
        });
        return total;
    },
    scroll: function (that) {
        let scroll_width = $(".scroll_bar").width();
        let scroll_total_width = $(".scroll_total").width();
        that.state.timer = setInterval(() => {
            that.setState({ scroll_left: --that.state.scroll_left });
            if (that.state.scroll_left < (-scroll_width - 20)) {
                that.setState({ scroll_left: (scroll_total_width + 20) });
            }
        }, 30)
    },
    changeShare(share_Link, title, imgUrl, desc, success, cancel, host) {
        host = host || window.location.host;
        success = success || function () {
        };
        cancel = cancel || function () {
        };
        this.ajax(`/api/GetWeChatJsSign?url=http://${host}/`, {}, (result) => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.data.appId, // 必填，公众号的唯一标识
                timestamp: result.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
                signature: result.data.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    link: share_Link, // 分享链接，该链接域名需在JS安全域名中进行登记
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        success();
                    },
                    cancel: function () {
                        cancel();
                    }
                });
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: share_Link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        success();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        cancel();
                    }
                });
            })
        });
    },
    confirUser: function (fun) {
        if (sessionStorage.currentUser) {
            var UserId = JSON.parse(sessionStorage.currentUser).UserId;
            fun(UserId);
        } else {
            common.ajax('/users/GetLoginUser', {}, (result) => {
                var UserId = result.data.UserId;
                fun(UserId);
            });
        }
    },
    //下拉加载更多
    dropDown: function (that, address, filters, pageSize = 10) {
        that.setState({ mes: '数据加载中...' });
        if (that.state.hasMore && (!that.state.hasGetList)) {
            that.state.hasGetList = true;
            this.ajax(address, { pageNo: that.state.pageNo, pageSize: pageSize, filters: filters }, (result) => {
                that.state.portData = result.data;
                that.state.rows = that.state.rows.concat(result.data.rows);
                if (that.state.pageNo == result.data.pageCount) {
                    that.state.hasMore = false; //加载到底设置hasmore:false
                }
                that.state.pageNo = that.state.pageNo + 1;
                that.setState({ mes: null });
                that.state.hasGetList = false;
                return true;
            });
        } else {
            that.setState({ mes: null });
        }
    },
    resetList: function (that) {
        that.state.pageNo = 1;
        that.state.rows = [];
        that.state.hasMore = true;
        that.state.hasGetList = false;
    },
    //获取用户财富的
    getRebate: function (that, callback) {
        that.setState({ mes: '更新中...' });
        this.ajax('/wealth/GetWealthSum', {}, (result) => {
            if (result.code == 1) {
                that.state.rebate = result.data;
                if (callback) {
                    callback();
                }
            }
            that.setState({ mes: null });
        })
    },
    isWx: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        //mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
        if (ua.match(/MicroMessenger/i) == 'micromessenger')
            return true;
        else
            return false;
    },
    getQueryString: function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        } else {
            return null;
        }
    },
    //得到用户余额
    getBalance: function GetBalance(that) {
        //that.setState({mes:"获取数据中....."});
        this.ajax("/User/GetLoginUser", {}, (result) => {
            if (result.code == 1) {
                that.state.balance = this.format(result.data.Balance);
            } else {
                that.state.balance = 0;
            }
            //that.setState({mes:null});
        })
    },
    //获取用户信息
    GetUserInfo: function GetUserInfo(that) {
        
        common.ajax("/User/GetLoginUser", {}, (result) => {
            if (result.code == 1) {
                that.state.info = result.data;
            } else if (result.code == 0) {

            }
            that.setState({})

        })
        // }

    },
    //
    reducer: (state, action) => {
        switch (action.type) {
            case 'INCREMENT': return state + 1;
            case 'DECREMENT': return state - 1;
            default: return state;
        }
    },
    isIos: () => {
        var u = navigator.userAgent, app = navigator.appVersion;
        var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        return ios;
    },
    isAndroid: () => {
        var u = navigator.userAgent, app = navigator.appVersion;
        var android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        return android;
    },

}

module.exports = common;