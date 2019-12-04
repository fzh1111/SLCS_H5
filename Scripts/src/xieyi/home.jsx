'use strict'
import React from 'react';
import $ from 'jquery';
import Swiper from '../lib/swiper.min';
import common from '../lib/common';
import Mycomponent from '../lib/mycomponent';
export default class Xieyi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {},
      num:this.props.params.num,
    }
  }
  componentWillMount() {

  }
  componentDidMount() {
 
  }

  componentWillUnmount(){

  }





  render() {
    return (
      <div>
        <div>
          <header>
            <div className="tit"><span>{this.state.num == 1? "三里茶社服务协议":"APP退订和退款协议"}</span></div>
            <div className="back">
              <a onClick={() => { window.history.back() }}><img src="images/top_arrh.png" width="100%" /></a>
            </div>
          </header>
          <div className="header_bg"></div>
          <div className={this.state.num == 1 ? "item_box tiaokuan" : 'hide'}>
              <h3>提示条款</h3>
              <p>本协议由您（以下又称“用户”）与福建雨宙之星网络科技有限公司共同缔结，本协议具有合同效力。</p>
              <p>本协议中协议双方合称协议方，三里茶社隶属福建雨宙之星网络科技有限公司（以下又称“我公司”）及其关联公司。在使用三里茶社各项服务前，请您务必仔细阅读并透彻理解本协议。如果您使用三里茶社服务，您的使用行为将被视为对本协议全部内容和未来可能产生的修改的认可。而当您以任何形式选择同意对协议条款的改变和/或者已经包含改变后的条款的协议，改变后的协议立即生效。若本协议内任何一则条款由于国家或者地方政策变更而不再具有约束力，该条款的失效不对协议内其他条款的继续履行造成任何影响。</p>
              <p><span>【审慎阅读】</span>您在申请注册流程中点击同意本协议之前，应认真阅读全部协议内容。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款您应重点阅读。如您对协议有任何疑问的，应向三里茶社客服咨询。但无论您事实上是否在使用三里茶社之前认真阅读了本协议内容，只要您使用三里茶社，即视为您与三里茶社缔结本协议，本协议即对您产生约束，届时您不应以未阅读本协议的内容或者未获得三里茶社对您问询的解答等理由，主张本协议无效，或要求撤销本协议。</p>
              <p><span>【签约动作】</span>当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与三里茶社达成一致，成为三里茶社平台的用户。您承诺接受并遵守本协议的约定及三里茶社各项服务时，仍需遵守三里茶社其它各类相关规则，除遵守本协议外，且您的使用行为受其约束。如果您不同意本协议的约定，您应立即停止注册程序或停止使用三里茶社服务。</p>
              <p><span>【变更修改提示】</span>三里茶社保留随时修改服务协议的权利。三里茶社有权根据国家法律法规的更新、产品和服务规则的调整需要，在任何时间不时地制定、变更或修改本协议及/或其相关各项条款、各类规则。一旦条款内容发生变动，三里茶社将会在相关的页面提示修改内容，不再单独通知您。在使用三里茶社平台的服务时，您有必要对最新的《三里茶社用户服务协议》条款进行仔细阅读和重新确认。如您继续使用三里茶社服务，即表示您接受已经修订的协议。如您不同意相关变更，应当立即停止使用三里茶社服务。当发生有关争议时，以最新的服务协议为准。</p>
              <p>本协议及其未来变更后的协议和规则一经在网站公布后，立即自动生效。</p>
              <h3>一、定义</h3>
              <p>本协议中，除非上下文有其他的规定，下列表达应作如下解释：</p>
              <p><span>1.1三里茶社平台：</span>指三里茶社运营的互联网平台，以及其在IOS、安卓、windows等个人计算机或移动终端系统上的客户端。</p>
              <p><span>1.2本网站：</span>指通过包括但不限于三里茶社授权的微信公众号/服务号/订阅号、APP、网站、微信小程序等向用户提供的使用三里茶社产品和服务或发表意见言论的渠道/平台。</p>
              <p><span>1.3用户：</span>指与三里茶社签订《三里茶社用户服务协议》并完成注册流程的人，以即通过实名认证使用三里茶社产品和服务的人。为避免异议，用户包括但不限于茶室预定客人、到达用户、茶室主人和所有使用三里茶社提供的信息和服务的人。</p>
              <p><span>1.4账户：</span>指用户使用三里茶社平台时设置的账户名，每个账户对应唯一的用户名，其账号具有唯一性。</p>
              <p><span>1.5预订客人/预订用户：</span>指使用本网站/三里茶社预订茶室，并在预订的时段内使用所预订成功的人。</p>
              <p><span>1.6茶室客人：</span>指包括预订客人/预订用户在内的，或取得预订客人/预订用户授权有权限进入和使用茶室及其各项附属服务的人。</p>
              <p><span>1.7用户内容：</span>指用户为获取权限在本网站/三里茶社发布、上传、出版、提交或传播的内容。</p>
              <p><span>1.8茶室主人：</span>指完成本网站/三里茶社的代理商账户注册，已经同意本协议且将他/她的其茶室开放在本网站上，并对这一行为负责的茶室主理人和/或茶室管理员（包括自然人主人和非自然人主人）。</p>
              <p><span>1.9应用程序：</span>指提供三里茶社服务的在线平台，在三里茶社所允许的权限和范围内提供茶室/体验/服务的搜索、查看、预定、交易及在预定时段内的使用。</p>
              <p><span>1.10茶室使用费：</span>指本网站/三里茶社上表明的茶室使用费。</p>
              <h3>二、协议范围</h3>
              <h4>2.1签约主体</h4>
              <p>本协议由您与三里茶社及茶室主人共同缔结，本协议对您与三里茶社及茶室主人均具有合同效力。</p>
              <h4>2.2补充协议</h4>
              <p>《三里茶社茶室使用协议》、《三里茶社隐私规则》均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用三里茶社平台服务，视为您同意上述补充协议。</p>
              <h3>三、用户管理</h3>
              <p>依照本协议要求，于三里茶社登记注册（亦称“用户注册”）的用户，需同意以下服务条款，方有资格享受三里茶社提供的相应服务，并受本协议条款的约束。</p>
              <h4>3.1注册者的资格</h4>
              <p>您确认，在您开始用户认证程序从而具备使用三里茶社平台服务的资格前，您应具备中华人民共和国法律规定的与您行为相适应的民事行为能力。（特别提示，用户应为身体条件健康人士。用户如未成年或患有包括但不限于影响使用三里茶社的如癫痫、心脏病、高血压、暂时性眩晕、视力障碍、听觉障碍、残疾等各种疾病的，应在身体条件健康人士的陪同下使用本服务）。若您不具备前述与您行为相适应的民事行为能力或不符合前述使用三里茶社的条件，则您及您的监护人/权力义务承受人应依照法律规定承担因此而导致的一切后果，且三里茶社有权注销（永久冻结）您的三里茶社账号，并向您及您的监护人/权力义务承受人索偿。</p>
              <h4>3.2账户说明</h4>
              <p>1.您作为访客通过手机验证等程序，按照注册页面提示填写信息、阅读并同意本协议并完成全部注册程序后或以其他三里茶社允许的方式实际使用三里茶社服务时，您即成为三里茶社平台的用户并拥有自己的账户。</p>
              <p>2.在注册时，您应当按照法律法规要求，或注册页面的提示准确提供、并及时更新您的资料，以使之真实、及时，完整和准确。如有合理理由怀疑您提供的资料错误、不实、过时或不完整的，三里茶社有权向您发出询问及/或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部三里茶社服务。三里茶社对此不承担任何责任，您将承担因此产生的任何直接或间接支出。</p>
              <p>3.您应当准确填写并及时更新您提供的电子邮件地址、联系电话、联系地址、邮政编码等联系方式，以便三里茶社或其他用户与您进行有效联系，因通过这些联系方式无法与您取得联系，导致您在使用三里茶社服务过程中产生任何损失或增加费用的，应由您完全独自承担。</p>
              <p>4.由于用户的账户关联用户的信用信息，您不得转让该账户，也不得许可或协助他人在您不在场的情况下使用您的用户账户使用三里茶社服务，否则由此产生的一切责任均由您承担连带责任。</p>
              <h4>3.3认证信息管理</h4>
              <p><span>【信息真实】</span>在用户认证过程中，您应按三里茶社平台页面的提示准确、真实、完整地提供您的信息以便三里茶社确认您的身份。您了解并同意，您有义务保持您提供信息的真实性及有效性。</p>
              <p><span>【更新维护】</span>如果您的认证信息有所变更，您应当及时更新您提供的信息，三里茶社将依法不时地对您的信息进行检查核实，您应当配合提供最及时、真实、完整的信息。</p>
              <p>如三里茶社按您最后一次提供的信息与您联系未果、您未按三里茶社的要求及时提供信息、您提供的信息存在明显不实的，您将承担因此对您自身、他人及三里茶社造成的全部损失与不利后果。</p>
              <h4>3.4开通使用三里茶社及其设备权限。用户在成功通过用户认证程序后，即可使用三里茶社平台所提供的设备。</h4>
              <h4>3.5上述用户认证的审核和通过均由三里茶社最终决定。三里茶社可以根据用户上传的文件对其文件的真实性、合法性进行合理的质询和怀疑，并给与用户不通过认证的结果而无需提供任何原因；用户可以通过再次申请认证或申诉进行重新认证。</h4>
              <h3>四、账户安全规范</h3>
              <p><span>1.</span>三里茶社的登录用户名及密码只供用户使用，用户有责任维护其用户名和密码的保密性和安全性。您有权随时对自己的个人资料进行查询、修改和删除。为客户服务安全考虑，用户名不能随意更改，您应对您的用户名和密码的安全以及对通过您的用户名和密码实施的行为承担全部责任。除非有法律规定或司法裁定，且征得三里茶社的同意，否则，用户名和密码不得以任何方式转让、赠与或继承（与账户相关的财产权益除外）。若您发现用户名和密码丢失、被盗，或任何人未经取得同意不当使用您的账户或有任何其他可能危及您账户安全的情形时，您应当立即以有效方式通知三里茶社，要求三里茶社暂停相关服务。因用户方造成的账户失密，应由用户承担直接或间接的责任，三里茶社对其产生的后果（包括但不限于您的任何损失）不承担任何责任。如三里茶社监测到非注册用户使用用户用户名及密码登录本站，三里茶社有权暂停或取消此账号登录权限，并对失密原因进行调查，除三里茶社存在过错外，三里茶社对在进行调查前已经产生的后果不承担任何责任。</p>
              <p><span>2.</span>除三里茶社存在过错外，您应对您账户项下的所有行为和结果（包括但不限于使用三里茶社及其内部设备、开启及关闭门锁、发布信息、披露信息、开放通讯录等）负责，无论该等行为和结果是否对您自身或第三方造成任何损害。</p>
              <p><span>3.</span>使用三里茶社服务时，您必须遵守《中华人民共和国保密法》、《中华人民共和国著作权法》、《计算机信息系统国际联网保密管理规定》、《中华人民共和国计算机信息系统安全保护条例》、《计算机信息网络国际联网安全保护管理办法》、《中华人民共和国计算机信息网络国际联网管理暂行规定》及其实施办法等相关法律法规的任何及所有的规定。如三里茶社有任何合理理由认为您的行为可能违反相关法律、法规、规章及条例，三里茶社有权在任何时间，不经事先通知终止向您提供服务。</p>
              <p><span>4.</span>您了解并同意，三里茶社有权应政府部门（包括司法及行政部门）的要求，向其提供您在三里茶社填写的注册信息和发布记录等必要信息。</p>
              <h3>五、三里茶社平台服务及规范</h3>
              <p><span>5.1</span>经认证的用户可通过三里茶社平台使用三里茶社平台服务。</p>
              <p><span>5.2</span>您应确保您不会利用三里茶社平台进行任何违法行为或下述行为：</p>
              <p><span>（1）</span>利用技术手段故意访问、记录、盗取、传播三里茶社平台的数据和相关信息；</p>
              <p><span>（2）</span>以任何方式侵犯三里茶社及任何第三方的合法权益；</p>
              <p><span>（3）</span>干扰或破坏三里茶社平台、其服务器或其网络；</p>
              <p><span>（4）</span>未经合法授权而截取、篡改、收集、储存、使用、传播或删除其他用户的个人信息或提供的其他信息；</p>
              <p><span>（5）</span>其他未经合法授权的行为。</p>
              <p><span>5.3</span>您应确保您在三里茶社平台上所发布和传播的内容不得包含下述信息：</p>
              <p><span>（1）</span>违反宪法确定的基本原则的；</p>
              <p><span>（2）</span>危害国家统一、主权和领土完整的；</p>
              <p><span>（3）</span>泄露国家秘密，危害国家安全，损害国家荣誉和利益的；</p>
              <p><span>（4）</span>煽动民族仇恨、民族歧视，破坏民族团结，侵害民族风俗、习惯的；</p>
              <p><span>（5）</span>违背国家宗教政策，宣扬邪教、迷信的；</p>
              <p><span>（6）</span>扰乱社会秩序，破坏社会稳定的；</p>
              <p><span>（7）</span>宣扬淫秽、赌博、暴力、教唆犯罪的；</p>
              <p><span>（8）</span>侮辱、诽谤、恐吓、涉及他人隐私等侵害他人合法权益的；</p>
              <p><span>（9）</span>侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的；</p>
              <p><span>（10）</span>存在可能破坏、篡改、删除、影响三里茶社平台任何正常运行或未经授权秘密获取三里茶社平台及其他用户的数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码的；</p>
              <p><span>（11）</span>危害社会公德，诋毁民族优秀文化的；</p>
              <p><span>（12）</span>有国家法律、法规或政策禁止的其他内容。</p>
              <p><span>5.4</span>不可抗力</p>
              <p>三里茶社依法律规定承担基础保障义务，但无法对由于信息网络基础设施、信息网络设备维护、连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，暴乱，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令或因第三方原因而给您造成的损害结果承担责任。</p>
              <h3>六、用户信息的保护及授权</h3>
              <p><span>6.1</span>个人信息的保护</p>
              <p><span>（1）</span>三里茶社非常重视您个人信息和其他用户信息的保护，在您使用三里茶社平台的服务时，您同意三里茶社按照在三里茶社平台上公布的《三里茶社隐私规则》收集、储存、使用、披露和保护您的个人信息或其他信息。三里茶社希望通过《三里茶社隐私规则》向您清楚地介绍三里茶社对您个人信息的处理方式，因此三里茶社建议您完整地阅读《三里茶社隐私规则》，以帮助您更好地保护您的隐私权。</p>
              <p><span>（2）</span>在任何情况下您使用三里茶社平台，视为您同意遵守《三里茶社隐私规则》下您的义务，允许三里茶社行使《三里茶社隐私规则》下三里茶社的权利。</p>
              <p><span>（3）</span>在您通过三里茶社平台与他人沟通交流的过程中，如果您接触到其他用户的个人资料、信息、文件等，您保证您将严格保密，不以任何方式向任何第三方进行披露。</p>
              <p><span>（4）</span>对于您提供及发布除个人信息外的文字、图片、视频、音频等非个人信息，在版权保护期内您免费授予三里茶社获得全球的许可使用权。您同意三里茶社储存、使用、复制、修订、编辑、发布、展示、翻译、分发您的上述信息，并以已知或日后开发的形式、媒体或技术将上述信息纳入其他作品内。</p>
              <h3>七、知识产权及其他权利</h3>
              <p><span>7.1</span>您同意本协议并成为三里茶社平台用户的行为，仅使得您本人得以按照本协议的规范使用三里茶社平台的各项服务。您与三里茶社平台或茶室主人之间并不存在其他授权、合作、代理、委托、雇佣等关系。三里茶社对本服务及本服务所使用的软件和受知识产权或其他法律保护的资料享有相应的权利。本网站和服务中的所有知识产权（包括著作权、专利、商标、服务标识、商号、设计，不论是否已登记注册）、网站中的信息内容或作为服务内容的信息、运营的数据库、所有网站设计、文字和图表、软件、照片、录像、音乐、声音及其前述组合，以及所有软件编译、相关源代码和软件（包括小应用程序和脚本）均为三里茶社的财产，由三里茶社方可享有所有权及知识产权。</p>
              <p><span>7.2</span>您了解三里茶社平台和相关专有保密资料的知识产权归属于三里茶社。您了解三里茶社平台上的任何赞助广告或信息的知识产权归属于相关赞助广告或信息的提供商。您了解并同意，未经知识产权所有人的书面明示授权，您不得对上述知识产权进行修改、出租、出借、出售、传播或实施其他侵犯上述知识产权的行为（例如进行还原工程、反向组译等）。</p>
              <h3>八、责任的限制</h3>
              <h4>由于互联网服务实时更新的性质，您了解并同意，三里茶社不对下述内容承担任何保证责任，对该等原因对您造成的任何损失，三里茶社不承担任何责任：</h4>
              <p>（1）三里茶社平台服务不受任何干扰、服务提供及时、安全可靠、不出现任何差错；</p>
              <p>（2）使用三里茶社品台服务所取得的信息在任何情况下均正确可靠；</p>
              <p>（3）您经由三里茶社平台所租赁的三里茶社茶室及设备符合您的期望；</p>
              <p>（4）通过三里茶社平台下载或取得的任何资料不会导致您的个人电脑或移动设备有任何损坏或数据有任何流失。</p>
              <p>三里茶社负责“按现状”和“可得到”的状态向您提供三里茶社平台的服务。除本协议内所做出的保证或三里茶社以书面形式做出的其他明示保证外，三里茶社未向您做出任何形式的保证或承诺，包括但不限于商业适售性、特定目的之适用性或其他明示或暗示的保证。</p>
              <h3>九、用户的行为的评价及处理</h3>
              <h4>9.1跟踪评价</h4>
              <p>为了向用户提供更加优质的服务，且为维持市场正常运营秩序，三里茶社及茶室主人有权对认证用户使用三里茶社平台服务的行为，进行跟踪检测和评价，并根据评价结果增减该认证用户使用茶室的费用。若认证用户有污染破坏设备等不规范的行为，三里茶社及茶室主人有权增加认证用户使用三里茶社服务的费用或停止向您提供三里茶社平台服务。</p>
              <h4>9.2违约认定</h4>
              <p>发生如下情形之一的，视为您违约：</p>
              <p><span>（1）</span>如三里茶社或茶室主人在用户认证信息复核过程中发现用户提供的认证信息不全、无效或虚假；</p>
              <p><span>（2）</span>如用户发生危及交易安全或账户安全的行为；</p>
              <p><span>（3）</span>如用户采用不正当手段谋取利益的行为，包括向三里茶社及茶室主人的工作人员及/或其关联人士提供财务、消费、款待或商业机会，或通过其他手段谋取不正当利益；</p>
              <p><span>（4）</span>如用户扰乱三里茶社平台的秩序，以任何方式，刻意规避三里茶社平台的各类规则或市场管理措施，或以不正当的方式获取、使用三里茶社平台资源的行为；</p>
              <p><span>（5）</span>如用户违反本协议中规定的三里茶社茶室使用协议；</p>
              <p><span>（6）</span>如用户违反中国相关法律法规的规定；</p>
              <p><span>（7）</span>如用户违反本协议的其他规定。</p>
              <p>为使用互联网平台发展和满足海量用户对高效优质服务的需求，您理解并同意，三里茶社及茶室主人可在三里茶社平台规则中约定违约认定的程序和标准。如：三里茶社及茶室主人可依据您的用户数据与海量用户数据的关系来认定您是否构成违约；您有义务对您的数据异常现象进行充分举证和合理解释，否则将被认定为违约。</p>
              <h4>9.3为保障其他用户或三里茶社平台的正当权益，维持市场正常运营秩序，在用户违规处理期间三里茶社或茶室主人按照本协议规定的情形对用户采取违规处理措施，三里茶社及茶室主人没有义务在采取违规处理前通知用户：</h4>
              <p><span>（1）</span>停止茶室服务：指停止认证用户通过三里茶社平台使用茶室的权利；</p>
              <p><span>（2）</span>关闭账户：指删除用户的账户或停止用户的所有权限，并将用户列入黑名单，不再向用户提供任何服务；</p>
              <p><span>（3）</span>公示警告：指在三里茶社平台的管理系统等位置对其正在被执行的处理进行公示；</p>
              <p><span>（4）</span>终止本协议。</p>
              <h4>9.4三里茶社及茶室主人可将对您上述违约行为处理措施信息以及其他国家行政或司法机关生效法律文书确认的违法信息在三里茶社平台上予以公示。</h4>
              <h4>9.5赔偿责任</h4>
              <p><span>（1）</span>如您的行为使三里茶社及茶室主人遭受损失（包括自身的直接经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等间接经济损失），您应赔偿三里茶社及茶室主人的上述全部损失。</p>
              <p><span>（2）</span>如您的行为使三里茶社及茶室主人遭受第三人主张权利，三里茶社及茶室主人可在对第三人承担金钱给付等义务后就全部损失向您追偿。</p>
              <h4>9.6如您向三里茶社及茶室主人的雇员或顾问等提供实物、现金、现金等价物、劳务、旅游等价值明显超出正常商务洽谈范畴的利益，则可视为您存在商业贿赂行为。发生上述情形的，三里茶社及茶室主人可立即终止与您的所有合作并向您收取违约金及/或赔偿金，该等金额以三里茶社及茶室主人因您的贿赂行为而遭受的经济损失和商誉损失作为计算依据。</h4>
              <h3>十、通知</h3>
              <p>我公司可能会通过本网站、应用程序、电子邮箱，或者信函形式将通知发送到您注册时所留下的联系方式及地址。此类的通知将被视为在纸质邮件寄出后的48小时后，或本网站、应用程序、电子邮件发送12小时后开始生效。您可以再任何时候将您的通知、投诉或者申请致电客服。</p>
              <h3>十一、转让</h3>
              <p>本协议项下您的权利义务（不论是整体还是部分）不得在我公司书面批准前转让予第三方。无论您是否同意，我公司可以将本协议项下三里茶社的权利义务（不论是整体还是部分）转让给我公司的（一）总公司或者子公司；（二）权利义务的承受者。任何违反本节的转让均属无效。</p>
              <h3>十二、协议的终止</h3>
              <h4>12.1用户发起的终止</h4>
              <p>您有权通过以下任一方式终止本协议：</p>
              <p><span>（1）</span>您不再继续使用三里茶社平台服务；</p>
              <p><span>（2）</span>变更事项生效前您停止使用并明示不愿接受变更事项的。</p>
              <h4>12.2三里茶社发起的终止</h4>
              <p>您同意，三里茶社基于平台服务的安全性、合法性，有权自行全权决定以任何理由不经事先通知的中止、终止向您提供部分或全部三里茶社服务，暂时冻结或永久冻结（注销）您的账号，且无须为此向您或任何第三方承担任何责任。出现以下情况时，三里茶社有权直接以注销账号的方式终止本协议：</p>
              <p><span>（1）</span>用户违反《中华人民共和国保守国家秘密法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、信息产业部2000年10月8日第4次部务会议通过的《互联网电子公告服务管理规定》，以及《互联网新闻信息服务管理规定》等有关计算机及互联网规定的法律和法规、实施办法；</p>
              <p><span>（2）</span>用户违反本服务协议中规定的使用规则；</p>
              <p><span>（3）</span>注册信息中的主要内容不真实或不准确或不及时或不完整；</p>
              <p><span>（4）</span>未经三里茶社同意，将三里茶社用于商业目的；</p>
              <p><span>（5）</span>三里茶社终止向您提供服务后，您涉嫌再一次直接或间接或以他人名义注册成为三里茶社用户的；</p>
              <p><span>（6）</span>其他三里茶社认为应当终止服务的情况。</p>
              <h4>12.3您同意，您与三里茶社的协议关系终止后，三里茶社仍享有下列权利：</h4>
              <p><span>（1）</span>继续保存您的注册信息及您使用三里茶社服务期间发布的所有信息；</p>
              <p><span>（2）</span>您在使用三里茶社服务期间存在违法行为或违反本协议和/或规则的行为的，三里茶社仍可依据本协议向您主张权利。</p>
              <h3>十三、法律适用、管辖与其它</h3>
              <p><span>13.1【法律适用】</span>本协议之效力、解释、变更、终止、执行与争议解决均适用中华人民共和国法律。用户同意遵守《中华人民共和国保守国家秘密法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、信息产业部2000年10月8日第4次部务会议通过的《互联网电子公告服务管理规定》，以及《互联网新闻信息服务管理规定》等有关计算机及互联网规定的法律和法规、实施办法。在任何情况下，三里茶社合理地认为用户的行为可能违反上述法律、法规，三里茶社可以在任何时候，不经事先通知终止向该用户提供服务。如无相关法律规定的，则应参照通用国际商业惯例和（或）行业惯例。了解到互联网的无国界性，用户同意遵守当地所有适用的法规，包括但不限于关于网上行为及内容发布之法律法规。用户特别同意遵守有关从中国或用户所在国家或地区输出技术数据之传输的所有使用法律法规。</p>
              <p><span>13.2【管辖】</span>您因使用三里茶社平台服务所产生及与三里茶社茶室服务有关的争议，由三里茶社与您协商解决。协商不成时可提交至我公司注册地有管辖权的人民法院诉讼解决。</p>
              <p><span>13.3【可分性】</span>本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。</p>
              <p><span>13.4【标题】</span>本协议的标题仅供阅读方便而设，不属于协议的条款，不具有任何法律效果。</p>
              <p><span>13.5【非弃权】</span>任何一方当事人放弃或者延迟行使其在本协议项下的全部或部分权利的，不应视为其放弃本协议项下的任何其他权利或与此类似的一切权利。</p>
              <p><span>13.6【完全合意】</span>本协议构成各方之间就本协议内容所达成的完全合意；本协议签署前存在的、或与本协议相矛盾或抵触的一切合意，无论其为口头、书面或其他形式均归于无效。</p>
              <p><span>13.7【部分条款无效】</span>如果本协议及其附件的任何条款因适用法律而无效或不可强制执行，则该条款应视为自始无效，且不影响本协议其他条款的效力。在此情形下，各方应当在合法范围内协商确定新的条款，以保证最大限度地实现原有条款的意图。</p>
              <div style={{textAlign:"center",fontWeight:"bold"}}>三里茶社茶室使用协议</div>
              <h3>一、使用</h3>
              <p><span>1.1</span>为了使用三里茶社茶室及其本网站或者应用程序，首先需要您进行注册和登录。在注册和登录的各个步骤中，在满足三里茶社规定的用户注册条件的前提下，您有义务提供三里茶社所需的信息，包括但不限于个人信息、手机号和信用卡数据。注册成功后，您会获得三里茶社提供的个人账户（以下简称“账户”），可以通过您自己设置的密码进行登录操作。您同意保持该账号中的信息准确、完整和及时更新，并符合《三里茶社用户服务协议》中关于内容部分的规定。如果您没有保持该账号中的信息准确、完整和及时更新，您的账号可能会失效，因此影响您账号的正常使用。三里茶社不为任何因您对账户信息维护不妥而造成的冲突负有责任。</p>
              <p><span>1.2</span>您作为预订用户使用三里茶社服务时，需要按照本网站约定向三里茶社支付茶室使用费。</p>
              <p><span>1.3</span>三里茶社将在业务允许的范围内将用户的支付和绑定支付方式链接到第三方的支付平台（以下简称“支付平台”）。根据具体情况，您在使用三里茶社服务及茶室时将收到除本协议之外的支付平台的条款条件和隐私条款和您的支付银行卡发行所约束，您的整个支付过程是与上述使用行为有关联的。在三里茶社规定的规则和范围内，作为预定用户的您可以进行已支付款项的原路退款申请，到账时间取决于第三方支付平台。三里茶社不为支付平台的任何错误和过失负有责任。在三里茶社规定的规则和范围内，作为预订用户的您可以有条件取消已支付的订单，在与对应茶室的茶室主人以及三里茶社达成一致的情况下进行全部或者部分款项的退款申请，具体以APP《退订退款规则》为准。</p>
              <p><span>1.4</span>当涉及到使用某特定茶室时，作为预订用户的您接受和遵守三里茶社连同该茶室的茶室主人提供的建筑安保程序、IT权限和使用程序（场地政策）。作为预订用户的您的预订茶室行为被视为您接受和遵守茶室主人提出并提前告知的任何使用须知和注意事项。在使用茶室的过程中，如有违反所造成的冲突、损失都由您和茶室主人自行协商解决。作为预订用户的您在网站和应用程序中所看到的茶室的可预订时间为茶室主人根据实际情况所规定和调整，您接受和遵守茶室主人允许预订的使用时间，允许的使用时间信息提供给您的方式包括但不限于网站/应用程序展示、微信/短信通知、电话沟通及其他。</p>
              <p><span>1.5</span>您应通过本网站所向您提供的二维码解锁对应茶室的房门。您在使用茶室之前，应细致检查房门及房内设备是否存在损坏，包括但不限于检查茶室及其内部设备是否完好，玻璃是否破损，茶室内部环境及其设备是否洁净。如果您在检查时发现茶室及其内部设备存在损坏，应停止使用该茶室。您可通过微信公众号/客服热线/微信客服告知我们损坏的茶室。如果您经检查知悉或应知茶室存在损坏但仍然使用该茶室，就该等行为对您自身造成的一切损伤，您自行承担所有责任，三里茶社及茶室主人对此不承担任何责任。就您该等行为对该茶室及其他人所造成的一切损害，您还应承担相应的赔偿责任。</p>
              <p><span>1.6</span>您郑重承诺，您对与您账户相关的所有行为负责，包含但不限于以下几种情况：使用本网站及服务和茶室。在不限制上述内容的前提下，如果其他客人和/或其他用户和作为预订用户的您一起使用茶室，一旦所使用的订单是通过作为预订用户的您的账户生成，作为预订用户，您郑重承诺：您同意，对任何违反本协议条款、茶室主人单独提出的或与您约定的条款或者茶室所在管辖区域范围内的现行法律、法规及规定的行为负全部责任，并承担相应的赔偿责任和必要的法律全责（即使违反协议条款、或者现行法律、法规及规定的人不是您本人），您有义务监督包括您在内的所有客人的合法合规茶室使用行为。</p>
              <p><span>1.7</span>在使用过程中，三里茶社和茶室主人提供作为预订用户的您所预订茶室的时段内的茶室使用权（仅包含茶室主人在三里茶社上开放的茶室部分）。未经茶室主人允许，作为预订用户的您不得擅自进入茶室主人的其他私人区域。在茶室主人告知及额外规定的范围内，作为预订用户的您可以有条件使用茶室附属设备、物品及服务。您在使用茶室期间如与第三方发生纠纷应由纠纷双方自行解决，三里茶社及茶室主人不承担任何相关赔偿义务，如给三里茶社及茶室主人造成损失的，您应向三里茶社及茶室主人承担赔偿义务。</p>
              <p><span>1.8</span>在空间使用过程中，作为预订用户的您的或者茶室客人的个人物品、贵重财产等需您和/或者茶室客人进行自我妥善保管，三里茶社和茶室主人没有在场监管预订用户和/或者茶室客人物品安全的责任和义务，若您的个人物品遗失在茶室内，相关损失及责任由您自行承担。</p>
              <p><span>1.9</span>作为预订用户的您承诺，在使用茶室的过程中，您和/或茶室客人所产生和交流的一切信息，包括但不限于录音语音、视频录像、照片、文字、图片、文件、卷宗不得违反本协议条款、茶室主人单独提出的或与您约定的条款或者茶室所在管辖区域范围内的现行法律法规及规定，您有义务监管和妥善处理茶室使用过程中产生的一切信息、物品、其他物件，无论以上信息、物品、其他物件是否遗留在茶室内或者以何种形式存放，茶室主人和三里茶社不为其负有保管存放、隐私义务，也不为其带来的后果负任何法律责任。</p>
              <p><span>1.10</span>在茶室主人允许的茶室使用范围内，当涉及到预订的茶室时，作为预订用户的您承诺对使用茶室时您和/或茶室客人所产生的物品损坏和/或者遗失负责，并同意承担维修、更换或赔偿原物所产生的费用。您应合理使用茶室，不得损坏茶室，包括但不限于：不得砸损茶室、不得破坏茶室、不得对茶室加装私锁等。若三里茶社收到茶室主人的投诉，经调查发现确属您的责任，有权在向茶室主人承担责任前/后向您追偿该等损害赔偿责任，或代表茶室主人向您主张损害赔偿责任。使用茶室结束后，作为预订用户的您承诺公正评价使用的体验，并尽力配合三里茶社提供包括但不限于图片、文字、视频在内的公平公正真实的使用评价、建议等反馈。您提供的一切反馈资料的所有权及知识产权等一经提交即归三里茶社所有。</p>
              <p><span>1.11</span>您应通过我公司的应用程序或本网站点击结束使用三里茶社茶室后并缴纳相应费用，且还应确认门锁已切实可靠地锁定。若有问题，您可通过微信公众号/客服热线/微信客服告知我们。</p>
              <h3>二、声明与保证</h3>
              <p><span>2.1</span>您明确地声明和保证您是法律允许的能够签订和履行本协议的完全民事行为能力人，方可使用三里茶社平台提供的服务和茶室。您声明和保证您已满18岁，方可独立使用三里茶社服务和茶室，如未成年人使用时，应当有成年人陪同并由该成年人承诺承担相应法律责任。只有当您声明和保证您拥有权利和能力处理本协议，同时也愿意接受本协议的约束时，方可使用三里茶社服务和茶室。</p>
              <p><span>2.2</span>您声明和保证您在通过注册账户和密码使用三里茶社服务和茶室中的任何参与行为都为您本人行为并为其负责。您不能授权别人使用您的用户身份，或者告知别人您的密码，您也不能将您的账号或者密码分配或全部转让给别人或其它任何实体。一旦转交给您委托管理的人或实体（如管理员等），相当于您同事必须承担为转接人承担法律责任的风险，您承诺知悉并遵照此规则，方可使用三里茶社服务和茶室。</p>
              <p><span>2.3</span>当您在使用三里茶社服务和茶室时，您同意遵守您在使用三里茶社服务和茶室时所在地的现行法律法规。</p>
              <p><span>2.4</span>您有义务检查并保证您移动设备中软件和服务平台是从正规渠道下载和使用。如果您下载了错误版本的应用程序，我公司不负有法律任何责任。如果您使用的设备对三里茶社软件和平台服务不兼容，或者您的设备是三里茶社未授权的设备，我公司有权单方面终止这份协议，且最终解释权为我公司所有。</p>
              <p><span>2.5</span>在使用三里茶社服务和茶室时，您同意：</p>
              <p><span>（1）</span>您只能将三里茶社服务和茶室作合法用途。</p>
              <p><span>（2）</span>您不能将三里茶社服务和茶室作不合法、不恰当的用途，包含但不限于：多人轰趴、滑板或跳绳等需要场地的体育运动。嗑药、过度饮酒、赌博或者嫖娼、拍摄色情作品、发生性行为、暴力或者威胁的行为，或者其它任何对三里茶社茶室、茶室内陈设和设施设备，或对任何一个茶室主人及其商业和品牌可能产生消极影响的用途。</p>
              <p><span>2.6</span>作为预订用户的您在使用茶室的所有使用权基于您在三里茶社平台上进行的按小时预订，茶室按小时/半小时计费，根据预订用户的您的需求设置使用茶室的小时数。</p>
              <p><span>2.7</span>您承诺您遵守预订时间范围使用相应茶室，预订时间结束自动离开茶室。若有订单延时需求，需在三里茶社操作范围之内进行及时操作。</p>
              <p><span>2.8</span>您承诺，若有茶室退订需求，参考三里茶社平台服务的官方最新退订退款政策进行及时操作。</p>
              <p><span>2.9</span>由三里茶社向预订且发生并完成实际交易（即茶室客人使用完成茶室预订期间且没有发生任何退费）的预订用户提供与其向三里茶社支付的茶室使用费等值的电子或纸质版增值税普通发票。</p>
              <p><span>2.10</span>作为预订用户的您明确知道因为三里茶社茶室任何时间都有使用人数的限制，同时，关于限制的具体内容会在本网站、应用程序上茶室的详情页公布。您需明确对该人数限制表示同意和遵守，茶室主人有权拒绝超过声明人数的订单或临时到场的超过使用人数的宾客。因您未遵守茶室详情页中关于使用场景、人数和其他注意事项，或未遵守预订订单中承诺的以上信息，而造成的一切后果由您承担，三里茶社不承担任何义务去解决。</p>
              <p><span>2.11</span>作为预订用户的您在使用茶室时，应保证其一切配置设施不被人为损坏，维持室内良好的整洁环境；如有任何物品包括但不仅限于丢失及损坏，您将承担任何复原和原价赔偿责任。您不能私自在茶室内安装、移除或者更改任何固定设施、装备或者机电设施。</p>
              <p><span>2.12</span>在使用预订茶室期间，预订用户和茶室主人产生的任何纠纷，三里茶社不承担任何义务去解决。</p>
              <p><span>2.13</span>作为预订用户的您承诺遵守各项国家法律法规和提前了解所预订茶室的守则，在符合公序良俗和商业道德的情况下使用预订茶室。您需要在使用三里茶社茶室时遵守所有附加规定，您可能会从本网站、应用程序或其它方式得到告知。</p>
              <p><span>2.14</span>作为预订用户的您不能将三里茶社服务和茶室用作发送或储藏任何不合法的物资或者具有欺诈性的其它用途。</p>
              <p><span>2.15</span>我公司和任何茶室主人都不对作为预订用户的您和/或茶室客人遗留在茶室里的财物负保管责任。您需要保证在您和/或茶室客人离开茶室前把您和/或茶室客人的个人物品收好。</p>
              <p><span>2.16</span>作为预订用户的您不能影响网络的正常运行，或有损害网站、茶室或者软件平台程序的任何行为。</p>
              <p><span>（1）</span>您不能擅自拷贝或者发布三里茶社平台软件和实体茶室中属于三里茶社但没有被我公司书面批准的内容，用于任何用途。</p>
              <p><span>（2）</span>您需要保持您账号、密码或者其他任何我们提供的能够认证您用户权限的信息安全和保密。</p>
              <p><span>（3）</span>您使用茶室时，您只能使用您被授权使用的权限或者网络连接，且只能将网络作合法的用途，您不能通过该网络实施违法犯罪、消费欺诈之类的行为。</p>
              <h3>三、免责声明</h3>
              <p>我公司不对茶室或者本网站、应用程序的可靠性、时效性、品质、适用性、安全、精确性或者完整性进行声明与保证。我公司不对以下进行声明和保证：</p>
              <p><span>（1）</span>对茶室或者本网站、应用程序的使用是安全的、及时的、不间断的、不会出现错误的，或者可以在其他任何硬件、本网站、应用程序、系统或者数据中操作；</p>
              <p><span>（2）</span>茶室或本网站、应用程序会满足您对需求和预期；</p>
              <p><span>（3）</span>任何储存的数据会是精确的或者可靠的；</p>
              <p><span>（4）</span>茶室、和其他任何产品、服务、信息、或其它您购买的或者获得的资料的质量会满足您的需求或者预期；</p>
              <p><span>（5）</span>茶室或者本网站、应用程序的错误或者瑕疵会被更正；</p>
              <p><span>（6）</span>开放的本网站、应用程序是严格以“原样”提供。所有条件、声明和担保不论是明示、暗示、法律规定，或者包含但不限于任何机制的担保、某特定目的的解决方式、或者不侵犯第三方权益的其他方式，基于现行法律是被我公司郑重否认的。作为预订用户的您了解并同意个人承担您使用本网站、应用程序和茶室或者第三方服务或产品所需承担的法律上的风险。</p>
              <p>为更进一步明确：</p>
              <p><span>（1）</span>预订用户在三里茶社中如使用到门禁设备，是由茶室主人或第三方提供的，我公司和茶室主人无论如何都没有承担门禁设备系统故障所产生的情况如财物的丢失或被盗（包含但不限于）的责任；</p>
              <p><span>（2）</span>茶室被定位在不是我公司所有的或被我公司管理的建筑内，我公司对此不作任何声明和担保。</p>
              <p>另外，我公司不为特定的活动或者任何在茶室中发生的活动对茶室的适用性做任何声明和担保。</p>
              <p>鉴于在茶室内可以访问WI—FI，我公司对此不作任何声明。</p>
              <p>本网站或者应用程序可能会受制于限制、延迟或其它在使用网络和电子通信中会遇到的其它问题。我公司不对任何延迟、传递失败或其他任何形式的此类问题造成的损害负责。</p>
              <h3>四、责任限制</h3>
              <p>在任何情况下，我公司对因本协议或者您对三里茶社服务、茶室、本网站或者应用程序等的使用所产生的责任总额都不能超过您在任何情况下所提起赔偿的之前的六个月中预先支付给我公司的任何款项或者实际损失（以较大的金额为准）。在任何情况下，我公司或者我公司所属、所授权的机构对非三里茶社原因造成您的任何间接的、惩罚性的、特殊的、典型的、附带的、有重大影响的或者其他任何类型的损害（包括人身伤害、数据丢失、收入、利润、使用或者其他经济上的优势）都不负有任何责任。通过本网站或是应用程序（及其所有问题）所提供的三里茶社服务及茶室，关于您做出的决定的责任将完全由您自担。三里茶社仅提供信息服务，我们将不会保证任何这样茶室、茶室主人或者预订用户或者其他第三方的适合性，合法性或能力。茶室建筑物的质量将完全由此建筑物业主负责。在茶室客人使用茶室过程中，茶室财产损害、茶室客人的人身损害应当根据造成损失/损害的原因，由茶室客人和/或茶室主人相互进行相应的责任承担，三里茶社不承担责任。
您明白通过使用本网站、应用程序和茶室，您将可能处于接触到潜在危险、冒犯、对未成年有害、不安全或者其他不恰当的位置。并且您使用本网站、应用程序、和茶室的风险自担。</p>
                <div style={{textAlign:"center",fontWeight:"bold"}}>三里茶社隐私规则</div>
                <p>为三里茶社平台提供相应服务之必须，您以自愿填写的方式提供注册所需的姓名、性别、电话以及其他类似的个人信息，则表示您已经了解并接受您个人信息的用途，同意三里茶社平台为实现该特定目的使用您的个人信息。除此个人信息之外，其他任何您发送或提供给三里茶社平台的材料、信息或文本（以下统称信息）均将被视为非保密和非专有的。三里茶社平台对这些信息不承担任何义务。同时如果您提交时没有特别声明的，可视为同意三里茶社平台及其授权人可以因商业或非商业的目的复制、透露、分发、合并和以其他方式利用这些信息和所有数据、图像、声音、文本及其他内容。您可阅读下面的隐私规则以了解更加详细的内容。</p>
                <h3>一、隐私规则</h3>
                <p>三里茶社平台非常重视对您的个人隐私保护，我们将按照本规则收集、使用、共享和保护您的个人信息。在您使用三里茶社平台的产品及服务前，请您仔细阅读并全面了解本规则。如果您是未成年人，您的监护人需要仔细阅读本规则并同意您依照本规则使用我们的产品或服务。当您浏览、访问三里茶社平台及/或使用三里茶社平台的产品或服务时，即表示您已经同意我们按照本规则来收集、使用、共享和保护您的个人信息。</p>
                <h3>二、信息的收集范围</h3>
                <p>我们收集您的以下个人信息：</p>
                <p>身份识别信息，包括但不限于您的姓名、身份证明、联系地址、电话号码、生物特征信息</p>
                <p>您所处的地理位置及目的地信息；</p>
                <p>平台操作信息，包括但不限于您的IP地址、设备型号、谁被标识符、操作系统版本信息；</p>
                <p>使用信息，包括但不限于您的使用地点、消费信息及时长信息；</p>
                <p>支付信息，包括但不限于您的支付时间、支付金额、支付工具、银行账户及支付账户信息；</p>
                <p>个人信用信息，包括但不限于关于您的任何信用状况、信用分、信用报告信息；</p>
                <p>其他根据我们具体产品及服务的需要而收集的您的个人信息，包括但不限于您对我们及我们的产品或服务的意见、建议、您曾经使用或经常使用的移动应用软件以及使用场景和使用习惯等信息。</p>
                <h3>三、信息的收集方法</h3>
                <p>您授权我们通过以下方法收集您的个人信息：</p>
                <p>我们将收集和储存在您浏览、访问三里茶社平台及/或使用三里茶社平台的产品或服务时主动向我们提供的信息；</p>
                <p>我们将收集和储存我们在向您提供三里茶社平台的产品或服务的过程中记录的与您有关的信息；</p>
                <p>我们将收集和储存您通过我们的客服人员及/或其他渠道主动提交或反馈的信息；</p>
                <p>我们将向关联公司、商业合作伙伴及第三方独立资料来源，收集和储存其合法获得的与您有关的信息；</p>
                <p>我们将向依法设立的征信机构查询您的相关信用信息，包括但不限于任何信用分、信用报告等。</p>
                <h3>四、信息的用途</h3>
                <p>您授权我们出于以下用途使用您的个人信息：</p>
                <p>向您提供三里茶社平台的产品及服务，并进行三里茶社平台相关网站及APP的管理和优化；</p>
                <p>提升和改善三里茶社平台现有产品及服务的功能和质量，包括但不限于产品及服务内容的个性化定制及更新；</p>
                <p>开展三里茶社平台产品及服务相关的市场活动，向您推送最新的市场活动信息及优惠方案；</p>
                <p>设计、开发、推广全新的产品及服务；提高三里茶社平台产品及服务安全性，包括但不限于身份验证、客户服务、安全防范、诈骗监测、存档和备份；</p>
                <p>协助行政机关、司法机构等有权机关开展调查，并遵守使用法律法规及其他向有权机关承诺之义务；</p>
                <p>在收集信息之时所通知您的用途以及与上述任何用途有关的其他用途；</p>
                <p>此外，我们可能向您发送与上述用途有关的信息和通知，包括但不限于为保证服务完成所必须的验证码、使用产品或服务时所必要的推送通知、当前费用优惠及减免信息、关于三里茶社平台产品或服务的新闻以及市场活动及优惠促销信息。</p>
                <h3>五、信息的共享</h3>
                <p>我们对您的个人信息承担保密义务，但您授权我们在下列情况下将您的信息与第三方共享：为了提升我们的产品及服务质量或向您提供全新的产品及服务，我们会在关联公司内部共享您的相关信息，也可能将我们收集的信息提供给第三方用于分析和统计；</p>
                <p>为了与第三方开展联合推广活动，我们可能与其共享开展活动所必需的以及在活动过程中产生的相关信息；</p>
                <p>为了维护您的合法权益，在协助处理与您有关的纠纷或争议时，我们会向存在利害关系的第三方提供解决纠纷或争议所必需的信息；</p>
                <p>根据法律法规的规定及商业惯例，我们需要接受第三方的审计或尽职调查时，可能向其提供您的相关信息；</p>
                <p>根据法律法规的规定或行政机关、司法机构等有权机关要求，我们会向其提供您的相关信息；</p>
                <p>其他经您同意或授权可以向第三方提供您的个人信息的情况。</p>
                <h3>六、信息的安全及保护措施</h3>
                <p>我们及我们的关联公司将采用严格的安全制度以及行业通行的安全技术和程序来确保您的个人信息不被丢失、泄露、损毁或滥用。</p>
                <p>我们将使用行业通行的安全技术和程序，来保护您的个人信息不被未经授权的访问、使用；</p>
                <p>我们的员工将受到保密协议的约束，同时还将受到数据信息的权限控制和操作监控；</p>
                <p>但是，请您注意，任何安全系统都存在可能的及未知的风险。</p>
                <p>您访问的第三方网站经营者，您使用的第三方服务提供者和通过我们获取您的个人信息的第三方可能有自己的隐私权保护规则以及获取您个人信息的方法和措施，这些第三方的隐私权保护规则、获取个人信息的方法和措施将不会受到我们的控制。虽然我们将与可能接触到您的个人信息的我们的合作方等第三方签署保密协议并尽合理的努力督促其履行保密义务，但我们无法保证第三方一定会按照我们的要求采取保密措施，我们亦不对第三方的行为及后果承担任何责任。
作为用户，您可根据您的意愿决定是否使用三里茶社平台的服务，是否主动提供个人信息。同时，您可以查看您提供给我们的个人信息及使用信息。如果您希望删除或更正您的个人信息，请联系我们的客服人员。</p>
                <p>如果我们监测到您将三里茶社平台的产品及服务以及相关信息用于欺诈或非法目的，我们将会采取相应措施，包括但不限于中止或终止向您提供任何产品或服务。</p>
                <p>随着三里茶社平台的产品及服务的进一步提升，我们的隐私政策的内容会随时更新。更新后的隐私政策一旦在本网站上公布即有效代替原来的隐私政策。我们鼓励您定期查看最新的隐私政策以了解我们对于隐私保护的最近措施。</p>
          </div>
          <div  className={this.state.num == 2 ? "item_box tiaokuan" : 'hide'}>
              <h3>交易规则:</h3>
              <p><span>1.</span>预定的订单在使用时间的30分钟之前，您可以自助取消订单，全额退款将原路退还。</p>
              <p><span>2.</span>预定的订单在使用时间的30分钟之后，预定将无法被取消，空间方不退还您的预定款项。</p>
              <h4>小提示：</h4>
              <p>即使是您因故未能使用茶室或提前结束对茶室的使用，亦视为订单的正常发生，并不能要求退款。</p>
              <p>所有退款均按照付款途径原路退还，其中微信支付的退款一般在6小时左右到账，您可通过第三方查询路径查询退款状态。</p>
              <p>特殊线下活动/第三方服务产生的订单，其退订及退款规则以相应活动/服务规则说明为准，请您关注相关规则。</p>
              <p> 三里茶社保留对此方案的最终解释权。</p>
              <p><span> ☎ 400-0591-900</span></p>
              <h3>安全和赔偿</h3>
              <p>在您预定之前，请务必仔细阅读《三里茶社服务协议》和此页须知，并转告您的所有使用客人。茶室使用一旦开始，我们默认所有到达客人知晓并同意此安全赔偿政策：</p>
              <p><span>1.</span>您预定的茶室中大部分功能物品都可以免费使用，但是请勿损坏和带走，否则预订人可能承担茶室方提出的赔偿/赔款要求。</p>
              <p><span>2.</span>在预定的使用时间期间，预订人/使用者需在提前沟通一致的场景下安全使用茶室，您需自行看护好个人物品，并照顾好同行的成人或儿童安全。</p>
              <p><span>3.</span>使用期间如有不慎损坏，请当场向茶室方说明情况，协商赔偿。</p>
              <p><span>4.</span>如在您离开后，茶室主人向我们投诉茶室内有物品损坏或丢失，我们将按以下流程协调：</p>
              <p><span>4.1</span>我们会要求茶室主人提供证明材料，收到这些材料后，三里茶社或茶室主人会联系您告知索赔。</p>
              <p><span>4.2</span>需您在48小时内回复商讨索赔事宜。</p>
              <p><span>4.3</span>如您对索赔申请并无异议，请按其要求赔偿即可；如有异议，请联系我们的客户体验专员，申请介入。</p>
              <p><span>4.4</span>无论是何种情况，我们都会确保您和茶室方均得到公平陈诉的机会，同时我们还会收集所需的细节和证明材料，以便达成一个双方都能接受的解决方案。</p>
              <p><span>5.</span>在超出预订的时间范围后，如您未能及时延长预订、对后续茶室方/第三方继续使用空间造成了影响，您可能被索取罚款赔偿。</p>
              <p>小提示：</p>
              <p>如茶室内有易碎、易坏物品，请注意小心使用。</p>
              <p>如茶室内有收藏品或艺术品，如：文物、古玩、字画、摆设等，需小心使用或避免触碰。</p>
              <p>如在茶室遗漏个人物品，可联系我们协调，三里茶社会尽力帮助您找回。</p>
              <p>安全和赔偿事宜在三里茶社极少发生，无需过多担心。</p>
          </div>
        </div>
        
        <Mycomponent.Mes mes={this.state.mes} />
      </div>
    );
  }
}