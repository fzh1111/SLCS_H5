using System;
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
    //支付
    public class PayController : MainController
    {
        // GET: Pay
        PayService servicePay;
        OrderService serviceOrder;
        RechargeService serviceRecharge;
        UserService serviceUser;
        MoneyService serviceMoney;

        UserTicketDetailService userTicket;
        public PayController()
        {
            servicePay = new PayService(db);
            serviceOrder = new OrderService(db);
            serviceRecharge = new RechargeService(db);
            serviceUser = new UserService(db);
            serviceMoney = new MoneyService(db);

            userTicket = new UserTicketDetailService(db);
        }

        //创建支付请求
        public ActionResult Add(Enums.PayType payType, Enums.PaySourceType sourceType, string sourceIds)
        {
            var modelPay = new Pay
            {
                PayNo = Common.CreateNo(),
                UserId = currentUser.UserId,
                PayType = payType,
                Status = Enums.PayStatus.Wait,
                SourceType = sourceType,
                SourceIds = sourceIds,
                AddTime = DateTime.Now,
                LastTime = DateTime.Now
            };
            var isWaitPay = false;
            switch (sourceType)
            {
                case Enums.PaySourceType.RechargeBalance:
                    var modelRecharge = serviceRecharge.GetModel(sourceIds.To<long>());
                    modelPay.Total = modelRecharge.Total;
                    modelPay.Remark = "充值";
                    isWaitPay = modelRecharge.Status == Enums.RechargeStatus.Wait;
                    break;
                case Enums.PaySourceType.Order:
                    var listOrder = serviceOrder.GetListByOrderIds(modelPay.SourceIds);
                    modelPay.Total = listOrder.Sum(s => s.Total);
                    modelPay.Remark = "订单:" + string.Join(",", listOrder.Select(s => s.OrderNo));
                    isWaitPay = listOrder[0].Status == Enums.OrderStatus.WaitPay;
                    break;
            }
            if (isWaitPay)
            {
                modelPay.PayId = servicePay.Add(modelPay);
                if (modelPay.Total > 0 && !Config.IsTest)
                {
                    //调用支付接口
                    switch (payType)
                    {
                        case Enums.PayType.WeChatMP:
                            var modelUser = serviceUser.GetModel(modelPay.UserId);

                            if (modelUser.WeChatMPOpenId == null || modelUser.WeChatMPOpenId.Length < 1)
                                result.mes = "请先关注公众号【三里茶社】！";
                            else
                            {
                                result = WeChatService.PayByMP(modelPay.PayNo, modelPay.Total, modelUser.WeChatMPOpenId, modelPay.Remark);
                            }
                            break;
                        case Enums.PayType.Balance:
                            if (serviceMoney.GetModel(currentUser.UserId).Balance >= modelPay.Total)
                            {
                                if (servicePay.PayComplete(modelPay))
                                {
                                    result.data = Config.Pay_SuccessUrl;
                                    result.code = -1;
                                }
                                else
                                {
                                    result.mes = "余额不足";
                                }
                            }
                            else
                            {
                                result.mes = "余额不足";
                            }
                            break;
                    }
                }
                else
                {
                    if (servicePay.PayComplete(modelPay))
                    {
                        result.data = Config.Pay_SuccessUrl;
                        result.code = -1;
                    }
                    else
                    {
                        result.mes = "余额不足";
                    }
                }


                //支付完成后，更新订单使用的优惠券状态  201909
                if (sourceType == Enums.PaySourceType.Order && result.code==-1)
                {
                    var listOrder = serviceOrder.GetListByOrderIds(modelPay.SourceIds);

                    foreach (var roder in listOrder)
                    {
                        if (roder.OrderTicketId > 0)
                            userTicket.UpdateStatus(roder.OrderTicketId, 2, currentUser.UserId);
                    }
                }

            }
            else
            {
                result.mes = "订单已支付成功，请勿重复支付";
            }



            return Json(result);
        }
    }
}