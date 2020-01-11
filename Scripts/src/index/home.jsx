"use strict";
import React from "react";
import $ from "jquery";
// import Swiper from '../lib/swiper.min';
import common from "../lib/common";
import Mycomponent from "../lib/mycomponent";
// import TouchSlide from '../lib/TouchSlide';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      mes: "",
      Tips: true,
      firstPage: sessionStorage.firstPage || 1,
      showIframe:true, //显示
      // IframeUrl:"http://wx.sanlics.com/Home.php"
    };
  }
  componentWillMount() {}

  componentDidMount() {
    
    this.getSelfPoint();
  }
  componentWillUnmount() {}
  getSelfPoint() {
    var that = this;
    //获得自己的坐标
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(r) {
        //调用地图命名空间中的转换接口   type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
        //qq.maps.convertor.translate(new qq.maps.LatLng(r.point.lat, r.point.lng), 3, function (res) {
        that.state.self = r.point; //lat lng
        let cookie=document.cookie
        console.log('cookie:',cookie)
        if(document.getElementById('d5')){
          document.getElementById('d5').src=`http://wx.sanlics.com/Home.php?cookie=${cookie}&lat=${that.state.self.lat}&lng=${that.state.self.lng}`
        }
        
        that.rooms();
        console.log(that.state.self);
        //});
      },
      { enableHighAccuracy: true }
    );
    // }
    this.setState({});
  }
  rooms() {
    console.log('获取房间号')
    common.ajax(
      "/Room/GetList",
      {
        pageNo: 1,
        pageSize: 2000,
        isAsc: true,
        sortField: [{ field: "Price", isAsc: true }],
        filters: {
          Latitude: this.state.self.lat,
          Longitude: this.state.self.lng
        }
      },
      res => {
        if (res.code == 1) {
          this.state.rows = res.data.rows;
          this.setState({});
        }
      }
    );
  }

  render() {
    return (
      <div className="index-iframe-father">
        {/* <iframe id="d5" src="http://wx.sanlics.com/Home.php" frameBorder="0"  className={this.state.showIframe?"index-iframe":'lcb-hide'}></iframe> */}
        {/* 本体部分 */}
        <div className="margintop"></div>
        <section className="bigBox">
          <div className="box" style={{ marginTop: "0" }}>
            <ul className="yycsList">
              {this.state.rows.map((row, index) => {
                return (
                  <li key={index}>
                    <div className="pic">
                      <img
                        src={row.RoomIcon}
                        width="100%"
                        onClick={() => {
                          location.href = "/#/shopping/detail/" + row.RoomId;
                        }}
                      />
                    </div>
                    <div className="flex_around menban">
                      <div className="name">{row.RoomName}</div>
                      <div className="money">
                        <div>
                          <span style={{ marginRight: "1.5vh" }}>
                            {row.Accommodable}人
                          </span>
                          <b>¥{row.Price}</b>
                          <span style={{ marginRight: ".5vh" }}>/小时</span>
                        </div>
                        <div>第2小时起享半价优惠</div>
                      </div>
                      <div className="addrs ">
                        <div className="flex">
                          <img src="images/icon_lo_b.png" width="100%" />
                          <span>
                            距您
                            {`${
                              row.Distance > 999
                                ? (row.Distance / 1000).toFixed(2) + "公里"
                                : row.Distance + "米"
                            }`}
                          </span>
                        </div>
                        <div>{row.StoreName}</div>
                      </div>
                    </div>
                    <div
                      className="submit"
                      onClick={() => {
                        location.href = "/#/shopping/detail/" + row.RoomId;
                      }}
                    >
                      预约茶室
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <div
          className="tea"
          className={this.state.firstPage == 1 ? "tea" : "lcb-hide"}
          style={{ backgroundColor: "transparent" }}
        >
          <div className="marks"></div>
          <div className="content1">
            <h1>温馨提示</h1>
            <div className="wuren">本场所为无人自助茶室</div>
            <p>为方便您顺利体验</p>
            <p>请在下单前认真阅读茶室设备自助使用规范</p>
            <p>及订单时间的把握避免包厢续费时间被他人抢订</p>
            <p style={{ color: "#e3a23a" }}>感谢您对三里茶社的信任与支持</p>
            <div
              className=""
              style={{
                color: "#e3a23a",
                border: "1px solid #e3a23a",
                width: "2.5rem",
                margin: "auto",
                borderRadius: "5px"
              }}
              onClick={() => {
                sessionStorage.firstPage = 0;
                this.setState({ firstPage: 0 });
              }}
            >
              关闭
            </div>
          </div>
        </div>

        <Mycomponent.Mes mes={this.state.mes} />
      </div>
    );
  }
}
