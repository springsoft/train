/*
*
*/
Ext.define('app.controller.Scm', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['Used', 'ScmType'],
        stores: ['UsedList', 'ScmTypeList'],
        views: ['scm.TypeList', 'scm.TypeSave'],
        refs: {
            usedTypeList: 'scmTypeList',
            usedTypeSave: 'scmTypeSave',
            usedTypeBtn: 'scmTypeSave button[action=edit]'
        },
        control: {
            usedTypeBtn: {
                tap: function () {
                    var from = this.getUsedTypeSave(),
                    model = from.getRecord();
                    if (!model) {
                        model = Ext.create('app.model.ScmType');
                    }
                    util.saveRecord(from, Ext.getStore('scmTypeList'), model, 'id', this);
                }
            },
            usedTypeList: {
                //监控是否在多选状态
                itemtap: function (list, index, target, record, e) {
                    //如果在多选状态停止后续事件的执行
                    if (list.isSimple) {
                        e.stopEvent();
                        list.isSimple = false;
                    } else {
                        this.redirectTo('redirect/scmTypeSave');
                        this.getUsedTypeSave().setRecord(record);
                    }
                },
                itemtaphold: function (list, index, target, record, e) {
                    list.isSimple = true;
                    Ext.Msg.confirm("删除", "你确定要删除所选类别吗?",
                    function (buttonId) {
                        if (buttonId === 'yes') {
                            util.deleteRecord(list, [record], {
                                id: record.get('id')
                            });
                        }
                    },
                    this);
                }
            }
        }
    }
});