export const IsAuth=async(req,res,next)=>{
    try {
        const token=req.cookies.token
         if (!token) {
            return res.status(400).json({message:"token not found"})
         }
    } catch (error) {
        console.log(error);
        
    }
}