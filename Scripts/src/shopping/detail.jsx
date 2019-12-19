'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
// import { Carousel } from 'antd';

export default class ShoppingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {},
      detailtime: "",
      room: { Banner: [], ReserveTimes: [], MidNightTimes: [] },
      roomtime: [],
      ReserveTimes: [],
      MidNightTimes: [],
      arr: [],
      arrr: [],
      time: [],
      frame: false,
      res: [], //坐标
      timer1: null,
      roomid: this.props.params.id,
      isOne: true,
      Banner: [],
      myTime: [],
      TodayTime: [],
      TomorrowTime: [],
      is_continuity: true,//选取时间是否连续
      is_renew: this.props.params.is_renew || 0,
      is_one: true,
      tishixufei: false,
      tishi: false,
      IsPutaway: true,//是否上架
      manjian: [],
      manjian_money: 0,
      money: 0,
      is_manjian: false,//是否有满减
      RenewDiscount: 1,//续费半价
      is_showRenewDiscount: false,//是否显示续费半价
      roomInfo:{IsPacking:0}, //房间信息
      packBtnHaveClick:false,
      today:'' //今天的时间
    }
  }
  componentWillMount() {
    this.initTime();
    this.getList();
    this.room()
    
    console.log(this.state.is_renew)
  }
  componentDidMount() {
    // this.getPackInfo();
    this.getlunbo()
    this.timer()
    this.setTime()
    this.getSelfPoint()
    this.getmanjian()
  }
  componentWillUnmount() {
    clearInterval(this.state.timer1);
  }
  /**
   * 得到打包信息
   */
  getPackInfo(){
    common.ajax("/room/GetModel/" + this.state.roomid, {}, (res) => {
      if (res.code == 1) {
        console.log(res)
      }
    })
  }
  initTime(){
    Date.prototype.Format = function (fmt) { //author: meizz 
      var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    this.state.today = new Date().Format("yyyy-MM-dd");
    this.state.model.PayTime = new Date().Format("yyyy-MM-dd");
  }
  getmanjian() {
    common.ajax("/Discount/GetListByRoomId/" + this.state.roomid, {}, (res) => {
      if (res.code == 1) {
        if (res.data.length > 0) {
          console.log(res)
          this.state.manjian = res.data;
          this.setState({})
        }
      }
    })
  }
  getList() {
    common.ajax("/order/getlist", { filters: { Status: 2 } }, (res) => {
      if (res.code == 1) {

        if (res.data.rows.length > 0) {
          this.state.tishixufei = true;
          this.setState({})
        } else {
          this.state.tishixufei = false;
          this.setState({})
        }
      }
      this.tishi()

    })

  }
  getlunbo() {
    common.ajax('/Room/GetModel/' + this.props.params.id, {}, (res) => {
      if (res.code == 1) {
        this.state.Banner = [];
        this.state.Banner = JSON.parse(res.data.Banner);
        this.setState({}, (() => {
          TouchSlide({
            slideCell: "#focus",
            titCell: ".hd",
            mainCell: ".bd ul",
            effect: "leftLoop",
            autoPage: "<span></span>",
            autoPlay: true,
            interTime: 4000
          });
        }))
        this.state.roomInfo=res.data;
        if(this.state.roomInfo.IsFullReduPrice==1){
          this.state.is_manjian=true;
        }
        this.state.IsPutaway = res.data.IsPutaway;
        this.setState({})
      }
    })
  }
  timer() {
    this.state.timer1 = setInterval(() => {
      this.room();
    }, 6000);
  }

  map1(number) {
    console.log('类型:', number)
    var that = this
    console.log(that.state.room)
    console.log(1)
    var geocoder = new qq.maps.Geocoder({
      complete: function (result) {
        if (number == 2) {
          location.href = "https://apis.map.qq.com/uri/v1/marker?marker=coord:" + result.detail.location.lat + "," + result.detail.location.lng + ";title:" + that.state.room.Location + "&referer=myapp";
        } else if (number == 1) {
          location.href = `http://uri.amap.com/marker?position=${result.detail.location.lng},${result.detail.location.lat}&name=${that.state.room.Location}s&coordinate=gaode&callnative=1`

          // 百度地图
          // location.href = `http://api.map.baidu.com/marker?location=${res[0].lat},${res[0].lng}&title=${that.state.room.Location}&content=${that.state.room.Location}&output=html`
          // location.href = `http://api.map.baidu.com/marker?location=${result.detail.location.lat},${result.detail.location.lng}&title=${that.state.room.Location}&content=${that.state.room.Location}&output=html`
        } else if (number == 3) {
          location.href = `http://api.map.baidu.com/marker?location=${result.detail.location.lat},${result.detail.location.lng}&title=${that.state.room.Location}&content=${that.state.room.Location}&output=html&src=webapp.baidu.openAPIdemo&coord_type=wgs84`
        }
      }
    });

    geocoder.getLocation(this.state.room.Location);


    // }
  }

  getSelfPoint() {
    var that = this;
    //获得自己的坐标
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      //调用地图命名空间中的转换接口   type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
      qq.maps.convertor.translate(new qq.maps.LatLng(r.point.lat, r.point.lng), 3, function (res) {
        that.state.self = res[0]; //lat lng
        // that.rooms();
        console.log(that.state.self)
      });
    }, { enableHighAccuracy: true });
    this.setState({})
  }
  //TODO 设置页面时间
  setTime() {
    var time = new Date(); //今天的日期
    this.state.roomtime=[]
    if (this.state.model.PayTime === this.state.today) {
      for (let i = 0; i < 48; i++) {
        let Usetime = new Date(time.getTime() + i * 60 * 30 * 1000);
        let hours=Usetime.getHours()
        let minutes = Usetime.getMinutes() >= 30 ? '00' : '30';
        hours=Usetime.getMinutes() >= 30?hours+1:hours;
        if(hours==24){
          hours=0
        }
        hours=hours<10?'0'+hours:hours
        let timeString = Usetime.Format("yyyy-MM-dd hh:mm:ss");  //时间格式
        var timeStringa=new Date(time.getTime() + (i+1) * 60 * 30 * 1000).Format("yyyy-MM-dd hh:mm:ss")
        //调整
        if(hours=='00'){
          timeString = timeStringa.slice(0, -8) +hours+':'+ minutes + ':00';
        }else{
          timeString = timeString.slice(0, -8) +hours+':'+ minutes + ':00';
        }
        if(timeString.indexOf('00:00:00')!=-1){
          // console.log('进入')
          this.state.roomtime.push({time:timeStringa.slice(5,10).replace('-','月')+'a'})
        }
        this.state.roomtime.push({ time: timeString });
      }
    } else {
      this.state.roomtime = [
        { time: this.state.model.PayTime + " 00:00:00" }, { time: this.state.model.PayTime + " 00:30:00" },
        { time: this.state.model.PayTime + " 01:00:00" }, { time: this.state.model.PayTime + " 01:30:00" },
        { time: this.state.model.PayTime + " 02:00:00" }, { time: this.state.model.PayTime + " 02:30:00" },
        { time: this.state.model.PayTime + " 03:00:00" }, { time: this.state.model.PayTime + " 03:30:00" },
        { time: this.state.model.PayTime + " 04:00:00" }, { time: this.state.model.PayTime + " 04:30:00" },
        { time: this.state.model.PayTime + " 05:00:00" }, { time: this.state.model.PayTime + " 05:30:00" },
        { time: this.state.model.PayTime + " 06:00:00" }, { time: this.state.model.PayTime + " 06:30:00" },
        { time: this.state.model.PayTime + " 07:00:00" }, { time: this.state.model.PayTime + " 07:30:00" },
        { time: this.state.model.PayTime + " 08:00:00" }, { time: this.state.model.PayTime + " 08:30:00" },
        { time: this.state.model.PayTime + " 09:00:00" }, { time: this.state.model.PayTime + " 09:30:00" },
        { time: this.state.model.PayTime + " 10:00:00" }, { time: this.state.model.PayTime + " 10:30:00" },
        { time: this.state.model.PayTime + " 11:00:00" }, { time: this.state.model.PayTime + " 11:30:00" },
        { time: this.state.model.PayTime + " 12:00:00" }, { time: this.state.model.PayTime + " 12:30:00" },
        { time: this.state.model.PayTime + " 13:00:00" }, { time: this.state.model.PayTime + " 13:30:00" },
        { time: this.state.model.PayTime + " 14:00:00" }, { time: this.state.model.PayTime + " 14:30:00" },
        { time: this.state.model.PayTime + " 15:00:00" }, { time: this.state.model.PayTime + " 15:30:00" },
        { time: this.state.model.PayTime + " 16:00:00" }, { time: this.state.model.PayTime + " 16:30:00" },
        { time: this.state.model.PayTime + " 17:00:00" }, { time: this.state.model.PayTime + " 17:30:00" },
        { time: this.state.model.PayTime + " 18:00:00" }, { time: this.state.model.PayTime + " 18:30:00" },
        { time: this.state.model.PayTime + " 19:00:00" }, { time: this.state.model.PayTime + " 19:30:00" },
        { time: this.state.model.PayTime + " 20:00:00" }, { time: this.state.model.PayTime + " 20:30:00" },
        { time: this.state.model.PayTime + " 21:00:00" }, { time: this.state.model.PayTime + " 21:30:00" },
        { time: this.state.model.PayTime + " 22:00:00" }, { time: this.state.model.PayTime + " 22:30:00" },
        { time: this.state.model.PayTime + " 23:00:00" }, { time: this.state.model.PayTime + " 23:30:00" },
      ]
    }
    this.state.today_allTime = this.state.roomtime;
    this.setState({})
  }
  room() {
    common.ajax('/Room/GetModelTime?id=' + this.props.params.id + '&isnew=' + this.state.is_renew * 1, {}, (res) => {
      if (res.code == 1) {
        this.state.room = res.data;
        this.state.room.ReserveTimes = res.data.ReserveTimes;
        this.state.room.MidNightTimes = res.data.MidNightTimes;
        //TODO 续费页且RenewDiscount小于1
        if (res.data.RenewDiscount < 1 && this.state.is_renew == 1) {
          this.state.RenewDiscount = res.data.RenewDiscount;
          this.state.is_showRenewDiscount = true;
        } else {
          this.state.RenewDiscount = 1;
          this.state.is_showRenewDiscount = false;
        }
        this.setState({})
      }
    })
  }
  //数组去重
  arrayRemoval(array) {
    var temp = [];
    for (var i = 0; i < array.length; i++) {
      //如果当前数组的第i项在当前数组中第一次出现的位置是i，才存入数组；否则代表是重复的
      if (array.indexOf(array[i]) == i) {
        temp.push(array[i])
      }
    }
    return temp;
  }
  //获取续费的最后时间
  getRenew_time() {
    this.state.roomtime.map((row, index) => {
      if (row.time.slice(11, 16) == sessionStorage.renew_time.slice(11, 16)) {
        this.state.arr.push(index)
      }
    })
  }
  //查询所选时间,没查到放入数组，查到删除对应数据,排序arr和插入中间连续值
  push_time(index, time) {
    if (this.state.arr.indexOf(index) == -1) {
      this.state.ReserveTimes.push(time)
      this.state.arr.push(index)
    } else {
      this.state.ReserveTimes.splice(this.state.ReserveTimes.indexOf(time), 1)
      this.state.arr.splice(this.state.arr.indexOf(index))
    }
    this.state.arr.sort((a, b) => {
      return a - b
    })
    var number = this.state.arr[this.state.arr.length - 1] - this.state.arr[0]
    this.state.arrr = []
    for (var i = 0; i <= number; i++) {
      this.state.arrr.push(this.state.arr[0] + i);
      this.state.time.push(this.state.roomtime[this.state.arr[0] + i].time)
    }
    this.state.arr = this.arrayRemoval(this.state.arr)
    console.log(this.state.arr)
    this.state.arr = this.state.arrr;
  }
  select(time, index) {
    this.state.myTime=[]
    var a = parseInt(new Date(this.state.model.PayTime.replace(/-/g, "/")).getTime() / 1000 / 60);
    if (sessionStorage.renew_time) {
      a = parseInt(new Date(sessionStorage.renew_time.slice(0, 11).replace(/-/g, "/")).getTime() / 1000 / 60)
    }

    var b = parseInt(new Date(this.state.today.replace(/-/g, "/")).getTime() / 1000 / 60)
    if (this.state.is_renew == 1) {
      console.log("续费单")
      if (this.state.model.PayTime > this.state.today) {
        console.log("========大于今天========")
        this.state.time = []
        var num = 0;
        this.state.roomtime.map((row, index) => {
          if (row.time.slice(11, 16) == sessionStorage.renew_time.slice(11, 16)) {
            num = index;
          }
        })
        if (a > b) {
          console.log("a")
          this.state.time.push(sessionStorage.renew_time)
          this.state.arr.push(num)
        } else {
          console.log("b")
          for (var i = num; i <= this.state.roomtime.length - 1; i++) {
            this.state.time.push(this.state.today_allTime[i].time)
          }
          if (this.state.is_one) {
            this.state.arr.push(0)
          }
          this.state.is_one = false;
        }

        this.push_time(index, time)
        this.state.myTime = this.state.time;
        this.setState({})
      } else {
        console.log("========今天之内========")
        this.getRenew_time();
        this.state.time = [];
        this.push_time(index, time)
        this.state.myTime = this.state.time;
      }
      this.state.myTime = this.arrayRemoval(this.state.myTime)
      this.state.myTime.sort((a, b) => {
        return new Date(a.replace(/-/g, "/")) - new Date(b.replace(/-/g, "/"))
      })
      // ===============================================================================================================
    } else {
      console.log("正常单")
      if (this.state.model.PayTime > this.state.today) {
        console.log("大于今天")
        this.state.time = []
        this.push_time(index, time);
        this.state.TomorrowTime = this.state.time;
        this.setState({})
      } else {
        console.log("今天之内")
        this.state.time = []
        this.push_time(index, time);
        this.state.TodayTime = this.state.time;
        this.setState({})
      }
      
      this.state.myTime = this.state.TodayTime.concat(this.state.TomorrowTime)
      this.state.myTime = this.arrayRemoval(this.state.myTime)
      this.state.myTime.sort((a, b) => {
        return new Date(a.replace(/-/g, "/")) - new Date(b.replace(/-/g, "/"))
      })
    }

    this.setState({})

    if (a > b) {
      console.log("结束时间大于今天")
      for (var i = 0; i < this.state.room.ReserveTimes.length; i++) {
        for (var j = 1; j < this.state.myTime.length; j++) {
          if (this.state.myTime[j] == this.state.room.ReserveTimes[i]) {
            this.state.roomtime.map((row, index) => {
              if (row.time == this.state.myTime[j]) {
                this.state.arr.splice(this.state.arr.indexOf(index), 1)
              }
            })
            this.state.myTime.splice(j, 1);
          }
        }
      }

    } else {
      console.log("结束时间小于今天")
      console.log(sessionStorage.renew_time)
      for (var i = 0; i < this.state.room.ReserveTimes.length; i++) {
        for (var j = 1; j < this.state.myTime.length; j++) {
          if (this.state.myTime[j] == this.state.room.ReserveTimes[i]) {
            this.state.roomtime.map((row, index) => {
              if (row.time == this.state.myTime[j]) {
                this.state.arr.splice(index, 1)
              }
            })

            this.state.myTime.splice(j, 1);
          }
        }
      }
      if (this.state.is_renew == 1 && a < b) {
        //过期一天后的情况
        this.state.myTime[0] = sessionStorage.renew_time;
      }
    }
    this.setState({})
    console.log('this.state.myTime.indexOf:',this.state.myTime.indexOf('a'))
    this.state.myTime.map((row,index)=>{
      if(row.indexOf('a')!=-1){
        this.state.myTime.splice(index,1)
        return 
      }
    })
    
    console.log(this.state.myTime)
    //满减计算 有满减数据，且不是续费单
    // if (this.state.myTime.length >= 3  && this.state.is_renew == 0) {
    //   var begin = parseInt(new Date(this.state.myTime[0].replace(/-/g, "/")).getTime() / 1000 / 60);
    //   var end = parseInt(new Date(this.state.myTime[this.state.myTime.length - 1].replace(/-/g, "/")).getTime() / 1000 / 60);
    //   var time = (end - begin) / 60;
    //   this.state.money = time * this.state.room.Price;
    //   this.setState({});
    //   var arr = []
    //   this.state.manjian.map((row, index) => {
    //     if (this.state.money >= row.FullTotal) {
    //       arr.push(index);
    //     }
    //   })
    //   if (arr.length > 0&& this.state.is_manjian) {
    //     this.state.manjian_money = this.state.money - this.state.manjian[arr.length - 1].Subtract;
    //   } else {
    //     this.state.manjian_money = this.state.money
    //   }
    //   this.setState({});
    //   console.log('this.state.money:',this.state.money)
    //   console.log("this.state.manjian_money:",this.state.manjian_money)
    // } else {
    //   this.state.money = 0;
    //   this.state.manjian_money = 0;
    //   this.setState({})
    // }
    // console.log("iiiii")
    // console.log('this.state.is_renew:',this.state.is_renew, this.state.is_showRenewDiscount)

    //续费半价计算
    if (this.state.myTime.length >= 3 && this.state.is_renew == 1 && this.state.is_showRenewDiscount&&this.state.roomInfo.IsHalfPrice==1) {
      console.log("半价")
      var begin = parseInt(new Date(this.state.myTime[0].replace(/-/g, "/")).getTime() / 1000 / 60);
      var end = parseInt(new Date(this.state.myTime[this.state.myTime.length - 1].replace(/-/g, "/")).getTime() / 1000 / 60);
      var time = (end - begin) / 60;
      this.state.money = time * this.state.room.Price;
      this.state.manjian_money = (this.state.money * this.state.RenewDiscount).toFixed(2)
      this.setState({})
      //非续费
    }else if(this.state.myTime.length >= 3){
      var begin = parseInt(new Date(this.state.myTime[0].replace(/-/g, "/")).getTime() / 1000 / 60);
      var end = parseInt(new Date(this.state.myTime[this.state.myTime.length - 1].replace(/-/g, "/")).getTime() / 1000 / 60);
      var time = (end - begin) / 60;
      this.state.money = time * this.state.room.Price;
      this.setState({});
      var arr = []
      this.state.manjian.map((row, index) => {
        if (this.state.money >= row.FullTotal) {
          arr.push(index);
        }
      })
      if (arr.length > 0&& this.state.is_manjian) {
        this.state.manjian_money = this.state.money - this.state.manjian[arr.length - 1].Subtract;
      } else {
        this.state.manjian_money = this.state.money
      }
      this.setState({});
      console.log('this.state.money:',this.state.money)
      console.log("this.state.manjian_money:",this.state.manjian_money)
    }else{
      this.state.money = 0;
      this.state.manjian_money = 0;
      this.setState({})
    }
  }
  //取消，清空
  cancel() {
    this.state.packBtnHaveClick=false
    this.state.arr = [];
    this.state.arrr = [];
    this.state.time = [];
    this.state.TodayTime = [];
    this.state.TomorrowTime = [];
    this.state.myTime = [];
    this.state.money = 0;
    this.state.manjian_money = 0;
    this.setState({})
  }

  tishi() {
    if (this.state.is_renew == 1) {
      { tishi: false }
    }
    else if (this.state.tishixufei) {
      this.setState({ tishi: true })
    } else {
      // this.submit_judge()
    }
  }
  submit_judge() {
    //打包价取消
    this.state.packBtnHaveClick=false;
    console.log(sessionStorage.renew_time)
    this.continuity_judge()
    if (this.state.is_renew == 1) {
      if (this.state.myTime[0] < sessionStorage.renew_time) {
        common.mes(this, "续费时间必须大于前单的结束时间")
      } else if (this.state.myTime.length == 1 || this.state.myTime.length == 0) {
        common.mes(this, "请选择时间")
      } else if (this.state.myTime.length == 2) {
        if (this.state.is_continuity) {
          common.mes(this, "至少续费一个小时")
        } else {
          this.state.GoHome = true;
          this.setState({})
        }
      } else {
        if (this.state.is_continuity) {
          this.submit()
        } else {
          this.state.GoHome = true;
          this.setState({})
        }
      }
    } else {//正常单
      // this.continuity_judge()
      if (this.state.myTime.length == 0) {
        common.mes(this, "请选择时间")
      } else if (this.state.myTime.length == 1) {
        common.mes(this, "至少选择一个小时")
      } else if (this.state.myTime.length == 2) {
        if (this.state.is_continuity) {
          common.mes(this, "至少选择一个小时")
        } else {
          common.mes(this, "选区的时间必须是连续的")
        }
      } else if (this.state.myTime.length > 2) {
        if (this.state.is_continuity) {
          this.submit()
        } else {
          common.mes(this, "选区的时间必须是连续的")
        }
      }





    }

  }
  continuity_judge() {
    
    //判断时间是否是连续的
    for (var i = 0; i <= this.state.myTime.length; i++) {
      if (this.state.myTime[i + 1]) {
        console.log(this.state.myTime[i],parseInt(new Date(this.state.myTime[i].replace(/-/g, "/")).getTime() / 1000 / 60),this.state.myTime[i+1],parseInt(new Date(this.state.myTime[i + 1].replace(/-/g, "/")).getTime() / 1000 / 60))
        if (parseInt(new Date(this.state.myTime[i].replace(/-/g, "/")).getTime() / 1000 / 60) + 30 == parseInt(new Date(this.state.myTime[i + 1].replace(/-/g, "/")).getTime() / 1000 / 60)) {
          console.log('连续的')
          this.state.is_continuity = true;
          this.setState({})
        } else {
          console.log('不连续的')
          this.state.is_continuity = false;
          this.setState({})
          break;
        }
      }
    }
  }

  submit() {

    this.setState({})

    console.log("最终时间")
    console.log(this.state.myTime)
    common.ajax("/Order/Add", { Type: this.state.is_renew, Items: [{ RoomId: this.state.room.RoomId, ReserveTimes: this.state.myTime }] }, (res) => {
      if (res.code == 1) {
        location.href = `/#/pay/home/1?sourceIds=${res.data.OrderIds}&total=${res.data.Total}&roomid=${this.state.roomid}&renew=${this.state.is_renew}`
        this.cancel()
        this.room()
      } else {
        this.state.GoHome = true;
        this.setState({})
      }
    })

  }
  //收藏
  collect(row) {
    console.log(row)
    if (row.HasFavorites) {
      common.ajax(`/favorites/delete`, { contentId: row.RoomId, type: 0 }, (result) => {
        if (result.code == 1) {
          common.mes(this, "已取消收藏")
          row.HasFavorites = false;
          // this.room()
          this.setState({})
        }
      });
    } else {
      common.ajax(`/favorites/add`, { contentId: row.RoomId, type: 0 }, (result) => {
        if (result.code == 1) {

          common.mes(this, "收藏成功")
          row.HasFavorites = true;
          // this.room()
          this.setState({})
        }
      });
    }
  }
  //日期DATE选择时间
  changetime() {
   this.cancel();
    this.setTime()
    this.setState({})
  }
  //打包价按钮点击
  packBtnClick(){
    
    //已经打包了 取消
    if(this.state.packBtnHaveClick){
      this.cancel();
    }else{
      this.cancel();
      this.state.packBtnHaveClick=true;
      this.state.money = this.state.roomInfo.PackingPrice;
      this.state.manjian_money = this.state.roomInfo.PackingPrice;
      
      let minutes='00'
      let time=new Date();
      var Tomorrow=new Date(time.getTime() + 23 * 60 * 60 * 1000).Format("yyyy-MM-dd")
      console.log(this.state.roomInfo.Packing_StartTime,this.state.roomInfo.Packing_EndTime,this.state.today,Tomorrow)
      if(this.state.roomInfo.Packing_StartTime<24){
        
      }
      
      for(var i=this.state.roomInfo.Packing_StartTime;i<=this.state.roomInfo.Packing_EndTime;i=i+0.5){
        let Day
        let j=Math.floor(i)
        if(j==24){
          j=0
        }
        if(j<24){
           Day=this.state.today
        }else{
          Day=Tomorrow
        }
        let timeString=`${Day} ${j<10?'0'+j:j}:${minutes}:00`
        //重置分钟
        if(minutes=='00'){
          minutes='30'
        }else{
          minutes='00'
        }
        this.state.myTime.push(timeString)
        
        // console.log('timeString:',timeString)
      }
      console.log('this.state.myTime:',this.state.myTime)
      // if()
      // if (this.state.model.PayTime === this.state.today) {
      //   for (let i = 0; i < 48; i++) {
      //     var timeStringa=new Date(time.getTime() + (i+1) * 60 * 30 * 1000).Format("yyyy-MM-dd hh:mm:ss")
      //     //调整
      //     if(hours=='00'){
      //       timeString = timeStringa.slice(0, -8) +hours+':'+ minutes + ':00';
      //     }else{
      //       timeString = timeString.slice(0, -8) +hours+':'+ minutes + ':00';
      //     }
      //     if(timeString.indexOf('00:00:00')!=-1){
      //       // console.log('进入')
      //       this.state.roomtime.push({time:timeStringa.slice(5,10).replace('-','月')+'a'})
      //     }
      //     this.state.roomtime.push({ time: timeString });
      //   }
    }
    this.setState({})
  }
  render() {
    return (
      <div>
        <div>
          <header style={{ background: "#fff" }}>
            <div className="tit" ><span style={{ fontSize: "1rem" }}>{this.state.room.RoomName}</span></div>
            <div className="back">
              <a onClick={() => { location.href = "/#/" }}><img src="images/top_arrh.png" width="100%" /></a>
            </div>
          </header>
          <div className="header_bg" style={{ background: "transparent" }}></div>
        </div>
        <div className="focus" id="focus">
          <div className="bd">
            <ul>
              {this.state.Banner.map((row, index) => {
                return <li key={index}><a><img src={row.url} width="100%" /></a></li>
              })}
            </ul>
          </div>
          <div className="hd"></div>
          {/*<div className="share"><img src="images/top_share.png" width="100%" /></div>*/}
        </div>
        <section className="buyBox">
          <div className="title">
            <div className="detail_name">{this.state.room.RoomName}<h3 className="shoucan"><img onClick={() => { this.collect(this.state.room) }} src={this.state.room.HasFavorites ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} alt="" /></h3></div>

          </div>
          <ul className="jjList">
            <li>
              <h3>¥{this.state.room.Price}</h3>
              <p>/小时</p>
            </li>
            <li>
              <h3>1</h3>
              <p>小时起订</p>
            </li>
            <li>
              <h3>{this.state.room.Accommodable}<small>人</small></h3>
              <p>最佳容纳</p>
            </li>
          </ul>
          <div className="ad" onClick={() => { this.setState({ frame: true }) }}>
            <dl>
              <dt>交通与导航</dt>
              <dd><img src="images/hicon_02.png" width="100%" /></dd>
            </dl>
            <p style={{ color: "initial" }}><img src="images/icon_lo.png" width="100%" /><span>{this.state.room.Location}</span></p>
          </div>
          <div className="csyd">
            <h3>茶室预定</h3>
            <p style={{ marginBottom: ".3rem" }}><span style={{ fontSize: ".9rem" }}>灰色为已被预订~请另外选择且时间必须是连续的哦~</span></p>
            <div className={this.state.is_manjian && !this.state.is_showRenewDiscount ? "flex manjian" : "hide"} style={{ fontSize: ".9rem" }}>
              <p className="name">满减</p>
              <div className="flex_wrap">
                {this.state.manjian.map((row, index) => {
                  return <p key={index} style={{ color: "#e4a43c" }}>
                    满{row.FullTotal}减{row.Subtract}
                  </p>
                })}
              </div>

            </div>
          {/* 打包价说明 */}
            <div className={(this.state.roomInfo.IsPacking==0||this.state.model.PayTime!=this.state.today||this.state.room.MidNightTimes.length>0)?'hide':"packingContainer"}>
                <div className="packingContainer-left">打包价</div>
                <div className="packingContainer-right">{this.state.roomInfo.Packing_StartTime}:00到{this.state.roomInfo.Packing_EndTime}:00可享受打包价</div>
            </div>
            <h3>日期选择:<input style={{ fontSize: ".9rem" }} name={this.state.model.PayTime} type="date" value={this.state.model.PayTime} min={this.state.today} name="PayTime" onChange={(e) => { common.setModel(this, e); this.changetime() }} /></h3>
            <ul style={{ marginBottom: ".5rem" }}>

              {this.state.roomtime.map((row, index) => {
                if(row.time.indexOf('a')!=-1){
                  return <div className="tt-insert"><div className="tt-inserta">{row.time.slice(0,-1)}</div></div>
                  // if (this.state.model.PayTime < this.state.today) {
                  //   return <div><br></br><div>111</div><li key={index}><a className='hA'>{row.time.slice(11, 16)}</a></li></div>
                  // }
  
                  // // }
                  // for (var i = 0; i < this.state.room.ReserveTimes.length; i++) {
                  //   if (row.time.indexOf(this.state.room.ReserveTimes[i]) != -1) {
                  //     return <div><br></br><div>111</div><li key={index} ><a className='hA'>{row.time.slice(11, 16)}</a></li></div>
                  //   }
                  // }
  
                  // for (var i = 0; i < this.state.room.MidNightTimes.length; i++) {
                  //   if (row.time.indexOf(this.state.room.MidNightTimes[i]) != -1) {
                  //     return <div><br></br><div>111</div><li key={index} ><a className='hA'>{row.time.slice(11, 16)}</a></li></div>
                  //   }
                  // }
  
                  // return <div style={{width:100+'%' }}><br></br><div className="tt-insert">111</div><li key={index}><a className={this.state.myTime.indexOf(row.time) != -1 ? "green" : "oA"}
                  //   onClick={() => { this.select(row.time, index) }}>{row.time.slice(11, 16)}</a></li></div>
                }
                if (this.state.model.PayTime < this.state.today) {
                  return <li key={index}><a className='hA'>{row.time.slice(11, 16)}</a></li>
                }

                // }
                for (var i = 0; i < this.state.room.ReserveTimes.length; i++) {
                  if (row.time.indexOf(this.state.room.ReserveTimes[i]) != -1) {
                    return <li key={index} ><a className='hA'>{row.time.slice(11, 16)}</a></li>
                  }
                }

                for (var i = 0; i < this.state.room.MidNightTimes.length; i++) {
                  if (row.time.indexOf(this.state.room.MidNightTimes[i]) != -1) {
                    return <li key={index} ><a className='hA'>{row.time.slice(11, 16)}</a></li>
                  }
                }

                return <li key={index}><a className={this.state.myTime.indexOf(row.time) != -1 ? "green" : "oA"}
                  onClick={() => { this.select(row.time, index) }}>{row.time.slice(11, 16)}</a></li>
              })}
            </ul>
            <div  className={(this.state.roomInfo.IsPacking==0||this.state.model.PayTime!=this.state.today||this.state.room.MidNightTimes.length>0)?'hide':"packingBtnContainer"}>
                <div onClick={()=>{this.packBtnClick()}} className={this.state.packBtnHaveClick?"packingBtn green":"packingBtn"}>
                  包夜{this.state.roomInfo.Packing_StartTime}:00到第二日{this.state.roomInfo.Packing_EndTime}:00
                </div>
            </div>
            <div className="flex_wrap manjian" style={{ justifyContent: "center" }}>
              <div className={this.state.is_manjian && !this.state.is_showRenewDiscount ? "flex" : "hide"} >
                {this.state.manjian.map((row, index) => {
                  return <p key={index} style={{ color: "#e4a43c" }}>
                    满{row.FullTotal}减{row.Subtract}
                  </p>
                })}
              </div>
              <p style={{ color: "#e4a43c", textDecoration: "line-through" }}>{"原价￥:" + this.state.money}</p>
              <p style={{ color: "#e4a43c" }}>{"现价￥:" + this.state.manjian_money}</p>
              {/* </div> */}
            </div>

            <div className="btn" style={{ margin: "0 auto" }}>
              <a className="qxA" onClick={() => { this.cancel() }}>取消</a>
              {/*//this.state.is_renew == 1 ? this.submit_judge() : this.tishi()*/}
              <a className="qdA" onClick={() => { this.submit_judge() }}>确定</a>
              {/*<a className="qdA" onClick={() => { this.state.IsPutaway ? this.submit_judge() : "" }}>{this.state.IsPutaway ? "确定" : "房间已下架"}</a>*/}
            </div>
          </div>
          <div className="img_box">
            <img src="images/erqi/e1.jpg" />
            <img src="images/erqi/e2.jpg" />
            <img src="images/erqi/e3.jpg" />
            <img src="images/erqi/e4.jpg" />
            <img src="images/erqi/e5.jpg" />
            <img className={this.state.roomid == 4 ? "" : "hide"} src="images/erqi/e6.jpg" />
            <img src="images/erqi/e7.jpg" />
          </div>
        </section>
        <div className={this.state.frame ? "posmap" : "lcb-hide"}>
          <div className="marks" onClick={() => { this.setState({ frame: false }) }}></div>
          <div className="content">
            <div>
              <div className="content_one" onClick={() => { this.map1(1) }}>
                <div><img src="/images/map_gd.png" alt="" /></div>
                <div>高德地图</div>
              </div>
              <div className="content_one" onClick={() => { this.map1(2) }}>
                <div><img src="/images/map_tx.png" alt="" /></div>
                <div>腾讯地图</div>
              </div>
              <div className="content_one" onClick={() => { this.map1(3) }}>
                <div><img src="/images/map_bd.png" alt="" /></div>
                <div>百度地图</div>
              </div>
            </div>
          </div>
        </div>

        <div className={this.state.GoHome ? "tea" : "lcb-hide"} style={{ backgroundColor: "transparent" }}>
          <div className="marks"></div>
          <div className="content5">
            <p>您所选的续费区间已被预订,请另选时间或包厢</p>
            <div className="flex_around">
              <div className="btns" onClick={() => { this.setState({ GoHome: false }) }}>重选时间</div>
              <div className="btns on" onClick={() => { this.setState({ GoHome: false }), location.href = "/#/" }}>重选包厢</div>
            </div>
          </div>
        </div>

        <div className={this.state.tishi ? "tea" : "lcb-hide"} style={{ backgroundColor: "transparent" }}>
          <div className="marks"></div>
          <div className="content5">
            <p>您有可续费的订单,是否前往续费？</p>
            <div className="flex_around">
              <div className="btns" onClick={() => { location.href = "#/users/myorder/1" }}>前往续费</div>
              <div className="btns on" onClick={() => { this.setState({ tishi: false }); }}>取消</div>
              {/*this.submit_judge()*/}

            </div>
          </div>
        </div>
        <Mycomponent.Mes mes={this.state.mes} />
      </div>
    );
  }
}