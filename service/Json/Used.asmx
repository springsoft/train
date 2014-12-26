<%@ WebService Language="C#" Class="Used" %>

using System;
using System.Web;
using System.Web.Services;
using app.DAl;
using app.Help;

[WebService(Namespace = "http://www.361y.cn:8080/", Description = "二手物品管理")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class Used : System.Web.Services.WebService
{
    /// <summary>
    /// 获取列表数据
    /// </summary>
    /// <param name="limit">每页数据总数</param>
    /// <param name="page"></param>
    [WebMethod(Description = "获取列表数据(支持jsonp)")]
    public void List(int limit, int page)
    {
        UsedManager manager = new UsedManager();
        MyHelp.Write(manager.List(limit, page));
    }
    /// <summary>
    /// 更新
    /// </summary>
    /// <param name="id"></param>
    /// <param name="name"></param>
    /// <param name="content"></param>
    /// <returns></returns>
    [WebMethod(Description = "更新")]
    public Message Update(int id, string name, string content)
    {
        UsedManager manager = new UsedManager();
        return manager.Update(id, name, content);
        
    }
    /// <summary>
    /// 新增
    /// </summary>
    /// <param name="name"></param>
    /// <param name="content"></param>
    /// <returns></returns>
    [WebMethod(Description = "新增")]
    public Message Add(string name, string content, int type)
    {
        UsedManager manager = new UsedManager();
        return manager.Add(name, content, type); 
    }
    /// <summary>
    /// 删除
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    [WebMethod(Description = "删除(ids:1,2,3),(支持jsonp)")]
    public void Delete(string ids)
    {
        UsedManager manager = new UsedManager();
        MyHelp.Write(manager.Delete(ids));
    }
    /// <summary>
    /// 获取单条数据
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    [WebMethod(Description = "获取单条数据(支持jsonp)")]
    public void One(int id)
    {
        UsedManager manager = new UsedManager();
        MyHelp.Write(manager.One(id));
    }
}
