<%@ WebService Language="C#" Class="Img" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using app.DAl;
using app.Help;

[WebService(Namespace = "http://www.361y.cn:8080/", Description = "图片管理")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class Img  : System.Web.Services.WebService {

    /// <summary>
    /// 获取列表数据
    /// </summary>
    /// <param name="limit">每页数据总数</param>
    /// <param name="page"></param>
    [WebMethod(Description = "获取列表数据(支持jsonp)")]
    public void List(int limit, int page)
    {
        ImgManager manager = new ImgManager();
        MyHelp.Write(manager.List(limit, page));
    }
    
}