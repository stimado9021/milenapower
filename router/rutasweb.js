const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuarioModel')
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')


router.get('/',async(req,res)=>{ 
    console.log(req.session) 
    // Category.create(
    //     {
    //     name:'bebidas'
    // }
// )
    res.render('index');
})
router.get('/logout',(req,res)=>{
    delete req.session.users
    delete req.session.isLogin
    res.redirect('/')

})




module.exports = router