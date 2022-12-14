const express = require('express')
const cors  = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const user = require('./routes/user')
const auth = require('./routes/auth')
const data = require('./routes/data')
const products = require('./routes/products')
const updateProduct = require('./routes/updateProduct')


//Database
dotenv.config()
mongoose.connect(process.env.MONGO_URI)
 .then(console.log('successfully connected'))
 .catch((err)=>{console.log(err)})

const app = express()
app.use(cors()) // Use this after the variable declaration

//ROUTES
app.use('/api/users',user)
app.use('/api/auth',auth)
app.use('/api/mongo/products',products)
app.use('/api/updateProduct', updateProduct)
app.use('/api',data)

// app.post('/',(req,res)=>{
    
// })

//SERVER
const port = process.env.PORT || 5000;
app.listen(port,(req,res)=>{
    console.log(`port running at http://localhost:${port}`)
})