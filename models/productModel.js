const mongoose  = require('mongoose')
const Schema= mongoose.Schema;

const productSchema = new Schema(  {
    producto:{
        type:String,            
    },
    descripcion:{
        type:String
    },
    categoria:{
        type:String
    },
    presentacion:{
        type:String
    },
    stock:{
        type:Number,
        default:0
    },
    costo:{
        type:Number
    },
    precio:{
        type:Number
    }
},
{
 timestamps:true   
})
const Product = mongoose.model('products',productSchema)

module.exports = Product;