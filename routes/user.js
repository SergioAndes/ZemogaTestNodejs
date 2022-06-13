import express from 'express';


import user from '../controller/user.js'

const router = express.Router()



router.get('/:userName',user.getUser);
router.post('/',user.createUser);



export default router