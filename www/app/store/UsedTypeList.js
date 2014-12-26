Ext.define('app.store.UsedTypeList', {
    extend: 'Ext.data.Store',
    config: {
        model: 'app.model.UsedType',
        storeId: 'usedTypeList',
        autoLoad: true,
        pageSize: 7,
        groupDir: 'DESC',
        groupField: 'id',
        destroyUrl: config.usedType.destroy,
        proxy: {
            type: 'ajax',
            url: config.usedType.reader,
            reader: {
                type: "json",
                rootProperty: 'result',
                totalProperty: 'totalCounts'
            }
        }
    }
});