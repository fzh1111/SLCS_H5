'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';

export default class UsersHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillUnmount() {


  }
  render() {
    return (

      <div className="my-program">
        <div className="program-top"><img className="bg-picture" src="/images/membercenter/top_bg.png" />
          {/* <div className="top-picture"> */}
         <div className="my-info">
            <div className="set-info">
              <div className="set-img"><img src="/images/membercenter/top_sz.png" /></div>
              <div className="my-name">
             <p>姓名</p>
             <p className="update-name"> <img src="/images/membercenter/top_xg.png" /></p>
              </div>
             <div  className="mail-box">
              <p className="my-headset"><img src="/images/membercenter/top_yy.png" /></p>
              <p className="my-emailbox"><img src="/images/membercenter/top_xx.png" /></p>
              </div>
            </div>
            <div className="set-balance">
              <p>余额：￥9.00</p>
              <p>积分：9.00</p>
            </div >
            <div className="set-personal">
              <img src="/images/membercenter/per.png" />
      </div>
      </div>
        
        </div>
        <div className="my-library">
         <ul className="my-library-list">
          <li>
            <div className="library-list"><img src="/images/membercenter/icon_01.png" /></div>
            <p>收藏</p>
            </li>

          <li>
           <div className="library-list"> <img src="/images/membercenter/icon_02.png" /></div>
         <p> 评价</p>
          </li>
          <li>
           <div className="library-list"><img src="/images/membercenter/icon_03.png" /></div>
           <p className="my-browse"> 最近浏览</p>
            </li>
          </ul>
        </div>
      
        <div className="myorder-detail">
        <ul className="myorder-detail-list">
          <li>
          <div className="detail-list">  <img src="/images/membercenter/tab_01.jpg" /></div>
           <p> 全部订单</p>
            </li>
          <li>
          <div className="detail-list">  <img src="/images/membercenter/tab_02.jpg" /></div>
          <p>  已完成</p>
            </li>
          <li>
           <div className="detail-list"> <img src="/images/membercenter/tab_03.jpg" /></div>
           <p> 进行中</p>
            </li>
          <li>
            <div className="detail-list"><img src="/images/membercenter/tab_04.jpg" /></div>
           <p> 待评价</p>
            </li>
          </ul>
        </div>
        <div className="account-center">
        <div className="">账户中心</div>
          <ul className="account-center-list">
            <li>
             <div className="account-centerimg"> <img src="/images/membercenter/i_01.jpg"></img></div>
              <p>我的钱包</p>
            </li>
            <li>
             <div className="account-centerimg"> <img src="/images/membercenter/i_02.jpg"></img></div>
              <p>红包/卡券</p></li>
            <li>
             <div className="account-centerimg"> <img src="/images/membercenter/i_03.jpg"></img></div>
              <p>资金明细</p>
            </li>
            <li>
             <div  className="account-centerimg"> <img src="/images/membercenter/i_04.jpg"></img></div>
              <p>账户充值</p>
            </li>
            <li>
             <div className="account-centerimg"> <img src="/images/membercenter/i_05.jpg"></img></div>
              <p>分享推广</p>
            </li>
            <li>
             <div className="account-centerimg"> <img src="/images/membercenter/i_06.jpg"></img></div>
              <p>智能客服</p>
            </li>
            <li>
            <div className="account-centerimg"> <img src="/images/membercenter/i_07.jpg"></img></div> 
              <p>发票设置</p>
            </li>
            <li>
             <div className="account-centerimg"> <img src="/images/membercenter/i_08.jpg"></img></div>
              <p>升级VIP</p>
            </li>

          </ul>
        </div>

      </div>
    );
  }
}