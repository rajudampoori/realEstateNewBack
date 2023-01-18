const mongoose = require("mongoose")
const generalSchema = new mongoose.Schema({
    mobile : {type: String,required:true},
    image : {type: String,required : true},
    name : String,
    postedBy : String,
    saleType : String,
    featuredPackage:String,
    PPDPackage : String
})
const General = mongoose.model('General',generalSchema)
module.exports = General