//博客
Ext.define('app.model.ScmType', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            //名称
            name: 'name',
            type: 'string'
        }],
        proxy: {
            type: 'ajax',
            api: {
                create: config.scmType.create,
                update: config.scmType.update
            },
            reader: {
                successProperty: 'd.success',
                messageProperty: 'd.message'
            }
        },
        validations: [
        {
            field: 'name',
            type: 'presence',
            message: '请输入名称!'
        }]
    }
});