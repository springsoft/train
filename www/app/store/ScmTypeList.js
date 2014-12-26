Ext.define('app.store.ScmTypeList', {
    extend: 'Ext.data.Store',
    config: {
        model: 'app.model.ScmType',
        storeId: 'scmTypeList',
        autoLoad: true,
        pageSize: 7,
        groupDir: 'DESC',
        groupField: 'id',
        destroyUrl: config.scmType.destroy,
        proxy: {
            type: 'ajax',
            url: config.scmType.reader,
            reader: {
                type: "json",
                rootProperty: 'result',
                totalProperty: 'totalCounts'
            }
        }
    }
});