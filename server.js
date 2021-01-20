const express = require('express')
const app = express()
const path = require('path')
const artTemplate = require('art-template')
const express_template  = require('express-art-template')
let router = require('./router/router')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/public', express.static(path.join(__dirname,'public')))
app.set('views',__dirname+'/views')
app.engine('html',express_template)
app.set('view engine','html')
    
  app.use(router)
    
app.listen(5433,()=>console.log('标号5433'))