const mongoose= require("mongoose")

const Model= new mongoose.Schema({
    studenentid:String,
    studentname:String,
    batch:String,
    Immunization:String,
    Vision:String,
    Hearing:String,
    MentalHealth:String,
    PhysicalExamination:String,
    NutritionStatus:String,
    Finalreport:String
})

const HealthSchema= mongoose.model("HealthSchema",Model)

module.exports= HealthSchema