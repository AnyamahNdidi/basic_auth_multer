import userModel from "../model/authModel"
import express, { Response, Request } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req:any, res:Response) :Promise<Response>=> {
     
    try
    {
        const { fullName, email, password } = req.body
        if (!fullName || !email || !password )
        {
            return res.status(401).json({
                success:0,
               message:"all field is require"
           }) 
        }

        const checkEmail = await userModel.findOne({ email : email})
        console.log(checkEmail)
        if (checkEmail)
        {
             return res.status(401).json({
                success:0,
               message:"email already exist"
           }) 
        }
        if (!req.file)
        {
            return res.status(401).json({
                message:"please upload an image"
            })
        }
        console.log("sdyuhgf",req.file)
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const createdata = await userModel.create({
            fullName,
            email,
            password: hashed,
            profileImage:req.file.filename
        })

        return res.status(201).json({
            message: "created sucessfully",
            result:createdata
        })
        
        
    } catch (error:any)
    {
        return res.status(400).json({
            message: 'failed to register user',
            error: error.message
        })
    }
}


export const LoginUser = async(req:Request, res:Response) => {
    try
    {
        const { email, password } = req.body
         const user:any = await userModel.findOne({ email: email})

        if (user)
        {
            const checkPassword = await bcrypt.compare(password, user.password)
            if (checkPassword)
            {
                const {password, ...info } = user._doc
                
                let options: any = {
                    expiresIn: "1d"
                }
                const token = jwt.sign({ id: user._id, email: user.email, fullName: user.fullName }, "readuns", { expiresIn: "3d", })
                res.cookie("sessionId", token, options)
                console.log("bhvjhsd",req.headers['cookie'])
                 return res.status(200).json({
                        message: "login success",
                        data: info,
                        token:token
,
                        // token: token
                    })
            } else
            {
                  return res.status(404).json({
            message: "wrong password",
            
        })
                
            }
        } else
        {
              return res.status(404).json({
            message: "account not found",
            
        })
        }
    } catch (error)
    {
          return res.status(404).json({
            message: error.message,
            
        })
    }
}

export const logOut = async(req:Request, res:Response) => {

    try
    {
        res.clearCookie("sessionId")
        res.setHeader('Clear-Site-Data', '"cookies", "storage"');
        return res.status(200).json({
            mesaage:"Signout successfully"
        })
        
    } catch (error){
        return res.status(404).json({
            message: error.message,
            
        })
     }
    
    
}


export const getAllstudent = async (req:Request, res:Response):Promise<Response> => {
    try
    {
        const data = await userModel.find()
        return res.status(200).json({
            message: "all student",
            length: data.length,
            result:data
        })
        
    } catch (error)
    {
         return res.status(404).json({
            message: error.message,
            
        })
        
    }
}