using app.Help;
using MySql.Data.MySqlClient;
using System;

namespace app.DAl
{
    /// <summary>
    /// 二手物品管理
    /// </summary>
    public class UsedManager
    {
        public string List(int limit, int page)
        {
            int count = DBHelp.GetCountByWhere("used");
            if (count < 1)
            {
                return "{totalCounts:0}";
            }
            string sql = string.Format("select id,name,type from used order by id desc limit {0},{1}", limit * (page - 1), limit);
            return MyHelp.TableToJson(DBHelp.GetDataTable(sql), count);
        }

        public Message Update(int id, string name, string content)
        {
            string sql = string.Format("update used set name = '{1}',content = '{2}' where id = {0}", id, name, content);
            return MyHelp.GetMessage(sql);
        }

        public Message Add(string name, string content, int type)
        {
            MySqlParameter[] parameters = {
					new MySqlParameter("@n", MySqlDbType.String,40),
					new MySqlParameter("@c", MySqlDbType.Text),
					new MySqlParameter("@t", MySqlDbType.Int32,3)};
            parameters[0].Value = name;
            parameters[1].Value = content;
            parameters[2].Value = type;
            return MyHelp.GetMessage("usedadd", parameters,"id");
        }

        public string Delete(string ids)
        {
            string sql = string.Format("delete from used where id in ({0})", ids);
            return MyHelp.GetJsonMessage(sql);
        }


        public string One(int id)
        {
            string sql = string.Format("select content from used where id = {0}", id);
            return MyHelp.TableRowToJson(DBHelp.GetDataTable(sql));
        }
    }
}