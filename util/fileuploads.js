const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

    //set storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../images');
    },
    //set file name
    filename: function(req, file, cb) {
        cb(null,  uuidv4())
    },
    
});

const fileFilter=(req,file,cb)=>{
    
    if(file.mimetype =='image/jpg' || file.mimetype =='image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const mulerado=multer({storage:storage},{fileFilter:fileFilter}).single('image')

module.exports=mulerado