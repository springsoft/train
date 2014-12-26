Ext.define('app.store.PostList', {
    extend: 'Ext.data.Store',
    config: {
        model: 'app.model.Post',
        storeId: 'postList',
        autoLoad: false,
        pageSize: 7,
        proxy: {
            type: 'ajax',
            url: config.job.list,
            reader: {
                type: "json",
                rootProperty: 'result',
                totalProperty: 'totalCounts'
            }
        }
    }
});