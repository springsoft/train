//全局配置文件
Ext.define('app.config', {
    alternateClassName: 'config',
    //设置别名是为了方便调用，这样直接config.name就能获取到变量。
    statics: {
        used: {
            create: 'http://121.199.59.67:3000/used/create',
            update: 'http://121.199.59.67:3000/used/update',
            destroy: 'http://121.199.59.67:3000/used/delete',
            reader: 'http://121.199.59.67:3000/used/list',
            info: 'http://121.199.59.67:3000/used/one'
        },
        usedType: {
            create: 'http://121.199.59.67:3000/usedtype/create',
            update: 'http://121.199.59.67:3000/usedtype/update',
            destroy: 'http://121.199.59.67:3000/usedtype/delete',
            reader: 'http://121.199.59.67:3000/usedtype/list'
        },
        job: {
            list: 'http://121.199.59.67:1275/service/Json/Job.asmx/List',
            info: 'http://121.199.59.67:1275/service/Json/Job.asmx/One'
        },
		scmType: {
            create: 'http://121.199.59.67:3000/scmtype/create',
            update: 'http://121.199.59.67:3000/scmtype/update',
            destroy: 'http://121.199.59.67:3000/scmtype/delete',
            reader: 'http://121.199.59.67:3000/scmtype/list'
        },
        imgUp: 'http://121.199.59.67:1275/service/Json/User.asmx/Img',
        login: 'http://121.199.59.67:1275/service/Json/User.asmx/Login',
        updataUser: 'http://121.199.59.67:1275/service/Json/User.asmx/Update',
        user: false,
        //需要登录检测的页面
        ckLogin: {
            userInfo: true
        }
    }
});