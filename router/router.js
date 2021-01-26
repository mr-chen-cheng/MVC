 const express = require('express')
// 得到一个路由器
let router = express.Router();
let dataquery = require('../model/model')
const multer = require('multer');
// 定义上传的目录
let upload = multer({ dest: 'uploads/' })
let columnController = require('../controller/columnController')
let articleController = require('../controller/articleController')
let userController = require('../controller/userController')
 router.get(/^\/$|^\/index$/,(req,res)=>{
    res.render('index.html')
})
router.get('/column',(req,res)=>{
    res.render('column.html')
})
router.get('/addcolumn',(req,res)=>{
    res.render('add-column.html')
})
router.get('/article',(req,res)=>{
    res.render('article.html')
})
router.get('/editcolumn',(req,res)=>{
    res.render('edit-column.html')
})
router.get('/editarticle',(req,res)=>{
    res.render('edit-article.html')
})
router.get('/addarticle',(req,res)=>{
    res.render('add-article.html')
})
router.get('/login',(req,res)=>{
    res.render('login.html')
})
router.get('/loginout',(req,res)=>{
    req.session.destroy(err=>{if(err) throw err})
    res.json({message:'操作成功'})
})
router.get('/cateCount',async (req,res)=>{
    let sql = `select count(*) total ,t2.name,t1.cat_id from article t1
    left join category t2 on t1.cat_id = t2.cat_id group by t1.cat_id`
    let data = await dataquery(sql)
    res.json(data)
})
router.post('/register',userController.register)
router.post('/editArticle',articleController.editArticle)
router.get('/getArticleData',articleController.getArticleData)
router.post('/upload',upload.single('file'),articleController.upload)
router.post('/passverify',articleController.passverify)
router.get('/getcolumn',columnController.getcolumn)
router.post('/delarticle',articleController.delarticle)
router.post('/addArticle',articleController.addArticle)
router.get('/artData',columnController.artData)
router.get('/getTable',columnController.getTable)
router.post('/delData',columnController.delData )
router.post('/addcolumn',columnController.addColumn)
router.get('/redactColumn',columnController.redactColumn)
router.post('/updataColumn',columnController.updataColumn)
module.exports = router