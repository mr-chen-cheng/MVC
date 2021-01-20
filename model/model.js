
var mysql = require('mysql'); 
let parameter = require('../config/parameter.json')
//连接数据库参数配置
var connection = mysql.createConnection({
    ...parameter
});
//连接mysql
connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('connect mysql success');
});

function dataquery(sql){
    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,data)=>{
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}

module.exports = dataquery