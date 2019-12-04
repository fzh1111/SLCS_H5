'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';

export default class ForGotpass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limitTime:60,
      model:{}
    };
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillUnmount() {


  }
  setHeight() {
    var height = $('.login').css("height");
    $('.login').css("height", height);
    if (common.isAndroid()) {
        $('input').bind('click', function (e) {
            var $this = $(this);
            e.preventDefault();
            setTimeout(function () {
                $(window).scrollTop($this.offset().top - 150);
            }, 200)
        })
    }
}
_submit() {
    let mes = '';
    if (common.isEmpty(this.state.model.code))
        mes = '验证码不能为空';
    if (common.regexpTest(this.state.model.mobile, '(^1[34578]\\d{9}$)'))
        mes = '请输入正确的手机号码';
    if (common.isEmpty(this.state.model.mobile))
        mes = '手机号不能为空';
    if (mes.length > 0) {
        common.mes(this, mes);
    } else {
        common.ajax('/Api/VerifySmsCode', this.state.model, (result) => {
            if (result.code == 1) {
                location.href = `/#/login/home`
            } else {
                common.mes(this, result.mes);
            }
        })
    }
}
_send() {
    let mes = '';
    //验证有没填写手机
    if (common.isEmpty(this.state.model.mobile)){
        mes = '手机号不能为空';
        common.mes(this, mes);
    }else if (common.regexpTest(this.state.model.mobile)){
        mes = '请输入正确的手机号码';
        common.mes(this, mes);
    }else {
        //发送验证码的AJAX
        common.ajax('/Api/SendCodeBymobile?mobile=' + this.state.model.mobile, {}, (result) => {
            if (result.code == 1) {
                common.mes(this, '验证码发送成功');
                this.state.limitTime = 60;
                this._setLimitTime();
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
  render() {
    return (
      <div>
        <section className="login">
          <div className="logo"><img src="images/logo.png" width="100%" /></div>
          <ul className="List">
            <li>
              <img src="images/tb_01.png" width="100%" />
              <input name="mobile" type="text" placeholder="请输入手机号码" value={this.state.model.mobile} onChange={(e)=>{common.setModel(this,e)}}/>
            </li>
            <li>
              <img src="images/tb_02.png" width="100%" />
              <input name="password" type="password" placeholder="请输入原密码"  value={this.state.model.password} onChange={(e)=>{common.setModel(this,e)}}/>
              {/* <a className="yzmA"><span>发送验证码</span></a> */}
            </li>
            <li>
              <img src="images/tb_02.png" width="100%" />
              <input name="code" type="text" placeholder="请输入验证码"  value={this.state.model.code} onChange={(e)=>{common.setModel(this,e)}}/>
              <a className="yzmA"><span onClick={()=>{this._send()}}>{this.state.limitTime==60?"发送验证码":this.state.limitTime}</span></a>
            </li>
          </ul>
          <a className="dlA" onClick={()=>{this._submit()}}>确定</a>
          <a className="dlA" style={{marginTop:".5rem"}} onClick={()=>{window.history.back(-1)}}>返回</a>
          {/* <div className="link">
            <a ><span>密码登录</span></a>
            <a ><span>快速注册</span></a>
            <a ><span>忘记密码</span></a>
          </div> */}
        </section>
        <Mycomponent.Mes mes={this.state.mes} />
      </div>

    );
  }
}