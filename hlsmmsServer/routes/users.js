var express = require('express');
var router = express.Router();
var connec = require('./sqlConnection');

//跨域访问配置所有头
router.all('*',(req,res,next) => {
    res.header('Access-Control-Allow-Credentials',true);
    res.header('Access-Control-Allow-Origin','http://172.16.4.225:8080');
    next();
});
//用户列表
router.get('/',function (req,res) {
    let sqlStr = 'select * from userinfo order by userid DESC ';
    //合并数据插入数据库
    connec.query(sqlStr,(err,result) => {
        if(err){
            console.log("数据查询失败",err.message);
        }else {
            res.json(result);
        }
    });
});
/* 用户添加路由 */
router.post('/add', function(req, res) {
    // 添加路由中接收数据
     let {username,pass,usergroup} = req.body;
    // 设置处理mysql的语句 使用？站位
     let sqlStr = 'insert into userinfo (username,userpass,usergroup) value(?,?,?) ';
     //将结构的参数转为数组
     let parmasArr=[username,pass,usergroup];
     //合并数据插入数据库
      connec.query(sqlStr,parmasArr,(err,result) => {
          if(err){
            console.log("数据库插入失败",err.message);
          }else {
              if(result.affectedRows>0){
                res.json({"code":1,"mes":"账号添加成功！"});
              }else {
                res.json({"code":0,"mes":"账号添加失败！"});
              }
          }
      });
});
//用户删除路由
router.get('/userdelete',function (req,res) {
    let userid = req.query.userid;
    let sqlStr = 'delete from userinfo where userid = ?';
    let parmasArr=[userid];
    //合并数据插入数据库
    connec.query(sqlStr,parmasArr,(err,result) => {
        if(err){
            console.log("数据删除失败",err.message);
        }else {
            if(result.affectedRows>0){
                res.json({"code":1,"mes":"删除成功！"});
            }else {
                res.json({"code":0,"mes":"删除失败！"});
            }
        }
    });
});
//用户编辑
router.get('/useredit',function (req,res) {
    let userid = req.query.userid;
    let sqlStr = 'select * from userinfo where userid = ?';
    let parmasArr=[userid];
    //合并数据插入数据库
    connec.query(sqlStr,parmasArr,(err,result) => {
        if(err){
            console.log("数据删除失败",err.message);
        }else {
            res.send(result);
        }
    });
});
//用户修改后的新信息
router.post('/usersave',function (req, res) {
    let {userid,username,userpass,usergroup} = req.body;
    let sqlStr ='update userinfo set username=?,userpass=?,usergroup=? where userid=?';
    let parmasArr = [username,userpass,usergroup,userid];
    connec.query(sqlStr,parmasArr,(err,result) => {
        if(err){
            console.log("数据更新失败",err.message);
        }else {
            if (result.affectedRows>0) {
                res.send({"code":1,"mes":"用户修改成功！"});
            }else {
                res.send({"code":0,"mes":"用户修改失败！"});
            }
        }
    });
});
//密码修改路由
router.post('/pwdedit',(req,res) => {
    let userid = req.cookies.userid;
    let {pass,newpass} = req.body;
    let sqlStr = 'select userpass from userinfo where userid="'+userid+'"';
    connec.query(sqlStr,(err,result) => {
      if (err){
        throw err;
      } else {
        let passStr= JSON.stringify(result);
        result = JSON.parse(passStr);
        if(result[0].userpass === pass){
          let sqlStr1 = 'update userinfo set userpass=? where userid=?'
          let parmasArr=[newpass,userid];
          connec.query(sqlStr1,parmasArr,(err,result)=>{
            if(err){
              throw err;
            }else {
                if(result.affectedRows>0){
                  res.json({"code":1,"mes":"密码修改成功，请重新登录！"});
                }else {
                  res.json({"code":0,"mes":"密码修改失败！"});
                }
            }
          });
        } else {
          res.send({"code":0,"mes":"原密码错误！"})
        }
      }
    });
});

module.exports = router;
