'use strict'
import React from 'react';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
export default class PayWeChat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: this.props.params.sourceType,
			sourceIds: this.props.params.sourceIds,
            showPayOk:false //设置充值成功的弹窗显示
		};
	}
	componentDidMount() {

        var that=this;
		function onBridgeReady(payJson) {
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
		this.setState({ mes: '提交付款...' });
		common.ajax('/pay/add?sourceType=' + this.state.sourceType + '&sourceIds=' + this.state.sourceIds+'&payType=1', {}, (result) => {
			if (result.code == 1) {
				this.setState({ mes: null });
				onBridgeReady(result.data);
			} else {
				common.mes(this, result.mes);
			}
		})
	}
	
	render() {
		return (
			<div className='bg_hui'>
				<Mycomponent.Tophead title='微信支付' />
				<Mycomponent.Mes mes={this.state.mes} />
			</div>
		);
	}
}