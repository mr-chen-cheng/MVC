let express = require('express')
let router = express.Router()
let dataquery = require('../model/model')

router.get('/article',async (req,res)=>{
    let {page,limit} = req.query
    // console.log(page,limit) 
    let offset = (page-1) * limit
    let sql = `select * from article t1 left join category t2 
     on t1.cat_id = t2.cat_id where status = 1 order 
     by publish_date desc limit ${offset},${limit} `
     let data = await dataquery(sql)
    //  console.log(data)
     data.map(v=>{
         if(v.Cover){
             v.Cover = `http://localhost:5433/${v.Cover}`
         }
     })
     res.json(data)
})

router.get('/getCate',async (req,res)=>{
    let sql = `select * from category `
    let data = await dataquery(sql)
    // console.log(data)
    res.json(data)
})
router.get('/getarticleDetail/:art_id',async (req,res)=>{
    // console.log(req.params)
    let {art_id} = req.params
    let sql = `select t1.*,t2.name cat_name from 
    article t1 left join category t2 on t1.cat_id = t2.cat_id 
    where art_id = ${art_id}`
    let data = await dataquery(sql)
    console.log(data)
    res.json(data[0]||{})
})
router.get('/getarticlecate/:cat_id',async (req,res)=>{
    let {cat_id=0} = req.params
    let sql = `select t1.*,t2.name cat_name from article t1 left join category t2 on t1.cat_id = t2.cat_id where t1.cat_id = ${cat_id} and status = 1 order by publish_date desc`
    let data = await dataquery(sql)
    data.map(v=>{
        if(v.Cover){
            v.Cover = 'http://localhost:5433/'+v.Cover
        }
    })
    console.log(data)
    res.json(data)
})
module.exports = router