const express = require('express')
const app = express()
const path = require('path')
const artTemplate = require('art-template')
const express_template  = require('express-art-template')
const session = require('express-session')
let router = require('./router/router')
var cookieParser = require('cookie-parser')
    app.use(cookieParser())
// 初始化session,定义session一些配置
let options = {
  name:"SESSIONID", // 待会写入到cookie中标识
  secret: "FGVH$#E%&", // 用来加密会话，防止篡改。
  cookie: {
      httpOnly: false,
      secure: false, // false-http(默认), true-https
      maxAge:60000*30, // session在cookies存活30分钟，
  }
};
app.use( session(options) )

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/public', express.static(path.join(__dirname,'public')))
app.use('/uploads', express.static(path.join(__dirname,'uploads')))
app.set('views',__dirname+'/views')
app.engine('html',express_template)
app.set('view engine','html')
app.use((req,res,next)=>{
  let path = req.path.toLowerCase()
  let release = ['/login','/loginout','/logined','/register','/postname','/apiavatar','/postregister']
  if(release.includes(path)){
    next()
  }else{
    if(req.session.userInfo){
      next()
    }else{
      res.redirect('/login')
    }
  }
})
  app.use(router)
    
app.listen(5433,()=>console.log('标号5433'))