using SanLiChaShe.Model.Sto;
using SanLiChaShe.Service.Sto;
using SanLiChaShe.Service.Use;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebFrame.Utils;

namespace SanLiChaShe.Web.Controllers.Sto
{
    [Login(Anyone = true)]
    public class RoomCleanController : MainController
    {
        RoomCleanService serviceRoom;
        RoomCleanCodeService codeService;

        SpecialRoomService SpecialRoom;
        public RoomCleanController()
        {
            serviceRoom = new RoomCleanService(db);
            codeService = new RoomCleanCodeService(db);

            SpecialRoom = new SpecialRoomService(db);
        }


        public JsonResult GetRoomCleanCode(int storeId, string storeName, long roomId, string roomName)
        {
            RoomCleanCode rcode = codeService.GetModel(storeId, roomId);

            if (rcode == null || rcode.Id == 0)
            {
                rcode = new RoomCleanCode
                {
                    StoreId = storeId,
                    StoreName = storeName,
                    RoomId = roomId,
                    RoomName = roomName,
                    AddTime = DateTime.Now,
                    StartTime = DateTime.Now,
                    EndTime = DateTime.Now.AddMinutes(10),
                    ValidTime = 10, 
                    QrCode = Guid.NewGuid().ToString("N").ToUpper()
                };

                codeService.Add(rcode);
            }
            else
            {
                rcode.ValidTime =(int)(rcode.EndTime-DateTime.Now ).TotalMinutes;
            }

            result.data = rcode;
            result.code = 1;
            return Json(result);
        }

        public JsonResult GetSpecialRoomCode(int storeId, string storeName, long roomId, string roomName)
        {
            RoomCleanCode rcode = SpecialRoom.GetModel(storeId, roomId);

            if (rcode == null || rcode.Id == 0)
            {
                rcode = new RoomCleanCode
                {
                    StoreId = storeId,
                    StoreName = storeName,
                    RoomId = roomId,
                    RoomName = roomName,
                    AddTime = DateTime.Now,
                    StartTime = DateTime.Now,
                    EndTime = DateTime.Now.AddDays(1),
                    ValidTime = 24*60,
                    QrCode = Guid.NewGuid().ToString("N").ToUpper()
                };

                SpecialRoom.Add(rcode);
            }
            else
            {
                rcode.ValidTime = (int)(rcode.EndTime-DateTime.Now ).TotalMinutes;
            }

            result.data = rcode;
            result.code = 1;
            return Json(result);
        }



        public JsonResult GetCleanCodeList(Table table)
        {
            var list = codeService.GetList(table);

            table.rows = list;
            result.data = table;
            result.code = 1;
            return Json(result); 
        }
        public JsonResult GetRoomList(Table table)
        {
            var list = serviceRoom.GetRoomList(table);

            table.rows = list;
            result.data = table;
            result.code = 1;
            return Json(result);
        }



        public JsonResult Save(Int64 storeId, string storeName, Int64 roomId, string roomName 
            , string userName)
        {
            RoomClean rf = new RoomClean()
            {
                StoreId = storeId,
                StoreName = storeName,
                RoomId = roomId,
                RoomName = roomName, 
                UserName = userName, 
                AddTime = DateTime.Now
            };

            if (serviceRoom.Add(rf) > 0)
                result.code = 1;
            else
                result.code = 0;

            return Json(result);

        }

    }
}