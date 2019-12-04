'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';

export default class Indentity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Images: [],
      model: {}
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.start()
  }
  componentWillUnmount() {


  }
  start() {
    common.ajax('/User/GetModelAuth', {}, (res) => {
      if (res.code == 1) {
        this.state.model = res.data;
        this.state.Images = res.data.IDCardUrl ? JSON.parse(res.data.IDCardUrl) : []
        this.setState({})
      }

    })
  }
  _selectImage(e, that, status) {
    console.log(e.target.files)
    var reader = new FileReader();
    reader.onload = function (evt) {
      that.setState({ mes: '照片上传中,请耐心等待...' });
      $.ajax({
        url: '/Api/UploadByBase64',
        type: 'POST',
        data: "base64=" + encodeURIComponent(evt.target.result),
        success: function (result) {
          if (status == 1) {
            that.state.Images[0] = { url: result.data.url }

          } else {
            that.state.Images[1] = { url: result.data.url }
          }
          // that.state.Images.push({url:result.data.url});

          that.setState({ mes: null });

        }
      });
    };
    reader.readAsDataURL(e.target.files[0]);

  }
  sub() {
    this.state.img = JSON.stringify(this.state.Images)
    if (this.state.Images.length != 2 || !this.state.model.RealName || !this.state.model.IDCardNo) {
      common.mes(this, "请填写正确信息")
    }
    else {
      common.ajax(`/User/AddIdCard?realName=${this.state.model.RealName}&idCardNo=${this.state.model.IDCardNo}&idCardUrl=${this.state.img}`, {}, (res) => {
        if (res.code == 1) {
          
          common.mes(this,"提交成功",2,(()=>{
            location.href = "/#/"
          }))
          
        }
      })
    }
  }
  render() {
    return (
      <div>
        <Mycomponent.Tophead title="身份认证" />
        <section className="approve">
          <ul className="List">
            <li>
              <h3><img src="images/icon_01.png" width="100%" /><span>姓名</span></h3>
              <input name="" type="text" placeholder="点击输入您的姓名" name="RealName" value={this.state.model.RealName} onChange={(e) => { common.setModel(this, e) }} />
            </li>
            <li>
              <h3><img src="images/icon_02.png" width="100%" /><span>身份证号</span></h3>
              <input name="" type="text" placeholder="点击输入您的身份证号" name="IDCardNo" value={this.state.model.IDCardNo} onChange={(e) => { common.setModel(this, e) }} />
            </li>
          </ul>
          <ul className="yyList">
            <li>
              <h3><span>身份证</span></h3>
              <a className={this.state.Images[0]? "del_bg" :""}>
                <img src={this.state.Images[0] ? this.state.Images[0].url : "images/pic_add.png"} width="100%" />
                <input className="files" type="file" onChange={(e) => { this._selectImage(e, this, 1) }} />
              </a>
            </li>
            <li>
              <h3><span>背面</span></h3>
              <a className={this.state.Images[1]? "del_bg" :""}>
                <img src={this.state.Images[1] ? this.state.Images[1].url : "images/pic_add.png"} width="100%" />
                <input className="files" type="file" onChange={(e) => { this._selectImage(e, this, 2) }} />
              </a>
            </li>
          </ul>
          <div className="btn">
            <a className="tjA" onClick={() => { this.sub() }}>提交</a>
          </div>
        </section>
        <Mycomponent.Mes mes={this.state.mes}/>
      </div>


    );
  }
}