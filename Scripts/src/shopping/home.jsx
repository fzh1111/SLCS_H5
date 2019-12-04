'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
export default class ShoppingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: { number: 1 },
      money: [100, 200, 500, 1000, 2000, 5000],
      zhi: 100
    };
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillUnmount() {


  }
  add() {
    console.log(this.state.model.number)
    this.state.model.number = this.state.model.number + 1
    this.setState({})
  }
  min() {
    if (this.state.model.number > 1) {
      this.state.model.number = this.state.model.number - 1
      this.setState({})
    }

  }
  _gopay() {
    // this.state.zhi * this.state.model.number
    common.ajax(`/Recharge/Add?currency=0&total=${this.state.Price}`, {}, (res) => {
      if (res.code == 1) {
        location.href = `/#/pay/home/0?sourceIds=${res.data}&total=${this.state.Price}`
      }
    })
  }

  render() {
    return (
      <div>
        <Mycomponent.Tophead title="账户充值" />
        <section className="Recharge">
          {/*<ul className="List">
            <li>
              {this.state.money.map((row,index)=>{
                return <a className={this.state.zhi==row?"on":""} onClick={()=>{this.setState({zhi:row})}}>{row}</a>
              })}
            </li>
         
          </ul>
          <dl>
            <dt><span>选择单数</span></dt>
            <dd>
              <div className="num">
                <a className="lessA" onClick={()=>{this.min()}}>-</a>
                <input type="text" placeholder="1" value={this.state.model.number} name="number" />
                <a className="addA" onClick={()=>{this.add()}}>+</a>
              </div>
            </dd>
          </dl>*/}
          <div className="flex Recharge_input">
            <span>￥</span>
            <input type="text" placeholder="请输入充值金额"
              onKeyDown={(e) => { e.target.value = e.target.value.replace(/[^\d]/g, ''); }}
              onKeyUp={(e) => { e.target.value = e.target.value.replace(/[^\d]/g, ''); }}
              value={this.state.Price}
              onChange={(e) => { this.state.Price = e.target.value; this.setState({}) }} />
          </div>
          <div className="btn">
            <a className="zfA" onClick={() => { this._gopay() }}>去支付</a>
          </div>
        </section>
      </div>
    );
  }
}