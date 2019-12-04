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
      limitTime:60,
      send:true,
      xieyi:false
    };
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillUnmount() {


  }
  register() {
    let mes = '';
    if(!this.state.xieyi)
      mes = '请阅读协议';
    if (common.isEmpty(this.state.model.code))
        mes = '验证码不能为空';
    if (this.state.model.password != this.state.model.password1) {
        mes = "两次输入的密码不相同";
    }
    if (common.regexpTest(this.state.model.password))
        mes = '请输入6位以上的密码';
    if (common.regexpTest(this.state.model.mobile))
        mes = '请输入正确的手机号码';
    // if (common.isEmpty(this.state.model.userName))
    //     mes = '账号不能为空';
    if (mes.length > 0) {
        common.mes(this, mes);
    } else {
        common.ajax('/Account/Register', this.state.model, (result) => {
            if (result.code == 1) {
                common.mes(this, '注册成功', 1, () => {
                    location.replace("/#/")

                });
            } else {
                common.mes(this, result.mes);
            }
        })
    }
}
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
change(val){
    
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
            <li>
              <img src="images/tb_02.png" width="100%" />
              <input name="code" type="text" placeholder="请输入验证码" value={this.state.model.code} onChange={(e) => { common.setModel(this, e) }} />
              <a className="yzmA"><span onClick={()=>{if(this.state.limitTime==60&&this.state.send==true) this._send()}}>{this.state.limitTime==60?"发送验证码":this.state.limitTime}</span></a>
            </li>
            <li>
              <img src="images/tb_02.png" width="100%" />
              <input name="password" type="password" placeholder="请输入密码" value={this.state.model.password} onChange={(e) => { common.setModel(this, e) }} />
            </li>
            <li>
              <img src="images/tb_02.png" width="100%" />
              <input name="password1" type="password" placeholder="请再次输入密码" value={this.state.model.password1} onChange={(e) => { common.setModel(this, e) }} />
            </li>
          </ul>
          <div className="flex xieyi">
            <input type="checkbox" id="xieyi" value={this.state.xieyi} onChange={(e)=>{this.change(e.target.checked)}}/>
            <p>我已阅读,并同意<span onClick={()=>{location.href ="/#/xieyi/home/"+1}}>《三里茶社服务协议》</span>,<span onClick={()=>{location.href ="/#/xieyi/home/"+2}}>《APP退订和退款》</span>协议</p>
          </div>
          <a className="dlA" onClick={() => { this.register() }}>注册</a>
          <a style={{ marginTop: "0.5rem" }} href="/#/login/home" className="dlA">已有账号登录</a>
        </section>
        <Mycomponent.Mes mes={this.state.mes}/>
      </div>

    );
  }
}