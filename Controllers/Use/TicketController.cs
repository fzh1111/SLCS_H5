using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebFrame.Utils;
using SanLiChaShe.Model;
using SanLiChaShe.Service;
using SanLiChaShe.Service.Use;
using SanLiChaShe.Model.Use;

namespace SanLiChaShe.Web.Controllers
{
    public class TicketController : MainController
    {
        // GET: Ticket
        TicketService serviceTicket;
        UserTicketService serviceUserTicket;
        FlowService serviceFlow;

        UserTicketDetailService userTicketDetail;

        public TicketController()
        {
            serviceTicket = new TicketService(db);
            serviceUserTicket = new UserTicketService(db);
            serviceFlow = new FlowService(db);

            userTicketDetail = new UserTicketDetailService(db);
        }

        //领券
        public JsonResult Receive(int id)
        {
            if (!serviceUserTicket.IsExists(id, currentUser.UserId))
            {
                var modelTicket = serviceTicket.GetModel(id);
                var modelUserTicket = new UserTicket
                {
                    TicketId = id,
                    UserId = currentUser.UserId,
                    AddTime = DateTime.Now
                };
                try
                {
                    db.BeginTransaction();
                    if (serviceUserTicket.Add(modelUserTicket))
                    {
                        ////创建余额进账流水
                        //serviceFlow.Add(new Flow
                        //{
                        //    Currency = Enums.Currency.Balance,
                        //    Total = modelTicket.Total,
                        //    SourceType = Enums.FlowSourceType.Ticket,
                        //    SourceIds = id.ToString(),
                        //    UserId = currentUser.UserId,
                        //    AddTime = DateTime.Now,
                        //    Remark = modelTicket.TicketName
                        //});

                        ///添加优惠券生成记录  优惠券不再生成到余额
                        userTicketDetail.Add(new UserTicketDetail
                        {
                            TicketId = id,
                            Total = modelTicket.Total,
                            UserId = currentUser.UserId,
                            Status = Enums.UserTicketStatus.Valid,
                            AddTime = DateTime.Now,
                            UpdateTime = DateTime.Now
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
            }
            else
            {
                result.mes = "已领过，不能重复领取！";
            }
            return Json(result);
        }


        public JsonResult GetList(Table table)
        {
            table.filters["UserId"] = currentUser.UserId;

            var list = userTicketDetail.GetList(table);

            table.rows = list;
            result.data = table;
            result.code = 1;
            return Json(result);
        }

    }
}