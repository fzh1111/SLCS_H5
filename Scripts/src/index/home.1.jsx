'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    var swiper = new Swiper('.swiper-container.news', {
                    pagination: '.swiper-pagination',
                    direction: 'vertical',
                    autoplay: 4000,
                    loop: true
                });
  }
  componentWillUnmount() {


  }
  render() {
    return (
      <div>
        <div className="margintop"></div>
        {/* <section className="bigtab">
           <ul>
             <li className="on"><a href="javascript:;"><span>茶社生活</span><i></i></a></li>
             <li><a href="javascript:;"><span>预约茶社</span><i></i></a></li>
             <li><a href="javascript:;"><span>专属客服</span><i></i></a></li>
             <li className="lir"><a href="javascript:;"><img src="images/hicon_01.png" width="100%" /><span>智码开门</span><i></i></a></li>
             <li className="lir"><a href="javascript:;"><span>码上约茶</span><img src="images/hicon_02.png" width="100%" /><i></i></a></li>
           </ul>
         </section> */}
        <section className="bigBox">
          <div className="box">
            <div className="focus" id="focus">
              <div className="bd">
                <div className='swiper-container news' style={{ height: '1.5rem' }}>
                  <div className='swiper-wrapper'>
                    <div className='swiper-slide'>
                      <li><a href=""><img src="images/banner01.jpg" width="100%" /></a></li>
                    </div>
                    <div className='swiper-slide'>
                      <li><a href=""><img src="images/banner01.jpg" width="100%" /></a></li>
                    </div>
                    <div className='swiper-slide'>
                      <li><a href=""><img src="images/banner01.jpg" width="100%" /></a></li>
                    </div>
                  </div>
                </div>
                <ul>
                </ul>
              </div>
              <div className="hd"></div>
            </div>
          </div>
          <div className="box" >

            <ul className="yycsList">
              <li>
                <div className="pic"><img src="images/cs_pic.png" width="100%" /></div>
                <h3><span>台江万达店03茶室</span></h3>
                <a className="love"></a>
                <div className="ad"><img src="images/icon_lo_b.png" width="100%" /><span>距您2.3公里|福州市台江区万达广场A区1#101门店</span></div>
                <div className="time">
                  <p><b>¥300</b><span>/小时</span></p>
                  <p><span>半小时起订</span></p>
                </div>
              </li>
              <li>
                <div className="pic"><img src="images/cs_pic.png" width="100%" /></div>
                <h3><span>台江万达店03茶室</span></h3>
                <a className="love"></a>
                <div className="ad"><img src="images/icon_lo_b.png" width="100%" /><span>距您2.3公里|福州市台江区万达广场A区1#101门店</span></div>
                <div className="time">
                  <p><b>¥300</b><span>/小时</span></p>
                  <p><span>半小时起订</span></p>
                </div>
              </li>
              <li>
                <div className="pic"><img src="images/cs_pic.png" width="100%" /></div>
                <h3><span>台江万达店03茶室</span></h3>
                <a className="love"></a>
                <div className="ad"><img src="images/icon_lo_b.png" width="100%" /><span>距您2.3公里|福州市台江区万达广场A区1#101门店</span></div>
                <div className="time">
                  <p><b>¥300</b><span>/小时</span></p>
                  <p><span>半小时起订</span></p>
                </div>
              </li>
            </ul>
          </div>
          <div className="box" >专属客服</div>
          <div className="box" >

            <div className="zmkm">
              <img src="images/zmkm.jpg" width="100%" />
            </div>
          </div>
          <div className="box" >

            <div className="msyc">
              <div className="pic"><img src="images/banner01.jpg" width="100%" /></div>
              <div className="box">
                {/* <dl>
                 	  <dt><span>名称</span></dt><dd><span>老王</span></dd>
                     <dt><span>电话</span></dt><dd><span>15777878787</span></dd>
                     <dt><span>有效期</span></dt><dd><span>2019-02-30   15:20-16:00</span></dd>
                     <dt><span>地址</dt><dd><span>福州市台江区万达广场A区1#101门店三里茶社3号茶室</span></dd>
                 </dl> */}
                <div className="ewm"><img src="images/ewm_pic.png" width="100%" /></div>
                <p>凭此码开门</p>
                <a href="" className="shareA">分享给朋友</a>
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}