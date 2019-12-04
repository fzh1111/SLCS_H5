var React = require('react');
var common = require('./common.jsx');
var Component = {
    Tophead: React.createClass({
        getInitialState: function () {
            return {};
        },
        _goBack() {
            console.log(1)
            if (this.props.goBack) {
                this.props.goBack();
            }
            else {
                window.history.go(-1);
            }
        },
        render() {
            return <div>
                <header>
                    <div className="tit"><span style={{fontSize:"1rem"}}>{this.props.title}</span></div>
                    <div className="back">
                        <a onClick={()=>{this._goBack()}}><img src="images/top_arrh.png" width="100%" /></a>
                    </div>
                </header>
                <div className="header_bg"></div>
            </div>
        }
    }),
    Mes: React.createClass({
        render: function () {
            var className = 'lcb-hide';
            if (this.props.mes)
                className = 'lcb-mes';
            return <div className={className}>
                <div className='lcb-mes-text'>{this.props.mes}</div>
            </div>;
        }
    }),
    TwoBtnShadow: React.createClass({
        getInitialState: function () {
            return {};
        },
        render() {
            return <div className={this.props.show ? '' : 'lcb-hide'}>
                <div className="tcc_bg"></div>
                <div className="redbegtcc">
                    <h3>{this.props.title}</h3>
                    {/*<p>继续充值{this.props.needTotal}元后，可激活该红包！</p> */}
                    <p>{this.props.content}</p>

                    <div className="btn">
                        <a onClick={() => { this.props.yesRun() }} className="orangeC">{this.props.yesButton}</a>
                        <a onClick={() => { this.props.cancel() }} className="greyA">{this.props.cancelButton ? this.props.cancelButton : "取消"}</a>
                    </div>
                </div>
            </div>
        }
    }),
    OneBtnShadow: React.createClass({
        getInitialState: function () {
            return {};
        },
        render() {
            return <div className={this.props.show ? '' : 'lcb-hide'}>
                <div className="tcc_bg"></div>
                <div className="redbegtcc" style={{ padding: 0 }}>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.content}</p>
                    <div className="btn">
                        <a onClick={() => { this.props.yesRun() }} className="orangeA" >确定</a>
                    </div>
                </div>
            </div>
        }
    }),

    Top: class Top extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isShow: false
            }
        }
        _goBack() {
            if (this.props.goBack) {
                this.props.goBack();
            }
            else {
                window.history.go(-1);
            }
        }
        // top_up(name){
        //     if(name=="发布"){
        //         location.href="/#/users/publish"
        //     }else{

        //     }
        // }
        render() {
            return <div>
                <header className="back_header">
                    <div className="back_item_box">
                        <div className="back_header_img" onClick={() => { this._goBack() }}>
                            <img src="\images\index/product/arr_back.png" width="100%" />
                        </div>
                    </div>


                    <div className="back_item_box">
                        <div className="tit">
                            <h3>{this.props.title}</h3>
                        </div>
                    </div>


                    <div className="back_item_box" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div className={this.props.isShow ? "back_header_img_show" : "back_header_img_hide"}>
                            {/* <div onClick={() => { this.props.search == "search" ? this._search() : "" }} className={this.props.imgUrl ? "top_img" : "top_img_hide"}>
                                <img src={this.props.imgUrl} width="100%" />
                            </div> */}
                            <div className={this.props.name ? "back_header_name_show" : "back_header_name_hide"}
                                onClick={() => { this.top_up(this.props.name); this.props.name == "发表" ? this._getFabiao() : ""; }}>{this.props.name}</div>
                        </div>
                    </div>

                </header>

                <div className={this.state.isShow ? "fabu_box" : "lcb_hide"}>
                    <div className="guanbilibili" onClick={() => { this.setState({ isShow: false }) }}></div>
                    <div className="xiaojiujiu"></div>
                    <div className="tc_box">
                        <ul>
                            <li onClick={() => { location.href = "/#/users/publish" }}>求职招聘</li>
                            <li onClick={() => { location.href = "/#/users/publish/5" }}>故障问答</li>
                            <li onClick={() => { location.href = "/#/users/publish/6" }}>设备租聘</li>
                            <li onClick={() => { location.href = "/#/users/publish/7" }}>二手市场</li>
                        </ul>
                    </div>
                </div>
            </div>

        }
        top_up(name) {
            if (name == "发布") {
                this.setState({ isShow: true })
            }
        }
        _getFabiao() {
            console.log("发表成功")
        }
        _search() {
            location.href = "/#/index/search";
        }
    },
    PopUp: React.createClass({
        render() {
            return <div>
                <div className={this.props.isShow ? "more_show" : "lcb_hide"}>
                    <div className="more_show_box order_popup">
                        <div className="popup_content">
                            <p className="popup_title">{this.props.titlt}</p>
                            <ul className="popup_list">
                                <li></li>
                            </ul>
                        </div>
                        <div className="order_popup_btn">
                            <p className="popup_no" onClick={() => { this.setState({ isShow: false }) }}>取消</p>
                            <p className="popup_yes" onClick={() => { this.setState({ isShow: false }) }}>确认</p>
                        </div>
                    </div>
                </div>
            </div>
        }
    }),
    TopRight: React.createClass({
        _goBack() {
            if (this.props.goBack) {
                this.props.goBack();
            }
            else {
                window.history.go(-1);
            }
        },
        render() {
            return <div>
                <header className="back_header" style={this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor, color: this.props.color } : { backgroundColor: '#00BFA3', color: '#fff' }}>
                    <img src="\images\public/back_2.png" onClick={() => { this._goBack() }}
                        width="100%" />
                    <div className="tit">
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="right" onClick={() => { this.props.goTo() }} >
                        {this.props.rightTitle}
                    </div>
                </header>
                <div className="back_header_bg"></div>
            </div>
        }
    }),
    PayMode: class PayMode extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isoff: false,
                sourceType: sessionStorage.sourceType,
                // sourceType: this.props.location.query.sourceType,
                // sourceIds: this.props.location.query.sourceIds,
                info: {},
                open: false,
                color: 1,
                type: 1,


            };
        }

        componentDidMount() {
            // console.log(this.props.)
            common.GetUserInfo(this)
            // sessionStorage.payCount = this.props.location.query.total;

        }
        information(sourceIds, Total, TotalScore) {
            console.log(sourceIds)
            this.state.sourceIds = sourceIds
            sessionStorage.payCount = Total
            this.state.a = sessionStorage.payCount;
            this.setState({})

        }
        toggle() {
            this.setState({ open: !this.state.open })

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
        //付钱
        _payCard(type) {
            if (type) {
                common.ajax('/pay/add?sourceType=' + sessionStorage.sourceType + '&sourceIds=' + this.state.sourceIds + '&payType=' + type + "&isUseBalance=" + this.state.isoff, {}, (result) => {
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
            } else {
                common.mes(this, "请选择支付方式")
            }



            //}
        }
        // _payWechat(type) {
        //     location.href = '/#/pay/wechat/' + this.state.sourceType + '/' + this.state.sourceIds;
        //     sessionStorage.payCount=this.props.location.query.total
        // }
        isoff_() {

            this.setState({ isoff: !this.state.isoff })

            if (!this.state.isoff) {
                if (this.state.info.Balance > this.state.a) {
                    sessionStorage.payCount = 0
                    this.setState({ color: 2 })
                } else {
                    sessionStorage.payCount = parseInt(sessionStorage.payCount) - parseInt(this.state.info.Balance)
                }
                this.setState({})
            } else {
                sessionStorage.payCount = this.state.a
                this.setState({})
            }
        }




        // if(this.state.isoff){
        //     sessionStorage.payCount=0
        // }


        render() {
            return (
                <div className={this.state.open ? "group_pay" : "lcb-hide"}>
                    <div className='bg_hui common_box'>
                        {/* <Mycomponent.Top title='选择支付方式' /> */}
                        <div className="box_style order_money" style={{ position: "relative", height: "1rem", margin: 0 }}>
                            <div style={{ width: '100%', textAlign: "center", fontWeight: "bold" }}>选择支付方式</div>
                            <span className="guanbi1" onClick={() => { if (sessionStorage.sourceType == 1) { location.href = "/#/order/myorder/0"; this.toggle() } else { this.toggle() } }}>x</span>
                            {/* <p>￥{this.props.location.query.total}</p> */}
                            <p></p>
                        </div>
                        <div className="box_style" style={{ margin: 0 }}>
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
                                <li className={sessionStorage.sourceType != 1 ? "lcb-hide" : ""}>
                                    {/* <li className={(this.state.info.Balance <= 0 || this.state.info.Balance >= this.props.location.query.total) || this.props.location.query.sourceType == 0 ? "lcb-hide" : ""}> */}
                                    <div>是否先扣除余额</div>
                                    <div className="select_btn_box" onClick={() => { this.isoff_() }} >
                                        <div className={this.state.isoff ? "select_btn select_btn_on" : "select_btn select_btn_off"}>
                                            <div className={this.state.isoff ? "select_btn_right" : "select_btn_left"}></div>
                                        </div>

                                    </div>
                                </li>
                                <li onClick={() => { this.state.type = 1; this.setState({ color: 1 }) }}>
                                    <div className="pay_mode_left">
                                        <p><img src="images/index/pay/zf_03.png" /></p>
                                        <span>微信支付</span>
                                    </div>
                                    <div className={this.state.color == 1 ? "pay_mode_right" : "lcb-hide"}>
                                        <p><img style={{ height: "initial" }} src="images/pubilc/true.png" /></p>
                                    </div>
                                </li>
                                <li className={(sessionStorage.sourceType == 1 || sessionStorage.sourceType == 2) && this.state.info.Balance != 0 && this.state.info.Balance >= sessionStorage.payCount ? "" : "lcb-hide"} onClick={() => { this.state.type = 10; this.setState({ color: 2 }) }}>
                                    {/* <li className={this.state.info.Balance >= this.props.location.query.total && this.props.location.query.sourceType != 0 ? "" : "lcb-hide"} onClick={() => { this._payCard(10) }}> */}
                                    <div className="pay_mode_left">
                                        <p><img src="images/index/pay/zf_05.png" /></p>
                                        <span>余额支付</span>
                                    </div>
                                    <div className={this.state.color == 2 ? "pay_mode_right" : "lcb-hide"}>
                                        <p><img style={{ height: "initial" }} src="images/pubilc/true.png" /></p>
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
                            <div className="gotopay">
                                <div onClick={() => { this._payCard(this.state.type) }}><span>去支付 ￥{sessionStorage.payCount}</span></div>
                            </div>
                        </div>
                        {/* <div className="submit_order">
                        <div className="submit_order_money">合计：<span>￥888</span></div>
                        <div className="submit_order_btn" onClick={()=>{console.log("跳转支付")}}>去支付</div>
                    </div> */}
                        {/* <Mycomponent.Mes mes={this.state.mes} /> */}
                    </div>
                </div>
            );
        }
    }
};

module.exports = Component;