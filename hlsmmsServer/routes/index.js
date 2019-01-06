var express = require('express');
var router = express.Router();
var connec = require('./sqlConnection');

/* GET home page. */
router.all("*",(req,res,next) => {
    // 允许携带cookie证书的域名
    res.header('Access-Control-Allow-Credentials',true);
    // 携带cookie证书时，跨域不能使用通配符
    res.header('Access-Control-Allow-Origin','http://172.16.4.225:8080');
    next();
});
router.post('/login', function(req, res) {
  let {username,pass} = req.body;
  //定义语句
  // let sqlStr = 'select * from userinfo where username=?' + name + '"';
  let sqlStr = 'select * from userinfo where username=? and userpass=?';
  //将参数转为数组
  let parmasArr = [username,pass];
  //链接数据库查询
  connec.query(sqlStr,parmasArr,(err,result) => {
    if(err){
      console.log('查询失败!！',err.message);
    }else {
      if(result.length>0){
        // 验证合法 写入cookie
          res.cookie('userid',result[0].userid);
          res.cookie('username',username);
          console.log(req.cookies);
          res.json({"code":1,"mes":"登录成功"});
      }else {
          res.json({"code":0,"mes":"用户名或账号填写错误！"});
      }
    }
  });
});
//获取验证cookie
router.get('/getcookie', function(req, res) {
    let userid = req.cookies.userid;
    let username = req.cookies.username;
    if(userid&&username){
        res.send({"code":1,"username":username});
    }else {
        res.send({"code":0});
    }
});
//退出登录
router.get('/loginout',(req,res) => {
  res.clearCookie('userid');
  res.clearCookie('username');
  res.send({"code":1});
});
module.exports = router;
