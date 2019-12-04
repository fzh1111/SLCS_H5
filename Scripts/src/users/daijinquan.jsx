'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';

export default class DaiJinQuan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LetsGO:0,
        };
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillUnmount() {
        this.setState = (state, callback) => { return; };
    }
  LetsGO(){
    common.setCookie();
    //   sessionStorage.isReceive = true;
    common.ajax("/Ticket/Receive/1",{},(res)=>{
      if(res.code == 1){
        common.mes(this,"领取成功",3,()=>{
            location.href = "/#/"
        });
      }else{
        common.mes(this,res.mes,3,()=>{
            location.href = "/#/"
        })
      }
    })
  }
    render() {
        return (
            <div>
                <Mycomponent.Tophead title="抵用券领取" />
                <div className={this.state.LetsGO == 1 ? "LetsGO" : "LetsGO"} style={{ backgroundColor: "transparent", zIndex: "999" }}>
                    <div className="marks LetsGO_img"></div>
                    <div className="LetsGO_img2">
                        <div className="LetsGO_font" onClick={() => { this.LetsGO() }}></div>
                        <img src="images/logo_font.png" style={{width:"100%",position:"absolute",bottom:"2rem"}}/>
                    </div>
                    
                </div>
                <Mycomponent.Mes mes={this.state.mes} />
            </div>
        );
    }
}