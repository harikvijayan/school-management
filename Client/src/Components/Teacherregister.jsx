import React, { useState } from 'react'
import axios from "axios";
import mycontext from '../Context/Context';
import {useContext } from 'react';
export default function Register() {
   const {teacherregisterdata,setteacherRegisterdata} = useContext(mycontext)
   const [toggle,setToggle] =useState(0)
  
    const handleChange = (key, value) => {
        setteacherRegisterdata({ ...teacherregisterdata, [key]: value });
    };
    const register = async () => {
        try {
            const response = await axios.post("http://localhost:5000/Teacher/register",teacherregisterdata );
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    const handleToggle = () =>{
      setToggle(1)
    }
  return (
    <div>  <label>Teachers- Account -Creation </label>
    <input
        type='text'
        value={teacherregisterdata.username}
        placeholder='username...'
        onChange={(e) => handleChange("username", e.target.value)}
    />
   
     <input
        type='text'
        value={teacherregisterdata.email}
        placeholder='Email...'
        onChange={(e) => handleChange("email", e.target.value)}
    />
     <input
        type='text'
        value={teacherregisterdata.password}
        placeholder='Password...'
        onChange={(e) => handleChange("password", e.target.value)}
    />
       <select className='me-2' onChange={(e)=>handleChange("batch",e.target.value)}>
    <option value="select" >Select your Batch</option>
    <option value="10A">10A</option>
    <option value="10B">10B</option>
    <option value="10C">10C</option>
  </select>
     <select className='me-2' onChange={(e)=>handleChange("status",e.target.value)}>
    <option value="Status" >Status</option>
    <option value="Class teacher">Class teacher</option>
   
  </select>
    <button onClick={()=>{register()}}>Register</button>
    {toggle === 1 ? <>
    
    </>:<>
    <button onClick={handleToggle} >Edit registered student data</button>
    </>}
    </div>
  )
}
