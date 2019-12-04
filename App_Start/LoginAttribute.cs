using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebFrame.Utils;
using SanLiChaShe.Model;
using SanLiChaShe.Service;
namespace SanLiChaShe.Web
{
    public class LoginAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// 是否不验证登录
        /// </summary>
        public bool Anyone { get; set; }

        /// <summary>
        /// 用户类型
        /// </summary>
        public string UserTypes { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var request = filterContext.HttpContext.Request;
            var redirectUrl = string.Empty;
            if (!Config.IsMaintain)
            {
                if (!Anyone)
                {
                    CurrentUser currentUser = filterContext.Controller.ViewData["CurrentUser"] as CurrentUser;
                    string currentUrl = request.Url.ToString();
                    if (currentUser != null && currentUser.UserId > 0 && (UserTypes.IsNullOrEmpty() || UserTypes.Split(',').Contains(currentUser.Type.ToString())))
                    {
                    }
                    else
                    {
                        if (Common.IsWeChatBrowser())
                        {
                            redirectUrl = Config.Login_WeChat;
                        }
                        else
                        {
                            redirectUrl = Config.Login_Url;
                        }
                    }
                }
            }
            else if (!request.Path.Contains(Config.Maintain_Url.Trim('/')))
            {
                redirectUrl = Config.Maintain_Url;
            }
            if (redirectUrl.IsNotNullOrEmpty())
            {
                if (request.HttpMethod.ToLower().Equals("post"))
                {
                    var result = new Result { code = -1, data = redirectUrl };
                    filterContext.Result = new JsonNetResult { Data = result };
                }
                else
                {
                    filterContext.Result = new RedirectResult(redirectUrl);
                }
            }
        }
    }
}