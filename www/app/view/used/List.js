/*
*二手物品列表
*/
Ext.define('app.view.used.List', {
    extend: 'ux.SimpleList',
    xtype: 'usedList',
    alternateClassName: 'usedList',
    requires: ['Ext.plugin.PullRefresh', 'Ext.plugin.ListPaging'],
    config: {
        selectedCls: 'list-item-selected',
        cls: 'list',
        title: '二手物品',
        itemTpl: '<div>{name}</div>',
        store: 'usedList',
        simpleBar: {
            cls: 'simpleBar',
            docked: 'bottom',
            hidden: true
        },
        plugins: ['pullrefresh', 'listpaging'],
        navigationBar: {
            tmpItems: [{
                xtype: 'button',
                text: '添加',
                align: 'right',
                ui: 'decline',
                action: 'redirectParams',
                redirect: 'usedSave',
                params: true
            }]
        }
    }
});
