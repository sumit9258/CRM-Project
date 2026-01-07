import { ListFilter, LogOut, Plus, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Setting() {
    const navigate=useNavigate()

    const HandleLogout=async()=>{
        try {
            let res=await fetch("http://localhost:3000/api/auth/logout",{
                method:"POST",
                credentials:"include"
            })
            navigate("/login")
        } catch (error) {
            console.log(error);
            
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


<div className="flex items-center mt-10 justify-between">

<div className="text-white flex gap-5 ">
    <select name="" id="" className="bg-[#283039] px-4 h-10 rounded-lg">
        <option value="this month">This Month</option>
        <option value="this month">This Year</option>
        <option value="this month">This Quarter</option>
        <option value="this month">Last Month</option>
    </select>
    <select className="bg-[#283039] rounded-lg px-4 ">
        <option value="this month">All Category</option>
        <option value="this month">Enterprise</option>
        <option value="this month">Consulting</option>
        <option value="this month">SMB</option>
    </select>
</div>

<div className="text-white flex gap-4">
    <button className="bg-[#283039] flex gap-2 items-center rounded-lg p-2 w-25"><ListFilter />Filter</button>
    <button onClick={HandleLogout} className="bg-[#2563EB] w-30 font-semibold pl-4 gap-2 flex rounded-lg items-center"><LogOut />Log Out</button>
</div>


</div>



<div className='p-10'>

<div>
    <h2 className='text-lg font-bold text-white mb-1'>Profile Information</h2>
    <p className='text-sm text-[#9cabba]'>Update your photo and personal details here.</p>
</div>

<div className="bg-[#1a1d21]  border mt-5 border-[#283039] rounded-xl p-6">

<div className='flex'>


    <div className='flex flex-col  w-40'>
        <div className='w-24 h-24 rounded-full border-4 border-[#283039]'>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
        </div>
        <div>
    <input type="file" accept='image/*' className='hidden' id='profileimg'/>
<label className='text-sm text-primary text-blue-500 font-medium hover:text-blue-400' htmlFor='profileimg'>change Image
</label>
        </div>

    </div>
    
    <div className='w-full space-y-5'>


    <div>
        <label className='text-sm font-medium text-[#9cabba]'>Full Name</label> <br/>
    <input className="w-full bg-[#283039] border-transparent focus:border-primary focus:ring-0 rounded-lg text-white text-sm py-2.5 px-4 placeholder-[#5c6b7a]" type="text" name='fullname' />

    </div>
    
    <div>
        <label className='text-sm font-medium text-[#9cabba]'>Email Address</label> <br/>
    <input type="text" name='fullname' className='w-full bg-[#283039] border-transparent focus:border-primary focus:ring-0 rounded-lg text-white text-sm py-2.5 px-4 placeholder-[#5c6b7a]' />

    </div>
    <div>
        <label className='text-sm font-medium text-[#9cabba]'>Bio</label> <br/>
<textarea placeholder='enter bio' className='w-full bg-[#283039] border-transparent focus:border-primary focus:ring-0 rounded-lg text-white text-sm py-2.5 px-4 placeholder-[#5c6b7a]'></textarea>
    </div>

   <div className='flex mt-5 justify-end'>
    <button className='bg-primary bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-primary/20'>Save Changes</button>
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
