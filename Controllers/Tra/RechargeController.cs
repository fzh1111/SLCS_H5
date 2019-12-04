using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebFrame.Utils;
using SanLiChaShe.Model;
using SanLiChaShe.Service;

namespace SanLiChaShe.Web.Controllers
{
    public class RechargeController : MainController
    {
        // GET: Recharge
        RechargeService serviceRecharge;
        public RechargeController()
        {
            serviceRecharge = new RechargeService(db);
        }

        //充值
        public JsonResult Add(decimal total)
        {
            if (total >= 1)
            {
                long rechargeId = serviceRecharge.Add(new Recharge
                {
                    Total = total,
                    UserId = currentUser.UserId,
                    Status = Enums.RechargeStatus.Wait,
                    AddTime = DateTime.Now,
                    LastTime = DateTime.Now
                });
                result.code = 1;
                result.data = rechargeId;
            }
            else
            {
                result.mes = "金额不能少于1";
            }
            return Json(result);
        }

        //获取model
        public JsonResult GetModel(long id)
        {
            var model = serviceRecharge.GetModel(id);
            if (model.UserId == currentUser.UserId)
            {
                result.data = model;
                result.code = 1;
            }
            return Json(result);
        }

        //获取列表
        public JsonResult GetList(Table table)
        {
            table.filters["UserId"] = currentUser.UserId;
            var list = serviceRecharge.GetList(table);
            table.rows = list;
            result.data = table;
            result.code = 1;
            return Json(result);
        }
    }
}