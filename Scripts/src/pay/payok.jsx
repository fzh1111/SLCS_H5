'use strict'
import React from 'react';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
export default class PayOK extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payCount:sessionStorage.payCount
        };
    }
    componentDidMount() {
        console.log(this.state.payCount)
    }

    render() {
        return (
            <div>
                <div>
                    <Mycomponent.Tophead   title="支付成功"/>
                    <div className="pay-ok-bg">
                        <div className="pay-ok">
                            <img src="\images\user\pay-ok.png" alt=""/>
                            <p>支付成功</p>
                            <div className="pay-count">
                                ￥{common.format(this.state.payCount)}
                            </div>
                        </div>
                        <div className="complete" onClick={()=>{location.href="/#/users/myorder"}}>
                                完成
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}