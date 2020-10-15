const express = require('express');
const router = express.Router();
const url = require('url');
/// to reqister a user 
// const axios = require('axios');
var axios = require('axios');


router.post('/',async (req,res)=>{
    var data = {
        "email":req.body.email,
        "password" : req.body.password
    };
    var config = {
        method: 'post',
        /// todo handle with env variables
        url: 'http://localhost:8080/api/logins',
        headers: { },
        data : data
      };
    const response = await axios(config);
    res.send(response.data ).status(200);
});
module.exports = router ;