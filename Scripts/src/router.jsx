'use strict'
import React from 'react';
import common from './lib/common';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Provider } from 'react-redux'

//index 首页
import Home from './index/home';
//预约茶社

// import AppointmentHome from './appointment/home';
//login 登录页
import LoginHome from './login/home';
import Register from './login/register';
import ForgotPass from './login/forgotpass';
//客服
import ServiceHome from './service/home';
//users
import UsersHome from './users/home';

import NoMatch from './no_match';
import Main from './main';
//个人中心  identity
import Identity from './users/identity'
import MyOrder from './users/myorder'
import Collect from './users/collect'
import Message from './users/message'
import Coupons from './users/coupons'
import WalletInvoice from './users/wallet_invoice'
import Invoice from './users/invoice'
import InvoiceList from './users/invoice_list'
import Evaluate from './users/evaluate'
import DaiJinQuan from './users/daijinquan'
//商城
import ShoppingHome from './shopping/home'
import ShoppingDetail from './shopping/detail'
//设置
import payHome from './pay/home'
import payOk from './pay/payOk'
import payMode from './pay/pay_mode'
import PayWeChat from './pay/wechat'
//协议
import Xieyi from './xieyi/home'
//三里商城
import ShoppingMall from './appointment/ShoppingMall'
// 地图
import Maps from './map/home'
// 分享
import Share from './share/share'
//优惠券列表
import DiscountList from './pay/discount_list'

import SetHome from './set/home'
//css
import '../../Content/main.scss';
import '../../Content/lsh.scss';
import '../../Content/zy.scss';
import '../../Content/cjl.scss';
import '../../Content/hhl.scss';
// import 'antd/dist/antd.css';
const store = createStore(common.reducer, 0);
import { createStore } from 'redux';
class RouterApp extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
              <Route path="/" component={Main}>
                    <IndexRoute component={Home} onEnter={() => { sessionStorage.index = 1 }} />
                    {/*<Route path="/appointment/home" component={AppointmentHome} onEnter={() => { sessionStorage.index = 2 }} />*/}
                    <Route path="/service/home" component={ServiceHome} onEnter={() => { sessionStorage.index = 3 }} />
                     <Route path="/appointment/ShoppingMall" component={ShoppingMall} onEnter={() => { sessionStorage.index = 4 }} />{/*三里商城*/}
                    {/* <Route path="/users/home" component={UsersHome} onEnter={() => { sessionStorage.index = 5 }} /> */}
             </Route>
            
             <Route path="/login/home" component={LoginHome} />{/*登录*/}
             <Route path="/login/register" component={Register} />{/*登录*/}
             <Route path="/login/forgotpass" component={ForgotPass} />{/*登录*/}
             <Route path="/users/identity" component={Identity} />{/*身份验证*/}
             <Route path="/users/myorder(/:status)" component={MyOrder} onEnter={() => { sessionStorage.index = 2 }} />{/*我的订单*/}
             <Route path="/users/collect" component={Collect} />{/*我的收藏*/}
             <Route path="/users/message" component={Message} />{/*我的消息*/}
             <Route path="/users/coupons" component={Coupons} />{/*我的优惠券*/}
             <Route path="/users/wallet_invoice" component={WalletInvoice} />{/*资金明细*/}
             <Route path="/users/invoice" component={Invoice} />{/*发票设置 */}
             <Route path="/users/invoice_list" component={InvoiceList} />{/*发票设置 */}
             <Route path="/users/evaluate(/:orderID)" component={Evaluate} />{/*发表评价 */}
             <Route path="/set/home" component={SetHome} />{/*我的设置*/}
             <Route path="/pay/discount_list" component={DiscountList} />{/*我的设置*/}
             <Route path="/shopping/home" component={ShoppingHome} />{/*账户充值*/}
             <Route path="/pay/home(/:sourceType)" component={payHome} />{/*支付方式*/}
             <Route path="/pay/payok" component={payOk} />{/*支付成功*/}
             <Route path="/pay/pay_mode" component={payMode} />{/*选择支付方式*/}
             <Route path="/xieyi/home(/:num)" component={Xieyi} />{/*协议*/}
             <Route path="/map/home" component={Maps} />{/*地图*/}
             <Route path="/share/share(/:opencode)" component={Share} />{/*分享*/}
             <Route path="/users/daijinquan" component={DaiJinQuan} />{/*代金券*/}
            
             <Route path="/pay/wechat/:sourceType/:sourceIds" component={PayWeChat} />{/*我的订单*/}
             <Route path="/shopping/detail(/:id)(/:is_renew)" component={ShoppingDetail} />{/*预定详情*/}
              <Route path="*" component={NoMatch}></Route>
             {/* <Route path="/product/teahousedetail" component={ProductTeaHouseDetail} />茶室详细 */}
             {/* <Route path="/product/teahouselist" component={ProductTeaHouseList} />茶室详细 */}






            </Router>
        )
    }
}

render((
    <Provider store={store}>
        <RouterApp />
    </Provider>
), document.getElementById('baseApp'));