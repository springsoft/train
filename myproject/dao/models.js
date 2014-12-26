var mongoose = require('mongoose') ;	// ����ʹ�����
var Schema = mongoose.Schema; // ����ģʽ

//user
var UserSchema = new Schema({
	userid : String ,
	name : String ,
	password : String
}) ;	// ������һ���µ�ģʽ�����Ǵ�ģʽ��δ��users�����й���
exports.User = mongoose.model('User', UserSchema); // ��Users�����


//����todo����ģ��
var TodoScheme = new Schema({
    title:String,
    finished:{type:Boolean,default:false},
    post_date:{type:Date,default:Date.now}
});
//����todo����ģ��
exports.Todo = mongoose.model('Todo', TodoScheme);

//scmtype
var ScmtypeSchema = new Schema({
    id : { type:Number, default:1 },
    name: String
}); // ������һ���µ�ģʽ�����Ǵ�ģʽ��δ��scmtypes�����й���
exports.Scmtype = mongoose.model('Scmtype', ScmtypeSchema); // ��scmtypes�����


//used
var UsedSchema = new Schema({
    id : { type:Number, default:1 },
    type : Number,
    name : { type: String, length: 50 }, 
    content : { type: String, length: 255 }
}); // ������һ���µ�ģʽ�����Ǵ�ģʽ��δ��useds�����й���
exports.Used = mongoose.model('Used', UsedSchema); // ��scmtypes�����


//usedType
var UsedTypeSchema = new Schema({
    id : { type:Number, default:1 },
    name : { type: String, length: 50 }
}); // ������һ���µ�ģʽ�����Ǵ�ģʽ��δ��usedType�����й���
exports.UsedType = mongoose.model('UsedType', UsedTypeSchema); // ��usedTye�����