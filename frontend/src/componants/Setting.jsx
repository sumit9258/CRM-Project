import {LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

function Setting() {
    const navigate=useNavigate()
    const {user,setUser,checkAuth}=useAuth()
const [imgLoading, setImgLoading] = useState(false)
const [updateProfile, setUpdateProfile] = useState(false)

    const [picture,setPicture]=useState(null)
    
useEffect(()=>{
setProfile({fullname:user.name,email:user.email})
setPicture(user.ProfilePicture)
},[user])

    const [profile,setProfile]=useState({
        fullname:"",
        email:""
    })

    const HandleChange=(e)=>{
        const {name,value}=e.target
        setProfile((pre)=>({
            ...pre,
            [name]:value
        }))
    }


    const HandleLogout=async()=>{
        try {
            let res=await fetch("http://localhost:3000/api/auth/logout",{
                method:"POST",
                credentials:"include"
            })
            setUser(null)
            navigate("/login")
        } catch (error) {
            console.log(error);
            
        }
    }

    const UpdateProfile=async()=>{
        try {
            setUpdateProfile(true)
            let res=await fetch("http://localhost:3000/api/auth/update-profile",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify(profile)
            }
        )
        if (res.ok) {
            toast.success("updated succes fully")
        }
        } catch (error) {
            console.log(error);
            
        } finally{
            setUpdateProfile(false)
        }
    }

    const UpdateProfilePicture=async(file)=>{
        const formData=new FormData()
        formData.append("image",file)
        try {
        setImgLoading(true)

            let res=await fetch("http://localhost:3000/api/auth/update-profile-picture",{
                method:"PUT",
                credentials:"include",
                body: formData
            }
        
        )
res=await res.json()
setPicture(res.image)
checkAuth()
        } catch (error) {
            console.log(error);
            
        } finally{
            setImgLoading(false)
        }
    }



   
  return (
    <>
    <div className="bg-[#111418] flex h-screen overflow-hidden">


<div className="flex-1 ml-64 p-5 h-screen overflow-y-auto">

<div className="flex justify-between">
<div>
    <h2 className="text-white text-3xl font-semibold">Settings</h2>
    <p className="text-[#9CABBA]">Manage your preferences and integrations.</p>

</div>

<div>
</div>
</div>




<div className="text-white flex justify-end gap-4">
    <button onClick={HandleLogout} className="bg-[#2563EB] w-30 h-10 font-semibold pl-4 gap-2 flex rounded-lg items-center"><LogOut />Log Out</button>
</div>





<div className='p-10'>

<div>
    <h2 className='text-lg font-bold text-white mb-1'>Profile Information</h2>
    <p className='text-sm text-[#9cabba]'>Update your photo and personal details here.</p>
</div>

<div className="bg-[#1a1d21]  border mt-5 border-[#283039] rounded-xl p-6">

<div className='flex'>


    <div className='flex flex-col  w-40'>
       <div className='w-25 h-25 rounded-full border-3 border-[#283039] flex items-center justify-center'>
    {imgLoading ? (
        <div className="text-sm text-white animate-pulse">
            Uploading...
        </div>
    ) : (
        <img
            className='w-24 h-24 object-cover rounded-full'
            src={picture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt=""
        />
    )}
</div>

        <div>
    <input type="file" name='image' onChange={(e)=>
        {
        const file=e.target.files[0]
        if (file) {
            UpdateProfilePicture(file)
        } } 
        } accept='image/*' className='hidden' id='profileimg'/>
            
        
<label className='text-sm text-primary text-blue-500 font-medium hover:text-blue-400' htmlFor='profileimg'>change Image
</label>
        </div>

    </div>
    
    <div className='w-full space-y-5'>


    <div>
        <label className='text-sm font-medium text-[#9cabba]'>Full Name</label> <br/>
    <input onChange={HandleChange} className="w-full bg-[#283039] border-transparent focus:border-primary focus:ring-0 rounded-lg text-white text-sm py-2.5 px-4 placeholder-[#5c6b7a]" type="text" value={profile.fullname} name='fullname' />

    </div>
    
    <div>
        <label className='text-sm font-medium text-[#9cabba]'>Email Address</label> <br/>
    <input type="email" value={profile.email} onChange={HandleChange} name='email' className='w-full bg-[#283039] border-transparent focus:border-primary focus:ring-0 rounded-lg text-white text-sm py-2.5 px-4 placeholder-[#5c6b7a]' />

    </div>
    <div>
        <label className='text-sm font-medium text-[#9cabba]'>Bio</label> <br/>
<textarea placeholder='enter bio' className='w-full bg-[#283039] border-transparent focus:border-primary focus:ring-0 rounded-lg text-white text-sm py-2.5 px-4 placeholder-[#5c6b7a]'></textarea>
    </div>

   <div className='flex mt-5 justify-end'>
    <button onClick={UpdateProfile}  className={`${updateProfile?"bg-blue-400 cursor-not-allowed":"bg-blue-700 hover:bg-blue-600"} bg-primary bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-primary/20`}>{updateProfile?"Saving...":"Save Changes"}</button>
   </div>

</div>

    </div>



</div>


</div>



</div>


      </div>
    
    </>
  )
}

export default Setting
