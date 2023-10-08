import express, { Router } from "express";
import jwt from "jsonwebtoken"
import upload from "../middleware/multer"

import { registerUser, LoginUser, logOut, getAllstudent} from "../Controller/userContoller"
const router = express.Router();

const verifyToken = async (req:any, res:any, next:any) => {
    const getSession = req.headers["cookie"]

    if (!getSession)
    {
        return res.status(404).json({
            message: "please login in, to get token "
        })
    }

    const tokencookies = await getSession.split("=")[1]
    console.log("ghsd", tokencookies)
    if (tokencookies)
    {
        const token = await tokencookies
        jwt.verify(token, "konderlnskbdfvjkdbfvjkdn", (err:any, payload:any)=> {
            if (err)
            {
                return res.status(404).json({
                    message:"token expire"
                })
            }
            req.user = payload
            // next()
        })

    } else
    {
        return res.status(404).json({
           mesage:"please provide a valid token"
       }) 
    }
}




router.route("/create-user").post(upload, registerUser)
router.route("/login-user").post(LoginUser)
router.route("/logout-user").post(logOut)
router.route("/all-user").get(verifyToken,  getAllstudent)

export default router