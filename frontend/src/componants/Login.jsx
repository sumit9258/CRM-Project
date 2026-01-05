import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import log from "../assets/log.png";
import logUser from "../assets/logU.png";
import google from "../assets/google2.png";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [inp,setInp]=useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
try {
  let res=await fetch("http://localhost:3000/api/auth/login",{
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
  console.log(result);
  
  
} catch (error) {
  console.log(error);
      toast.error(result.message,"envailid ")
  
}
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
        if (res.ok) {
            toast.success("register successfully")
          }
            toast.error("envailid ")
        res=await res.json()
        console.log(res);
        
      } catch (error) {
        console.log(error);
        
      }
    }
  

  return (
    <>
      <div className="flex min-h-screen ">
        <div className="flex-col space-y-5 pl-25 pt-20 w-1/2 bg-[#101922]">
          <div>
            <h2 className="flex text-3xl font-bold items-center text-[#FFFFFF]">
              {" "}
              <img className="w-20" src={logo} />
              SalesForce One
            </h2>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#FFFFFF]">Welcome Back</h2>
            <p className="text-[#94A3B8]">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <form className="space-y-5 w-110" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="text-[#FFFFFF]">Email address</label> <br />
                <Mail size={20} className="absolute  left-3 top-1/2 text-[#9CABBA]" />
                <input
                  className="border placeholder:pl-2 w-full pl-10 h-12 text-[#FFFFFF] placeholder:text-[#9CABBA] bg-[#1B2127] rounded-lg"
                  placeholder="name@gmail.com"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />
            </div>
            <div className="relative">
              <label className="text-[#FFFFFF]">Password</label> <br />
                  <button type="button" onClick={()=> setInp(!inp)} className="absolute text-[#9CABBA] right-3 top-1/2">
                 {inp? <Eye size={20}/>: <EyeOff size={20}/>}
              
                  </button>
          
              <Lock className="absolute text-[#9CABBA] left-3 top-1/2" size={20}/>
              <input
                className="border placeholder:pl-3 pl-10 w-full h-12 pr-10 text-[#FFFFFF] placeholder:text-[#9CABBA] bg-[#1B2127] rounded-lg"
                type={inp?"text":"password"}
                name="password"
                onChange={handleChange}
                value={data.password}
              />
            </div>
            <button className="text-[#2563EB]  ml-80">Forget Password</button>
            <button
              className="border w-full h-12 p-1 pl-10 pr-10 bg-[#2563EB] rounded-lg"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <div>
            <p className="text-[#64748B]">Or continue with</p>
            <button onClick={handleGoogle} className="flex items-center justify-center bg-[#1E252B] border w-110 h-12 p-1 text-[#FFFFFF] pl-10 pr-10 rounded-lg">
              <img src={google} className="w-10" />
              Google
            </button>
          </div>
          <p className="text-[#64748B]">
            Don't have an account?
            <Link className="text-[#4373AD] font-bold" to="/">
              {" "}
              Sign up for a trial
            </Link>
          </p>
        </div>

        <div className="min-h-screen w-1/2 bg-black/50 relative">
          <img className="w-full h-full object-cover " src={log} />

          <div className="absolute bottom-0 pb-20 left-20">
            <div>
              <h2 className="text-3xl pb-10 fond-bold text-[#FFFFFF]">
                "SalesForce One transformed how our team
                <br />
                tracks revenue. The interface is simply the <br />
                fastest on the market."
              </h2>
            </div>

            <div className="flex gap-4">
              <img src={logUser} className="w-12 rounded-full" />
              <div>
                <h2 className="text-[#FFFFFF]">Alex Morgan</h2>
                <p className="text-[#94A3B8]">VP of Sales, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
