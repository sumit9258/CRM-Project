import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";


const storage=new CloudinaryStorage({
    cloudinary:cloudinary
})

export const upload=multer({storage})












// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/")
//     },
// filename:(req,file,cb)=>{
//     cb(null,Date.now()+"-"+file.originalname)
// }

// })


// export const upload=multer({storage})



