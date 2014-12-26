
Ext.define('app.view.ImgPick', {
    extend: 'Ext.Picker',
    xtype: 'imgPick',
    config: {
        value: {
            type: '0'
        },
        toolbar: {
            title: '更换头像'
        },
        slots: [{
            name: 'type',
            data: [{
                text: '图库',
                value: '0'
            },
            {
                text: '拍照',
                value: '1'
            }]
        }]
    },
    //确定
    onDoneButtonTap: function () {
        this.fireEvent('pickSuccess', this, this.getValue().type);
        this.endPick();
    },
    //取消
    onCancelButtonTap: function () {
        this.endPick();
    },
    //结束
    endPick: function () {
        this.hide();
        this.destroy();
    }
});