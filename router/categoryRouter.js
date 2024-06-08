const express = require('express')
const router = express.Router()

const session = require('express-session')
const Category = require('../models/categoryModel')


router.get('/',async(req,res)=>{  
    var message='';
    try {
        const arrayCategory = await Category.find()
       
        if(req.session.message &&  req.session.message!=undefined){            
           message = req.session.message   
           req.session.destroy   
        }  
        
        res.render('category',{cate:arrayCategory,isLogin:req.session.isLogin,users:req.session.users,message:message});
    } catch (error) {
        console.log(error)
    }    
   
})

router.get('/create',(req,res)=>{   
       res.render('createCategory',{isLogin:req.session.isLogin,users:req.session.users})
})

router.get('/:id',async(req,res)=>{   
    const id = req.params.id
    const cate = await Category.findOne({_id:id})   
    res.render('editCategory',{cate:cate,isLogin:req.session.isLogin,users:req.session.users})
})

router.put('/',(req,res)=>{
    console.log(req.body)
    res.render('category')
})


router.post('/', async(req,res)=>{
   const cate =  req.body
    try {
        await Category.create(cate)
     req.session.message='Categoria Guarddado Satisfactoriamente';
        res.redirect('/category')
    } catch (error) {
        console.log(error)        
    }
})

router.post('/update',async(req,res)=>{
    
    const {id}=req.body
    const body = req.body
        const cate = await Category.findByIdAndUpdate(id,body,{useFindAndModify:false})
       
    res.redirect('/category')
})


   
  


module.exports = router