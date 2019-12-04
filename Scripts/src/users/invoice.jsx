"use strict";
import React from "react";
import $ from "jquery";
import Swiper from "../lib/swiper.min";
import common from "../lib/common";
import Mycomponent from "../lib/mycomponent";
let btnAble=true;
export default class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {
        ReceiptAmount: this.props.location.query.ReceiptAmount, //开票订单金额
        OrderIds: this.props.location.query.OrderIds,
        ReceiptName: "",
        ReceiptNo: "",
        ReceiverTel: "",
        ReceiverEmail: "",
        ReceiptType: 0, //订单类型（0、电子发票  1、纸质发票）
        Remark: "" //备注
      }
    };
  }
  componentWillMount() {}
  componentDidMount() {
    console.log(this.props, this.state.ReceiptAmount, this.state.OrderIds);
  }
  componentWillUnmount() {}
  _setModel(e) {
    this.state.model[e.target.name] = e.target.value;
    this.setState({});
  }
  setReceiptType(num) {
    //   console.log(1)
    this.state.model.ReceiptType = num;
    this.setState({
      model: this.state.model
    });
    console.log("this.state.model.ReceiptType:", this.state.model.ReceiptType);
  }
  _submit() {
    if(!btnAble){
      return 
    }
    let mes = "";
    if (common.isEmpty(this.state.model.ReceiptName)) {
      mes = "个人名称不能为空";
      common.mes(this, mes);
      return;
    }

    if (common.isEmpty(this.state.model.ReceiptNo)) {
      mes = "企业税号不能为空";
      common.mes(this, mes);
      return;
    }
    if (common.regexpTest(this.state.model.ReceiverTel, '(^1[34578]\\d{9}$)')) {
      mes = "请输入正确的收票人手机";
      common.mes(this, mes);
      return;
    }
    if (common.isEmpty(this.state.model.ReceiverEmail)) {
      mes = "收票人邮箱不能为空";
      common.mes(this, mes);
      return;
    }
    common.ajax("/receiptinfo/Save", this.state.model, result => {
      if (result.code == 1) {
        btnAble=false;
        common.mes(this, "保存成功", 3, () => {
          
          window.history.go(-1);
        });
      } else {
        common.mes(this, "保存失败", 3, () => {});
      }
    });
  }

  render() {
    return (
      <div>
        <Mycomponent.Tophead title="发票详情" />
        <section className="invoice">
          <ul className="List">
            <li>
              <h3>发票抬头</h3>
              <input
                name="ReceiptName"
                type="text"
                placeholder="请填写个人名称"
                value={this.state.model.ReceiptName}
                onChange={e => {
                  this._setModel(e);
                }}
              />
              <input
                className="other_input"
                name="ReceiptNo"
                type="number"
                placeholder="请填写企业税号"
                value={this.state.model.ReceiptNo}
                onChange={e => {
                  this._setModel(e);
                }}
              />
            </li>
            <li>
              <h3>收票人信息</h3>
              <input
                name="ReceiverTel"
                type="number"
                placeholder="请输入收票人手机"
                value={this.state.model.ReceiverTel}
                onChange={e => {
                  this._setModel(e);
                }}
              />
              <input
                name="ReceiverEmail"
                type="text"
                placeholder="请输入收票人邮箱"
                value={this.state.model.ReceiverEmail}
                onChange={e => {
                  this._setModel(e);
                }}
              />
              <textarea
                name="Remark"
                id=""
                cols="30"
                rows="10"
                placeholder="备注"
                value={this.state.model.Remark}
                onChange={e => {
                  this._setModel(e);
                }}
              />
            </li>
            <li className="fp_type">
              <h3>发票类型</h3>
              <div className="tab">
                <div className={this.state.model.ReceiptType == 0 ? "on" : ""}>
                  <span
                    onClick={() => {
                      this.setReceiptType(0);
                    }}
                  >
                    电子发票
                  </span>
                </div>
                <div className={this.state.model.ReceiptType == 1 ? "on" : ""}>
                  <span
                    onClick={() => {
                      this.setReceiptType(1);
                    }}
                  >
                    纸质发票
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div className="warning">温馨提示：如需纸质发票快递到付</div>
          <div
            className="btn"
            onClick={() => {
              this._submit();
            }}
          >
            确定
          </div>
        </section>
        <Mycomponent.Mes mes={this.state.mes} />
      </div>
    );
  }
}
