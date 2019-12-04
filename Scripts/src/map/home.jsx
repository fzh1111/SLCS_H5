'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
export default class Maps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {},
            res: [], //坐标
            location:sessionStorage.location,
            addr:""
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.getSelfPoint()
        var that = this;
        // window.addEventListener('message', function (event) {
        //     // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        //     var loc = event.data;
        //     if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        //         // console.log('location', loc);
        //         that.state.model.PointLocation = loc.poiaddress;
        //         that.state.model.Longitude = loc.latlng.lng;
        //         that.state.model.Latitude = loc.latlng.lat;
        //         // console.log(that.state.model.Longitude,that.state.model.Latitude);
        //         if (that.state.model.PointLocation) {
        //             that.setState({ isAddr: false })
        //         }
        //         that.setState({});


        //     }
        // }, false);
        // setInterval(() => {
        //     console.log(this.state.model.PointLocation)
        // }, 5000)
    }

    componentWillUnmount() {

    }



    getSelfPoint() {
        var map = new BMap.Map("mapPage");
        map.centerAndZoom(new BMap.Point(119.293146, 26.064649), 11);
        map.addControl(new BMap.GeolocationControl());
        var local = new BMap.LocalSearch(map, {
            renderOptions: { map: map }
        });
        // local.search("福州市台江区万科金域中央三里茶社");
        local.search(this.state.addr);

    }
    setAddr(addr){
        console.log(addr)
        this.state.addr = addr;
        this.getSelfPoint()
        this.setState({})
    }
    render() {
        return (
            <div>
                <div>
                    <header style={{ background: "#fff" }}>
                        <div className="tit" ><span style={{ fontSize: "1rem" }}>搜索</span></div>
                        <div className="back">
                            <a onClick={() => { window.history.back() }}><img src="images/top_arrh.png" width="100%" /></a>
                        </div>
                    </header>
                    <div className="header_bg" style={{ background: "transparent" }}></div>
                </div>
                <div className="search_input">
                    <input type="text" placeholder="搜索位置" name="" onChange={(e)=>{this.setAddr(e.target.value)}}/>
                </div>
                <div id="mapPage" style={{ width: "100%", height: "25rem", border: "1px solid #eee" }} ></div>
                {/*<iframe id="mapPage" style={{ width: "100%", height: "25rem", border: "1px solid #eee" }} src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"></iframe>*/}
            


                <Mycomponent.Mes mes={this.state.mes} />
            </div>
        );
    }
}