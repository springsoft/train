<%@ WebService Language="C#" Class="Cinema" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using app.DAl;
using app.Help;

[WebService(Namespace = "http://www.361y.cn:8080/", Description = "影院管理")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
[System.Web.Script.Services.ScriptService]
public class Cinema  : System.Web.Services.WebService {

    /// <summary>
    /// 获取列表数据
    /// </summary>
    [WebMethod(Description = "获取列表数据(支持jsonp)")]
    public void List()
    {
        CinemaManager manager = new CinemaManager();
        MyHelp.Write(manager.List());
    }

    [WebMethod(Description = "新增")]
    public void Add(string city, string address, string title, string phonenumber, string lat, string lng)
    {
        CinemaManager manager = new CinemaManager();
        MyHelp.Write(manager.Add(city, address, title, phonenumber, lat, lng));
    }
}