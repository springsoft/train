using app.Help;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;
using System;

namespace app.DAl
{
    /// <summary>
    ///职位管理
    /// </summary>
    public class JobManager
    {
        /// <summary>
        /// 获取职位列表
        /// </summary>
        /// <param name="limit"></param>
        /// <param name="page"></param>
        /// <returns></returns>
        public String List(int limit, int page)
        {
            int count = DBHelp.GetCountByWhere("job");
            if (count < 1)
            {
                return "{totalCounts:0}";
            }
            string sql = "select id,company_id,jobs_name,education_cn,experience_cn,district_cn,companyname,wage_cn,DATE_FORMAT(refreshtime,'%Y-%m-%d') as refreshtime from job";
            sql += string.Format(" order by refreshtime desc limit {0},{1}", limit * (page - 1), limit);
            return MyHelp.TableToJson(DBHelp.GetDataTable(sql), count);
        }
        /// <summary>
        /// 获取职位详细
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public String One(int id)
        {
            string sql = "select click,amount,nature_cn,sex_cn,tag,contents,telephone,contact from job";
            sql += string.Format(" where id = {0}", id);
            return MyHelp.TableRowToJson(DBHelp.GetDataTable(sql));
        }

        public Message Add(int cid, string jname, string education, string experience, string district, string cname, string wage, string rtime, int click, int amount, string nature, string sex, string tag, string cont, string tel, string contact)
        {
            MySqlParameter[] parameters = {
					new MySqlParameter("@cid", MySqlDbType.Int32),
					new MySqlParameter("@jname", MySqlDbType.VarChar,100),
                    new MySqlParameter("@education", MySqlDbType.VarChar,100),
                    new MySqlParameter("@experience", MySqlDbType.VarChar,100),
                    new MySqlParameter("@district", MySqlDbType.VarChar,100),
                    new MySqlParameter("@cname", MySqlDbType.VarChar,100),
                    new MySqlParameter("@wage", MySqlDbType.VarChar,100),
                    new MySqlParameter("@rtime", MySqlDbType.DateTime),
                    new MySqlParameter("@click", MySqlDbType.Int32),
                    new MySqlParameter("@amount", MySqlDbType.Int32),
                    new MySqlParameter("@nature", MySqlDbType.VarChar,100),
                    new MySqlParameter("@sex", MySqlDbType.VarChar,100),
                    new MySqlParameter("@tag", MySqlDbType.VarChar,100),
                    new MySqlParameter("@cont", MySqlDbType.Text),
                    new MySqlParameter("@tel", MySqlDbType.VarChar,100),
					new MySqlParameter("@contact", MySqlDbType.VarChar,100)};
            parameters[0].Value = cid;
            parameters[1].Value = jname;
            parameters[2].Value = education;
            parameters[3].Value = experience;
            parameters[4].Value = district;
            parameters[5].Value = cname;
            parameters[6].Value = wage;
            parameters[7].Value = rtime;
            parameters[8].Value = click;
            parameters[9].Value = amount;
            parameters[10].Value = nature;
            parameters[11].Value = sex;
            parameters[12].Value = tag;
            parameters[13].Value = cont;
            parameters[14].Value = tel;
            parameters[15].Value = contact;
            return MyHelp.GetMessage("jobadd", parameters, "id");
        }
    }
}