import React, { useContext,useEffect,useState } from 'react'
import axios from 'axios'
import mycontext from '../Context/Context'
import GetTID from './Hooks/Getteacherid'
import GetTname from './Hooks/Getteachername'
export default function ParentRegistration() {
  const {baseURL} = useContext(mycontext)
  const [batchnumber,setBatchNumber]=useState("")
  console.log("batch",batchnumber)
  const teacherID = GetTID()
  const teacherName = GetTname()
  const [Parentregister, setparentRegister] = useState({
    studentname: "",
    parentname: "",
    email: "",
    batch: "",
    password: "",
    parentphone: "",
    status: "",
    rollno:"",
  });
  console.log("parent",Parentregister)
  const handleChange = (key,value) =>{
  setparentRegister({...Parentregister,[key]:value})
  }

  useEffect(()=>{
  getteachers()
  },[teacherID])

const getteachers=async()=>{
  try {
    const response= await axios.get(`${baseURL}/Teacher/find/${teacherID}`)
    console.log(response.data.user)
    setBatchNumber(response.data.user.batchnumber)
  } catch (error) {
    console.log(error)
  }
}


const handleSubmit = async() =>{
try{
const response = await axios.post(`${baseURL}/Parent/register`,Parentregister,{
  params:{
    teacherid : teacherID,
    batchn:batchnumber
  }
})
alert(response.data.message)
}
catch(error)
{
alert(error.response.data.message)
}
}
  return (
    <div>
       <input
     value={Parentregister.rollno}
     placeholder='Rollno...'
     onChange={(e)=>handleChange("rollno",e.target.value)}
     />
      <input
     value={Parentregister.studentname}
     placeholder='studentname...'
     onChange={(e)=>handleChange("studentname",e.target.value)}
     />
     <input
     value={Parentregister.parentname}
     placeholder='parentname...'
     onChange={(e)=>handleChange("parentname",e.target.value)}
     />

     <input
      value={Parentregister.email}
      placeholder='Email...'
      onChange={(e)=>handleChange("email",e.target.value)}
     />
    
     <select  onChange={(e)=> handleChange("batch",e.target.value)} >
    <option   value="Select a Batch">Select a Batch</option>
      <option value="10A">10A</option>
      <option value="10B">10B</option>
      <option value="10C">10C</option>
      <option value="10C">10D</option>
      <option value="10C">9A</option>
      <option value="10C">9B</option>
      <option value="10C">9C</option>
      <option value="10C">9D</option>
      <option value="10C">8A</option>
     </select>
     
  
     <input
        value={Parentregister.password}
        placeholder='Password...'
        onChange={(e)=>handleChange("password",e.target.value)}
     />
      <input
      value={Parentregister.parentphone}
      placeholder='Parentphone...'
      type='number'
      onChange={(e)=>handleChange("parentphone",e.target.value)}
     />

   <select style={{position:"relative"}}  onChange={(e) => handleChange("status", e.target.value)}>
   
  <option value="status">Status</option>
  <option value="MOTHER">MOTHER</option>
  <option value="FATHER">FATHER</option>
  <option value="BROTHER">BROTHER</option>
  <option value="SISTER">SISTER</option>
  <option value="GRANDFATHER">GRANDFATHER</option>
  <option value="GRANDMOTHER">GRANDMOTHER</option>
 
</select>

  
     <button onClick={handleSubmit}>Register</button>
    </div>
  )
}
