var {getUser} =require('../controllers/user')
var conn = require('../dbconn')

module.exports =  async function (context, req) {
    await conn.connection(context);
    await getUser(context,req);
}

