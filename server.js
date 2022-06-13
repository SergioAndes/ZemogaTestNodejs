import app from './app.js'
import mongoose from 'mongoose'


const conn = (tesr)=>{
    mongoose.connect(
        'mongodb+srv://root:root@cluster0.xscsg.mongodb.net/?retryWrites=true&w=majority')
        .then(result =>{
            //console.log(result)
        app.listen(4000)
    })
    .catch(err=>
        {
            console.log(err)
        })

}  

export default conn