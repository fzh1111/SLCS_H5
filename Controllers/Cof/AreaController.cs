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
    public class AreaController : MainController
    {
        // GET: Area
        AreaService serviceArea;
        public AreaController()
        {
            serviceArea = new AreaService(db);
        }

        //列表
        public JsonResult GetList(int id)
        {
            var list = serviceArea.GetListByParentId(id);
            result.data = list;
            result.code = 1;
            return Json(result);
        }
    }
}