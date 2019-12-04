using SanLiChaShe.Model.Sto;
using SanLiChaShe.Service.Sto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebFrame.Utils;

namespace SanLiChaShe.Web.Controllers.Sto
{

    [Login(Anyone = true)]
    public class RoomFaultController : MainController
    {
        // GET: Room
        RoomFaultService serviceRoom;
        public RoomFaultController()
        {
            serviceRoom = new RoomFaultService(db);
        }

        //获取model
        public JsonResult GetModel(long id)
        {
            var modelPro = serviceRoom.GetModel(id);

            result.data = modelPro;
            result.code = 1;
            return Json(result);
        }

        //清扫卫生
        public JsonResult UpdateFlag(long id, int flag)
        {
            if (serviceRoom.UpdateFlag(id, flag))
            {
                result.code = 1;
            }
            else
            {
                result.code = 0;
            }
            return Json(result);
        }


        //所有商品列表
        public JsonResult GetList(Table table)
        {
            var list = serviceRoom.GetList(table);
            table.rows = list;
            result.data = table;
            result.code = 1;
            return Json(result);
        }


        public JsonResult Save(Int64 storeId, string storeName, Int64 roomId, string roomName, string description
            , string faultPic
            , string userName, string remark, DateTime startTime, DateTime endTime,int startHours,int endHours)
        {
            RoomFault rf = new RoomFault()
            {
                StoreId = storeId,
                StoreName = storeName,
                RoomId = roomId,
                RoomName = roomName,
                Description = description.Trim(),
                FaultPic = faultPic,
                UserName = userName,
                Remark = remark,
                StartTime = startTime.AddHours(startHours),
                EndTime = endTime.AddHours(endHours),
                Flag=1,
                AddTime=DateTime.Now
            };

            if (serviceRoom.Add(rf) > 0)
                result.code = 1;
            else
                result.code = 0;

            return Json(result);

        }
    }
}