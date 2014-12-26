<%@ WebService Language="C#" Class="User" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using app.DAl;
using app.Help;

[WebService(Namespace = "http://www.361y.cn:8080/", Description = "用户管理")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class User  : System.Web.Services.WebService {

    [WebMethod(Description = "登录(支持jsonp)")]
    public void Login(string userName, string password)
    {
        UserManager manager = new UserManager();
        MyHelp.Write(manager.Login(userName, password));
    }
    [WebMethod(Description = "注册(支持jsonp)")]
    public void Add(string userName, string password)
    {
        UserManager manager = new UserManager();
        MyHelp.Write(manager.Add(userName, password));
    }
    [WebMethod(Description = "图片上传(支持base64,标记名称img)")]
    public void Img()
    {
        string picName = MyHelp.GetTimeStamp() + ".jpg";
        string fileName = Server.MapPath(@"../Files") + "\\" + picName;
        MyHelp.Write(MyHelp.SavePic("img", fileName, picName));
    }
    [WebMethod(Description = "更新头像地址(支持jsonp)")]
    public void Update(int id, string pic, string oldPic)
    {
        UserManager manager = new UserManager();
        MyHelp.Write(manager.Update(id, pic));
    }
}