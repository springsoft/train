/*
*模仿tabpanel导航栏
*/
Ext.define('app.model.Used', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            //类型
            name: 'type',
            type: 'int'
        }, {
            //标题
            name: 'name',
            type: 'string'
        }, {
            //内容
            name: 'content',
            type: 'string'
        }],
        proxy: {
            type: 'ajax',
            api: {
                create: config.used.create,
                update: config.used.update
            },
            reader: {
                successProperty: 'd.success',
                messageProperty:'d.message'
            }
        },
        validations: [
        {
            field: 'name',
            type: 'presence',
            message: '请输入标题!'
        }, {
            field: 'content',
            type: 'presence',
            message: '请输入内容!'
        }]
    }
});