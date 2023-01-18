const mongoose = require("mongoose")
const estateSchema = new mongoose.Schema({
    ppdid:String,
    image : String ,
    property : String, 
    contact : Number,
    area :   Number, 
    views : Number,
    daysleft : Number,
},{timestamps:true})
const Listings = mongoose.model('Estate',estateSchema)
module.exports = Listings;