using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebFrame.Utils;
using SanLiChaShe.Model;
using SanLiChaShe.Service;
using SanLiChaShe.Service.Use;

namespace SanLiChaShe.Web.Controllers
{
    public class OrderController : MainController
    {
        // GET: Order
        OrderService serviceOrder;
        OrderDetailService serviceDetail;
        RoomService serviceRoom;
        MoneyService serviceMoney;
        FlowService serviceFlow;
        DiscountService serviceDiscount;
        PayService servicePay;

        UserTicketDetailService UserTicketDetail;
        //实例化
        public OrderController()
        {
            serviceOrder = new OrderService(db);
            serviceDetail = new OrderDetailService(db);
            serviceRoom = new RoomService(db);
            serviceMoney = new MoneyService(db);
            serviceFlow = new FlowService(db);
            serviceDiscount = new DiscountService(db);
            servicePay = new PayService(db);
            UserTicketDetail = new UserTicketDetailService(db);
        }

        #region 订单操作
        //创建订单
        public JsonResult Add(Order model)
        {
            var listDetail = new List<OrderDetail>();
            var total = 0M;
            foreach (var item in model.Items)
            {
                var modelRoom = serviceRoom.GetModel(item.RoomId);
                if (item.TotalHour >= 1)
                {
                    total = total + (decimal)item.TotalHour * modelRoom.Price;
                    foreach (var reserveTime in item.ReserveTimes)
                    {
                        listDetail.Add(new OrderDetail { RoomId = item.RoomId, ReserveTime = reserveTime, Status = Enums.TimeStatus.Reserve });
                    }
                }
            }
            if (model.Type == Enums.OrderType.Renew)
            {
                listDetail[0].Status = Enums.TimeStatus.Renew;
                var modelRoom = serviceRoom.GetModel(model.Items[0].RoomId);
                total = total * modelRoom.RenewDiscount;
            }
            else
            {
                var listDiscount = serviceDiscount.GetListByRoomId(model.Items[0].RoomId);
                listDiscount = listDiscount.Where(item => total >= item.FullTotal).ToList();
                if (listDiscount.Count > 0)
                {
                    var subtract = listDiscount.Max(item => item.Subtract);
                    if (total > subtract)
                    {
                        total = total - subtract;
                    }
                }
            }
            model.OrderNo = Common.CreateNo();
            model.OpenCode = Guid.NewGuid().ToString("N").ToUpper();
            model.Total = total;
            model.UserId = currentUser.UserId;
            model.Status = Enums.OrderStatus.WaitPay;
            model.AddTime = DateTime.Now;
            model.LastTime = DateTime.Now;
            model.OrderTicketId = 0;
            try
            {
                db.BeginTransaction();
                model.OrderId = serviceOrder.Add(model);//创建订单
                foreach (var item in listDetail)
                {
                    item.OrderId = model.OrderId;
                    serviceDetail.Add(item);//创建订单明细
                }
                db.CommitTransaction();
                result.data = new { OrderIds = model.OrderId.ToString(), Total = model.Total };
                result.code = 1;
            }
            catch (Exception ex)
            {
                db.RollbackTransaction();
                LogHelper.WriteException(ex);
                result.mes = "该时间段已被预订";
            }
            return Json(result);
        }

        //取消订单
        public JsonResult Cancel(long id)
        {
            var modelOrder = serviceOrder.GetModel(id);
            if (modelOrder.UserId == currentUser.UserId)
            {
                try
                {
                    db.BeginTransaction();
                    serviceOrder.Delete(id);
                    serviceDetail.DeleteByOrderId(id);
                    db.CommitTransaction();
                    result.code = 1;
                }
                catch (Exception ex)
                {
                    db.RollbackTransaction();
                    result.mes = ex.Message;
                }
            }
            return Json(result);
        }

