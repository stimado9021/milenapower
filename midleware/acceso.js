const express = require('express')

const acceso = (req,res,next)=>{
    const auth = req.session.isLogin
    if(auth){
        next();
    }else{
        res.render('error404',{message:'Acceso Invalido'})
    }
    next();
}