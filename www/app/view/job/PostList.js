Ext.define('app.view.job.PostList', {
    alternateClassName: 'postList',
    extend: 'Ext.List',
    xtype: 'postList',
    requires: ['Ext.plugin.PullRefresh', 'Ext.plugin.ListPaging'],
    config: {
        title: '招聘信息',
        cls:'list',
        store: 'postList',
        selectedCls: '',
        plugins: ['pullrefresh', 'listpaging'],
        itemTpl: new Ext.XTemplate(
        '<div class="bh">',
            '<div class="b1">',
                '<div>{jobs_name}</div><div class="sm gray">{education_cn} - {experience_cn}</div><div class="sm gray">{district_cn} - {companyname}</div>',
            '</div>',
            '<div class="right w7"><div class="gray">{refreshtime}</div><div class="sm orange">{wage_cn}</div></div>',
        '</div>'
        )
    }
});