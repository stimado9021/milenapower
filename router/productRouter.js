const express = require('express')
const router = express.Router()
const Swal = require('sweetalert2')
const session = require('express-session')
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')


router.get('/',async(req,res)=>{  
    var message='';
    try {
        
        const arrayProduct = await Product.find()
        console.log(req.session.users)
        if(req.session.message &&  req.session.message!=undefined){            
           message = req.session.message   
           req.session.destroy   
        }  
        
        res.render('product',{prod:arrayProduct,isLogin:req.session.isLogin,users:req.session.users,message:message});
    } catch (error) {
        console.log(error)
    }    
   
})

router.get('/create',async(req,res)=>{   
    const arrayCate = await Category.find()
       res.render('createProduct',{cate:arrayCate,isLogin:req.session.isLogin,users:req.session.users})
})


router.get('/:id',async(req,res)=>{   
    const id = req.params.id
    const prod = await Product.findOne({_id:id}) 
    const {categoria} = prod 
    const fc = await Category.find()
    console.log(fc)
    const cate = await Category.findOne({_id:categoria})
    res.render('editProduct',{fc:fc,cate:cate,prod:prod,isLogin:req.session.isLogin,users:req.session.users})
})

router.put('/',(req,res)=>{
    console.log(req.body)
    res.render('product')
})


router.post('/', async(req,res)=>{
   const prod =  req.body
    try {
        await Product.create(prod)
     req.session.message='Producto Guarddado Satisfactoriamente';
        res.redirect('/product')
    } catch (error) {
        console.log(error)        
    }
})

router.post('/update',async(req,res)=>{
    
    const {id}=req.body
    const body = req.body
        const prod = await Product.findByIdAndUpdate(id,body,{useFindAndModify:false})
        console.log(prod)
    res.redirect('/product')
})


   
  


module.exports = router