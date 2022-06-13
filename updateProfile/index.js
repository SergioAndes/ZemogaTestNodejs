var mongoose = require('mongoose')
var {updateUser} =require('../controllers/user')
var parseMultipartFormData = require("@anzp/azure-function-multipart").default;
var conn = require('../dbconn')

module.exports =  async function (context, req) {

    let formDataReq={}
    await conn.connection(context);

    try{
      const { fields, files } = await parseMultipartFormData(req);
      formDataReq = {
        fields,
        files,
      };
    }catch(err){
      context.res = {
        body: {errorMessage:'Please send only multipar FormData type to this endpint'},
        status:400
      };
    }
    
    await updateUser(context,formDataReq);
}