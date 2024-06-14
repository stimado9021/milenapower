const mongoose  = require('mongoose')
const Schema= mongoose.Schema;

const providerSchema = new Schema(
    {
        name:{
            type:String
        },   
    },
    {
        timestamps:true
    }
)
const Provider = mongoose.model('provider',categorySchema)

module.exports = provider;