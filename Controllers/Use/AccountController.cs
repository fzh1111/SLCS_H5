using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebFrame.Utils;
using SanLiChaShe.Model;
using SanLiChaShe.Service;

namespace SanLiChaShe.Web.Controllers
{
    //登录注册相关
    [Login(Anyone = true)]
    public class AccountController : MainController
    {
        // GET: Account
        UserService serviceUser;
        AccountService serviceAccount;
        SMSService serviceSMS;
        SecurityeService serviceSecuritye;
        public AccountController()
        {
            serviceUser = new UserService(db);
            serviceAccount = new AccountService(db, redisC);
            serviceSMS = new SMSService(redisC);
            serviceSecuritye = new SecurityeService(redisC);
        }

        //登录页
        public ActionResult Index()
        {
            return View();
        }

        //注册&登录
        public JsonResult RegisterLogin(string mobile, string code)
        {
            //获取推荐人
            long referrerId = 0;
            var cookieReferrer = Request.Cookies[Config.Cookie_ReferrerId];
            if (cookieReferrer != null)
            {
                referrerId = cookieReferrer.Value.To<long>();
            }
            else
            {//兼容 header中传相关参数的处理
                var headerReferrer = Request.Headers[Config.Cookie_ReferrerId];
                referrerId = headerReferrer.To<long>();
            }
          
            if (Common.IsMobile(mobile))
            {
                if (serviceSMS.VerifyCode(mobile, code))
                {
                    var modelUser = serviceUser.GetModelByMobile(mobile);
                    if (modelUser == null)//新用户
                    {
                        modelUser = new User
                        {
                            Mobile = mobile,
                            NickName = Common.Hide(mobile, 3, 4),
                            Icon = Config.Icon_DefaultUrl,
                            Type = Enums.UserType.Member,
                            IsAction = true,
                            AddTime = DateTime.Now
                        };
                        //创建帐号
                        modelUser.UserId = serviceUser.Add(modelUser);
                        //绑定推荐人
                        if (referrerId > 0)
                        {
                            serviceUser.UpdateReferrerId(modelUser.UserId, referrerId, out string mes);
                        }
                    }
                    //创建登录信息
                    var currentUser = new CurrentUser { UserId = modelUser.UserId, Type = (int)modelUser.Type };
                    serviceAccount.CreateLoginToken(currentUser);
                    result.code = -1;
                    if (Common.IsWeChatBrowser() && modelUser.WeChatMPOpenId.IsNullOrEmpty())
                    {
                        result.data = Config.Login_WeChat;
                    }
                    else
                    {
                        result.code = 1;
                        if (Request.Cookies.AllKeys.Contains(Config.Cookie_RedirectUrl))
                        {
                            result.data = Request.Cookies[Config.Cookie_RedirectUrl].Value;
                        }
                        else if (Request.Headers.AllKeys.Contains(Config.Cookie_RedirectUrl))
                        { //兼容 header中传相关参数的处理
                                result.data = Request.Headers[Config.Cookie_RedirectUrl];
                        }
                        else
                        {
                            result.data = "/";
                        }
                    }
                }
                else
                {
                    result.mes = "短信验证码错误";
                }
            }
            else
            {
                result.mes = "手机号格式错误";
            }
            return Json(result);
        }

        //绑定推荐人
        public RedirectResult Ref(long id)
        {
            Response.Cookies.Add(new HttpCookie(Config.Cookie_ReferrerId, id.ToString()));
            return new RedirectResult(Config.Login_Url);
        }
    }
}