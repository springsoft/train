using app.Help;
using System;
namespace app.DAl
{
    /// <summary>
    /// 影院管理
    /// </summary>
    public class CinemaManager
    {
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <returns></returns>
        public String List()
        {
            string sql = "select id,city,address,title,phonenumber,lat,lng from cinema";
            return MyHelp.TableToJson(DBHelp.GetDataTable(sql));
        }
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="city"></param>
        /// <param name="address"></param>
        /// <param name="title"></param>
        /// <param name="phonenumber"></param>
        /// <param name="lat"></param>
        /// <param name="lng"></param>
        /// <returns></returns>
        public string Add(string city, string address, string title, string phonenumber, string lat, string lng)
        {
            int count = DBHelp.GetCountByWhere("cinema", string.Format("lat = '{0}' and lng = '{1}' ", lat, lng));
            if (count > 0)
            {
                return "{success:false}";
            }
            string sql = string.Format("insert into cinema(city,address,title,phonenumber,lat,lng) values ('{0}','{1}','{2}','{3}','{4}',{5})", city, address, title, phonenumber, lat, lng);
            return MyHelp.GetJsonMessage(sql);
        }
    }
}