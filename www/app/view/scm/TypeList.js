/*
*二手物品类型列表
*/
Ext.define('app.view.scm.TypeList', {
    extend: 'Ext.List',
    xtype: 'scmTypeList',
    alternateClassName: 'scmTypeList',
    config: {
        title: '配置库物品类型',
        itemTpl: '{name}',
        store: 'scmTypeList',
        navigationBar: {
            tmpItems: [{
                xtype: 'button',
                text: '添加',
                align: 'right',
                ui: 'decline',
                action: 'redirectParams',
                redirect: 'scmTypeSave',
                params: {
                    isAdd: true
                }
            }]
        }
    }
});
