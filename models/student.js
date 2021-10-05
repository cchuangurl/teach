var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Student_Schema = new Schema(
  {
    a05register_no:{type:String,required:true},
    a10last_name:{type:String,required:false},
    a13middle_name:{type:String,required:false},
    a151st_name:{type:String,required:false},
    a20department:{type:String,required:false},
    a25grade:{type:Number,required:false},
    a30class:{type:String,required:false},
    a35water_no:{type:Number,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for student's URL
Student_Schema
.virtual('url')
.get(function () {
  return '/api/student/' + this._id;
});

//Export model
module.exports = mongoose.model('Student', Student_Schema);