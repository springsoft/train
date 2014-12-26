using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using System.Collections;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Web.Security;
using System.Text;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
namespace app.Help
{
    /// <summary>
    ///帮助类
    /// </summary>
    public class MyHelp
    {
        public readonly static string pwdhash = "361y";
        /// <summary>
        /// 加密
        /// </summary>
        /// <param name="pwd"></param>
        /// <returns></returns>
        public static string MD5(string pwd)
        {
            return pwd = FormsAuthentication.HashPasswordForStoringInConfigFile(pwd + pwdhash, "MD5").ToLower();
        }
        /// <summary>
        /// web服务输入json/jsonp
        /// </summary>
        /// <param name="json"></param>
        public static void Write(string json)
        {
            HttpRequest request = HttpContext.Current.Request;
            string cb = request["callback"];

            HttpResponse response = HttpContext.Current.Response;
            response.ContentType = "application/json";

            response.Write(GetJsonP(json, cb));
        }
        /// <summary>
        /// 将json转换成jsopn
        /// </summary>
        /// <param name="json">json</param>
        /// <returns></returns>
        public static string GetJsonP(string json, string cb)
        {
            if (!String.IsNullOrEmpty(cb))
            {
                json = cb + "(" + json + ")";
            }
            return json;
        }
        /// <summary>
        /// 将DataTable序列化为json
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public static string TableToJson(DataTable table)
        {
            if (table.Rows.Count < 1)
            {
                return "{totalCounts:0}";
            }
            //序列化              
            return JsonConvert.SerializeObject(table);
        }
        /// <summary>
        /// 将DataTable序列化为json
        /// </summary>
        /// <param name="table"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public static string TableToJson(DataTable table, int count)
        {
            Dictionary<string, object> drow = new Dictionary<string, object>();
            drow.Add("result", table);
            drow.Add("totalCounts", count);
            return JsonConvert.SerializeObject(drow);
        }
        /// <summary>
        /// 将DataTable第一行数据序列化为json
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public static string TableRowToJson(DataTable table)
        {
            if (table.Rows.Count < 1)
            {
                return "{success:false}";
            }
            Dictionary<string, object> drow = new Dictionary<string, object>();
            foreach (DataColumn dc in table.Columns)
            {
                drow.Add(dc.ColumnName, table.Rows[0][dc.ColumnName]);
            }
            //序列化              
            return JsonConvert.SerializeObject(drow);
        }
        /// <summary>
        /// 将DataTable第一行数据序列化为Dictionary
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public static Dictionary<string, object> TableRowToDictionary(DataTable table)
        {
            Dictionary<string, object> drow = new Dictionary<string, object>();
            foreach (DataColumn dc in table.Columns)
            {
                drow.Add(dc.ColumnName, table.Rows[0][dc.ColumnName]);
            }
            return drow;
        }
        /// <summary>
        /// 根据sql语句返回Message
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static Message GetMessage(string sql)
        {
            bool success = false;
            if (DBHelp.ExecuteCommand(sql))
            {
                success = true;
            }
            return new Message(success);
        }
        /// <summary>
        /// 根据sql语句返回Message
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static string GetJsonMessage(string sql)
        {
            return JsonConvert.SerializeObject(GetMessage(sql));
        }
        /// <summary>
        /// 执行存储过程
        /// </summary>
        /// <param name="name"></param>
        /// <param name="parameters"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public static Message GetMessage(string pro, MySql.Data.MySqlClient.MySqlParameter[] parameters, string name)
        {
            DataTable table = DBHelp.GetDataTable(CommandType.StoredProcedure, pro, parameters);
            bool success = false;
            string message = "0";
            if (table.Rows.Count > 0)
            {
                success = true;
                message = table.Rows[0][name].ToString(); ;
            }
            return new Message(success, message);
        }
        /// <summary>
        /// 保存图片
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static string SavePic(string name, string fileName, string picName)
        {
            HttpRequest request = HttpContext.Current.Request;
            string url = "http://" + request.ServerVariables["http_host"] + request.ApplicationPath + "Files/" + picName;
            if (File.Exists(fileName))
            {
                File.Delete(fileName);
            }
            if (request.Files.Count != 0)
            {
                try
                {
                    HttpPostedFile img = request.Files[name];
                    img.SaveAs(fileName);
                }
                catch
                {
                    return "0";
                }
                return url;
            }
            else
            {
                string base64String = request[name];
                if (Base64StringToImage(fileName, base64String))
                {
                    return url;
                }
            }
            return "0";
        }
        /// <summary>
        /// base64编码的文本转为图片
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="base64String"></param>
        /// <returns></returns>
        public static bool Base64StringToImage(string fileName, string base64String)
        {
            try
            {
                byte[] arr = Convert.FromBase64String(base64String);
                MemoryStream ms = new MemoryStream(arr);
                Bitmap bmp = new Bitmap(ms);
                bmp.Save(fileName,ImageFormat.Jpeg);
                ms.Close();
            }
            catch
            {
                return false;
            }
            return true;
        }
        /// <summary>
        /// 获取当前时间戳
        /// </summary>
        /// <param name="bflag">为真时获取10位时间戳,为假时获取13位时间戳.</param>
        /// <returns></returns>
        public static string GetTimeStamp(bool bflag = false)
        {
            TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            string ret = string.Empty;
            if (bflag)
                ret = Convert.ToInt64(ts.TotalSeconds).ToString();
            else
                ret = Convert.ToInt64(ts.TotalMilliseconds).ToString();

            return ret;
        }
    }
}