var mongoose = require('mongoose') ;	// 定义使用组件
var Schema = mongoose.Schema; // 创建模式

//user
var UserSchema = new Schema({
	userid : String ,
	name : String ,
	password : String
}) ;	// 定义了一个新的模式，但是此模式还未和users集合有关联
exports.User = mongoose.model('User', UserSchema); // 与Users表关联


//定义todo对象模型
var TodoScheme = new Schema({
    title:String,
    finished:{type:Boolean,default:false},
    post_date:{type:Date,default:Date.now}
});
//访问todo对象模型
exports.Todo = mongoose.model('Todo', TodoScheme);

//scmtype
var ScmtypeSchema = new Schema({
    id : { type:Number, default:1 },
    name: String
}); // 定义了一个新的模式，但是此模式还未和scmtypes集合有关联
exports.Scmtype = mongoose.model('Scmtype', ScmtypeSchema); // 与scmtypes表关联


//used
var UsedSchema = new Schema({
    id : { type:Number, default:1 },
    type : Number,
    name : { type: String, length: 50 }, 
    content : { type: String, length: 255 }
}); // 定义了一个新的模式，但是此模式还未和useds集合有关联
exports.Used = mongoose.model('Used', UsedSchema); // 与scmtypes表关联


//usedType
var UsedTypeSchema = new Schema({
    id : { type:Number, default:1 },
    name : { type: String, length: 50 }
}); // 定义了一个新的模式，但是此模式还未和usedType集合有关联
exports.UsedType = mongoose.model('UsedType', UsedTypeSchema); // 与usedTye表关联