//引入查询链接数据库的模块
var mysql = require('mysql');
//配置数据库链接
const connec = mysql.createConnection({
    host     : 'localhost',
    // port     :'9090',
    user     : 'root',
    password : '123456',
    database : 'hlsmms'
});
// 打开数据库链接
connec.connect(err => {
    if(err){
        // throw err;
        console.log("数据库链接失败！");
    }else {
        console.log("数据库链接成功！");
    }
});
//暴露出去
module.exports = connec;