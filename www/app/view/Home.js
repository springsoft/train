Ext.define('app.view.Home', {
    extend: 'Ext.Container',
    xtype: 'home',
    alternateClassName: 'home',
    config: {
        title: '九宫格1',
        layout: 'vbox',
        defaults: {
            layout: 'hbox'
        },
        items: [{
            height: '4em',
            cls: 'home',
            width: '95%',
            defaults: {
                xtype: 'button',
                iconAlign: 'top',
                action: 'redirect',
                flex: 1
            },
            items: [{
                iconCls: 'team orangeYellow',
                text: '二手物品',
                redirect: 'usedList'
            },
            {
                iconCls: 'star orange',
                text: '物品类型',
                redirect: 'usedTypeList'
            },
            {
                iconCls: 'bookmarks roseRed',
                text: '招聘信息',
                redirect: 'postList'
            },
			{
                iconCls: 'bookmarks roseRed',
                text: '配置库信息',
                redirect: 'scmTypeList'
            }]
        },
		{
            height: '4em',
            cls: 'home',
            width: '95%',
            defaults: {
                xtype: 'button',
                iconAlign: 'top',
                action: 'redirect',
                flex: 1
            },
            items: [{
                iconCls: 'team orangeYellow',
                text: '二手物品_php',
                redirect: 'usedList'
            },
            {
                iconCls: 'star orange',
                text: '物品类型_php',
                redirect: 'usedTypeList'
            },
            {
                iconCls: 'bookmarks roseRed',
                text: '招聘信息_php',
                redirect: 'postList'
            },
			{
                iconCls: 'bookmarks roseRed',
                text: '配置库信息_php',
                redirect: 'postList'
            }]
        },
		{
            height: '4em',
            cls: 'home',
            width: '95%',
            defaults: {
                xtype: 'button',
                iconAlign: 'top',
                action: 'redirect',
                flex: 1
            },
            items: [{
                iconCls: 'team orangeYellow',
                text: '二手物品',
                redirect: 'usedList'
            },
            {
                iconCls: 'star orange',
                text: '物品类型',
                redirect: 'usedTypeList'
            },
            {
                iconCls: 'bookmarks roseRed',
                text: '招聘信息',
                redirect: 'postList'
            },
			{
                iconCls: 'bookmarks roseRed',
                text: '配置库信息',
                redirect: 'scmTypeList'
            }]
        },
        {
            xtype: 'toolbar',
            cls:'homeBar',
            docked: 'bottom',
            defaults: {
                xtype: 'button',
                iconAlign: 'top',
                action: 'redirect'
            },
            items: [{
                iconCls: 'user',
                text: '个人中心',
                redirect: 'userInfo'
            },
            {
                iconCls: 'settings',
                text: '关于我们',
                redirect: 'about'
            },
            {
                iconCls: 'compose',
                text: '发布信息',
                action: 'redirectParams',
                redirect: 'usedSave',
                params: true
            }]
        }]
    }
});