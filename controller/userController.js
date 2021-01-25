let userController ={}
const dataquery = require('../model/model')
const resJson = require('../tool/resJson')
let md5 = require('md5')
let {secret} = require('../config/salt.json')

    userController.register = async (req,res)=>{
        let {username,password} = req.body;
        password = md5(`${password}${secret}`)
        console.log(password)
        let sql = `select * from users where username='${username}' and password='${password}'`
        let data = await dataquery(sql)
        if(data.length){
            let userInfo = data[0]
            req.session.userInfo = userInfo
            res.json(resJson.success)
        }else{
            res.json(resJson.error)
        }
    }

    module.exports = userController