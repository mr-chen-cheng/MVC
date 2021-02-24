

let express = require('express')
let router = express.Router();
router.get('/article',(req,res)=>{
    res.json({data:'文章列表'})
})
router.get('/cate',(req,res)=>{
    res.json({data:'cate分类'})
})
module.exports = router