/*
*用户模块
*/
Ext.define('app.controller.User', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['User'],
        views: ['user.Login', 'user.Info', 'ImgPick'],
        refs: {
            userLogin: 'userLogin',
            userInfo: 'userInfo',
            imgPick: 'imgPick',
            login: 'userLogin [action=login]'
        },
        control: {
            imgPick: {
                pickSuccess: function (t, type) {
                    util.openFileSelector(config.imgUp, type);
                }
            },
            //开始登录
            login: {
                tap: function () {
                    var login = this.getUserLogin(),
                    model = Ext.create('app.model.User');
                    if (this.valid(model, login)) {
                        this.logCheck(login.getValues());
                    }
                }
            },
            //用户详细页
            userInfo: {
                activate: function (t) {
                    util.uploadSuccess = function (response) {
                        var oldPic = config.user.pic;
                        config.user.pic = response.responseText;
                        Ext.Ajax.request({
                            url: config.updataUser,
                            params: {
                                id: config.user.id,
                                pic: config.user.pic,
                                oldPic: oldPic
                            },
                            hidMessage: true,
                            success: function (result) {
                                util.showMessage('上传成功！', true);
                                t.setData(config.user);
                            }
                        });
                    }
                    t.setData(config.user);
                },
                loginOut: function (t) {
                    if (t.isExit) {
                        this.logOut();
                    } else {
                        t.isExit = true;
                        util.showMessage('再按一次退出登录！', true);
                    }
                },
                saveImg: function (t) {
                                        util.showPick('app.view.ImgPick');
//                    var data = 'iVBORw0KGgoAAAANSUhEUgAAAFQAAABKCAIAAACq1eR9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAb0lEQVR4nO3PQQ0AIBDAMMC/3kv4IYNHVwXbnrlLdX4H/NS8qnlV86rmVc2rmlc1r2pe1byqeVXzquZVzauaVzWval7VvKp5VfOq5lXNq5pXNa9qXtW8qnlV86rmVc2rmlc1r2pe1byqeVXzquZVDyQ6A3lBwQb9AAAAAElFTkSuQmCC';
//                    Ext.Ajax.request({
//                        url: config.imgUp,
//                        params: {
//                            img: data
//                        },
//                        success: function (response, request) {
//                            config.user.pic = response.responseText;
//                            t.setData(config.user);
//                        }
//                    });
                }
            }
        }
    },
    launch: function () {
        //检测是否自动登录
        Ext.ModelMgr.getModel('app.model.User').load(1, {
            scope: this,
            success: function (cachedLoggedInUser) {
                this.logCheck(cachedLoggedInUser.data, true);
            }
        });
    },
    //登录成功
    logUserIn: function (user) {
        config.user = user;
        var login = this.getUserLogin();
        if (login) {
            var redirect = login.config.redirect;
            if (redirect) {
                this.redirectTo('redirect/' + redirect + '/1');
            } else {
                this.redirectTo('redirect');
            }
        }
    },
    //开始登录
    logCheck: function (user, isHid) {
        Ext.Ajax.request({
            url: config.login,
            params: user,
            hidMessage: isHid,
            scope: this,
            success: function (result) {
                result = Ext.decode(result.responseText);
                if (!result.id) {
                    util.showMessage('用户名或者密码不正确!', true);
                } else {
                    this.logUserIn(result);
                    user.keepUser && this.keepUser(user);
                }
            }
        });
    },
    //保存用户信息
    keepUser: function (user) {
        //不这样写无法储存数据
        var logUser = Ext.create('app.model.User', {
            id: 1
        });
        logUser.set(user);
        logUser.save();
    },
    //验证模型
    valid: function (model, from) {
        from.updateRecord(model);
        var me = this,
        errors = model.validate(),
        valid = errors.isValid();
        if (!valid) {
            errors.each(function (err) {
                alert(err.getMessage());
                return false;
            });
        }
        return valid;
    },
    //退出登录
    logOut: function (user) {
        Ext.ModelMgr.getModel('app.model.User').load(1, {
            success: function (user) {
                user.erase();
            }
        });
        config.user = false;
        this.redirectTo('redirect/userInfo/1');
    }
});