var express = require('express');
var router = express.Router();
var connec = require('./sqlConnection');

//跨域访问配置所有头
router.all('*',(req,res,next) => {
    res.header('Access-Control-Allow-Credentials',true);
    res.header('Access-Control-Allow-Origin','http://172.16.4.225:8080');
    next();
});

router.get('/',(req,res) =>{
    let {classify,keyWords,currPage,pageSize} = req.query;
    //查询所有
    let sqlStr = `select * from proinfo where 1=1`;
    //搜索
    if(classify&&!keyWords){
        sqlStr += ` and classify="${classify}"`;
    }else if(!classify&&keyWords){
        sqlStr +=` and proName like "%${keyWords}%" or proNum like "%${keyWords}%"`;
    }else if(classify&&keyWords){
        sqlStr +=` and classify="${classify}" and proName like "%${keyWords}%" or proNum like "${keyWords}%"`;
    }
    sqlStr +=` order by proId DESC`;
    let total = 0;
    connec.query(sqlStr,(err,result) => {
        if(err){
            throw err;
        }else {
            total = result.length;
        }
    });
    //分页
    if(currPage){
        let pageM = (currPage-1)*pageSize;
        sqlStr +=` limit ${pageM},${pageSize}`
    }
    connec.query(sqlStr,(err,result) => {
        if(err){
            throw err;
        }else {
            res.send({"total":total,"product":result});
        }
    });
});
//商品添加
router.post('/add',(req,res) =>{
    let {proPrice,proNum,proName,classify,proMarket,proSelfPrice,proRepertory,proWeight,proKg,proVip,proIsPromo,proDetail}=req.body;
    let sqlStr = 'insert into proinfo (proPrice,proNum,proName,classify,proMarket,proSelfPrice,proRepertory,proWeight,proKg,proVip,proIsPromo,proDetail) value(?,?,?,?,?,?,?,?,?,?,?,?)';
    let parmasArr =[proPrice,proNum,proName,classify,proMarket,proSelfPrice,proRepertory,proWeight,proKg,proVip,proIsPromo,proDetail];
    connec.query(sqlStr,parmasArr,(err,result) => {
        if(err){
            throw err;
        }else {
            if(result.affectedRows>0){
                res.json({"code":1,"mes":"商品添加成功！"});
            }
            else {
                res.json({"code":0,"mes":"商品添加失败！"});
            }
        }
    });
});
router.post('/save',(req,res) => {
    let {proPrice,proNum,proName,classify,proMarket,proSelfPrice,proRepertory,proWeight,proKg,proVip,proIsPromo,proDetail,proId}=req.body;
    let sqlStr ='update proinfo set proPrice=?,proNum=?,proName=?,classify=?,proMarket=?,proSelfPrice=?,proRepertory=?,proWeight=?,proKg=?,proVip=?,proIsPromo=?,proDetail=? where proId=?';
    let parmasArr =[proPrice,proNum,proName,classify,proMarket,proSelfPrice,proRepertory,proWeight,proKg,proVip,proIsPromo,proDetail,proId];
    connec.query(sqlStr,parmasArr,(err,result) => {
        if(err){
            throw err;
        }else {
            if(result.affectedRows>0){
                res.send({"code":1,"mes":"修改成功！"});
            }else {
                res.send({"code":0,"mes":"修改失败！"});
            }
        }
    });
});
//暴露出去
module.exports = router;