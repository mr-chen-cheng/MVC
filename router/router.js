 const express = require('express')
 const router = express.Router();

let articleController = require('../controller/articleController')
 router.get(/^\/$|^\/index$/,(req,res)=>{
    res.render('index.html')
})
router.get('/column',(req,res)=>{
    res.render('column.html')
})
router.get('/addcolumn',(req,res)=>{
    res.render('addcolumn.html')
})
router.get('/article',(req,res)=>{
    res.render('article.html')
})
router.get('/editcolumn',(req,res)=>{
    res.render('editcolumn.html')
})
router.get('/getTable',articleController.getTable)
router.post('/delData',articleController.delData )
router.post('/addcolumn',articleController.addColumn)
router.get('/redactColumn',articleController.redactColumn)
router.post('/updataColumn',articleController.updataColumn)
module.exports = router