//載入相對應的model
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const Student = require('../models/index').student;
module.exports = {
    //創建
    create(req, res) {
        //let turninfo=Turninfo.find({a35waterno:req.body.a10waterno},{_id:{$slice: 1}});
        //let turninfo=Turninfo.find({a35waterno:req.body.a10waterno});        
        //console.log(turninfo);
        var new_student = new student(req.body);
        new_student.save(function(err, student) {
                if (err)
                res.send(err);                       
                res.redirect("/api/student")        
            });//EOF .save        
    },//EOF create
    
    //列表項
    list(req, res) {
        var listreport=req.query.statusreport;
        Student.find({},null,{sort: {a25grade:1,a05register_no:1}}, function(err, student) {
            if (err)
            res.send(err);
            //res.json(student);
            let studentlist=encodeURIComponent(JSON.stringify(student));
            res.render("student/listpage",{
                statusreport:listreport,
                studentlist:studentlist
            });
            //res.end()
        });
    },
    //取得某項
    retrieve(req, res) {
        var editreport=req.body.statusreport;
        Student.findById(req.params.id, function(err, student) {
            if (err)
                res.send(err);
            //res.json(student);
            res.render("student/editpage",{
                statusreport:editreport,
                student:student
            })
        });
    },
    //更新
    update(req, res) {
        Student.findOneAndUpdate({_id:req.params.id}, req.body, { new: true }, function(err, student) {
            if (err)
                res.send(err);
            //res.json(student);
            res.redirect("/api/student");
        });
    },
    //刪除
    destroy(req, res) {
        Student.remove({_id: req.params.id}, function(err, student) {
        //student.findByIdAndRemove(req.params.id, function(err, student) {
            if (err)
                res.send(err);
            //res.json({ message: 'student successfully deleted' });
            res.redirect("/api/student");
        });
},
dobatchinput(req, res) {    
    var statusreport=req.query.statusreport;
    // 引用需要的模組
    const fs = require('fs');
    const path=require("path");
    const readline = require('readline');
    // 逐行讀入檔案資料
    //定義輸出串流
    //var writeStream = fs.createWriteStream('out.csv');

    //定義讀入串流 (檔案置於/public目錄下)
    let filepath=path.join(__dirname,"../public/");
    var lineReader = readline.createInterface({            
        input: fs.createReadStream(filepath+req.query.datafile+'.csv') 
    });
    var firstLine = true;
    var lineno=0;
    var tempstore=new Array(8);
    for (let i=0;i<8;i++){
        tempstore[i]=new Array(); 
    };       
    //當讀入一行資料時
    lineReader.on('line', function(data) {            
        var values = data.split(',');
        tempstore[0][lineno]=values[0].trim();
        tempstore[1][lineno]=values[1].trim();
        tempstore[2][lineno]=values[2].trim();
        tempstore[3][lineno]=values[3].trim();
        tempstore[4][lineno]=values[4].trim();
        tempstore[5][lineno]=values[5].trim();
        tempstore[6][lineno]=values[6].trim();
        tempstore[7][lineno]=values[7].trim();
        lineno++;
        console.log("read line:"+data)
    });//EOF lineReader.on            
    console.log("reading..."+filepath+req.query.datafile+".csv");    
    setTimeout(function(){
        var studentArray=new Array(lineno);
        for (let k=0;k<lineno;k++){
            studentArray[k]=new Array(8);
            for (let m=0;m<8;m++){
                studentArray[k][m]=tempstore[m][k]
                //console.log(studentArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of studentArray:"+studentArray[0][0]);
        console.log("read total lines:"+studentArray.length);
        let promise2=((new_student)=>{                
                return new Promise((resolve,reject)=>{
                    new_student.save(function(err, student) {
                    console.log("Saved document:"+new_student.a05register_no);
                    resolve();
                    reject(new Error())                
                    })//EOF .save
                })//EOF Promise .save
        });//EOF promise2
        let sequence=Promise.resolve();
        studentArray.forEach(function(studentj){
            sequence=sequence.then(function(){
                var new_student = new Student({
                    a05register_no:studentj[0],
                    a10last_name:studentj[1],
                    a13middle_name:studentj[2],
                    a151st_name:studentj[3],
                    a20department:studentj[4],
                    a25grade:studentj[5],
                    a30class:studentj[6],
                    a35water_no:studentj[7]
                });//EOF new student
                    promise2(new_student)
                .catch(err=>{
                    console.log(err)
                })
            })//EOF sequence
            })//EOF forEach                                            
        },3000);//EOF setTimeOut middle
    setTimeout(()=>{
        res.redirect("/api/student/?statusreport="+statusreport)
    },20000)
        
    }//EOF batchInput
}//EOF export