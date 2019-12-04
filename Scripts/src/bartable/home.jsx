'use strict'
import React from 'react';
import $ from 'jquery';
import qrcode from 'jquery-qrcode';
import common from './lib/common';
import Mycomponent from './lib/mycomponent';
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdv: sessionStorage.showAdv, //显示广告
            currentUser: {}, //存用户数据的
            detail: false,
            fenxiang: false,
            index: 3,
            info: {},
            search_box: false,
            model: {}
        };
    }

    componentDidMount() {
        common.GetUserInfo(this)
        console.log(this.state.model)
    }
    componentWillUnmount() {
  
  }
    _toggle(url) {
        location.href = url;
    }
    _logOut() {
        common.ajax('/User/Logout', {}, (res) => {
            if (res.code == 1) {
                location.href = "/"
            }
        })
    }
    setSearch() {
        this.state.search_box = true
    }
    render() {
        return (
            <div style={{backgroundColor:"#fff"}}>
                <div >
                    {this.props.children}
                    {/*<header>
                        <div className="menu">
                            <a onClick={() => { this.setState({ detail: true }) }}><img src="/images/top_menu.png" width="100%" /></a>
                        </div>
                        <div className="logo"><img src="/images/logo_s.png" width="100%" /></div>
                        <div className="reserve" onClick={() => { location.href = '/#/users/myorder' }}>
                            <a href="/#/users/myorder"><img src="/images/top_yy.png" width="100%" /></a>
                        </div>
                    </header>*/}
                    <header className="new_header">
                        <div className="flex_between" style={{ width: "100%", margin: "auto" }}>
                            <div className="search flex" onClick={()=>{location.href = "/#/map/home"}}><img src="images/home/fdj.png" style={{ width: "2.5vh", margin: "0 .3rem" }} />
                                <input type="text" placeholder="福州" name="addr" value={this.state.model.addr} onChange={(e)=>{common.setModel(this,e),this.state.search_box = true}}/>
                            </div>
                            <div className="flex icon">
                                <div className="icon_div">
                                    <img src="images/erqi/addr1.png" onClick={()=>{location.href = "/#/map/home"}} />
                                </div>
                                <div className="icon_div" onClick={() => { this.setState({ detail: true }) }}>
                                    <img src="images/erqi/user1.png" />
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="component_fixBottom"></div>
                    <section className="bigtab new_bigtab">
                        <ul className="flex_around">
                            {/*<li className={sessionStorage.index == 1 ? "on" : ""}><a onClick={() => { location.href = "/#/" }}><span>茶社生活</span><i></i></a></li>*/}
                            <li className={sessionStorage.index == 1 ? "on" : ""}><a onClick={() => { location.href = '/#/' }}><span>预约茶社</span><i></i></a></li>
                            <li className={sessionStorage.index == 2 ? "on" : ""}><a onClick={() => { location.href = '/#/users/myorder' }}><span>订单详情</span><i></i></a></li>
                            <li className={sessionStorage.index == 3 ? "on" : ""}><a onClick={() => { location.href = "/#/service/home" }}><span>联系客服</span><i></i></a></li>
                            <li className={sessionStorage.index == 4 ? "on" : ""}><a onClick={() => { location.href = '/#/appointment/ShoppingMall' }}><span>三里商城</span><i></i></a></li>
                            {/*<li className="lir"><a onClick={() => { this.setState({index:4}) }}><img src="images/hicon_01.png" width="100%" /><span>智码开门</span><i></i></a></li>*/}
                            {/*<li className="lir"><a onClick={() => { this.setState({index:5}) }}><span>码上约茶</span><img src="images/hicon_02.png" width="100%" /><i></i></a></li>*/}
                        </ul>
                    </section>

                </div>
                <div className={this.state.detail ? "boxss" : "lcb-hide"}>
                    <div className="marks" onClick={() => { this.setState({ detail: false }) }}></div>
                    <div className="grzxBox">
                        <div className="top">
                            <img src={this.state.info.Icon} width="100%" />
                            <h3>{this.state.info.NickName}</h3>
                            {/* <p>暂无信息</p> */}
                        </div>
                        <ul className="List">
                            <li onClick={() => { location.href = "/#/users/Identity" }}>
                                <a><h3><span>身份认证</span></h3>
                                    <img src="images/arr_r.png" width="100%" /></a>
                            </li>
                            {/*<li onClick={()=>{location.href="/#/users/myorder"}}>
                                <a><h3><span>订单详情</span></h3>
                                    <img src="images/arr_r.png" width="100%" /></a>
                            </li>*/}
                            <li onClick={() => { location.href = "/#/users/collect" }}>
                                <a ><h3><span>最爱收藏</span></h3>
                                    <img src="images/arr_r.png" width="100%" /></a>
                            </li>
                            <li onClick={() => { location.href = "/#/users/wallet_invoice" }}>
                                <a ><h3><span>钱包发票</span></h3>
                                    <img src="images/arr_r.png" width="100%" /></a>
                            </li>
                            <li onClick={() => { location.href = "/#/users/message" }}>
                                <a ><h3><span>我的消息</span></h3>
                                    <img src="images/arr_r.png" width="100%" /></a>
                            </li>
                            <li onClick={()=>{location.href="/#/pay/discount_list"}}>
                                <a ><h3><span>我的优惠券</span></h3>
                                    <img src="images/arr_r.png" width="100%" /></a>
                            </li>
                            {/* <li onClick={()=>{location.href="/#/users/collect"}}>
                                <a href="/#/set/home"><h3><span>设置</span></h3>
                                    <img src="images/arr_r.png" width="100%" /></a>
                            </li> */}
                            <li onClick={() => { this.setState({ showLogOut: true }) }}>
                                <a><h3><span>退出登录</span></h3></a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/*<div className={this.state.search_box ? "pospos" : "hide"}>
                    <div className="marks" onClick={() => { this.setState({ search_box: false }) }}></div>
                    <div className="content">
                        <iframe id="mapPage" style={{ width: "100%", height: "25rem", border: "1px solid #eee" }} src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"></iframe>
                        325435
                    </div>
                </div>*/}
                <Mycomponent.Mes mes={this.state.mes} />
                <Mycomponent.TwoBtnShadow show={this.state.showLogOut} title='尊敬的用户：'
                    content="是否确定退出登录" yesButton='确定' yesRun={() => { this._logOut() }}
                    cancel={() => { this.setState({ showLogOut: false }); }} />
            </div>
        );
    }
};