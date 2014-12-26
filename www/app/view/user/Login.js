/*
*登录
*/
Ext.define("app.view.user.Login", {
    alternateClassName: 'userLogin',
    extend: 'Ext.form.Panel',
    xtype: 'userLogin',
    requires: ['Ext.field.Toggle', 'Ext.form.FieldSet', 'Ext.field.Password'],
    config: {
        scrollable: null,
        title: '登录',
        margin: 10,
        redirect: null,
        items: [{
            xtype: 'fieldset',
            defaults: {
                labelWidth: '40%'
            },
            items: [{
                xtype: 'textfield',
                name: 'username',
                placeHolder: '请输入用户名'
            },
            {
                xtype: 'passwordfield',
                name: 'password',
                placeHolder: '请输入密码'
            },
            {
                xtype: 'togglefield',
                label: '记住我',
                labelWidth: '60%',
                name: 'keepUser',
                value: true
            }]
        },
        {
            xtype: 'button',
            action: 'login',
            text: '登录',
            ui: 'action'
        }]
    }
});