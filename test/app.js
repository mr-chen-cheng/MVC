let express = require('express')
let app = express()
let Router = require('./Router')
app.use('/api',Router)
app.listen(3399,()=>console.log('server running at port 3399'))

