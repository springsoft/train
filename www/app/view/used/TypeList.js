/*
*二手物品类型列表
*/
Ext.define('app.view.used.TypeList', {
    extend: 'Ext.List',
    xtype: 'usedTypeList',
    alternateClassName: 'usedTypeList',
    config: {
        title: '二手物品类型',
        itemTpl: '{name}',
        store: 'usedTypeList',
        navigationBar: {
            tmpItems: [{
                xtype: 'button',
                text: '添加',
                align: 'right',
                ui: 'decline',
                action: 'redirectParams',
                redirect: 'usedTypeSave',
                params: {
                    isAdd: true
                }
            }]
        }
    }
});
