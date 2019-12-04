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
    public class CommentController : MainController
    {
        // GET: Comment
        CommentService serviceComment;
        OrderService serviceOrder;
        OrderDetailService serviceDetail;
        public CommentController()
        {
            serviceComment = new CommentService(db);
            serviceDetail = new OrderDetailService(db);
            serviceOrder = new OrderService(db);
        }

        //添加评论
        public JsonResult Add(Comment model)
        {
            var modelDetailDto = serviceDetail.GetListDtoByOrderId(model.OrderId);
            model.RoomId = modelDetailDto[0].RoomId;
            model.UserId = currentUser.UserId;
            model.AddTime = DateTime.Now;
            serviceComment.Add(model);
            serviceOrder.UpdateStatus(model.OrderId, Enums.OrderStatus.CommentEnd, Enums.OrderStatus.WaitComment);
            result.code = 1;
            return Json(result);
        }
    }
}