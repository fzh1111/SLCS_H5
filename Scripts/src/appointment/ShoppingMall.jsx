'use strict'
import React from 'react';
import $ from 'jquery';
// import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
// import TouchSlide from '../lib/TouchSlide';
export default class ShoppingMall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        rows: []
    };
  }
  componentWillMount() {

  }

  componentDidMount() {
  }
  componentWillUnmount() {


  }

 
  render() {
    return (
      <div>
        <div className="margintop"></div>
         <div className="img_box">
             <img src="images/erqi/e8.jpg"/>
         </div>

      </div>
    );
  }
}