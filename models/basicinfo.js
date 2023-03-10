const mongoose = require("mongoose")
const basicSchema = new mongoose.Schema({
    propertyType : {type: String,required:true},
    negotable : String,
    price :Number,
    ownership : String,
    propertyAge:String,
    propertyApproved:String,
    propertyDescription :String,
    bankLoan: String
})
const Basics = mongoose.model('Basics',basicSchema)
module.exports = Basics