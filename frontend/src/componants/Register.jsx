import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import abc from "../assets/goggle.png";
import abb from "../assets/register.png";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { Mail,Eye,Star,User, EyeOff, MoveRight } from 'lucide-react';
import {GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import { auth } from "../../firebase";
import { toast } from "react-toastify";


function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

    const [inp,setInp]=useState(false)
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
try {
  let res=await fetch("http://localhost:3000/api/auth/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },credentials:"include",
    body:JSON.stringify(data)
  })
 let result=await res.json()

   if (res.ok) {
        toast.success("register successfully")
      }else{
        toast.error(result.message||"envailid ")
        
      }

  console.log(res);
  
  
} catch (error) {
  console.log(error);
        toast.error("envailid ")

  
}
    console.log(data);
  };




  const handleGoogle=async()=>{
    const provider=new GoogleAuthProvider()
    const result=await signInWithPopup(auth,provider)
    console.log(result);
    
    try {
      let res=await fetch("http://localhost:3000/api/auth/google/auth",{
        method:"POST",
        headers:{"Content-Type":"application/json"}
        ,credentials:"include",
        body:JSON.stringify({name:result.user.displayName,email:result.user.email})
      })
      res=await res.json()
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
  }



  return (
    <>
      <div className="flex  min-h-screen">
        <div className="flex pt-20 w-1/2 flex-col items-center space-y-6 justify-center bg-[#101922]">
          <div className="text-xl space-y-3">
            <h2 className="text-4xl text-[#FFFFFF] font-bold">Create your account</h2>
            <p className="text-[#94A3B8]">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <div>
            <button onClick={handleGoogle} className="flex items-center justify-center w-110 h-12 rounded-lg border bg-[#1B2127] text-[#FFFFFF] ">
              <img src={abc} alt="google image" className="w-5" />
              Sign up with Google
            </button>
          </div>

          <div>
            <p className="flex-grow text-[#7A889B]">Or sign up with email</p>
          </div>

          <form className="space-y-6 w-110" onSubmit={handleSubmit}>
            <div>
              <label className="text-[#C7D1DD]">Name</label> <br />
              <div
              className="relative  ">
                <User size={18} className="absolute right-3 top-3 text-[#C7D1DD]" />
                <input
                  placeholder="e.g John Doe"
                  className="border pl-5 border-gray-700 focus:border-blue-500 outline-none w-full h-12 placeholder:pl-2 rounded-lg  text-[#FFFFFF] bg-[#1B2127]"
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                />
              </div>
            </div>

            <div>
              <label className="text-[#C7D1DD]">Email address</label>
              <br />
              <div className="relative">
             <Mail className="text-[#C7D1DD] absolute right-3 top-3" size={18}/>
              <input
                placeholder="name@company.com"
                type="text"
                name="email"
                className="border pl-5 border-gray-700 focus:border-blue-500 outline-none placeholder:pl-3 w-full h-12 text-[#FFFFFF] placeholder:text-[#9CABBA] bg-[#1B2127] rounded-lg"
                onChange={handleChange}
                value={data.email}
                />
                </div>
            </div>
            <div>
              <label className="text-[#C7D1DD]">Password</label>
              <br />
              <div className="relative">
                <button type="button" onClick={()=> setInp(!inp)} className="absolute right-3 top-3 text-[#C7D1DD]">
{inp?<Eye/>:<EyeOff />}
                </button>
              <input
                type={inp?"text":"password"}
                placeholder="At least 8 characters"
                name="password"
                className="w-full border pl-5 border-gray-700 focus:border-blue-500 outline-none placeholder:pl-3 h-12 border text-[#FFFFFF] rounded-lg bg-[#1B2127]"
                onChange={handleChange}
                value={data.password}
                />
                </div>
            </div>
            <div>
              <label className="text-[#C7D1DD]">Confirm Password</label>
              <br />
              <input
                placeholder="Repeat your password"
                type="text"
                name="repassword"
                className="border pl-5 border-gray-700 focus:border-blue-500 outline-none placeholder:pl-3 text-[#FFFFFF] w-full h-12 bg-[#1B2127] rounded-lg"
                onChange={handleChange}
                value={data.repassword}
              />
            </div>
            <button
              className="hover:bg-blue-700 flex justify-center items-center text-[#FDFEFF]  w-full h-12 p-1 font-bold text-xl bg-[#2563EB] rounded-lg"
              type="submit"
            >
              Create Account <MoveRight/>
            </button>
          </form>
          <p className="text-[#94A3B8]">
Already have an account?
          <Link to="/login" className="text-[#4373AD] font-bold">
             Log In
          </Link>
          </p>
        </div>

        <div className="min-h-screen w-1/2 bg-black/50   relative">
          <img src={abb} className="w-full h-full object-cover" />

          <div className="absolute pt-10 bg-black/50 flex flex-col items-center inset-0">
            <img src={logo} alt="" />
            <h2 className="text-3xl font-bold text-[#FFFFFF]">
              Track revenue.
              <br />
              Close more deals.
            </h2>

            <p className="mt-10 text-lg text-[#CBD5E1]">
              Join over 10,000 sales professionals who use <br />
              SalesPro to organize leads, track pipelines, and <br/>
              crush their quotas.
            </p>
            <div className="mt-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-5">
              <div>
                <p className="pb-2 flex text-[#FACC15]">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </p>
              </div>
              <p className="pb-2 text-[#CBD5E1]">
                "SalesPro transformed how our team operates. The <br />
                insights are incredible and the interface is blazing fast."
              </p>
              <div className="flex  items-center">
                <img src={user} className="w-12 rounded-full" />

                <div className="ml-4">
                  <h2 className="text-[#FFFFFF]">Marcus Chen</h2>
                  <p className="text-[#CBD5E1]">VP of Sales, TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
