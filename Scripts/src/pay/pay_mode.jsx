'use strict'
import React from 'react';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
export default class PayMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isoff: false,
            sourceType: this.props.location.query.sourceType,
            sourceIds: this.props.location.query.sourceIds,
            info: {},
            information:this.props.information

        };
    }

    componentDidMount() {
        common.GetUserInfo(this)
        sessionStorage.payCount = this.props.location.query.total;
        setInterval(()=>{
            console.log(this.state.information)
        })
        

    }
    onBridgeReady(payJson) {
        var that = this;
            WeixinJSBridge.invoke('getBrandWCPayRequest', payJson,
                function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        location.href = '/#/pay/payok';
                        //that.setState({showPayOk:true});
                    } else {
                        window.history.go(-1);
                    }
                }
            );
    }

    toBuy() {
        if (this.state.info.Balance >= Number(this.state.total)) {
            this.setState({ ToBuy: true });
        } else {
            this.setState({ showWarning: true })
        }
    }
    //账户余额付钱
    _payCard(type) {
        common.ajax('/pay/add?sourceType=' + this.state.sourceType + '&sourceIds=' + this.state.sourceIds + '&payType=' + type + "&isUseBalance=" + this.state.isoff, {}, (result) => {
            this.state.ToBuy = false;
            if (result.code == 1) {
                this.setState({ mes: null });
                this.onBridgeReady(result.data);
                // common.mes(this, '付款成功,3秒后返回', 3, () => {
                //     location.href = '/#/order/myorder';
                // });
            } else {
                common.mes(this, result.mes);
            }
        });
        //}
    }
    // _payWechat(type) {
    //     location.href = '/#/pay/wechat/' + this.state.sourceType + '/' + this.state.sourceIds;
    //     sessionStorage.payCount=this.props.location.query.total
    // }
    render() {
        return (
            <div className='bg_hui common_box'>
                <Mycomponent.Top title='选择支付方式' />
                <div className="box_style order_money">
                    <p>订单金额</p>
                    <p>￥{this.props.location.query.total}</p>
                </div>
                <div className="box_style">
                    <ul className="pay_mode_ul">
                        <li>
                            <div className="pay_mode_left">
                                <p><img src="images/index/pay/zf_05.png" /></p>
                                <span>余额</span>
                            </div>
                            <div className="pay_mode_right">
                                <span>￥{this.state.info.Balance}</span>
                                {/* <p><img src="images/index/pay/arr_r.png"/></p> */}
                            </div>
                        </li>
                        <li className={(this.state.info.Balance <= 0 || this.state.info.Balance >= this.props.location.query.total) || this.props.location.query.sourceType == 0 ? "lcb-hide" : ""}>
                            <div>是否先扣除余额</div>
                            <div className="select_btn_box" onClick={() => { this.setState({ isoff: !this.state.isoff }) }}>
                                <div className={this.state.isoff ? "select_btn select_btn_on" : "select_btn select_btn_off"}>
                                    <div className={this.state.isoff ? "select_btn_right" : "select_btn_left"}></div>
                                </div>

                            </div>
                        </li>
                        <li onClick={() => { this._payCard(1) }}>
                            <div className="pay_mode_left">
                                <p><img src="images/index/pay/zf_03.png" /></p>
                                <span>微信支付</span>
                            </div>
                            <div className="pay_mode_right">
                                <p><img src="images/index/pay/arr_r.png" /></p>
                            </div>
                        </li>
                        <li className={this.state.info.Balance >= this.props.location.query.total && this.props.location.query.sourceType != 0 ? "" : "lcb-hide"} onClick={() => { this._payCard(10) }}>
                            <div className="pay_mode_left">
                                <p><img src="images/index/pay/zf_05.png" /></p>
                                <span>余额支付</span>
                            </div>
                            <div className="pay_mode_right">
                                <p><img src="images/index/pay/arr_r.png" /></p>
                            </div>
                        </li>
                        {/* <li>
                            <div className="pay_mode_left">
                                <p><img src="images/index/pay/zf_04.png"/></p>
                                <span>银联支付</span>
                            </div>
                            <div className="pay_mode_right">
                                <p><img src="images/index/pay/arr_r.png"/></p>
                            </div>
                        </li> */}
                    </ul>
                </div>
                {/* <div className="submit_order">
                    <div className="submit_order_money">合计：<span>￥888</span></div>
                    <div className="submit_order_btn" onClick={()=>{console.log("跳转支付")}}>去支付</div>
                </div> */}
                <Mycomponent.Mes mes={this.state.mes} />
            </div>
        );
    }
}