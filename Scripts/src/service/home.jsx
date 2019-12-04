'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
export default class ServiceHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_tel:false,
    };
  }
  componentWillMount() {
    window.alert = function (name) {
      var iframe = document.createElement("IFRAME");
      iframe.style.display = "none";
      iframe.setAttribute("src", 'data:text/plain,');
      document.documentElement.appendChild(iframe);
      window.frames[0].window.alert(name);
      iframe.parentNode.removeChild(iframe);
    };
  }
  componentDidMount() {

  }
  componentWillUnmount() {


  }
  number() {
    //  alert("联系电话:400-0591-900")
     this.setState({is_tel:true})
  }
  render() {
    return (
      <div>
        <div className="margintop"></div>
        <div className="img_box1" onClick={() => { this.number() }}>
          <img src="images/erqi/e9.png" />
          <img src="images/erqi/e10.png" />
        </div>

        <div className={this.state.is_tel ? "tel" : "lcb-hide"}>
          <div>
            <a href="tel:400-0591-900">点击拨打联系电话:400-0591-900</a>
          </div>
        </div>
      </div>
    );
  }
}