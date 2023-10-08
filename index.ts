import "./database/db"
import express,{Application} from "express"
import cors from "cors"
import userRouter from "./router/userRouter"
import morgan from "morgan"


const port:number = 9078
const app:Application = express()


app.use(express.json())
app.use(cors())
// app.use(morgan())
app.use("/api/v1", userRouter)



app.use("/uploads", express.static("uploads"));

const server = app.listen(port, () => {
    console.log("port is up and running", port)
})

process.on("uncaughtException", (error:any) => {
    console.log("uncaught exception happened", error)
    process.exit(1)
})

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  console.log("Unhandled Promise Rejection:");
  console.log("Reason:", reason);
    console.log("Promise:", promise);
    

  // Additional error handling logic if needed
    
      server.close(() => {
        process.exit(1)
    })
});