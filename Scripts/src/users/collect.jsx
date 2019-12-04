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
      rows:[],
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    this._load()
  }
  componentWillUnmount() {


  }
  _load() {
    this.setState({ mes: '数据加载中...' });
    common.ajax("/Favorites/GetList", { pageNo: 1, pageSize: 20000 }, (result) => {
      if (result.code == 1) {
        this.setState({ rows: result.data.rows, mes: null })
      }
    });
  }
  _delete(row) {
    common.ajax(`/favorites/delete`, { contentId: row.RoomId, type: 0 }, (result) => {
      if (result.code == 1) {
        this._load();
      }
    });
  }
  render() {
    return (
      <div>
        <Mycomponent.Tophead title="最爱收藏" />
        <ul className="ddList">
        {this.state.rows.map((row,index)=>{
          return <li key={index}>
          <div className="left"><img src={row.RoomIcon} width="100%" /></div>
          <div className="right">
            <dl><dt><b>{row.StoreName}</b></dt><dd><span>¥{row.Price}</span></dd></dl>
            <p className="ad"><span>{row.PointLocation}</span></p>
            <div className="h10"></div>
            <div className="btn">
              <a className="qxA" onClick={()=>{this._delete(row)}}><span>取消收藏</span></a>
            </div>
          </div>
        </li>
        })}
        <p style={{textAlign:"center",margin:"5rem 0"}}>{this.state.rows.length > 0 ? "" : "暂无收藏"}</p>
        </ul>
      </div>


    );
  }
}