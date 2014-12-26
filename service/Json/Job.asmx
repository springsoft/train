<%@ WebService Language="C#" Class="Job" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using app.DAl;
using app.Help;

[WebService(Namespace = "http://www.361y.cn:8080/", Description = "岗位管理")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
// [System.Web.Script.Services.ScriptService]
public class Job : System.Web.Services.WebService
{

    /// <summary>
    /// 获取列表数据
    /// </summary>
    /// <param name="limit">每页数据总数</param>
    /// <param name="page"></param>
    [WebMethod(Description = "获取列表数据(支持jsonp)")]
    public void List(int limit, int page)
    {
        JobManager manager = new JobManager();
        MyHelp.Write(manager.List(limit, page));
    }

    /// <summary>
    /// 新增
    /// </summary>
    /// <param name="name"></param>
    /// <param name="content"></param>
    /// <returns></returns>
    [WebMethod(Description = "新增")]
    public Message Add(int company_id, string jobs_name, string education_cn, string experience_cn, string district_cn, string companyname, string wage_cn, string refreshtime, int click, int amount, string nature_cn, string sex_cn, string tag, string contents, string telephone, string contact)
    {
        JobManager manager = new JobManager();
        return manager.Add(company_id, jobs_name, education_cn, experience_cn, district_cn, companyname, wage_cn, refreshtime, click, amount, nature_cn, sex_cn, tag, contents, telephone, contact);
    }
    /// <summary>
    /// 获取单条数据
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    [WebMethod(Description = "获取单条数据(支持jsonp)")]
    public void One(int id)
    {
        JobManager manager = new JobManager();
        MyHelp.Write(manager.One(id));
    }

}