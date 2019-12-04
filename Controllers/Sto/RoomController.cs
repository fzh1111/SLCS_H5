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
    public class RoomController : MainController
    {
        // GET: Room
        RoomService serviceRoom;
        FavoritesService serviceFavorites;
        OrderDetailService serviceDetail;
        public RoomController()
        {
            serviceRoom = new RoomService(db);
            serviceFavorites = new FavoritesService(db);
            serviceDetail = new OrderDetailService(db);
        }

        //获取model
        public JsonResult GetModel(long id)
        {
            var modelPro = serviceRoom.GetModel(id);
            var listDetail = serviceDetail.GetListByRoomId(id);



            modelPro.ReserveTimes = listDetail.Select(item => item.ReserveTime).ToList();
            if (currentUser != null)
            {
                modelPro.HasFavorites = serviceFavorites.IsExists(currentUser.UserId, Enums.FavoritesType.Room, id);
            }

            var listMidNight = serviceDetail.GetListByRoomId(id, modelPro.Mid_StartTime, modelPro.Mid_EndTime);



            modelPro.MidNightTimes = new List<DateTime> { };

            if (listMidNight != null && listMidNight.Count > 0)
            { 
                DateTime MaxReserveTime = listMidNight.Max(t => t.ReserveTime);

                if (modelPro.CleanTime < MaxReserveTime)
                {
                    if (DateTime.Now.Hour >= modelPro.Mid_StartTime)
                    {
                        for (int i = DateTime.Now.Hour; i < 24; i++)
                        {
                            modelPro.MidNightTimes.Add(DateTime.Now.Date.AddHours(i));
                            modelPro.MidNightTimes.Add(DateTime.Now.Date.AddHours(i).AddMinutes(30));
                        }

                        for (int i = 0; i < modelPro.Mid_EndTime; i++)
                        {
                            modelPro.MidNightTimes.Add(DateTime.Now.Date.AddDays(1).AddHours(i));
                            modelPro.MidNightTimes.Add(DateTime.Now.Date.AddDays(1).AddHours(i).AddMinutes(30));
                        }
                    }
                    else if (DateTime.Now.Hour <= modelPro.Mid_EndTime)
                    {
                        for (int i = 0; i < modelPro.Mid_EndTime; i++)
                        {
                            modelPro.MidNightTimes.Add(DateTime.Now.Date.AddHours(i));
                            modelPro.MidNightTimes.Add(DateTime.Now.Date.AddHours(i).AddMinutes(30));
                        }
                    }
                }
            }
            modelPro.MidNightTimes = new List<DateTime> { };
            result.data = modelPro;
            result.code = 1;
            return Json(result);
        }

        public JsonResult GetModelTime(long id,int isnew)
        {
            var modelPro = serviceRoom.GetModel(id);
            var listDetail = serviceDetail.GetListByRoomId(id);



            modelPro.ReserveTimes = listDetail.Select(item => item.ReserveTime).ToList();
            if (currentUser != null)
            {
                modelPro.HasFavorites = serviceFavorites.IsExists(currentUser.UserId, Enums.FavoritesType.Room, id);
            }

            var listMidNight = serviceDetail.GetListByRoomId(id, modelPro.Mid_StartTime, modelPro.Mid_EndTime);



            modelPro.MidNightTimes = new List<DateTime> { };
            if (isnew != 1)
            {
                if (listMidNight != null && listMidNight.Count > 0)
                {
                    DateTime MaxReserveTime = listMidNight.Max(t => t.ReserveTime);

                    if (modelPro.CleanTime < MaxReserveTime)
                    {
                        if (DateTime.Now.Hour >= modelPro.Mid_StartTime)
                        {
                            for (int i = DateTime.Now.Hour; i < 24; i++)
                            {
                                modelPro.MidNightTimes.Add(DateTime.Now.Date.AddHours(i));
                                modelPro.MidNightTimes.Add(DateTime.Now.Date.AddHours(i).AddMinutes(30));
                            }

                            for (int i = 0; i < modelPro.Mid_EndTime; i++)
                            {
                                modelPro.MidNightTimes.Add(DateTime.Now.Date.AddDays(1).AddHours(i));
                                modelPro.MidNightTimes.Add(DateTime.Now.Date.AddDays(1).AddHours(i).AddMinutes(30));
                            }
                        }
                        else if (DateTime.Now.Hour <= modelPro.Mid_EndTime)
                        {
                            for (int i = 0; i < modelPro.Mid_EndTime; i++)
                            {
                                modelPro.MidNightTimes.Add(DateTime.Now.Date.AddHours(i));
                                modelPro.MidNightTimes.Add(DateTime.Now.Date.AddHours(i).AddMinutes(30));
                            }
                        }
                    }
                }

            }

            result.data = modelPro;
            result.code = 1;
            return Json(result);
        }
        //清扫卫生
        public JsonResult UpdateIsClean(long id, int flag)
        {
            if (serviceRoom.UpdateIsClean(id, flag))
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
    }
}