'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';

export default class WalletInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:{},
      rows:[],
    };
  }
  componentWillMount() {
    
  }
  componentDidMount() {
    common.GetUserInfo(this)
    this._getList();
        // this._windowScroll(this);
  }
  componentWillUnmount() {
    // $(window).unbind('scroll');

  }
  // //取消订单按钮
  // _windowScroll(that){
  //   $(window).scroll(function () {
  //       if ($(document).height()<= $(this).scrollTop() + $(this).height()) {
  //           that._getList();
  //       }
    // });
// }
_getList() {
  common.ajax('/Flow/GetList',{pageNo:1,pageSize:500},(res)=>{
    if(res.code==1){
      this.state.rows=res.data.rows;
      this.setState({})
    }
  })
  // var that=this;
  // common.dropDown(that,'/Flow/GetList',{ Status: that.state.status },3)
}
  render() {
    return (
      <div>
        <Mycomponent.Tophead title="我的钱包" />
        <section className="wallet">
          <div className="tit">
            <h3 onClick={()=>{location.href="/#/shopping/home"}} ><img src="images/ico_01.png" width="100%" />立即充值</h3>
            <h3 onClick={()=>{location.href="/#/users/invoice_list"}}><img src="images/ico_02.png" width="100%" />发票设置</h3>
          </div>
          <div className="nr">
            <p>余额 ：{this.state.info.Balance}</p>
            {/* <p>积分 :00000</p> */}
          </div>
          <h3 className="title">资金明细</h3>
          <ul className="List">
          {this.state.rows.map((row,index)=>{
            return <li key={index}>
            <div className="left">
              <h3>{row.SourceTypeName}</h3>
              <p>{row.AddTime}</p>
            </div>
            <div className="right">{row.Total}</div>
          </li>
          })}
            
          </ul>
          {/* <div className="more">
            <p>下拉更多消费记录</p>
            <img src="images/arr_bot.png" width="100%" />
          </div> */}
        </section>
        <Mycomponent.Mes mes={this.state.mes} />
      </div>
    );
  }
}