using app.Help;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace app.DAl
{
    /// <summary>
    /// 图片管理
    /// </summary>
    public class ImgManager
    { 
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="limit"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public String List(int limit, int page)
        {
            int count = DBHelp.GetCountByWhere("imgs");
            if (count < 1)
            {
                return "{totalCounts:0}";
            }
            string sql = string.Format("select id,name,url from imgs order by id desc limit {0},{1}", limit * (page - 1), limit);
            return MyHelp.TableToJson(DBHelp.GetDataTable(sql), count);
        }
    }
}