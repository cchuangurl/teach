//載入相對應的model
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const Active = require('../models/index').active;
const Student = require('../models/index').student;
module.exports = {
    //記錄互動情形
    record(req, res){
        let outcome=req.query.code;
        let waterno=req.params.waterno;
        let date=new Date();
        let thisday=date.toDateString();
        let thistime=date.toLocaleTimeString();
        console.log("outcome code:"+outcome);
        console.log("waterno:"+waterno);
        console.log("the format of day:"+thisday);
        console.log("the format of time:"+thistime);
        let promise1=(waterno)=>{
            return new Promise((resolve,reject)=>{
                Student.find({a35water_no:waterno}, function(err,student) {
                    console.log("student register no:"+student.a05register_no);
                    var new_active = new Active({                
                        a05register:student.a05register_no,
                        a10day:thisday,
                        a15time:thistime,
                        a20outcome:outcome
                    });          
                console.log("active register no:"+new_active.a05register);
                });//EOF .find
                resolve(new_active)
                })//EOF Promise
            }//EOF promise1
        let promise2=(new_active)=>{
                return new Promise((resolve,reject)=>{
                    new_active.save(function(err, active) {
                    if (err)
                    res.send(err);
                    console.log("saved waterno "+waterno+":"+active.a05register)     
                    });//EOF .saveresolve(new_active)
                    resolve()
                })//EOF Promise
            }//EOF promise2
        promise1(waterno)
        .then((new_active)=>{
            return promise2(new_active)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    //創建
    create(req, res) {
        //let turninfo=Turninfo.find({a35waterno:req.body.a10waterno},{_id:{$slice: 1}});
        //let turninfo=Turninfo.find({a35waterno:req.body.a10wate10
        var new_active = new Active(req.body); 
        new_active.save(function(err, active) {
                if (err)
                res.send(err);                       
                res.redirect("/api/active")        
            });//EOF .save           
    },//EOF create
    
    //列表項
    list(req, res) {
        var listreport=req.query.statusreport;
        Active.find({},null,{sort: {a05register_no:1}}, function(err, active) {
            if (err)
            res.send(err);
            //res.json(Active);
            res.render("active/listpage",{
                statusreport:listreport,
                activelist:active
            });
            //res.end()
        });
    },
    //取得某項
    retrieve(req, res) {
        var editreport=req.body.statusreport;
        Active.findById(req.params.id, function(err, active) {
            if (err)
                res.send(err);
            //res.json(Active);
            res.render("active/editpage",{
                statusreport:editreport,
                active:active
            })
        });
    },
    //更新
    update(req, res) {
        Active.findOneAndUpdate({_id:req.params.id}, req.body, { new: true }, function(err, active) {
            if (err)
                res.send(err);
            //res.json(Active);
            res.redirect("/api/active");
        });
    },
    //刪除
    destroy(req, res) {
        Active.remove({_id: req.params.id}, function(err, active) {
        //Active.findByIdAndRemove(req.params.id, function(err, Active) {
            if (err)
                res.send(err);
            //res.json({ message: 'Active successfully deleted' });
            res.redirect("/api/active");
        });
},

}//EOF export