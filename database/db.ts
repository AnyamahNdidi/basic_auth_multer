import mongoose from "mongoose";

const url:string = "mongodb://0.0.0.0:27017/userAth"

mongoose.connect(url).then(() => {
    console.log("Connected successfully")
}).catch((error) => {
    console.log("Failed to connect", error)
})

export default mongoose