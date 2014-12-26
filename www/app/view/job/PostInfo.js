Ext.define('app.view.job.PostInfo', {
    alternateClassName: 'postInfo',
    extend: 'Ext.Container',
    xtype: 'postInfo',
    config: {
    cls:'info',
    title: '职位详情',
    scrollable: {
        direction: 'auto',
        directionLock: true
    },
            tpl: new Ext.XTemplate(
             '<div class="bgdiv divline">',
                '<div class="title">{jobs_name}</div><div class="gray bh sm"><div class="b1">更新时间：{refreshtime}</div><span>查看次数：{click}</span></div>',
             '</div>',

             '<div class="bgdiv divline">',
                '<div>{companyname}</div><div class="sm">{amount} | {education_cn} | {experience_cn} | {nature_cn} | {sex_cn}</div>',
                '<div><span class="weight">薪金待遇：</span><span class="orange">{wage_cn}</span></div><div><span class="weight">工作地区：</span>{district_cn}</div>',
                '<tpl for="tag"><div class="label">{title}</div> </tpl>',
             '</div>',

             '<div class="bgdiv">职位描述：{contents}</div>')
    }
});