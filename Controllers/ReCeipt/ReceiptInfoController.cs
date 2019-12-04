using SanLiChaShe.Model;
using SanLiChaShe.Model.ReCeipt;
using SanLiChaShe.Service.ReCeipt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebFrame.Utils;

namespace SanLiChaShe.Web.Controllers.ReCeipt
{
    [Login(Anyone = true)]
    public class ReceiptInfoController : MainController
    {

        // GET: Room
        ReceiptInfoService serviceRoom;

        public ReceiptInfoController()
        {
            serviceRoom = new ReceiptInfoService(db);
        }

        public JsonResult GetOrderList(Table table)
        {
            table.filters["UserId"] = currentUser.UserId;
            var list = serviceRoom.GetOrderList(table);
            table.rows = list;
            result.data = table;
            result.code = 1;
            return Json(result);
        }


        public JsonResult GetList(Table table)
        {
            table.filters["UserId"] = currentUser.UserId;
            var list = serviceRoom.GetList(table);
            table.rows = list;
            result.data = table;
            result.code = 1;
            return Json(result);
        }






        public JsonResult Save(string ReceiptName, string ReceiptNo, string ReceiverTel, string ReceiverEmail, string OrderIds,
            decimal ReceiptAmount, int ReceiptType, string Remark)
        {
            if (currentUser == null)
            {
                result.code = 0;
                result.mes = "当前没有登录，请登录后再试！";
            }
            else
            {

                ReCeiptInfo rf = new ReCeiptInfo()
                {
                    ReceiptName = ReceiptName,
                    UserId = currentUser.UserId,
                    ReceiptNo = ReceiptNo,
                    ReceiverTel = ReceiverTel,
                    ReceiverEmail = ReceiverEmail,
                    OrderIds = OrderIds.Trim(),
                    ReceiptAmount = ReceiptAmount,
                    ReceiptType = (Enums.ReceiptType)ReceiptType,
                    Remark = Remark,
                    AddTime = DateTime.Now
                };

                if (serviceRoom.Add(rf) > 0)
                {
                    result.code = 1;
                    result.mes = "保存成功！";
                }
                else
                {
                    result.code = 0;
                    result.mes = "保存失败，请重试！";
                }
            }
            return Json(result);

        }



    }
}