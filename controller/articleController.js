let dataquery = require('../model/model')
let resJson = require('../tool/resJson')
const fs = require('fs')
let articleController = {}

    articleController.delarticle = async (req,res)=>{
        let {art_id} = req.body
        let sql = `delete from article where art_id=${art_id}`
        let result = await dataquery(sql)
        if(result.affectedRows){
            res.json(resJson.success)
        }else{
            res.json(resJson.error)
        }
    }
    articleController.addArticle = async (req,res)=>{
        let {title,cat_id,status,content,publish_date,author,Cover} = req.body
        let sql =  `insert into article(title,content,cat_id,status,publish_date,author,Cover)
        values('${title}','${content}',${cat_id},${status},'${publish_date}','${author}','${Cover}')`
        let result = await dataquery(sql)
        console.log(result)
        if(result.affectedRows){
            res.json(resJson.success)
        }else{
            res.json(resJson.error)
        }
    }
    articleController.passverify = async (req,res)=>{
        let {art_id,status} = req.body
        let sql = `update article set status = ${status} where art_id = ${art_id}`
        let result = await dataquery(sql)
        if(result.affectedRows){
            res.json(resJson.success)
        }else{
            res.json(resJson.error)
        }
    }
    articleController.upload =  (req,res)=>{
        //实现文件上传
    if(req.file){
        // 进行文件的重命名即可 fs.rename
        let {originalname,destination,filename} = req.file;
        let dotIndex = originalname.lastIndexOf('.');
        let ext = originalname.substring(dotIndex);
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${filename}${ext}`;
        fs.rename(oldPath,newPath,err=>{
            if(err){ throw err; }
            res.json({ code:0,message:'上传文件成功',path:newPath})
        })
    }else{
        res.json({code:1,message:'没有上传文件',path:''})
    }
}
    articleController.getArticleData = async (req,res)=>{
        let {art_id} = req.query;
        let sql = `select * from article where art_id = ${art_id}`;
        let data = await dataquery(sql); // [{}]
        res.json(data[0] || {})
    }
    articleController.editArticle = async (req,res)=>{
        let {title,cat_id,status,content,publish_date,author,Cover,oldCover,art_id} = req.body
        let sql;
        if(Cover){
            sql = `update article set title='${title}',cat_id=${cat_id},status=${status},
            content='${content}',publish_date='${publish_date}',author='${author}',Cover='${Cover}' where art_id=${art_id}`
        }else{
            sql = `update article set title='${title}',cat_id=${cat_id},status=${status},
            content='${content}',publish_date='${publish_date}',author='${author}' where art_id=${art_id}`
        }
        let result = await dataquery(sql)
        if(result.affectedRows){ 
            Cover && fs.unlinkSync(oldCover)
            res.json(resJson.success)
        }else{
            res.json(resJson.error)
        }
    }
    module.exports = articleController