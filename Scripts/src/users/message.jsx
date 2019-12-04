'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';

export default class Collect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows:[]
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.messages()
  }
  componentWillUnmount() {


  }
  messages(){
    common.ajax('/Message/GetListMes',{},(res)=>{
      if(res.code==1){
        this.state.rows=res.data.rows;
        this.setState({})
      }
    })
  }
  render() {
    return (
      <div>
        <Mycomponent.Tophead title="我的消息" />
        <ul className="qbList">
        {this.state.rows.map((row,index)=>{
          return <li key={index}>
          <dl className="date"><dt>{row.Title}</dt><dd>{row.AddTime}</dd></dl>
          <div className="left"><img src="images/pic_yhq.png" width="100%" /></div>
          <div className="right">
            <p><span>{row.Content}</span></p>
          </div>
        </li>
        })}
        <p style={{textAlign:"center",margin:"5rem 0"}}>{this.state.rows.length > 0 ? "" : "暂无消息"}</p>
        </ul>
      </div>


    );
  }
}