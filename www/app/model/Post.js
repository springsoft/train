//招聘
Ext.define('app.model.Post', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.proxy.JsonP'],
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'company_id',
            type: 'int'
        },
        {
            //工作名称
            name: 'jobs_name',
            type: 'string'
        },
        {
            //学历
            name: 'education_cn',
            type: 'string',
            convert: function (v, record) {
                return v == "不限制" ? '学历不限' : v;
            }
        },
        {
            //工作经验
            name: 'experience_cn',
            type: 'string',
            convert: function (v, record) {
                return v == "不限制" ? '经验不限' : v;
            }
        },
        {
            //工作地区
            name: 'district_cn',
            type: 'string'
        },
        {
            //公司
            name: 'companyname',
            type: 'string'
        },
        {
            //薪水
            name: 'wage_cn',
            type: 'string'
        },
        {
            //标签
            name: 'tag',
            type: 'string',
            convert: function (v, record) {
                if (!v) {
                    return '';
                }
                var taglist = v.split('|');
                var tag = [];
                for (var i in taglist) {
                    var j = {
                        title: taglist[i].split(',')[1]
                    };
                    tag.push(j);
                }
                return tag;
            }
        },
        {
            //更新时间
            name: 'refreshtime',
            type: 'string',
            convert: function (v, record) {
                return v;
            }
        },
        {
            //招收人数
            name: 'amount',
            type: 'string',
            convert: function (v, record) {
                return v == 0 ? '若干人' : '招' + v + '人';
            }
        },
        {
            //招收人数
            name: 'sex_cn',
            type: 'string',
            convert: function (v, record) {
                return v == "不限" ? '性别不限' : v;
            }
        }]
    }
});