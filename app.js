const express = require('express');

const app = express();
app.set('view engine', "ejs");
app.set('views', __dirname+ '/views');
app.use(express.static(__dirname + "/public"));
app.use(express.json())


app.use('/', require('./router/rutasweb'))
app.use('/product', require('./router/productRouter'))


app.listen(3000,()=>{
    console.log('corriendo en el puerto 3000');
})

