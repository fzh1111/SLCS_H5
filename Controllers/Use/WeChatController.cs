using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using WebFrame.Utils;
using SanLiChaShe.Model;
using SanLiChaShe.Service;

namespace SanLiChaShe.Web
{
    [Login(Anyone = true)]
    public class WeChatController : MainController
    {
        // GET: WeChat
        UserService serviceUser;
        AccountService serviceAccount;
        public WeChatController()
        {
            serviceUser = new UserService(db);
            serviceAccount = new AccountService(db, redisC);
        }

        //跳转微信授权
        public RedirectResult Authorize()
        {
            string redirectUri = Common.GetUrl() + "/WeChat/Login/MP";
            string state = "";
            string url = string.Format("{0}?appid={1}&redirect_uri={2}&response_type=code&scope=snsapi_userinfo&state={3}#wechat_redirect",
                         Config.WeChat_MP_Authorize, Config.WeChat_MP_AppID, Server.UrlEncode(redirectUri), state);
            return new RedirectResult(url);
        }

        //获取微信账号信息
        public RedirectResult Login(string channel, string code, string state)
        {
            string weChatAppId = "", weChatAppSecret = "";
            switch (channel)
            {
                case "MP":
                    weChatAppId = Config.WeChat_MP_AppID;
                    weChatAppSecret = Config.WeChat_MP_AppSecret;
                    break;
            }
            string mes, url = string.Format("{0}?appid={1}&secret={2}&code={3}&grant_type=authorization_code", Config.WeChat_MP_AccessToken, weChatAppId, weChatAppSecret, code);
            if (Common.WebGet(url, out mes))
            {
                JObject jobj = Common.JsonDes<JObject>(mes);
                if (jobj["openid"] != null)
                {
                    string openId = jobj["openid"].ToString();
                    User weChatUser = null;
                    switch (channel)
                    {
                        case "MP":
                            weChatUser = serviceUser.GetModelByWeChatMPOpenId(openId);
                            break;
                    }
                    if (weChatUser != null)
                    {
                        currentUser = new CurrentUser
                        {
                            UserId = weChatUser.UserId,
                            Type = (int)weChatUser.Type
                        };
                    }
                    else
                    {
                        if (currentUser != null && currentUser.UserId > 0)
                        {
                            url = string.Format("{0}?access_token={1}&openid={2}&lang=zh_CN", Config.WeChat_MP_Userinfo, jobj["access_token"], openId);
                            if (Common.WebGet(url, out mes))
                            {
                                jobj = Common.JsonDes<JObject>(mes);
                                var modelUser = serviceUser.GetModel(currentUser.UserId);
                                modelUser.Sex = jobj["sex"].To<int>();
                                modelUser.NickName = jobj["nickname"].ToString();
                                modelUser.Icon = jobj["headimgurl"].ToString();
                                if (jobj["unionid"] != null)
                                {
                                    modelUser.WeChatUnionId = jobj["unionid"].ToString();
                                }
                                switch (channel)
                                {
                                    case "MP":
                                        modelUser.WeChatMPOpenId = jobj["openid"].ToString();
                                        break;
                                }
                                serviceUser.Update(modelUser);
                            }
                        }
                    }
                }
            }
            var redirectUrl = "/";
            if (currentUser != null && currentUser.UserId > 0)
            {
                serviceAccount.CreateLoginToken(currentUser);
                if (Request.Cookies.AllKeys.Contains(Config.Cookie_RedirectUrl))
                {
                    redirectUrl = Request.Cookies[Config.Cookie_RedirectUrl].Value;
                }
            }
            else
            {
                redirectUrl = Config.Login_Url;
            }
            return new RedirectResult(redirectUrl);
        }
    }
}