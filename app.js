import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import conn from './server.js'
import userRoutes from './routes/user.js'

const app =express()

//Json req parser
app.use(bodyParser.json())

//static folder for images
//app.use('/images',express.static(path.join(__dirname,'images')))

//views
app.set('view engine','ejs')
app.set('views','views')

//allowed headers
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next();
});

//routes
app.use('/user',userRoutes)


//Database Connection
conn();

export default app