        //退款
        public JsonResult Refund(long id)
        {
            var modelOrder = serviceOrder.GetModel(id);
            if (modelOrder.UserId == currentUser.UserId)
            {
                modelOrder.Items = serviceDetail.GetListDtoByOrderId(id);
                var minTime = modelOrder.Items[0].ReserveTimes.Min();
                if (modelOrder.Status == Enums.OrderStatus.Unused && minTime > DateTime.Now.AddMinutes(30))
                {
                    //获取支付订单
                    var modelPay = servicePay.GetModelBySourceId(Enums.PaySourceType.Order, id);
                    //创建退款订单
                    var modelRefund = new Pay
                    {
                        PayNo = Common.CreateNo(),
                        UserId = currentUser.UserId,
                        PayType = Enums.PayType.Refund,
                        Total = modelOrder.Total * -1,
                        Status = Enums.PayStatus.Wait,
                        SourceType = Enums.PaySourceType.Order,
                        SourceIds = id.ToString(),
                        Remark = "订单:" + modelOrder.OrderNo,
                        AddTime = DateTime.Now,
                        LastTime = DateTime.Now
                    };
                    try
                    {
                        db.BeginTransaction();
                        //修改订单状态
                        serviceOrder.UpdateStatus(id, Enums.OrderStatus.Refund, Enums.OrderStatus.Unused);
                        serviceDetail.UpdateStatusByOrderId(id, id * -1);
                        modelRefund.PayId = servicePay.Add(modelRefund);
                        if (modelPay.PayType == Enums.PayType.Balance)
                        {
                            //修改退款状态
                            servicePay.UpdateStatus(modelRefund.PayId, Enums.PayStatus.Success, Enums.PayStatus.Wait);
                            //创建余额进账流水
                            serviceFlow.Add(new Flow
                            {
                                Currency = Enums.Currency.Balance,
                                Total = modelOrder.Total,
                                SourceType = Enums.FlowSourceType.Consume,
                                SourceIds = modelRefund.PayId.ToString(),
                                UserId = modelRefund.UserId,
                                AddTime = DateTime.Now,
                                Remark = "退款编号:" + modelRefund.PayNo
                            });
                        }
                        db.CommitTransaction();
                        result.code = 1;
                    }
                    catch (Exception ex)
                    {
                        db.RollbackTransaction();
                        result.mes = ex.Message;
                    }
                    if (result.code == 1)
                    {
                        //调用退款接口
                        if (modelPay.PayType == Enums.PayType.WeChatMP)
                        {
                            WeChatService.Refund(modelPay.PayNo, modelRefund.PayNo, modelPay.Total, modelRefund.Total * -1);
                        }
                    }
                }
                else
                {
                    result.mes = "订单开始前的30之前才可退款！";
                }
            }
            return Json(result);
        }

        //更新订单 优惠券 201909
        public JsonResult UpdateTicket(long id, long ticketId)
        {
            result.code = -2;

            if (!UserTicketDetail.IsValid(ticketId, currentUser.UserId))
            {
                var ticket = UserTicketDetail.GetModelById(ticketId, currentUser.UserId);

                if (ticket.Status == (Enums.UserTicketStatus)1)

                    if (serviceOrder.UpdateTicket(id, ticketId, ticket.Total))
                        result.code = 1;
            }
            return Json(result);
        }

            #endregion

            #region 订单查询
            public JsonResult GetModel(long id)//订单详情
        {
            var model = serviceOrder.GetModel(id);
            if (model.UserId == currentUser.UserId)
            {
                model.Items = serviceDetail.GetListDtoByOrderId(model.OrderId);
                result.data = model;
                result.code = 1;
            }
            return Json(result);
        }

        public JsonResult GetList(Table table) //订单列表
        {
            table.filters["UserId"] = currentUser.UserId;
            if (table.filters.IsNotNullOrEmpty("ArrStatusStr"))
            {
                table.filters["ArrStatus"] = Array.ConvertAll(table.filters["ArrStatusStr"].ToString().Split(','), item => item.To<int>());
            }
            var list = serviceOrder.GetList(table);
            table.filters["ArrStatus"] = null;
            foreach (var item in list)
            {
                item.Items = serviceDetail.GetListDtoByOrderId(item.OrderId);
            }
            table.rows = list;
            result.code = 1;
            result.data = table;
            return Json(result);
        }

        [Login(Anyone = true)]
        public JsonResult GetModelByOpenCode(string code)//订单详情
        {
            var model = serviceOrder.GetModelByOpenCode(code);
            model.Items = serviceDetail.GetListDtoByOrderId(model.OrderId);
            result.data = model;
            result.code = 1;
            return Json(result);
        }
        #endregion
    }
}