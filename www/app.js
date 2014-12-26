//指定ux起调目录
Ext.Loader.setPath({
    'ux': 'app/ux'
});

Ext.application({
    name: 'app',
    requires: ['app.config','app.util', 'Ext.MessageBox'],
    controllers: ['Main', 'Used', 'User', 'Job', 'Scm'],
    launch: function () {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        util.inIt();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('app.view.Main'));
    }
});
