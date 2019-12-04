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
    public class MainController : Controller
    {
        public Result result;
        public DbHelperDapper db;
        public RedisHelper redisC;
        public CurrentUser currentUser;
        public MainController()
        {
            result = new Result();
            db = new DbHelperDapper();
            redisC = new RedisHelper(Config.Redis_DBNumber);
            currentUser = new AccountService(db, redisC).GetUserByToken();
            ViewData["CurrentUser"] = currentUser;
        }
        protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding)
        {
            JsonNetResult result = new JsonNetResult()
            {
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                Data = data,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return result;
        }

        protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            JsonNetResult result = new JsonNetResult()
            {
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                Data = data,
                JsonRequestBehavior = behavior
            };
            return result;
        }

        public FileContentResult Excel(string data, string fileName)
        {
            return File(System.Text.Encoding.Default.GetBytes(data), "application/ms-excel", fileName + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xls");
        }
    }
}