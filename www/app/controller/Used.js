/*
*二手物品
*/
Ext.define('app.controller.Used', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['Used', 'UsedType'],
        stores: ['UsedList', 'UsedTypeList'],
        views: ['used.List', 'used.Info', 'used.Save', 'used.TypeList', 'used.TypeSave'],
        refs: {
            usedList: 'usedList',
            usedInfo: 'usedInfo',
            usedSave: 'usedSave',
            usedTypeList: 'usedTypeList',
            usedTypeSave: 'usedTypeSave',
            usedBtn: 'usedSave button[action=edit]',
            usedTypeBtn: 'usedTypeSave button[action=edit]'
        },
        control: {
            usedTypeBtn: {
                tap: function () {
                    var from = this.getUsedTypeSave(),
                    model = from.getRecord();
                    if (!model) {
                        model = Ext.create('app.model.UsedType');
                    }
                    util.saveRecord(from, Ext.getStore('usedTypeList'), model, 'id', this);
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
                        this.redirectTo('redirect/usedTypeSave');
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
            },
            //保存按钮
            usedBtn: {
                tap: function () {
                    var from = this.getUsedSave(),
                    model = from.getRecord();
                    if (!model) {
                        model = Ext.create('app.model.Used');
                    }
                    var me = this;
                    util.saveRecord(from, Ext.getStore('usedList'), model, 'id', this);
                }
            },
            //保存
            usedSave: {
                initialize: function (t) {
                    if (!t.config.params) {
                        t.setRecord(this.getUsedInfo().getRecord());
                    }
                }
            },
            //列表
            usedList: {
                //初始化
                initialize: function (t) {
                    util.storeLoad(t);
                },
                //点击项
                itemsingletap: function (list, index, target, record, e) {
                    this.redirectTo('redirect/usedInfo');
                    util.recordLoad(record, this.getUsedInfo(), config.used.info, {
                        id: record.get('id')
                    },
                    'content');
                },
                //批量选择成功
                simpleSuccess: function (list, items, ids) {
                    util.deleteRecord(list, items, {
                        ids: ids.toString()
                    });
                }
            }
        }
    }
});