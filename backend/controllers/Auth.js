import UserModel from "../models/UserModel.js";
import getToken from "../utils/token.js";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt"

configDotenv()

export const Register=async(req,res)=>{
    try {
        const {name,email,password,repassword}=req.body
        let user=await UserModel.findOne({email})
        if (user) {
            return res.status(400).json({message:"user already exist"})
        }
        if (password.length<6) {
            return res.status(400).json({message:"please enter 6 digit password"})
        }

        if (password!=repassword) {
            return res.status(400).json({message:"password is not match"})
            
        }

        const hashPass=await bcrypt.hash(password,10)

        user=await UserModel.create({name,email,password:hashPass})
        
        const token=await getToken(user._id)
        console.log("token",token);
        
        res.cookie("token", token, {
        httpOnly: true,   
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        });

    

        return res.status(201).json(user)

    } catch (error) {
        console.log(error);
        
    }
}

export const Login=async(req,res)=>{
    try {
        const {email,password}=req.body
        let user=await UserModel.findOne({email})
        if (!user) {
            return res.status(400).json({message:"user is not register"})

        }

       const checkPass=await bcrypt.compare(password,user.password)

 if (!checkPass) {
            return res.status(400).json({message:"password is wrong"})
        }
        

        const token=await getToken(user._id)
        console.log("token",token);
        
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user)

    } catch (error) {
        console.log(error);
        
    }
}



export const GoogleLogin=async(req,res)=>{
    try {
        const {name,email}=req.body
        let user=await UserModel.findOne({email})
        if (!user) {
        user=await UserModel.create({name,email})
        }

        
        const token=await getToken(user._id)
        console.log("token",token);
        
        res.cookie("token", token, {
        httpOnly: true,   
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        });

    

        return res.status(201).json(user)

    } catch (error) {
        console.log(error);
        
    }
}
