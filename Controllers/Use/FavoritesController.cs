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
    public class FavoritesController : MainController
    {
        // GET: Favorites
        FavoritesService serviceFavorites;
        RoomService serviceProduct;
        public FavoritesController()
        {
            serviceFavorites = new FavoritesService(db);
            serviceProduct = new RoomService(db);
        }

        //添加
        public JsonResult Add(Enums.FavoritesType type, long contentId)
        {
            if (!serviceFavorites.IsExists(currentUser.UserId, type, contentId))
            {
                var model = new Favorites
                {
                    Type = type,
                    ContentId = contentId,
                    UserId = currentUser.UserId,
                    AddTime = DateTime.Now
                };
                serviceFavorites.Add(model);
            }
            result.code = 1;
            return Json(result);
        }

        //删除
        public JsonResult Delete(Enums.FavoritesType type, long contentId)
        {
            serviceFavorites.Delete(currentUser.UserId, type, contentId);
            result.code = 1;
            return Json(result);
        }

        //获取收藏的产品列表
        public JsonResult GetList(Table table)
        {
            table.filters["FavoritesUserId"] = currentUser.UserId;
            var list = serviceProduct.GetList(table);
            table.rows = list;
            result.data = table;
            result.code = 1;
            return Json(result);
        }
    }
}