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
    public class DiscountController : MainController
    {
        // GET: Discount
        DiscountService serviceDiscount;
        public DiscountController()
        {
            serviceDiscount = new DiscountService(db);
        }

        //获取列表
        public JsonResult GetListByRoomId(int id)
        {
            var list = serviceDiscount.GetListByRoomId(id);
            result.data = list;
            result.code = 1;
            return Json(result);
        }
    }
}