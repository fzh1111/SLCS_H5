<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="mps.aspx.cs" Inherits="SanLiChaShe.Web.map.mps" %>

<!-- 
    liaotuo 
    2016.09.25 
    判断点是否在圆形区域内(用于电子围栏)
-->
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta name="layout" content="main">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
        body, html, #allmap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            margin: 0;
            font-family: "微软雅黑";
        }

        #dv {
            width: 100%;
            height: 100%;
            top: 3rem;
            position: absolute;
            z-index: 1200;
        }

        .img .marker {
            position: absolute;
            width: 7rem;
            border-radius: 100%;
            opacity: 0.3;
            filter: alpha(opacity=30);
            height: 7rem;
            background: #52B3C7;
            z-index: 2000;
        }

        .nav {
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            background: #333;
        }

        .navb {
            border-radius: 0.3rem;
            color: #efefef;
            width: 30%;
            text-align: center;
            float: left;
        }

        .example1 {
            border-radius: 0.3rem;
            color: #efefef;
            width: 30%;
            text-align: center;
            float: right;
        }
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=3f8849d969be293330c222ae71464227"></script>
    <script type="text/javascript" src="js/GeoUtils.js"></script>
    <title>三里茶社</title>



</head>
<body>

    <div id="allmap" style="width: 100%;"></div>
    <script type="text/javascript">
        //创建地图
        var map = new BMap.Map("allmap");
        //创建一个圆
        var point = new BMap.Point(117.317098, 31.837195);
        var Bpoint = new BMap.Point(117.31644, 31.87705);
        var circle = new BMap.Circle(point, 1500, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
        var Bcircle = new BMap.Circle(Bpoint, 1500, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });



        //创建标注点并添加到地图中
        function addMarker(points) {
            //循环建立标注点
            for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
                var marker = new BMap.Marker(points[i]); //将点转化成标注点
                map.addOverlay(marker);  //将标注点添加到地图上
                //添加监听事件
                (function () {
                    var thePoint = points[i];
                    marker.addEventListener("click",
                        function () {
                            showInfo(this, thePoint);
                        });
                })();
            }
        }

        var points = [
            { "lng": 117.317098, "lat": 31.837195, "url": "http://www.baidu.com", "id": "上海市徐汇区钦州北路", "name": "合肥市包河区三里茶社" },
            { "lng": 117.31644, "lat": 31.87705, "url": "http://www.mi.com", "id": "上海市徐汇区钦州北2路", "name": "合肥市包河区三里2茶社" }
        ];

        //创建标注点并添加到地图中
        function addMarker(points) {
            //循环建立标注点
            for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
                var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
                /**/
                var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                    offset: new BMap.Size(0, 0), // 指定定位位置
                    imageOffset: new BMap.Size(0, 0 - 11 * 25),
                });
                var marker = new BMap.Marker(point, { icon: myIcon });
                map.addOverlay(marker);

                /**/
                map.addOverlay(marker);  //将标注点添加到地图上
                //添加监听事件
                (function () {
                    var thePoint = points[i];
                    marker.addEventListener("click",
                        function () {
                            showInfo(this, thePoint);
                        });
                })();
            }
        }
        function showInfo(thisMarker, point) {
            //获取点的信息
            var sContent =
                '<div style="width:100%;float:left; ">'
                + '<div style="height:1rem; padding:0.4rem; font-size:1.0rem; color:#000;float:left; width:100%; ">' + point.id + '</div>'
                + '<div style="padding:0.4rem; float:left;width:100%;color:#656565; ">' + point.name + '</div>'
                + '<div style="padding:0.4rem; float:left;width:90%; "><div style="border-radius:0.3rem; float:right; background:#357ebd; width:30%; text-align:center; color:#FFFFFF; height:1.6rem; line-height:1.6rem; "><a href="' + point.url + '" style="color:#FFFFFF; text-align:center;text-decoration:none">详情</a></div></div>'
                + '</ul>';
            var infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
            thisMarker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
        }


        function initialize() {
            // 百度地图API功能  
            map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件  
            map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件  
            map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件  
            map.enableScrollWheelZoom();                            //启用滚轮放大缩小  
            map.addControl(new BMap.MapTypeControl());          //添加地图类型控件
            map.centerAndZoom('<%=suggestId %>', 15);
            addMarker(points);

            /**/

            /**/
            map.addOverlay(circle);
            map.addOverlay(Bcircle);
        }





        initialize();



    </script>
</body>
</html>

