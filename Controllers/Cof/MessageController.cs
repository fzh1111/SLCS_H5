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
    [Login(Anyone = true)]
    public class MessageController : MainController
    {
        // GET: Message
        MessageService serviceMessage;
        MessageUserService serviceMessageUser;
        public MessageController()
        {
            serviceMessage = new MessageService(db);
            serviceMessageUser = new MessageUserService(db);
        }

        //获取公告列表
        public JsonResult GetListNotice(Table table)
        {
            table.filters["Type"] = Enums.MessageType.Notice;
            var list = serviceMessage.GetList(table);
            table.rows = list;
            result.data = table;
            result.code = 1;
            return Json(result);
        }

        //获取消息列表
        public JsonResult GetListMes(Table table)
        {
            if (currentUser != null)
            {
                table.filters["UserId"] = currentUser.UserId;
                var list = serviceMessage.GetListByUserId(table);
                table.rows = list;
                result.data = table;
                result.code = 1;
            }
            else
            {
                result.mes = "未登录";
            }
            return Json(result);
        }

        //获取Model
        public JsonResult GetModel(long id)
        {
            bool hasAuth = true;
            var model = serviceMessage.GetModel(id);
            if (model.Type == Enums.MessageType.Mes)
            {
                if (currentUser != null && serviceMessageUser.IsExists(id, currentUser.UserId))
                {
                    serviceMessageUser.UpdateIsRead(id, currentUser.UserId, true);
                }
                else
                {
                    hasAuth = false;
                }
            }
            if (hasAuth)
            {
                result.data = model;
                result.code = 1;
            }
            return Json(result);
        }

        //修改为已读
        public JsonResult UpdateIsRead(long id)
        {
            if (currentUser != null)
            {
                if (serviceMessageUser.UpdateIsRead(id, currentUser.UserId, true))
                {
                    result.code = 1;
                }
            }
            else
            {
                result.mes = "未登录";
            }
            return Json(result);
        }
    }
}