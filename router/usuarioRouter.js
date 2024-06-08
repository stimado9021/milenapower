const express = require('express')
const router = express.Router()
const session = require('express-session')
const Usuario = require('../models/usuarioModel')


router.get('/',(req,res)=>{
   console.log(req.session.users)
   res.render('dashboard',{users:req.session.users,isLogin: req.session.isLogin})
})

router.get('/profile',(req,res)=>{
   res.render('profile')
})

router.post('/',async(req,res)=>{
 const {usuario,password} = req.body;
 
 const user = await Usuario.find({usuario:usuario}).exec();
 const logger = user[0];
 
 if(!logger){  
    res.render('error404',{message:' Usuario No Esta En Base de Datos '})
 }

if(logger.password !== password){
   
    res.render('error404',{message:' falla al autentificar usuario '})
} 

req.session.isLogin=true;
req.session.users=usuario;  
    
res.redirect('usuario')
                
});



module.exports = router