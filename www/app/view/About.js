Ext.define('app.view.About', {
    alternateClassName: 'about',
    extend: 'Ext.Container',
    xtype: 'about',
    requires: ['ux.plugin.ConHref'],
    config: {
        title: '关于我们',
        margin: 10,
        plugins: 'conHref',
        html: '<p>做的玩的----宁泉水</p>'
    }
});