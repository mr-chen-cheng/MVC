let userController ={}
const dataquery = require('../model/model')
const resJson = require('../tool/resJson')
const fs = require('fs')
let md5 = require('md5')
let {secret} = require('../config/salt.json')

    userController.logined = async (req,res)=>{
        let {username,password} = req.body;
        password = md5(`${password}${secret}`)
        // console.log(password)
        let sql = `select * from users where username='${username}' and password='${password}'`
        let data = await dataquery(sql)
        // console.log(data)
        if(data.length){
            req.session.userInfo = data[0]
            res.json(resJson.success)
        }else{
            res.json(resJson.error)
        }
    }
    userController.postname = async (req,res)=>{
            let {namelVal} = req.body
            let sql = `select * from users where username='${namelVal}'`
            let data = await dataquery(sql)
            // console.log(data)
            if(data.length){
                res.json({errcode:1,message:'用户名被占用'})
            }else{
                res.json({errcode:0,message:'可用用户名'})
            }
            }

    userController.apiAvatar = (req,res)=>{
        console.log(req.file)
            if(req.file){
                let {originalname,destination,filename} = req.file;
                let ext = originalname.substring(originalname.lastIndexOf('.'))
                let oldPath = `${destination}${filename}`;
                let newPath = `${destination}${filename}${ext}`;
                fs.rename(oldPath,newPath,err=>{
                    if(err){
                        console.log(err)
                    }
                    res.json({cdoe:0,message:'上传成功',path:newPath})
                })
            }else{
                res.json({code:111,message:'没有上传头像',path:''})
            }
       }
       userController.postRegister = async (req,res)=>{
        let {username,password1,avatar} = req.body
        password1 = md5(`${password1}${secret}`)
        // console.log(username,password1,avatar)
        let sql = `select * from users where (username='${username}') and (password='${password1}')`
        let result = await dataquery(sql)
            if(result.length ===0){
                let sql2 = `insert into users(username,password,avatar) values('${username}','${password1}','${avatar}')`
                let data = await dataquery(sql2)
                  if(data.affectedRows){
                    res.json({errcode:0,message:'注册成功，跳转登录页面'})
                  }
            }else{
                res.json({errcode:1,message:'注册用户被占用'}) 
            }
        }
        userController.upAvatar = async (req,res)=>{
            // console.log(req.file)
            let successdata = req.session.userInfo
            // console.log(successdata)
            let {user_id} = successdata
            let sql2 = `select * from users where user_id=${user_id}`
            let data = await dataquery(sql2)
            if(data){
                req.session.userInfo = data[0]
            }
            let newPath;
            if(req.file){
                let {originalname,destination,filename} = req.file;
                let ext = originalname.substring(originalname.lastIndexOf('.'))
                let oldPath = `${destination}${filename}`;
                 newPath = `${destination}${filename}${ext}`;
                fs.rename(oldPath,newPath,err=>{
                    if(err){
                        console.log(err)
                    }
                })
            }else{
                res.json({code:111,message:'没有上传头像',path:''})
            }
            let sql = `update users set avatar='${newPath}' where user_id=${user_id}`
            let result = await dataquery(sql)
                    if(result.affectedRows){
                        res.json({code:0,message:'上传成功',path:newPath})
                    }
        }
        userController.upPassword = async (req,res)=>{
            let {repassword,user_id} = req.body
            repassword = md5(`${repassword}${secret}`)
            // console.log(repassword,user_id)
            let sql = `update users set password='${repassword}' where user_id=${user_id}`
            let result = await dataquery(sql)
            if(result.affectedRows){
                res.json(resJson.success)
            }else{
                res.json(resJson.error)
            }
        }
        userController.indexInit =  (req,res)=>{
            let data = req.session
            // console.log(data.userInfo)
            if(data.userInfo!==undefined){
                res.json(resJson.success)
            }else{
                res.json(resJson.error)
            }
        }
    module.exports = userController