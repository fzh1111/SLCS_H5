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
    //用户
    public class UserController : MainController
    {
        // GET: User
        UserService serviceUser;
        MoneyService serviceMoney;
        SMSService serviceSMS;
        public UserController()
        {
            serviceUser = new UserService(db);
            serviceMoney = new MoneyService(db);
            serviceSMS = new SMSService(redisC);
        }

        //获取当前登录信息
        public JsonResult GetLoginUser()
        {
            var modelUser = serviceUser.GetModel(currentUser.UserId);
            var modelMoney = serviceMoney.GetModel(currentUser.UserId);
            result.data = new
            {
                UserId = modelUser.UserId,
                NickName = modelUser.NickName,
                Icon = modelUser.Icon,
                Type = modelUser.Type,
                Mobile = modelUser.Mobile,
                Balance = modelMoney.Balance,
                Score = modelMoney.Score
            };
            result.code = 1;
            return Json(result);
        }

        // 发送验证码
        public JsonResult SendCode()
        {
            var modelUser = serviceUser.GetModel(currentUser.UserId);
            result = serviceSMS.SendCode(modelUser.Mobile);
            return Json(result);
        }

        //修改密码
        public JsonResult UpdatePwd(string password, string code)
        {
            if (password.Length >= 6)
            {
                var modelUser = serviceUser.GetModel(currentUser.UserId);
                if (serviceSMS.VerifyCode(modelUser.Mobile, code))
                {
                    modelUser.Password = Common.MD5(password).ToLower();
                    serviceUser.Update(modelUser);

                    result.code = 1;
                    result.mes = "修改成功";
                }
                else
                {
                    result.mes = "短信验证码错误";
                }
            }
            else
            {
                result.mes = "密码长度必须大于等于6个字符";
            }
            return Json(result);
        }

        //修改头像
        public JsonResult UpdateIcon(string icon)
        {
            var modelUser = serviceUser.GetModel(currentUser.UserId);
            modelUser.Icon = icon;
            serviceUser.Update(modelUser);
            result.code = 1;
            result.mes = "修改成功";
            return Json(result);
        }

        //修改昵称
        public JsonResult UpdateNickName(string nickName)
        {
            var modelUser = serviceUser.GetModel(currentUser.UserId);
            modelUser.NickName = nickName;
            serviceUser.Update(modelUser);
            result.code = 1;
            result.mes = "修改成功";
            return Json(result);
        }

        //退出
        public JsonResult Logout()
        {
            var cookie = Request.Cookies[Config.Cookie_Token];
            if (cookie != null)
            {
                redisC.Del(cookie.Value);
                cookie.Expires = DateTime.Now;
                Response.Cookies.Set(cookie);
            }
            result.code = 1;
            return Json(result);
        }

        //获取我的二维码
        public FileContentResult GetMyQRCode()
        {
            string url = Common.GetUrl() + "/account/ref/" + currentUser.UserId;
            return File(Common.CreateQRCode(url, serviceUser.GetModel(currentUser.UserId).Icon), @"image/jpeg");
        }

        //添加身份证
        public JsonResult AddIdCard(string realName, string idCardNo, string idCardUrl)
        {
            var model = serviceUser.GetModel(currentUser.UserId);
            if (model.IDCardStatus != Enums.AuthStatus.Succeed)
            {
                model.RealName = realName;
                model.IDCardNo = idCardNo;
                model.IDCardUrl = idCardUrl;
                model.IDCardStatus = Enums.AuthStatus.WaitAuth;
                serviceUser.Update(model);
                result.code = 1;
            }
            return Json(result);
        }

        //获取认证信息
        public JsonResult GetModelAuth()
        {
            var model = serviceUser.GetModel(currentUser.UserId);
            result.data = new
            {
                RealName = model.RealName,
                IDCardNo = model.IDCardNo,
                IDCardUrl = model.IDCardUrl,
                IDCardStatus = model.IDCardStatus
            };
            result.code = 1;
            return Json(result);
        }
    }
}