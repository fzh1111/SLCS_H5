using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebFrame.Utils;
using SanLiChaShe.Model;
using SanLiChaShe.Service;

namespace SanLiChaShe.Web.Controllers
{
    [Login(Anyone = true)]
    public class NotifyController : MainController
    {
        // GET: Notify
        PayService servicePay;
        public NotifyController()
        {
            servicePay = new PayService(db);
        }

        //微信支付结果通知地址
        public string Wechat()
        {
            var dicResult = new SortedDictionary<string, object>();
            dicResult["return_code"] = "FAIL";
            using (StreamReader inputReade = new StreamReader(Request.InputStream))
            {
                string xml = inputReade.ReadToEnd();
                LogHelper.WriteInfo(xml);
                var dic = WeChatService.FromXml(xml);
                if (dic.ContainsKey("out_trade_no"))
                {
                    string payNo = dic["out_trade_no"].ToString();
                    var modelPay = servicePay.GetModelByPayNo(payNo);
                    if (WeChatService.Query(payNo, modelPay.PayType))
                    {
                        if (servicePay.PayComplete(modelPay))
                        {
                            dicResult["return_code"] = "SUCCESS";
                        }
                    }
                }
            }
            return WeChatService.ToXml(dicResult);
        }


        //微信退款结果通知地址
        public string WechatRefund()
        {
            var dicResult = new SortedDictionary<string, object>();
            dicResult["return_code"] = "FAIL";
            using (StreamReader inputReade = new StreamReader(Request.InputStream))
            {
                string xml = inputReade.ReadToEnd();
                LogHelper.WriteInfo(xml);
                var dic = WeChatService.FromXml(xml);
                if (dic["return_code"].ToString() == "SUCCESS")
                {
                    var info = dic["req_info"].ToString();
                    xml = Common.DecryptAES(info, Common.MD5(Config.WeChat_MP_Key).ToLower());
                    dic = WeChatService.FromXml(xml);
                    if (dic["refund_status"].ToString() == "SUCCESS")
                    {
                        var modelRefund = servicePay.GetModelByPayNo(dic["out_refund_no"].ToString());
                        servicePay.UpdateStatus(modelRefund.PayId, Enums.PayStatus.Success, Enums.PayStatus.Wait);
                        dicResult["return_code"] = "SUCCESS";
                    }
                }
            }
            return WeChatService.ToXml(dicResult);
        }
    }
}