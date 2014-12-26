/*
*添加/编辑
*/
Ext.define('app.view.used.Save', {
    alternateClassName: 'usedSave',
    extend: 'Ext.form.Panel',
    xtype: 'usedSave',
    requires: ['Ext.form.FieldSet', 'Ext.field.TextArea', 'Ext.field.Select'],
    config: {
        scrollable: null,
        margin: 10,
        title: '编辑',
        items: [
        {
            xtype: 'fieldset',
            defaults: {
                labelWidth: '20%'
            },
            items: [{
                xtype: 'textfield',
                name: 'name',
                label: '标题'
            },
             {
                xtype: 'selectfield',
                name: 'type',
                label: '类型',
                store: 'usedTypeList',
                displayField: 'name',
                valueField:'id'
            },
            {
                name: 'content',
                xtype: 'textareafield',
                maxRows: 4,
                label: '内容'
            }]
        },
        {
            xtype: 'button',
            action: 'edit',
            text: '确认',
            ui: 'action'
        }]
    }
});