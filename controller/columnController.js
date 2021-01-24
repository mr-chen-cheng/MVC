let dataquery = require('../model/model')
let resJson = require('../tool/resJson')

    let columnController = {}

    columnController.getTable = async (req,res)=>{
        let sql = 'select * from category order by sort desc';
        let data = await dataquery(sql)
        res.json(data)
    }
    columnController.delData = async (req,res)=>{
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
    columnController.addColumn = async (req,res)=>{
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
    columnController.redactColumn = async (req,res)=>{
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
    columnController.updataColumn = async (req,res)=>{
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
    columnController.artData = async (req,res)=>{
        console.log(req.query)
        let {page,limit:pagesize} = req.query
        console.log(page,pagesize)
        let offset = (page-1)*pagesize
        let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id = t2.cat_id
        order by t1.art_id desc limit ${offset},${pagesize}`;
        let sql2 = `select count(*) as count from article;`
        let promise1 = dataquery(sql)
        let promise2 = dataquery(sql2)
        let result = await Promise.all([promise1,promise2])
        let data = result[0]
        let count = result[1][0].count
        let responseText = {code:0,count,data,msg:''}
        res.json(responseText)
    }
    columnController.getcolumn = async (req,res)=>{
         let sql = `select * from category order by sort desc`
         let result = await dataquery(sql)
         console.log(result)
         if(result){
             res.json(result)
         }else{
             res.json(resJson.error)
         }
    }
    module.exports = columnController