/*
*招聘求职
*/
Ext.define('app.controller.Job', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['Post'],
        stores: ['PostList'],
        views: ['job.PostList', 'job.PostInfo'],
        refs: {
            postInfo: 'postInfo',
            postList: 'postList'
        },
        control: {
            //招聘信息
            postList: {
                initialize: function (t) {
                    util.storeLoad(t);
                },
                itemtap: function (list, index, target, record, e) {
                    this.redirectTo('redirect/postInfo');
                    util.recordLoad(record, this.getPostInfo(), config.job.info, {
                        id: record.get('id')
                    },
                    'click');
                }
            }
        }
    }
});