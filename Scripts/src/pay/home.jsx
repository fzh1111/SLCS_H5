"use strict";
import React from "react";
import common from "../lib/common";
import Mycomponent from "../lib/mycomponent";
export default class Pay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceIds: this.props.location.query.sourceIds,
      total: this.props.location.query.total,
      info: {}, //个人信息
      ToBuy: false, //是否确定购买
      showWarning: false, //去充值
      sourceType: this.props.params.sourceType,
      roomid: this.props.location.query.roomid,
      renew: this.props.location.query.renew,
      manjian: [],
      showmanjian: 0,
      isRefreshDiscount: false, //是否更新了优惠券
      usefulDiscountNum: 0, //可使用的优惠券数量
      TicketId: this.props.location.query.TicketId || null, //优惠劵ID
      TicketPrice: 0, //优惠券金额
      locked: Math.floor(this.props.location.query.locked), //是否被锁定
      choosePayType:0   //选择的支付类型 0是没选择 1是账号余额支付 2是微信支付
    }; 
  }

  componentDidMount() {
    console.log('this.props.location.query.TicketId:',this.props.location.query.TicketId)
    sessionStorage.payCount = this.state.total;
    // if (
    //   this.props.location.query.TicketId != "null" &&
    //   this.props.location.query.TicketId
    // ) {
    //   sessionStorage.TicketId = this.props.location.query.TicketId;
    //   this.state.TicketId = this.props.location.query.TicketId;
    // }
    common.GetUserInfo(this);
    this.getList();
  }
  componentWillUnmount() {
    // sessionStorage.TicketId = null;
  }
  getmanjian() {
    common.ajax("/Discount/GetListByRoomId/" + this.state.roomid, {}, res => {
      if (res.code == 1) {
        let arr = [];
        this.state.manjian = res.data;
        console.log(this.state.manjian);
        this.state.manjian.map((row, index) => {
          if (this.state.total >= row.FullTotal) {
            console.log("满减:" + index);
            arr.push(index);
          }
        });
        if (arr.length > 0) {
          this.state.showmanjian =
            this.state.total - this.state.manjian[arr.length - 1].Subtract;
          sessionStorage.payCount = this.state.showmanjian;
        } else {
          sessionStorage.payCount = this.props.location.query.total;
        }
        // sessionStorage.payCount = this.props.location.query.total;

        console.log(arr);
        console.log(this.state.showmanjian);
        this.setState({});
      }
    });
  }
  _payWechat(e) {
    // if (
    //   (this.state.isRefreshDiscount && this.state.usefulDiscountNum == 0) ||
    //   (this.state.isRefreshDiscount &&
    //     this.state.usefulDiscountNum > 0 &&
    //     this.state.TicketPrice > 0)
    // ) {
    // } else {
    //   common.mes(this, "请选择优惠券");
    //   return;
    // }
    this.UpdateTicket().then(() => {
      location.href =
        "/#/pay/wechat/" + this.state.sourceType + "/" + this.state.sourceIds;
    });
  }
  toBuy() {
    if (this.state.info.Balance >= Number(this.state.total)) {
      this.setState({ ToBuy: true });
    } else {
      this.setState({ showWarning: true });
    }
  }
  //账户余额付钱
  _payCard() {
    // if (
    //   (this.state.isRefreshDiscount && this.state.usefulDiscountNum == 0) ||
    //   (this.state.isRefreshDiscount &&
    //     this.state.usefulDiscountNum > 0 &&
    //     this.state.TicketPrice > 0)
    // ) {
    // } else {
    //   common.mes(this, "请选择优惠券");
    //   return;
    // }
    this.UpdateTicket().then(() => {
      common.ajax(
        "/pay/add?sourceType=" +
          this.state.sourceType +
          "&sourceIds=" +
          this.state.sourceIds +
          "&payType=0",
        {},
        result => {
          this.state.ToBuy = false;
          if (result.code == 1) {
            common.mes(this, "付款成功,3秒后返回", 3, () => {
              location.href = "/#/users/myorder";
            });
          } else {
            common.mes(this, result.mes);
          }
        }
      );
    });
  }
  //更新优惠券
  UpdateTicket() {
    return new Promise(resovle => {
      if (
        this.state.TicketId &&
        this.state.TicketId != "null" &&
        this.state.locked != 1
      ) {
        common.ajax(
          "Order/UpdateTicket",
          {
            Id: this.state.sourceIds,
            ticketId: this.state.TicketId
          },
          result => {
            console.log(result);
            if (result.code == 1) {
              console.log("更新优惠券成功");
              resovle();
            } else if (result.code == -2) {
              console.log("等于-2");
              common.mes(this, "该优惠券已被使用");
            }
          }
        );
        sessionStorage.TicketId = null;
      } else {
        resovle();
      }
    });
  }
  //得到列表
  getList() {
    common.ajax("Ticket/GetList", {}, result => {
      console.log(result);
      if (result.code == 1) {
        this.state.list = result.data.rows;
        this.state.list.map(row => {
          if (row.Status == 1) {
            this.state.usefulDiscountNum++;
          }
          console.log(this.state.TicketId, row.Id);
          if (this.state.TicketId == row.Id) {
            this.state.TicketPrice = row.Total;

            if (this.state.locked != 1) {
              sessionStorage.payCount =
                this.state.total - this.state.TicketPrice;
              this.state.total = this.state.total - this.state.TicketPrice;
            }

            // console.log(this.state.TicketPrice)
          }
        });
        this.state.isRefreshDiscount = true;

        this.setState({});
      } else {
        common.mes(this, result.mes);
      }
    });
  }
  toChoose() {
    if (this.state.locked) {
      common.mes(this, "该订单无法重新使用其他优惠券");
      return;
    }
    console.log("去选择");
    //有优惠券
    if (this.state.isRefreshDiscount && this.state.usefulDiscountNum > 0) {
      // location.href =
      //   "/#/pay/discount_list?pageStatus=1&TicketId=" + this.state.TicketId;
      location.href=`http://wx.sanlics.com/partner/discount_list.html?sourceIds=${this.state.sourceIds}#discount`
    }
  }
  payChoose(num){
    this.setState({
      choosePayType:num
    })
  }
  
  toPay(){
    if(this.state.choosePayType==0){
      common.mes(this, '请选择支付类型');
    }else if (this.state.choosePayType==1){
      this.toBuy()
    }else if (this.state.choosePayType==2){
      this._payWechat()
    }
  }
  render() {
    return (
      <div className="bg_hui">
        <Mycomponent.Tophead title="选择支付方式" />
        <section className="confirmBox">
          <div className="prodet">
            <ul className="List ">
              <li
                onClick={() => {
                  this.toChoose();
                }}
                className={
                  this.state.sourceType == 1 &&
                  Math.floor(this.state.renew) === 0
                    ? "List1 other"
                    : "hide"
                }
              >
                <div className="left">
                  <img src="/images/pay/1.png" width="100%" alt="" />
                  <div>
                    <div>优惠券抵扣</div>
                    {/* <div className="pay_tip pay_gray">
                      {this.state.usefulDiscountNum == 0 ||
                      this.state.TicketPrice > 0
                        ? ""
                        : "选择优惠券后,请选择下方支付方式"}
                    </div> */}
                  </div>
                </div>
                <div className="right" style={{ paddingRight: ".5rem" }}>
                  <span className="arr_a"></span>
                  <span
                    className={
                      this.state.TicketPrice > 0
                        ? "pay_gray red"
                        : this.state.usefulDiscountNum == 0
                        ? "pay_gray"
                        : "pay_gray block"
                    }
                  >
                    {this.state.TicketPrice > 0
                      ? "-￥" + this.state.TicketPrice
                      : this.state.usefulDiscountNum == 0
                      ? "暂无优惠券"
                      : this.state.usefulDiscountNum + "张" + "可用"}
                  </span>
                  <img src="/images/arr_r.png" width="100%" />
                </div>
              </li>
              <div className="prodet">
                <ul className="List">
                  <li className="first">
                    <div className="left">订单金额</div>
                    <div
                      className={
                        this.state.showmanjian == 0 ? "right" : "right"
                      }
                    >
                      <span>
                        ￥
                        {this.state.total >= 0
                          ? common.format(this.state.total)
                          : 0}
                      </span>
                    </div>
                    {/*<div className={this.state.showmanjian==0?"hide":"right"}><span><span className="s_line">￥{this.state.total >= 0 ? common.format(this.state.total) : 0}</span>￥{this.state.showmanjian >= 0 ? common.format(this.state.showmanjian) : 0}</span></div>*/}
                  </li>
                </ul>
              </div>
              <li
                onClick={() => {
                  // this.toBuy();
                  this.payChoose(1)
                }}
                className={this.state.sourceType == 1 ? "List1" : "hide"}
              >
                <div className="left">
                  <img src="/images/erqi/i_03.jpg" width="100%" alt="" />
                  账户余额支付
                </div>
                <div className="right" >
                  <span className="arr_a"></span>
                  <span>可用 {common.format(this.state.info.Balance)}</span>
                  <img style={{ marginLeft: "1.5rem" }} className="payChooseImg" src={this.state.choosePayType==1?"/images/pay/3.png":"/images/pay/2.png"}/>
                </div>
              </li>
              <li
                onClick={e => {
                  console.log(111);
                  // this._payWechat(e);
                  this.payChoose(2)
                }}
                className="List1"
              >
                <div className="left">
                  <img src="/images/user/zf_03.png" width="100%" />
                  微信支付
                </div>
                <div className="right">
                  {/* <span className="arr_a"></span> */}
                  <img className="payChooseImg" src={this.state.choosePayType==2?"/images/pay/3.png":"/images/pay/2.png"}/>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <div className="payBottom">
          <div className="payBottomLeft">
            <div>
              应付金额<span className="payBottomLeft_gray">￥</span><span className='payBottomLeft_price'>
                {this.state.total >= 0 ? common.format(this.state.total) : 0}
              </span>
            </div>
            <div className="payBottomLeft_grayPrice">
              已优惠￥{this.state.TicketPrice >= 0 ? this.state.TicketPrice : 0}
            </div>
          </div>
          <div className="payBottomRight" onClick={e => {
                  this.toPay()
                }}>去支付</div>
        </div>
        <Mycomponent.TwoBtnShadow
          show={this.state.ToBuy}
          title="尊敬的用户："
          content={"是否确认使用余额支付"}
          yesButton="确定"
          yesRun={() => {
            this._payCard();
          }}
          cancel={() => {
            this.setState({ ToBuy: false });
          }}
        />
        <Mycomponent.TwoBtnShadow
          show={this.state.showWarning}
          title="尊敬的用户："
          content={"您的余额不足,是否前往充值"}
          yesButton="确定"
          yesRun={() => {
            location.href = "/#/shopping/home";
          }}
          cancel={() => {
            this.setState({ showWarning: false });
          }}
        />
        <Mycomponent.Mes mes={this.state.mes} />
      </div>
    );
  }
}
