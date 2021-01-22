 const express = require('express')
 const router = express.Router();

let columnController = require('../controller/columnController')
let articleController = require('../controller/articleController')
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