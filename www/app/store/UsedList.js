Ext.define('app.store.UsedList', {
    extend: 'Ext.data.Store',
    config: {
        model: 'app.model.Used',
        storeId: 'usedList',
        autoLoad: false,
        pageSize: 7,
        groupDir: 'DESC',
        groupField: 'id',
        destroyUrl: config.used.destroy,
        proxy: {
            type: 'ajax',
            url: config.used.reader,
            reader: {
                type: "json",
                rootProperty: 'result',
                totalProperty: 'totalCounts'
            }
        }
    }
});