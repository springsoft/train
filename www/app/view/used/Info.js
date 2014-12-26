/*
*详细
*/
Ext.define('app.view.used.Info', {
    alternateClassName: 'usedInfo',
    extend: 'Ext.Container',
    xtype: 'usedInfo',
    config: {
        title: '详细',
        cls: 'info',
        scrollable: {
            direction: 'auto',
            directionLock: true
        },
        navigationBar: {
            tmpItems: [{
                xtype: 'button',
                text: '编辑',
                align: 'right',
                ui: 'decline',
                action: 'redirect',
                redirect: 'usedSave'
            }]
        },
        tpl: '<div class="bgdiv divline title">{name}</div></div><div class="bgdiv">类型:{type}</div><div class="bgdiv">内容:{content}</div>'
    }
});