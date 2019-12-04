'use strict';
import React from 'react'
import Mycomponent from './lib/mycomponent';
export default class NoMatch extends React.Component {
  render() {
    return <div>
      <Mycomponent.Top title='系统异常' />
      <section className="error">
        <div className="pic"><img src="/images/public/404_pic.jpg" width="100%" /></div>
        <h3>对不起，系统异常目前木有数据！</h3>
        <a href="/" className="orangeA">返回首页</a>
      </section>
    </div>
  }
}