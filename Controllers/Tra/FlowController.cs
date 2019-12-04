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
    public class FlowController : MainController
    {
        // GET: Flow
        FlowService serviceFlow;
        MoneyService serviceMoney;
        public FlowController()
        {
            serviceFlow = new FlowService(db);
            serviceMoney = new MoneyService(db);
        }

        //获取列表
        public JsonResult GetList(Table table)
        {
            table.filters["UserId"] = currentUser.UserId;
            var list = serviceFlow.GetList(table);
            table.rows = list;
            result.data = table;
            result.code = 1;
            return Json(result);
        }
    }
}