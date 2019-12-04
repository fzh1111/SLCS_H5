"use strict";
import React from "react";
import $ from "jquery";
import Swiper from "../lib/swiper.min";
import common from "../lib/common";
import Mycomponent from "../lib/mycomponent";
export default class InvoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        pageNo: 1,
        isAllchecked:false,
        haveChecked:false
    };
  }
  componentWillMount() {
    this.getList();
  }
  componentDidMount() {
      
  }
  componentWillUnmount() {}
  getList(){
    common.ajax("/receiptinfo/GetorderList", { pageNo: this.state.pageNo, pageSize: 1000}, ((res) => {
      // console.log(res)
      if (res.code == 1) {
        this.setState({
          list:res.data.rows
        })
      }
    }))
  }
  bindClick(index){
    this.state.list[index].checked=!this.state.list[index].checked;
    let isAllchecked=true;
    
    for(let i of this.state.list){
      if(!i.checked){
        isAllchecked=false;
      }
    }
    this.isHaveChecked();
    this.setState({
      list:this.state.list,
      isAllchecked
    })
  }
  isHaveChecked(){
    let haveChecked=false;
    for(let i of this.state.list){
      if(i.checked){
        haveChecked=true;
      }
    }
    this.setState({
      haveChecked
    })
  }
  bindAll(){
    this.state.isAllchecked=!this.state.isAllchecked;
    for(let i of this.state.list){
      i.checked=this.state.isAllchecked;
    }
    this.isHaveChecked();
    this.setState({
      list:this.state.list,
      isAllchecked:this.state.isAllchecked
    })
  }
  goto(){
    if(this.state.haveChecked){
      //开票订单金额
      let ReceiptAmount=0;
      //订单id集合 1,2,3
      let OrderIds=[]
      for(let i of this.state.list){
        if(i.checked){
          ReceiptAmount=ReceiptAmount+i.Total
          OrderIds.push(i.OrderId)
        }
      }
      location.href = `/#/users/invoice?ReceiptAmount=${ReceiptAmount}&OrderIds=${OrderIds.join(',')}`
    }
  }
  render() {
    return (
      <div>
        <Mycomponent.Tophead title="发票列表" />
        <div className="invoiceList">
        <div className={this.state.list.length==0? "" : "hide"} style={{ textAlign: "center", margin: "15px 0" }}>暂无数据</div>
          {this.state.list.map((row, index) => {
            return (
              <div className="one" key={index} >
                <div className={row.checked?'noSelected Selected':'noSelected'} onClick={()=>{this.bindClick(index)}}/>
                <div className="Img">
                  <img src={row.RoomIcon} alt="" />
                </div>
                <div className="invoiceRight">
                  <div className="No">订单编号：{row.OrderNo}</div>
                  <div className="name_price">
                    <div className="name">{row.RoomName}</div>
                    <div className="price">价格：¥{row.Total}</div>
                  </div>
                  <div className="time">
                    时间：{row.Start_ReserveTime}到{row.End_ReserveTime}
                  </div>
                  <div className="address">地址：{row.Location}</div>
                </div>
                <div />
              </div>
            );
          })}

          <div className="fixed_bottom">
            <div className="i_left" onClick={()=>{this.bindAll()}}>
              <div className={this.state.isAllchecked?"noSelected b1 Selected":"noSelected b1"} />
              全选
            </div>
            <div className={this.state.haveChecked?"invoiceBtn":"nodongxi invoiceBtn"} onClick={()=>{this.goto()}}>下一步</div>
          </div>
        </div>
        <Mycomponent.Mes mes={this.state.mes} />
      </div>
    );
  }
}
