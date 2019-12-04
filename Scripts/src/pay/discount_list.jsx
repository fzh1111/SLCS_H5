"use strict";
import React from "react";
import common from "../lib/common";
import Mycomponent from "../lib/mycomponent";
export default class DiscountList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payCount: sessionStorage.payCount,
      list: [],
      pageStatus:this.props.location.query.pageStatus?this.props.location.query.pageStatus:0,    // 0是我的优惠券 1是使用优惠券
      TicketId:this.props.location.query.TicketId||null,  //优惠劵ID
    };
  }
  componentDidMount() {
    this.getList();
    sessionStorage.TicketId=this.state.TicketId;
    //总的
    // let totalArr=[{id:1,name:"什么"},{id:2,name:"纳尼"}];
    // //插入的
    // let insert={id:3,name:"xxxx"}
    // //函数
    // let filterFun=(insert)=>{
    //   for(let i of totalArr){
    //       if(i.id===j.id){
    //         i.name=j.name
    //         return 
    //       }
    //   }
    //   totalArr.push(insert)
    // }
    // filterFun(insert)
  }
  //账户余额付钱
  getList() {
    common.ajax(
      "Ticket/GetList",
      {},
      result => {
          console.log(result)
        if (result.code == 1) {
            this.state.list=result.data.rows
            // if(this.state.pageStatus==1){
            //   console.log('进入')
            //   this.state.list.map((row,index)=>{
            //     console.log('Status:',row.Status)
            //     if(row.Status!=1){
            //       console.log('index:',index)
            //       this.state.list.splice(index,1)
            //     }
                
            //   })
            // }
            this.setState({})
        } else {
          common.mes(this, result.mes);
        }
      }
    );
  }
  choose(Id){
    if(this.state.pageStatus==1){
      sessionStorage.TicketId=Id
      window.history.go(-1);
    }
  }
  render() {
    return (
      <div>
        <div>
          <Mycomponent.Tophead title="优惠券" />
          <div className="discountList">
            {this.state.list.map((row, index) => {
              return (
                <div className={row.Status==1?'one':this.state.pageStatus==1?'lcb-hide':'one huise'} key={index} >
                    <img className={row.Id==this.state.TicketId?"":"lcb-hide"} src="images/pay/ok.png"/>
                  <div className="discountList_left">
                    <div className="discountList_money ">
                      <span className="fuhao">￥</span>{row.Total}
                    </div>
                    <div className="sign">无限制使用</div>
                  </div>
                  <div className="discountList_mid"></div>
                  <div onClick={()=>{this.choose(row.Id)}}className={row.Status==1?"discountList_right":"discountList_right other"} >{row.Status==1?(this.state.pageStatus==1?'去使用':'待使用'):row.Status==2?'已使用':"已过期"}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
