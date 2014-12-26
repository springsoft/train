/*
*添加/编辑
*/
Ext.define('app.view.used.TypeSave', {
    alternateClassName: 'usedTypeSave',
    extend: 'Ext.form.Panel',
    xtype: 'usedTypeSave',
    requires: ['Ext.form.FieldSet', 'Ext.field.TextArea', 'Ext.field.Hidden'],
    config: {
        scrollable: null,
        margin: 10,
        title: '编辑',
        params: { isAdd: false },
        items: [
        {
            xtype: 'fieldset',
            defaults: {
                labelWidth: '20%'
            },
            items: [{
                xtype: 'textfield',
                name: 'name',
                label: '名称'
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