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
                Student.findOne({a35water_no:waterno}, function(err,student) {
                    console.log("student register no:"+student.a05register_no);
                    
                resolve(student)
                });//EOF .find
                
                })//EOF Promise
            }//EOF promise1
        let promise2=(student)=>{
                return new Promise((resolve,reject)=>{
                    var new_active = new Active({                
                        a05register:student.a05register_no,
                        a10day:thisday,
                        a15time:thistime,
                        a20outcome:outcome
                    });          
                    console.log("active register no:"+new_active.a05register);
                    new_active.save(function(err, active) {
                    if (err)
                    res.send(err);
                    console.log("saved waterno "+waterno+":"+active.a05register)     
                    });//EOF .saveresolve(new_active)
                    resolve();
                })//EOF Promise
            }//EOF promise2
        promise1(waterno)
        .then((student)=>{
            return promise2(student)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    //依id找到互動紀錄資料送去編輯
    edit(req, res) {
        var editreport=req.query.statusreport;
        console.log("the transed id:"+req.params.id)
        Active.findById(req.params.id, function(err, active) {
            if (err)
                res.send(err);
            //res.json(student);
            console.log("the found active:"+active);
            let activex=encodeURIComponent(JSON.stringify(active));
                res.render("active/editpage",{
                statusreport:editreport,
                active:activex
            });
        });
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
        Active.find({},null,{sort: {a05register:1}}, function(err, active) {
            if (err)
            res.send(err);
            //res.json(Active);
            let activelist=encodeURIComponent(JSON.stringify(active));
            res.render("active/listpage",{
                statusreport:listreport,
                activelist:activelist
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
        Active.findOneAndUpdate({_id:req.body.id}, req.body, { new: true }, function(err, active) {
            if (err)
                res.send(err);
            //res.json(Active);
            statusreport="由更新一筆互動紀錄回到本頁"
            res.redirect("/api/active/?"+statusreport);
        });
    },
    //刪除
    destroy(req, res) {
        Active.remove({_id: req.params.id}, function(err, active) {
        //Active.findByIdAndRemove(req.params.id, function(err, Active) {
            if (err)
                res.send(err);
            //res.json({ message: 'Active successfully deleted' });
            statusreport="由刪除一筆互動紀錄回到本頁"
            res.redirect("/api/active/?"+statusreport);
        });
},

}//EOF export