Ext.define('app.view.Main', {
    extend: 'ux.NavigationView',
    xtype: 'main',
    config: {
        navigationBar: {
            backButton: {
                iconCls: 'arrow_left',
                ui: '',
                cls: 'back'
            }
        },
        cls: 'cardPanel'
    }
});
