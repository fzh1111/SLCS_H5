'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';

export default class LoginHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {},
      // imgCode: '/Api/GetImgCode',
      xieyi: false,
      limitTime:60,
      send:true,
    };
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillUnmount() {


  }
  // changeImg() {
  //   this.setState({ imgCode: '/Api/GetImgCode?t=' + Math.random() });
  // }
    _send() {
    //验证有没填写手机
    if (common.regexpTest(this.state.model.mobile)) {
        var mes = '请输入正确的手机号码';
        common.mes(this, mes);
    } else {
        this.state.send=false
        //发送验证码的AJAX
        common.ajax('/Api/SendCodeByMobile?mobile=' + this.state.model.mobile, {}, (result) => {
            if (result.code == 1) {
              this.state.send=true
                common.mes(this, '验证码发送成功');
                this.state.limitTime = 60;
                this._setLimitTime();
                this.setState({})
            } else {
                common.mes(this, result.mes);
            }
        })
    }
}
_setLimitTime() {
    if (this.state.limitTime > 0) {
        this.setState({ limitTime: this.state.limitTime - 1 });
        this.state.model.timer = setTimeout(() => { this._setLimitTime() }, 1000)
    }
}
  login() {
    
    let mes = '';
    if (!this.state.xieyi)
      mes = '请阅读协议';
    // if (common.isEmpty(this.state.model.password))
    //   mes = '密码不能为空';

    if (common.regexpTest(this.state.model.code))
      mes = '请输入验证码';
    if (common.isEmpty(this.state.model.mobile))
      mes = '请输入手机号';
    if (mes.length > 0) {
      common.mes(this, mes);
    } else {
      // /Account/RegisterLogin?mobile=&code=

      common.ajax('/Account/RegisterLogin', this.state.model, (res) => {
        if (res.code == 1) {
          location.replace("/#/")
        } else if (res.code == 2) {
          // console.log(this);
          // this.changeImg();
          common.mes(this, res.mes);
        } else {
          common.mes(this, res.mes);
        }
      })

    }
  }
  change(val) {
    this.state.xieyi = val;
    console.log(val)
  }
  render() {
    return (
      <div>
        <section className="login">
          <div className="logo"><img src="images/logo.png" width="100%" /></div>
          <ul className="List">
            <li>
              <img src="images/tb_01.png" width="100%" />
              <input name="mobile" type="text" placeholder="请输入手机号码" value={this.state.model.mobile} onChange={(e) => { common.setModel(this, e) }} />
            </li>
            {/*<li>
              <img src="images/tb_02.png" width="100%" />
              <input name="password" type="password" placeholder="请输入密码" value={this.state.model.password} onChange={(e) => { common.setModel(this, e) }} />
               <a className="yzmA"><span>发送验证码</span></a> 
            </li>*/}
            <li>
              <img src="images/tb_02.png" width="100%" />
              <input name="code" type="text" placeholder="请输入验证码" value={this.state.model.code} onChange={(e) => { common.setModel(this, e) }} />
              {/*<a className="yzmA" style={{ borderLeft: "none" }}><img onClick={() => { this.changeImg() }} style={{ width: '4rem' }} src={this.state.imgCode} alt="" /></a>*/}
              <a className="yzmA"><span onClick={()=>{if(this.state.limitTime==60&&this.state.send==true) this._send()}}>{this.state.limitTime==60?"发送验证码":this.state.limitTime}</span></a>
            </li>
          </ul>
          <div className="flex xieyi">
            <input type="checkbox" id="xieyi" value={this.state.xieyi} onChange={(e) => { this.change(e.target.checked) }} />
            <p>我已阅读,并同意<span onClick={() => { location.href ="http://wx.sanlics.com/partner/xieyi.html" }}>《三里茶社服务协议》</span></p>
            {/*,<span onClick={()=>{location.href ="/#/xieyi/home/"+2}}>《APP退订和退款》</span>协议*/}
          </div>
          <a className="dlA" onClick={() => { this.login() }}>登录/注册</a>
          {/*<div className="link">
            <a><span>密码登录</span></a>
            <a href="/#/login/register"><span>快速注册</span></a>
            <a href="/#/login/forgotpass"><span>忘记密码</span></a>
          </div>*/}
        </section>
        <Mycomponent.Mes mes={this.state.mes} />
      </div>

    );
  }
}