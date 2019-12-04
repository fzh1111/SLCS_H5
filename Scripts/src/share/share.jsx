'use strict'
import React from 'react';
import $ from 'jquery';
import common from '../lib/common';
export default class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opencode: this.props.params.opencode,
            frame: false,
            Location: "",//目的地
            res: [], //坐标
            Items: []
        };
    }
    componentWillMount() {

        console.log(this.state.opencode)


    }
    componentDidMount() {
        this.getSelfPoint();
        
        this.getInfo();
    }
    componentWillUnmount() {

    }
    getInfo() {
        common.ajax("/Order/GetModelByOpenCode", { code: this.state.opencode }, ((res) => {
            if (res.code == 1) {
                console.log(23)
                this.state.Items = res.data.Items;
                this.setState({})
                this.getCode();
            }
        }))
    }
    getCode() {
        jQuery('.share').html("").qrcode({
            width: 200,
            height: 200,
            render: 'canvas', //设置渲染方式 table canvas 
            typeNumber: -1, //计算模式 
            correctLevel: 0,//纠错等级 
            background: '#ffffff',//背景颜色 
            foreground: '#000000',//前景颜色 
            text: this.state.opencode//链接
        });
        this.setState({})
    }
    getSelfPoint() {
        var that = this;
        //获得自己的坐标
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            //调用地图命名空间中的转换接口   type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
            qq.maps.convertor.translate(new qq.maps.LatLng(r.point.lat, r.point.lng), 3, function (res) {
                that.state.self = res[0]; //lat lng
                console.log(that.state.self)
            });

        }, { enableHighAccuracy: true });

        this.setState({})

    }
    map1(number) {
        var that = this
        var geocoder = new qq.maps.Geocoder({
            complete: function (result) {
                if (number == 5) {
                    location.href = "https://apis.map.qq.com/uri/v1/marker?marker=coord:" + result.detail.location.lat + "," + result.detail.location.lng + ";title:" + that.state.Location + "&referer=myapp";
                } else {
                    location.href = `http://uri.amap.com/marker?position=${result.detail.location.lng},${result.detail.location.lat}&name=${that.state.Location}s&coordinate=gaode&callnative=1`

                }
            }
        });

        geocoder.getLocation(this.state.Location);

    }

    render() {
        return (
            <div className="Share_box">
                <div className="tea" style={{ zIndex: "0" }}>
                    <div className="marks"></div>
                    {this.state.Items.map((row, index) => {
                        return <div className="content" style={{ height: "23rem" }} key={index}>
                            <div className="share_box">
                                <p style={{ color: "#000", fontSize: ".8rem" }}>约您:{row.ReserveTimeAbbr}</p>
                                <p style={{ fontWeight: "bold" }}>三里茶社·万科金域中央店({row.RoomName}包厢)</p>
                                <p onClick={() => { this.setState({ frame: true, Location: row.Location }) }}><img src="images/addr_y.png" />{row.Location}</p>
                                <div className="code share"></div>
                                <p style={{ marginTop: "1rem" }}>到店后凭此码开门</p>
                            </div>
                        </div>
                    })}
                </div>

                <div className={this.state.frame ? "posmap" : "lcb-hide"}>
                    <div className="marks" onClick={() => { this.setState({ frame: false }) }}></div>
                    <div className="content">
                        <div>
                            <div onClick={() => { this.map1(3) }}>
                                <div><img src="/images/map_gd.png" alt="" /></div>
                                <div>高德地图</div>
                            </div>
                            <div onClick={() => { this.map1(5) }}>
                                <div><img src="/images/map_tx.png" alt="" /></div>
                                <div>腾讯地图</div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        );
    }
}