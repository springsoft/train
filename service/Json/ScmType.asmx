<%@ WebService Language="C#" Class="ScmType" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using app.DAl;
using app.Help;

[WebService(Namespace = "http://www.361y.cn:8080/", Description = "二手物品类型管理")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class ScmType  : System.Web.Services.WebService {

    /// <summary>
    /// 获取列表数据
    /// </summary>
    [WebMethod(Description = "获取列表数据(支持jsonp)")]
    public void List()
    {
        ScmTypeManager manager = new ScmTypeManager();
        MyHelp.Write(manager.List());
    }
    /// <summary>
    /// 更新
    /// </summary>
    /// <param name="id"></param>
    /// <param name="name"></param>
    /// <returns></returns>
    [WebMethod(Description = "更新")]
    public Message Update(int id, string name)
    {
        ScmTypeManager manager = new ScmTypeManager();
        return manager.Update(id, name);

    }
    /// <summary>
    /// 新增
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    [WebMethod(Description = "新增")]
    public Message Add(string name)
    {
        ScmTypeManager manager = new ScmTypeManager();
        return manager.Add(name);
    }
    /// <summary>
    /// 删除
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    [WebMethod(Description = "删除(支持jsonp)")]
    public void Delete(int id)
    {
        ScmTypeManager manager = new ScmTypeManager();
        MyHelp.Write(manager.Delete(id));
    }
}