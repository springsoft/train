using System;
using app.Help;
namespace app.DAl
{
    /// <summary>
    ///用户管理
    /// </summary>
    public class UserManager
    {
        /// <summary>
        /// 用户登录 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public string Login(string userName, string password)
        {
            string sql = string.Format("select id,pic,username from user where username = '{0}' and password = '{1}'", userName, MyHelp.MD5(password));//
            return MyHelp.TableRowToJson(DBHelp.GetDataTable(sql));
        }

        public string Add(string userName, string password)
        {
            int count = DBHelp.GetCountByWhere("user", string.Format("username = '{0}'", userName));
            if (count>0)
            {
                return "{success:false}";
            }
            string sql = string.Format("insert into user(username,password) values ('{0}','{1}')",userName, MyHelp.MD5(password));
            return MyHelp.GetJsonMessage(sql);
        }

        public string Update(int id, string pic)
        {
            string sql = string.Format("update user set pic = '{1}' where id = {0}", id, pic);
            return MyHelp.GetJsonMessage(sql);
        }
    }
}