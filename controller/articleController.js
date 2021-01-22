let dataquery = require('../model/model')
let resJson = require('../tool/resJson')
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
        let {title,cat_id,status,content,publish_date,author} = req.body
        let sql =  `insert into article(title,content,cat_id,status,publish_date,author)
        values('${title}','${content}',${cat_id},${status},'${publish_date}','${author}')`
        let result = await dataquery(sql)
        if(result.affectedRows){
            res.json(resJson.success)
        }else{
            res.json(resJson.error)
        }
    }
    module.exports = articleController