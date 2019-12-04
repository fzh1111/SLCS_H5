'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';

export default class Coupons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
        <Mycomponent.Tophead title="优惠券" />
        <section className="bigtab">
          <ul>
            <li className="on"><a href="javascript:;"><span>未使用</span><i></i></a></li>
            <li><a href="javascript:;"><span>已使用</span><i></i></a></li>
            <li><a href="javascript:;"><span>已过期</span><i></i></a></li>
          </ul>
        </section>
     
      <section className="bigBox">
      <div className="box">
            <ul className="qbList">
              <li>
                  <div className="left"><img src="images/pic_yhq.png" width="100%"/></div>
                    <div className="right">
                      <h3>一小时茶室体验券（台江万达店）</h3>
                        <dl><dt><span>有效期至2019-01-10</span></dt><dd><span>¥</span>90</dd></dl>
                        <div className="btn">
                            <a href="" className="useA"><span>立即使用</span></a>
                        </div>
                    </div>
                </li>
                <li>
                  <div className="left"><img src="images/pic_yhq.png" width="100%"/></div>
                    <div className="right">
                      <h3>一小时茶室体验券（台江万达店）</h3>
                        <dl><dt><span>有效期至2019-01-10</span></dt><dd><span>¥</span>90</dd></dl>
                        <div className="btn">
                            <a href="" className="useA"><span>立即使用</span></a>
                        </div>
                    </div>
                </li>
                <li>
                  <div className="left"><img src="images/pic_yhq.png" width="100%"/></div>
                    <div className="right">
                      <h3>一小时茶室体验券（台江万达店）</h3>
                        <dl><dt><span>有效期至2019-01-10</span></dt><dd><span>¥</span>90</dd></dl>
                        <div className="btn">
                            <a href="" className="useA"><span>立即使用</span></a>
                        </div>
                    </div>
                </li>
                <li>
                  <div className="left"><img src="images/pic_yhq.png" width="100%"/></div>
                    <div className="right">
                      <h3>一小时茶室体验券（台江万达店）</h3>
                        <dl><dt><span>有效期至2019-01-10</span></dt><dd><span>¥</span>90</dd></dl>
                        <div className="btn">
                            <a href="" className="useA"><span>立即使用</span></a>
                        </div>
                    </div>
                </li>
                <li>
                  <div className="left"><img src="images/pic_yhq.png" width="100%"/></div>
                    <div className="right">
                      <h3>一小时茶室体验券（台江万达店）</h3>
                        <dl><dt><span>有效期至2019-01-10</span></dt><dd><span>¥</span>90</dd></dl>
                        <div className="btn">
                            <a href="" className="useA"><span>立即使用</span></a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
    </div>
    );
  }
}