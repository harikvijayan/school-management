import React, { useContext, useState } from 'react';
import axios from "axios";
import mycontext from '../Context/Context';
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import "./Styles/Teacherlogin.css"
import { StaffLogin } from './StaffLogin';
import teacher from "../Components/Pictures/teacher.jpg"
export default function Login() {
  const { teacherloginData, setteacherLogindata } = useContext(mycontext);
  const nav = useNavigate();
  console.log("lgindt", teacherloginData);
const [tog,setTog] = useState(false)
  const handleLoginChange = (key, value) => {
    setteacherLogindata({ ...teacherloginData, [key]: value });
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:5000/Teacher/login", teacherloginData);
      alert(response.data.message);
      localStorage.setItem("teacherID", response.data.tID);
      localStorage.setItem("teacherName", response.data.tname);
      localStorage.setItem("teacherClass", response.data.tclass);
      nav("/Home");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='parent-ad d-flex   m-5 '>
        <div className='img-container-admin '  >
 <img src={teacher} width="100%"/>
        </div>

       
            <div className='admin-form' style={{position:"relative"}} >
            <div className='icon-ad-hold d-flex justify-content-center '><PiChalkboardTeacherFill className='ad-ico ' /></div>
                {/* <h1 style={{letterSpacing:"2px"}} className='admin-title'>Admin Login</h1> */}
                <input
                 style={{letterSpacing:"2px"}}
                 className='admin-input'
                 type='text'
                 value={teacherloginData.email}
                 placeholder='Email...'
                 onChange={(e)=>handleLoginChange("email",e.target.value)}
                />
                <input
                 style={{letterSpacing:"2px"}}
                 className='admin-input'
                 type={tog ? "text" : "password"}
                 value={teacherloginData.password}
                 placeholder='Password...'
                 onChange={(e)=>handleLoginChange("password",e.target.value)}
                />
                <div className=''>
                   
                    <input type='checkbox' style={{width:"2rem"}} onChange={(e)=>setTog(!tog)}/> <label>Show Password</label>
                    <Button style={{borderRadius:"0.2rem",width:"100%",boxShadow:"0px 0px 8px 0px grey",
                
                   letterSpacing:"2px" }}  className='mt-5' onClick={()=>{login()}}>Login</Button>
                </div>
                <Link to="/Staff">Staff Login</Link>
            </div>
        </div>
  );
}
