//載入相對應的model
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const Student = require('../models/index').student;
module.exports = {
    //讀入學生資料, 並導到slot machine頁
    list(req, res) {
        var listreport=req.query.statusreport;
        Student.find({},null,{sort: {a25grade:1,a05register_no:1}}, function(err, student) {
            if (err)
            res.send(err);
            //res.json(student);
            let studentlist=encodeURIComponent(JSON.stringify(student));
            res.render("machine/showmachine",{
                statusreport:listreport,
                studentlist:studentlist
            });
            //res.end()
        });
    }
}//EOF export