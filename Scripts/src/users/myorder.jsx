'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';

export default class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.params.status,
      rows: [],
      showDelete: false,  //删除的弹窗
      deleteId: 0,     //删除订单的产品ID
      // showTake: false, //确认已收货的弹窗
      takeId: 0, //已收货的产品ID
      hasMore: true, //是否到最后一页
      hasGetList: false, //是否正在加载
      pageNo: 1,
      wuliu: false,
      message: false,//暂无消息
      tea: false,
      share: false,//分享二维码
      qrcode: "",
      frame: false,
      Location: "",//目的地
      res: [], //坐标
      xieyi: false,
      str: null,
      OrderId:null

    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    this._getList();
    this._windowScroll(this);
    this.getSelfPoint();

  }
  componentWillUnmount() {
    $(window).unbind('scroll');

  }
  //取消订单按钮
  _windowScroll(that) {
    $(window).scroll(function () {
      if ($(document).height() <= $(this).scrollTop() + $(this).height()) {
        that._getList();
      }
    });
  }
  _tag(status) {
    var that = this;
    if (status == undefined) {
      location.href = '/#/users/myorder';
    } else {
      location.href = '/#/users/myorder/' + status;
    }
    this.state.status = status;

    //初始化状态
    common.resetList(that);
    this._getList(this.state.str);
  }

  _getList() {

    if (this.state.status == 0) {
      this.state.str = 0;
    } else if (this.state.status == 1) {
      this.state.str = "1,2";
    } else if (this.state.status == 2) {
      this.state.str = "4,5"
    } else {
      this.state.str = null;
    }
    this.setState({})
    console.log("============")
    console.log(this.state.str)
    var that = this;
    common.dropDown(that, '/order/getlist', { ArrStatusStr: this.state.str }, 10)

  }
  //删除订单的ajax
  _delete() {
    let mes = '';
    if (!this.state.xieyi)
      mes = '请阅读协议';
    if (mes.length > 0) {
      common.mes(this, mes);
    } else {
      common.ajax('/order/Cancel/' + this.state.deleteId, {}, (result) => {
        if (result.code == 1) {
          var that = this;
          common.resetList(that);
          this._getList();
          this.setState({ showDelete: false });
        }
      });
    }
  }
  tea(row, row1) {
    this.state.RoomName = row1.RoomName
    this.state.ReserveTimeAbbr = row1.ReserveTimeAbbr
      this.setState({ tea: true })

      alert(row.OpenCode)

    jQuery('.code').html("").qrcode({
      width: 200,
      height: 200,
      render: 'canvas', //设置渲染方式 table canvas 
      typeNumber: -1, //计算模式 
      correctLevel: 0,//纠错等级 
      background: '#ffffff',//背景颜色 
      foreground: '#000000',//前景颜色 
      text: row.OpenCode//链接
    });

    this.setState({})

  }
  share(row, row1) {

    this.state.share_Addr = row1.Location
    this.state.RoomName = row1.RoomName
      this.state.ReserveTimeAbbr = row1.ReserveTimeAbbr
    this.setState({ share: true })
    jQuery('.share').html("").qrcode({
      width: 200,
      height: 200,
      render: 'canvas', //设置渲染方式 table canvas 
      typeNumber: -1, //计算模式 
      correctLevel: 0,//纠错等级 
      background: '#ffffff',//背景颜色 
      foreground: '#000000',//前景颜色 
      text: row.OpenCode//链接
    });

    this.setState({})
    var protocol = window.location.protocol;
    console.log(protocol)
    var host = window.location.host
    console.log(host)
    var title = "三里茶社开门码";
    console.log(title)
    var imgUrl = window.location.origin + row1.RoomIcon;
    console.log(imgUrl)

    // var share_Link = `${protocol}//${host}/#/share/share?url=/#/share/share/${row.OpenCode}`;
    var share_Link = `${protocol}//${host}/#/share/share/${row.OpenCode}`;
    console.log(share_Link)
    common.changeShare(share_Link, title, imgUrl)
  }
  getSelfPoint() {
    var that = this;
    //获得自己的坐标
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      //调用地图命名空间中的转换接口   type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
      qq.maps.convertor.translate(new qq.maps.LatLng(r.point.lat, r.point.lng), 3, function (res) {
        that.state.self = res[0]; //lat lng
        // that.rooms();
        console.log(that.state.self)

      });


    }, { enableHighAccuracy: true });
    // }
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
  renew(ReserveTimes, id) {
    var renew_time = [];
    renew_time = ReserveTimes;
    sessionStorage.renew_time = renew_time[renew_time.length - 1];
    location.href = "/#/shopping/detail/" + id + "/1";
  }
  change(val) {
    this.state.xieyi = val;
    console.log(this.state.xieyi)
    this.setState({})
  }
  //退款
  refund(OrderId) {
    let mes = '';
    if (!this.state.xieyi)
      mes = '请阅读协议';
    if (mes.length > 0) {
      common.mes(this, mes);
    } else {
      common.ajax("/Order/Refund/" + OrderId, {}, (res) => {
      if (res.code == 1) {
        console.log("退款成功！")
        this.state.xieyi = false;
        this.setState({})
        common.mes(this, "退款成功！", 1, () => {
          location.href = "/#/"

        })

      } else {
        common.mes(this, res.mes)
      }
    })
    }
    
  }
  render() {
    return (
      <div>
        <Mycomponent.Tophead title="我的订单" goBack={() => { top.location.href = "/" }} />

        <section className="bigtab bigtab1">
          <ul className=" flex_around">
            {/*未使用，已使用*/}
            <li className={this.state.status == undefined ? "on" : ""}><a onClick={() => { this._tag(undefined) }}><span>全部</span><i></i></a></li>
            <li className={this.state.status == 0 ? "on" : ""}><a onClick={() => { this._tag(0) }}><span>待付款</span><i></i></a></li>
            <li className={this.state.status == 1 ? "on" : ""}><a onClick={() => { this._tag(1) }}><span>使用中</span><i></i></a></li>
            <li className={this.state.status == 2 ? "on" : ""}><a onClick={() => { this._tag(2) }}><span>评价</span><i></i></a></li>
          </ul>
        </section>
        {/*<div className="margintop"></div>*/}
        <section className="bigBox">
          <div className="box" style={{ marginTop: "6vh" }}>
            <ul className="new_ddList">
              {this.state.rows.map((row, index) => {

                return <li key={index} className="li">
                  {row.Items.map((row1, index1) => {
                    return <div key={index1}>
                      <p className="flex_between" style={{ margin: ".2rem 0" }}>
                        <span>订单编号：{row.OrderNo} </span>
                        <span>状态：{row.StatusName}</span>
                      </p>
                      <div className="flex">
                        <div className="img" style={{ width: "50%" }}><img src={row1.RoomIcon} width="100%" onClick={() => { location.href = "/#/shopping/detail/" + row1.RoomId }} /></div>
                        <div className="items" style={{ width: "50%" }}>
                          <div className={row.Status == 2 || row.Status == 1 ? "flex_around" : "hide"}>
                            <img src="images/erqi/yc.png" onClick={() => { this.share(row, row1) }} />
                            <img src="images/erqi/dh.png" onClick={() => { this.setState({ frame: true, Location: row1.Location }) }} />
                            <img src="images/erqi/km.png" onClick={() => { row.Status == 0 ? common.mes(this, "购买后才能获取开门码", 1) : this.tea(row, row1) }} />
                          </div>
                          <div className="btn flex_around">
                            <a className={row.Status == 0 ? "on" : "lcb-hide"} onClick={() => { location.href = `/#/pay/home/1?locked=${row.OrderTicketId!=0?1:0}&TicketId=${row.OrderTicketId!=0?row.OrderTicketId:null}&sourceIds=${row.OrderId}&total=${row.Total}&roomid=${row1.RoomId}&renew=0` }}><span>去付款</span></a>
                            {/*<div className={row.Status == 1 ? "" : "lcb-hide"}>
                              <div className="flex">
                                <input type="checkbox" id="xieyi" value={this.state.xieyi} onChange={(e) => { this.change(e.target.checked) }} />
                                <p style={{color:"blue",fontSize:".8rem"}} onClick={() => { location.href = "/#/xieyi/home/" + 2 }}>《三里茶APP退订和退款》</p>
                              </div>
                              <a className="on" onClick={() => { this.setState({showDelete:true,OrderId:row.OrderId}) }}><span>退&nbsp;&nbsp;&nbsp;款</span></a>
                             
                            </div>*/}
                            <a className={row.Status == 1 ? "on" : "lcb-hide"} onClick={() => { this.setState({showDelete:true,OrderId:row.OrderId}) }}><span>退&nbsp;&nbsp;&nbsp;款</span></a>
                            <a className={row.Status == 2 ? "on" : "lcb-hide"} onClick={() => { this.renew(row1.ReserveTimes, row1.RoomId) }}><span>续&nbsp;&nbsp;&nbsp;费</span></a>
                            <a className={row.Status == 3 ? "off" : "lcb-hide"} ><span>已失效</span></a>
                            <a className={row.Status == 4 ? "on" : "lcb-hide"} onClick={() => { location.href = "/#/users/evaluate/" + row.OrderId }}><span>去评价</span></a>
                            <a className={row.Status == 5 ? "off" : "lcb-hide"} ><span>已评价</span></a>
                            {/*<a className={row.Status == 6 ? "off" : "lcb-hide"} ><span>已退款</span></a>*/}

                            {/*<a className={row.Status == 1 ? "" : "lcb-hide"} onClick={() => { this.state.deleteId = row.OrderId; this.setState({ showDelete: true }) }}><span>取消订单</span></a>*/}
                            {/*<a href={`/#/pay/home/1?sourceType=1&sourceIds=${row.OrderId}&total=${row.Total}`} className={row.Status == 0 ? "on" : "lcb-hide"}><span>待付款</span></a>*/}
                          </div>

                        </div>
                      </div>
                      <h3 className="name">{row1.RoomName}</h3>
                      <span className="flex_between" style={{ color: "#666" }}>时间:{row1.ReserveTimeAbbr}<span>价格：¥{row.Total}</span></span>
                      <p className="ad"><span>地址：{row1.Location}</span></p>
                    </div>
                  })}
                </li>

              })}

            </ul>
          </div>
          {/*<div className={this.state.rows.length > 0 ? 'lcb-hide' : ''} style={{ textAlign: 'center' }}>暂无记录<br /><br /></div>*/}

        </section>
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
        {/*<Mycomponent.TwoBtnShadow show={this.state.showDelete} title='尊敬的用户：'
          content={'是否删除订单'} yesButton='确定'
          yesRun={() => this._delete()}
          cancel={() => {
            this.setState({ showDelete: false })
          }} />*/}

        <Mycomponent.Mes mes={this.state.mes} />
        {/* <Mycomponent.PayMode ref="pay_mode" /> */}
        <div className="tea" className={this.state.tea ? "tea" : "lcb-hide"}>
          <div className="marks"></div>
          <div className="content">
            <div style={{ marginTop: "2rem" }}>
              <h5>到店后请凭此码开门</h5>
              <div className="code"></div>
              <div className="room">{this.state.RoomName}</div>
              <div className="time">{this.state.ReserveTimeAbbr}</div>
            </div>
            <div className="btn" onClick={() => { this.setState({ tea: false, qrcode: "" }); }}>关闭</div>
          </div>
        </div>

        <div className="tea" className={this.state.share ? "tea" : "lcb-hide"}>
          <div className="marks" onClick={() => { this.setState({ share: false, qrcode: "" }); }}></div>
          <div className="content">
            <div className="share_box">
              <p style={{ color: "#000", fontSize: ".8rem" }}>约您:{this.state.ReserveTimeAbbr}</p>
              <p style={{ fontWeight: "bold" }}>三里茶社·万科金域中央店({this.state.RoomName}包厢)</p>
              <p onClick={() => { this.setState({ frame: true, Location: this.state.share_Addr, share: false }) }}><img src="images/addr_y.png" />{this.state.share_Addr}</p>
              <div className="code share"></div>
              <p>到店后凭此码开门</p>
              <p style={{ fontSize: ".7rem" }}>(右上角一键分享给好友)</p>
            </div>
          </div>
        </div>


        <div className={this.state.showDelete ? "tea showDelete" : "lcb-hide"}>
          <div className="marks"></div>
          <div className="content" style={{width:"23rem"}}>
            <div className="share_box">
              <h3>尊敬的用户:</h3>
              <p>是否取消该订单</p>
              <div className="flex xieyi">
                <input style={{marginLeft:".4rem"}} type="checkbox" id="xieyi" name="xieyi" value={this.state.xieyi} onChange={(e) => { this.change(e.target.checked) }} />
                <p>我已阅读,并同意<span onClick={() => { location.href = "/#/xieyi/home/" + 2 }}>《三里茶社APP退订和退款协议》</span></p>
              </div>
              <div className="flex_around">
                <div className="btns" onClick={() => { this.setState({ showDelete: false }); }}>取消</div>
                <div className="btns btns_on" onClick={() => { this.refund(this.state.OrderId) }}>确定</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}