const express=require("express")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {teacherModel} = require('../Model/TeacherSchema')
const { parentModel } = require("../Model/ParentShema")
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;


router.post("/register", async (req, res) => {
    try {
      const { username, email, password,batch, status ,specialization} = req.body;
  
      console.log("reqbdy", req.body);
  
      if (!username || !email || !password||!batch || !status || !specialization) {
        return res.status(400).json({ message: "Empty Fields !!!" });
      }
  
      const teacher = await teacherModel.findOne({ email });
  
      if (teacher) {
        return res.status(400).json({ message: "Email already in use !!!" });
      }
  
      const isExistClass = await teacherModel.findOne({ batch });
      console.log("classname", isExistClass);
  
      if (isExistClass) {
        return res.status(400).json({ message: "Classname is already taken" });
      }
  
      const isEmailValid = mailformat.test(email) && txt.test(email);
  
      if (!isEmailValid) {
        return res.status(400).json({ message: "Enter a valid email" });
      }
  
      if (!password.match(passformat)) {
        return res.status(400).json({
          message: "Password should contain at least 8 characters, one uppercase character, one lowercase character, one digit, and one special character",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newTeacher = new teacherModel({ email, password: hashedPassword,batch, username, status ,specialization});
      await newTeacher.save();
  
      res.status(200).json({ message: "Faculty Registration Successful" });
    } catch (error) {
        console.log("Error in Faculty Registration", error);
      res.status(400).json({ message: "Error in Faculty Registration", error });
    }
  });
  


router.post("/login",async(req,res)=>{
    try{
    const {email,password} = req.body
    const teacher=await teacherModel.findOne({email})
    if(!email || !password)
    {
        return res.status(400).json({message:"empty fields"})
    }
   
    if(!teacher){
        return res.status(400).json({message:"Invalid Account !!!"})
    }
   
    const isPasswordValid= await bcrypt.compare(password,teacher.password)

    if(!isPasswordValid)
    {
        return res.status(400).json({message:"Invalid password !!"})
    }

    const token = JWT.sign({id : teacher._id},"secret")
    res.status(200).json({message:"Successfully logged-in",token:token,tID:teacher._id,tname:teacher.username,tclass:teacher.batch})
}
catch(error)
{
     res.status(400).json({message:"Error in Faculty Login!!!"})
}


})
router.get("/getallteachers",async(req,res)=>{
    try{
      if(req.query.parentid)
      {
        const parent = await parentModel.findById(req.query.parentid)
        //teacher of the student of that particular parent based on batch provided by parent
        const data = await teacherModel.find({batch:parent.batch})
       return res.status(200).json({teacher:data})
      }
      else{
        const data = await teacherModel.find({})
      return  res.status(200).json({teacher:data})
      }
    
    }
    catch(error){
        return res.status(400).json({message:"Unable to fetch teachers"})
    }
})
router.post("/passreq/:id",async(req,res)=>{
  try{
   const {prevpassword} = req.body
    const data = await teacherModel.findById(req.params.id)
    const isPasswordValid= await bcrypt.compare(prevpassword,data.password)
    if(!isPasswordValid)
    {
     return res.status(400).json({message:"Password Update request failed..."})
    }
     return  res.status(200).json({message:" verified... You can now provide a new password...",grant:true})
 
  }
  catch(error){
      return res.status(400).json({message:"Unable to Update"})
  }
})
//update password
router.put("/updatepassword/:id",async(req,res)=>{
  try{
   const {password,confirmation} = req.body
   if(!password || !confirmation)
   {
    return res.status(400).json({message:"Empty fields..."})
   }
   if(password !== confirmation)
   {
    return res.status(400).json({message:"Confirmation Missmatch..."})
   }
   if (!password.match(passformat))
   {
    return res.status(400).json({ message: "Password should contain at least 8 characters, one uppercase character, one lowercase character, one digit, and one special character"})
   }
   const hashedPassword = await bcrypt.hash(password,10)

    const data = await teacherModel.findByIdAndUpdate(req.params.id,{password:hashedPassword})
      res.status(200).json({message:" Successfully Updated..."})
 
  }
  catch(error){
       res.status(400).json({message:"Unable to Update"})
  }
})
router.put("/update/:id",async(req,res)=>{
  try{
   const {username,email,status,specialization} = req.body
   if(!username|| !email || !status || !specialization)
   {
    return   res.status(400).json({message:"Empty fields..."})
   }
    const data = await teacherModel.findByIdAndUpdate(req.params.id,{username,email,status,specialization})
      res.status(200).json({message:"Profile Successfully Updated..."})
 
  }
  catch(error){
       res.status(400).json({message:"Unable to Update"})
  }
})
router.get("/find/:id",async(req,res)=>{
    try{
        console.log("id",req.params.id)
       const User = await teacherModel.findById(req.params.id)
        res.status(200).json({user:User})
    }
    catch(error){
        res.status(400).json({message:"Unable to fetch individual user",error})
    }
})
router.delete("/delete/:id",async(req,res)=>{
  try{
      console.log("id",req.params.id)
     const User = await teacherModel.findByIdAndDelete(req.params.id)
      res.status(200).json({message:"Successfully deleted..."})
  }
  catch(error){
    console.log("error",error)
      res.status(400).json({message:"Unable to Delete",error})
  }
})

module.exports=router