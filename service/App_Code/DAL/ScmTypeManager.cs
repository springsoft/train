using System;
using app.Help;
using MySql.Data.MySqlClient;
namespace app.DAl
{
    /// <summary>
    ///二手物品类型管理
    /// </summary>
    public class ScmTypeManager
    {
        public string List()
        {
            string sql = string.Format("select id,name from scmtype order by id desc");
            return MyHelp.TableToJson(DBHelp.GetDataTable(sql));
        }

        public Message Update(int id, string name)
        {
            string sql = string.Format("update scmtype set name = '{1}' where id = {0}", id, name);
            return MyHelp.GetMessage(sql);
        }

        public Message Add(string name)
        {
            MySqlParameter[] parameters = {
					new MySqlParameter("@n", MySqlDbType.String,40)};
            parameters[0].Value = name;
            return MyHelp.GetMessage("scmtypeadd", parameters, "id");
        }

        public string Delete(int id)
        {
            //int count = DBHelp.GetCountByWhere("used", string.Format("type = {0}", id));
            //if (count>0)
            //{
            //    return "{success:false,message:'此类型已被使用,不能删除!'}";
            //}
            string sql = string.Format("delete from scmtype where id = {0}", id);
            return MyHelp.GetJsonMessage(sql);
        }
    }
}