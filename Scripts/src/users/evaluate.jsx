'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';

export default class Evaluate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                OrderId: this.props.params.orderID,//订单明细id
                // IsAnony: 0,//是否匿名
                // Grade: 1,//评价等级(1好评,2中评,3差评)
                Content: "",//评价内容
                TeaScore: 5,//店铺评分
                CakeScore: 5,//物流服务
                EnvironmentScore: 5,//服务态度
                // ImgUrl: [],
            },
            isHaopin: 1,
            isNiming: true,
            chaye: 5,
            chadian: 5,
            huanjin: 5,
            Images: [],
            imgs: 0,
        };
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillUnmount() {
    }
    _getFabiao() {
        // this.state.model.ImgUrl = JSON.stringify(this.state.Images);
 
        console.log(this.state.model)
        common.ajax('/Comment/Add/', this.state.model, (res) => {
            if (res.code == 1) {
                common.mes(this, "发表成功!", 1, () => {
                    window.history.go(-1);
                })
                this.setState({})
            }
        })
    }
    _selectImage(e, that) {

        this.state.imgs += e.target.files.length
        console.log(this.state.imgs)

        if (this.state.imgs <= 6) {
            for (var i = 0; i < e.target.files.length; i++) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    that.setState({ mes: '照片上传中,请耐心等待...' });
                    $.ajax({
                        url: '/Api/UploadByBase64?isWatermark=true',
                        type: 'POST',
                        data: "base64=" + encodeURIComponent(evt.target.result),
                        success: function (result) {
                            that.state.Images.push({ url: result.data.url })
                            that.setState({ mes: null });

                        }
                    });
                };
                reader.readAsDataURL(e.target.files[i]);
            }
        } else {
            common.mes(this, "最多选择6张图片")
            this.state.imgs -= e.target.files.length
        }
    }
    render() {
        return (
            <div>
                <Mycomponent.Tophead title="发表评价" />
                <div className="evaluate_box">
                    <div className="evaluate_top" style={{marginBottom:"0"}}>
                        <div className="content">
                            <textarea name="Content" id="" cols="30" rows="10" placeholder="请输入评价内容" value={this.state.model.Content} onChange={(e) => { common.setModel(this, e) }}></textarea>
                        </div>
                        <div className="addfile flex_wrap hide">
                            {this.state.Images.map((row, index) => {
                                return <div className="imgList flex" key={index}>
                                    <img src={row.url} />
                                </div>
                            })}
                            <div>
                                <img className="add" src="/images/erqi/icon_tp.png" />
                                <p>添加图片</p>
                                <input type="file" onChange={(e) => { this._selectImage(e, this) }} />
                            </div>

                        </div>
                        <div className="anonymous hide">
                            <div className="flex_between">
                                <div className="niming flex" onClick={() => { this.setState({ isNiming: !this.state.isNiming }), this.state.isNiming ? this.state.model.IsAnony = 1 : this.state.model.IsAnony = 0 }}><img src={this.state.isNiming ? "/images/erqi/ck.png" : "/images/erqi/ck_h.png"} /><span>匿名</span></div>
                                {/*{this.state.model.IsAnony}*/}
                                <div>你的评价能帮助其他小伙伴哟</div>
                            </div>
                        </div>

                    </div>
                    <div className="evaluate_bottom">
                        <div className="head flex">
                            <img src="/images/erqi/itit_04.png" alt="" />
                            <span>茶社评分</span>
                        </div>
                        <div className="content">
                            <div className="flex">
                                <p>茶叶</p>
                                <div className="flex">
                                    <img onClick={() => { this.state.model.TeaScore = 1; this.setState({ chaye: 1, }) }} src={this.state.chaye >= 1 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.TeaScore = 2; this.setState({ chaye: 2 }) }} src={this.state.chaye >= 2 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.TeaScore = 3; this.setState({ chaye: 3 }) }} src={this.state.chaye >= 3 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.TeaScore = 4; this.setState({ chaye: 4 }) }} src={this.state.chaye >= 4 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.TeaScore = 5; this.setState({ chaye: 5 }) }} src={this.state.chaye >= 5 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                </div>
                            </div>
                            <div className="flex">
                                <p>茶点</p>
                                <div className="flex">
                                    <img onClick={() => { this.state.model.CakeScore = 1; this.setState({ chadian: 1 }) }} src={this.state.chadian >= 1 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.CakeScore = 2; this.setState({ chadian: 2 }) }} src={this.state.chadian >= 2 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.CakeScore = 3; this.setState({ chadian: 3 }) }} src={this.state.chadian >= 3 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.CakeScore = 4; this.setState({ chadian: 4 }) }} src={this.state.chadian >= 4 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.CakeScore = 5; this.setState({ chadian: 5 }) }} src={this.state.chadian >= 5 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                </div>
                            </div>
                            <div className="flex">
                                <p>环境</p>
                                <div className="flex">
                                    <img onClick={() => { this.state.model.EnvironmentScore = 1; this.setState({ huanjin: 1 }) }} src={this.state.huanjin >= 1 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.EnvironmentScore = 2; this.setState({ huanjin: 2 }) }} src={this.state.huanjin >= 2 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.EnvironmentScore = 3; this.setState({ huanjin: 3 }) }} src={this.state.huanjin >= 3 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.EnvironmentScore = 4; this.setState({ huanjin: 4 }) }} src={this.state.huanjin >= 4 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                    <img onClick={() => { this.state.model.EnvironmentScore = 5; this.setState({ huanjin: 5 }) }} src={this.state.huanjin >= 5 ? "/images/user/bicon_02_h.png" : "/images/user/bicon_02.png"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="evaluate_btn" style={{color:"#e5a440",borderColor:"#e5a440"}} onClick={() => { this._getFabiao() }}>发表</div>
                    {/*<div className="evaluate_btn" onClick={() => { this._getFabiao() }}>发表</div>*/}
                </div>
                <Mycomponent.Mes mes={this.state.mes} />
            </div>
        );
    }
}