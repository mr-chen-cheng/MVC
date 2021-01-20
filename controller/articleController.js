let dataquery = require('../model/model')
let resJson = require('../tool/resJson')

    let articleController = {}

    articleController.getTable = async (req,res)=>{
        let sql = 'select * from category order by sort desc';
        let data = await dataquery(sql)
        res.json(data)
    }
    articleController.delData = async (req,res)=>{
        let {cat_id} = req.body
        cat_id = parseInt(cat_id)
        if(cat_id){
            let sql = `delete from  category where cat_id = ${cat_id}`
            try{
                let data = await dataquery(sql)
                if(data.affectedRows){
                    res.json(resJson.success)
                }else{
                    res.json(resJson.error)
                }
            }catch(err){
                res.json(resJson.misoperation)
            }
        }
    }
    articleController.addColumn = async (req,res)=>{
        let {name,sort,add_date} = req.body
        console.log(name,sort,add_date)
        let sql = `insert into category(name,sort,add_date) values('${name}','${sort}','${add_date}')`
       
           try{
            let data = await dataquery(sql)
            if(data.affectedRows){
                res.json(resJson.success)
            }else{
                res.json(resJson.error)
            }
           }catch(err){
               res.json(resJson.busy)
           }
    }
    articleController.redactColumn = async (req,res)=>{
        let {cat_id} = req.query
        console.log(cat_id)
        if(!cat_id){
            res.json(resJson.busy)
            return
        }
        let sql = `select * from category where cat_id=${cat_id}`
        let data = await dataquery(sql)
        if(data.length){
            data[0].code= 0;
            console.log(data[0])
            res.json(data[0])
        }else{
            res.json(resJson.error)
        }
    }
    articleController.updataColumn = async (req,res)=>{
        let {name,sort,add_date,cat_id} = req.body
            console.log(cat_id)
            let sql = `update category set name='${name}',sort=${sort},add_date='${add_date}' 
            where cat_id = ${cat_id}`
            // try{
            let data = await dataquery(sql)
            console.log(data)
            if(data.affectedRows){
                res.json(resJson.success)
            }else{
                res.json(resJson.error)
            }
             
       
    }
    module.exports = articleController