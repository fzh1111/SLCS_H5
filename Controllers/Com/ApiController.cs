using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using WebFrame.Utils;
using SanLiChaShe.Model;
using SanLiChaShe.Service;
namespace SanLiChaShe.Web.Controllers
{
    [Login(Anyone = true)]
    public class ApiController : MainController
    {
        // GET: Api
        SMSService serviceSMS;
        SecurityeService serviceSecuritye;
        UserService serviceUser;
        public ApiController()
        {
            serviceSMS = new SMSService(redisC);
            serviceSecuritye = new SecurityeService(redisC);
            serviceUser = new UserService(db);
        }

        #region 系统接口
        //清除缓存
        public bool CacheClear(string key)
        {
            return redisC.Del(key);
        }

        //上传图片
        public JsonResult Upload()
        {
            result = Common.Uploads(Config.Upload_Path, Config.Upload_Extends, Config.Upload_MaxSize);
            return Json(result);
        }

        //上传图片
        public JsonResult UploadByBase64(string base64, int width = 0, int height = 0)
        {
            result = Common.UploadByBase64(base64, Config.Upload_Path, Config.Upload_Extends, width, height);
            return Json(result);
        }
        #endregion

        #region 验证码接口
        //获取图片验证码
        public FileContentResult GetImgCode()
        {
            return File(serviceSecuritye.GetImgCode(), @"image/jpeg");
        }

        //获取图片验证码(Base64)
        public JsonResult GetImgCodeByBase64()
        {
            string key, base64;
            base64 = serviceSecuritye.GetImgCodeByBase64(out key);
            result.data = new { Key = key, Base64 = base64 }; 
            result.code = 1;
            return Json(result);
        }

        //校验图片验证码
        public JsonResult VerifyImgCode(string code)
        {
            result.data = serviceSecuritye.VerifyImgCode(code, true);
            result.code = 1;
            return Json(result);
        }

        //发送验证码(通过手机号)
        public JsonResult SendCodeByMobile(string mobile)
        {
            result = serviceSMS.SendCode(mobile);
            return Json(result);
        }

        //校验验证码
        public JsonResult VerifySmsCode(string mobile, string code)
        {
            var modelUser = serviceUser.GetModelByMobile(mobile);
            if (modelUser != null)
            {
                if (serviceSMS.VerifyCode(modelUser.Mobile, code, false))
                {
                    result.code = 1;
                }
                else
                {
                    result.mes = "验证码错误";
                }
            }
            else
            {
                result.mes = "手机号不存在";
            }
            return Json(result);
        }
        #endregion

        #region 微信接口
        //获取微信js签名
        public JsonResult GetWeChatJsSign(string url)
        {
            var dic = new SortedDictionary<string, object>();
            dic["noncestr"] = Guid.NewGuid().ToString("N");
            dic["jsapi_ticket"] = WeChatService.GetTicket(redisC).data;
            dic["timestamp"] = Common.GetTimeStamp();
            dic["url"] = url;
            string sign = Common.SHA1(Common.DicToPara(dic));
            result.data = new { appId = Config.WeChat_MP_AppID, timestamp = dic["timestamp"], nonceStr = dic["noncestr"], signature = sign };
            result.code = 1;
            return Json(result);
        }
        #endregion
    }
}