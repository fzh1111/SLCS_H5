'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
export default class AppointmentHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }
  componentWillMount() {

  }
  componentDidMount() {

      this.getSelfPoint()

    
  }
  componentWillUnmount() {


  }

  getSelfPoint() {
    var that = this;
      //获得自己的坐标
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        //调用地图命名空间中的转换接口   type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
        qq.maps.convertor.translate(new qq.maps.LatLng(r.point.lat, r.point.lng), 3, function (res) {
          that.state.self = res[0]; //lat lng
          that.rooms();

        });


      }, { enableHighAccuracy: true });
    // }
    this.setState({})

  }
  rooms() {
    common.ajax('/Room/GetList', { pageNo: 1, pageSize: 2000, isAsc: true, sortField: 'Distance', filters: { Latitude: this.state.self.lat, Longitude: this.state.self.lng } }, (res) => {
      if (res.code == 1) {
        this.state.rows = res.data.rows;
        this.setState({})
      }
    })
  }
  render() {
    return (
      <div>
        <div className="margintop"></div>

        <section className="bigBox">
          <div className="box" style={{ marginTop: "0" }}>
            <ul className="yycsList">
              {this.state.rows.map((row, index) => {
                return <li key={index} onClick={() => { location.href = "/#/shopping/detail/" + row.RoomId }}>
                  <div className="pic"><img src={row.RoomIcon} width="100%" /></div>
                  <h3><span>{row.RoomName}</span></h3>
                  <a className="love"></a>
                  <div className="ad"><img src="images/icon_lo_b.png" width="100%" /><span>距您{`${row.Distance > 999 ? (row.Distance / 1000).toFixed(2) + '公里' : row.Distance}`}|{row.StoreName}</span></div>
                  <div className="time">
                    <p><b>¥{row.Price}</b><span>/小时</span></p>
                    <p><span>半小时起订</span></p>
                  </div>
                </li>
              })}


            </ul>
          </div>
        </section>

      </div>
    );
  }
}