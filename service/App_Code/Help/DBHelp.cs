using System;
using System.Collections.Generic;
using System.Web;
using MySql.Data.MySqlClient;
using System.Data;
using System.Collections;
using System.Configuration;
namespace app.Help
{
    /// <summary>
    ///ZpDBHelp 的摘要说明
    /// </summary>
    public static class DBHelp
    {
        //数据库连接字符串
        private readonly static string Conn = ConfigurationManager.AppSettings["sqlConnectionString"].ToString();
        
        //"Database='361y';Data Source='127.0.0.1';User Id='root';Password='root';charset='utf8'";

        //private readonly static string Conn = "Database='a1007172413';Data Source='121.40.92.18';User Id='a1007172413';Password='84367174';charset='utf8'";
        //"Database='a1016114218';Data Source='110.34.152.214';User Id='a1016114218';Password='17467405';charset='utf8'";
        
        // 用于缓存参数的HASH表
         private static Hashtable parmCache = Hashtable.Synchronized(new Hashtable());
        #region 公用方法
        /// <summary>
        /// 查询指定表中数据总数
        /// </summary>
        /// <param name="tableName"></param>
        /// <returns></returns>
         public static int GetCountByWhere(string tableName)
        {
            return GetCountByWhere(tableName, null, null);
        }
        /// <summary>
        /// 根据指定条件查询指定表中满足指定条件的数据总数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="strWhere">条件（无参数的）</param>
        /// <returns></returns>
         public static int GetCountByWhere(string tableName, string strWhere)
        {
            return GetCountByWhere(tableName, strWhere, null);
        }
        /// <summary>
        ///  根据指定条件查询指定表中满足指定条件的数据总数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="strWhere">条件</param>
        /// <param name="cmdParms">参数</param>
        /// <returns></returns>
         public static int GetCountByWhere(string tableName, string strWhere, MySqlParameter[] cmdParms)
        {
            int count = 0;
            string cmdText = string.Format("select count(1) from {0}", tableName);
            if (strWhere != null && strWhere != "")
            {
                cmdText += string.Format(" where {0}", strWhere);
            }
            using (MySqlDataReader sdr = Search(cmdText,cmdParms))
            {
                if (sdr.Read())
                {
                    count = Convert.ToInt32(sdr[0].ToString());
                }
                sdr.Close();
            }
            return count;
        }
           #endregion

        /// <summary>
        /// 执行查询语句，返回MySqlDataReader ( 注意：调用该方法后，一定要对MySqlDataReader进行Close )
        /// </summary>
        /// <param name="cmdType">执行sql类型</param>
        /// <param name="strSQL">查询语句</param>
        /// <returns>MySqlDataReader</returns>
         public static MySqlDataReader Search(CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {

            MySqlConnection conn = new MySqlConnection(Conn);
            MySqlCommand cmd = new MySqlCommand();
            try
            {
                PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                MySqlDataReader myReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                cmd.Parameters.Clear();
                return myReader;
            }
            catch (MySqlException e)
            {
                throw e;
            }
        }
        /// <summary>
        /// 执行查询语句，返回MySqlDataReader ( 注意：调用该方法后，一定要对MySqlDataReader进行Close )
        /// </summary>
        /// <param name="strSQL">查询语句</param>
        /// <returns>MySqlDataReader</returns>
         public static MySqlDataReader Search(string cmdText, params MySqlParameter[] commandParameters)
        {
            return Search(CommandType.Text, cmdText, commandParameters);
        }
        /// <summary>
        /// 执行SQL语句, 返回成功与否
        /// </summary>
        /// <param name="cmdText">sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns></returns>
         public static bool ExecuteCommand(string cmdText, params MySqlParameter[] commandParameters)
        {
            return ExecuteCommand(CommandType.Text, cmdText);
        }
        /// <summary>
        /// 执行SQL语句, 返回成功与否
        /// </summary>
        ///<param name="cmdType">命令类型(存储过程, 文本, 等等)</param>
        /// <param name="cmdText">存储过程名称或者sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns></returns>
         public static bool ExecuteCommand(CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            using (MySqlConnection conn = new MySqlConnection(Conn))
            {
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    try
                    {
                        PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                        int rows = cmd.ExecuteNonQuery();
                        return rows > 0;
                    }
                    catch (MySqlException e)
                    {
                        cmd.Parameters.Clear();
                        conn.Close();
                        throw e;
                    }
                }
            }
        }
        /// <summary>
        /// 返回DataTable
        /// </summary>
        /// <param name="cmdText">sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns></returns>
         public static DataTable GetDataTable(string cmdText, params MySqlParameter[] commandParameters)
        {
            return GetDataTable(CommandType.Text, cmdText);
        }
        /// <summary>
        /// 返回DataTable
        /// </summary>
        /// <param name="cmdType">命令类型(存储过程, 文本, 等等)</param>
        /// <param name="cmdText">存储过程名称或者sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns></returns>
         public static DataTable GetDataTable(CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            using (MySqlConnection conn = new MySqlConnection(Conn))
            {
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    try
                    {
                        PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                        MySqlDataAdapter adapter = new MySqlDataAdapter();
                        adapter.SelectCommand = cmd;
                        DataTable dt = new DataTable();
                        adapter.Fill(dt);
                        return dt;
                    }
                    catch (MySqlException e)
                    {
                        cmd.Parameters.Clear();
                        conn.Close();
                        throw e;
                    }
                }
            }
        }
        
        /// <summary>
        /// 准备执行一个命令
        /// </summary>
        /// <param name="cmd">sql命令</param>
        /// <param name="conn">OleDb连接</param>
        /// <param name="trans">OleDb事务</param>
        /// <param name="cmdType">命令类型例如 存储过程或者文本</param>
        /// <param name="cmdText">命令文本,例如:Select * from Products</param>
        /// <param name="cmdParms">执行命令的参数</param>
         private static void PrepareCommand(MySqlCommand cmd, MySqlConnection conn, MySqlTransaction trans, CommandType cmdType, string cmdText, MySqlParameter[] cmdParms)
        {

            if (conn.State != ConnectionState.Open)
                conn.Open();

            cmd.Connection = conn;
            cmd.CommandText = cmdText;

            if (trans != null)
                cmd.Transaction = trans;

            cmd.CommandType = cmdType;

            if (cmdParms != null)
            {
                foreach (MySqlParameter parm in cmdParms)
                    cmd.Parameters.Add(parm);
            }
        }
    }
}