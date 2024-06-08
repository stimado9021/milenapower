const mongoose  = require('mongoose')
const Schema= mongoose.Schema;

const usuarioSchema = new Schema(
    {
            usuario:{
                type:String
            },
            password:{
                type:String
            },
 
    },
        {
            timestamps:true
        }
)
const Usuario = mongoose.model('usuario',usuarioSchema)

module.exports = Usuario;