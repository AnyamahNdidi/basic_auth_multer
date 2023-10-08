import multer from "multer"
import express, { Request } from "express"
import path from "path"

type callBackDestinaton = (err: Error | null, destination:string ) => void
type fileNameCallBack = (err: Error | null, filename:string ) => void
    
const storage = multer.diskStorage({
    destination: function (req:Request, file:any, cb:callBackDestinaton) {
        cb(null, path.join(__dirname, "../uploads"))
    },

    filename: function (req: Request, file: any, cb: fileNameCallBack) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null,   file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
    }

})

const upload = multer({ storage: storage }).single("avatar")

export default upload