const express = require('express')
const router = express.Router()


router.get('/',async(req,res)=>{  
    res.render('index',{titulo:'Power Milen Market buenos aires'});
})

module.exports = router