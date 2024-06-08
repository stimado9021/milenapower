const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan')
const Swal = require('sweetalert2')
require('dotenv').config()
//const MongoStore = require('connect-mongo');
const acceso = require('./midleware/acceso');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.set('view engine', "ejs");
app.set('views', __dirname+ '/views');
app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(morgan())


const port =process.env.PORT || 3000;
// const user = process.env.USERDATABASE
// const password= process.env.PASSWORDDATABASE;
// const database = process.env.DATABASE;
const uri=process.env.URI

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('base de datos conectada'))
.catch(e=>console.log(e));

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:process.env.ENVIRONMENT === 'production' ? "true" : "auto",
        httpOnly:true,
        expires:1000*60*60*24*7,
        sameSite:process.env.ENVIRONMENT === 'production' ? "true" : "lax"
    }
   
}))

app.use('/', require('./router/rutasweb'))
app.use('/usuario' ,require('./router/usuarioRouter'))
app.use('/product', require('./router/productRouter'))


app.listen(port,()=>{
    console.log('corriendo en el puerto ' + port);
})

