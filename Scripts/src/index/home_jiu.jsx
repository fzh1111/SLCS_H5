'use strict'
import React from 'react';
import $ from 'jquery';
// import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
// import TouchSlide from '../lib/TouchSlide';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount() {

  }

  componentDidMount() {
    // this.mypos()
   

    // geolocation.getLocation(showPosition, showErr, options)


    //
    $(document).ready(function () {
      //头部大图
      TouchSlide({
        slideCell: "#focus",
        titCell: ".hd",
        mainCell: ".bd ul",
        effect: "leftLoop",
        autoPage: "<span></span>",
        autoPlay: true,
        interTime: 4000
      });
    })
  }
  componentWillUnmount() {


  }
  
 
  render() {
    return (
      <div>
        <div className="margintop"></div>
        {/* <button onClick={() => { this.map1() }}>试一下</button> */}
        <section className="bigBox">
          <div className="focus" id="focus">
            <div className="bd">
              <ul>
                <li><a><img src="/images/banner01.jpg" width="100%" /></a></li>
                {/* <li><a href=""><img src="images/banner01.jpg" width="100%"/></a></li>
                    <li><a href=""><img src="images/banner01.jpg" width="100%"/></a></li> */}
              </ul>
              {/* <div className="swiper-container" style={{height:"30px",width:"100px"}}>
                <div className="swiper-wrapper">
                  <div className="swiper-slide">slider1</div>
                  <div className="swiper-slide">slider2</div>
                  <div className="swiper-slide">slider3</div>
                </div>
              </div> */}
            </div>

            <div className="hd"></div>
          </div>

        </section>

      </div>
    );
  }
}