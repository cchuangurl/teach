var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Active_Schema = new Schema(
  {
    a05register:{type:String,required:true},
    a10day:{type:String,required:false},
    a15time:{type:String,required:false},
    a20outcome:{type:Number,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for student's URL
Active_Schema
.virtual('url')
.get(function () {
  return '/api/active/' + this._id;
});

//Export model
module.exports = mongoose.model('Active', Active_Schema);