'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
export default class SetHome extends React.Component {
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
      <div>
        <section className="setting">
	<div className="top">
    	<div className="back">
            <a href=""><img src="images/top_arrh.png" width="100%"/></a>
        </div>
        <div className="write">
            <a href=""><img src="images/icon_write.png" width="100%"/></a>
        </div>
         <div className="nr">
            <img src="images/tx_pic.png" width="100%"/>
            <h3><span>昵称未设置</span></h3>
            <p><span>个人介绍空空如也</span></p>
        </div>
    </div>
    <div style={{height:'10em'}}></div>
    <ul className="List">
    	<li>
        	<p><span>学历</span></p>
            <input name="" type="text"  placeholder="未设置"/>
        </li>
        <li>
        	<p><span>性别</span></p>
            <input name="" type="text"  placeholder="未设置"/>
        </li>
        <li>
        	<p><span>手机号码</span></p>
            <input name="" type="text"  placeholder="未设置"/>
        </li>
        <li>
        	<p><span>收货地址</span></p>
            <input name="" type="text"  placeholder="未设置"/>
        </li>
        <li>
        	<p><span>设置密码</span></p>
            <input name="" type="text"  placeholder="未设置"/>
        </li>
    </ul>
</section>

      </div>
    );
  }
}