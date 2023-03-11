import express from "express"
import routes from "./routes/routes.js"
import cors from "cors"

const app = express()
app.use(express.json())


 const whitelist = ["http://localhost:3000"]

 const corsOptions = {
 origin: function(origin, callback){
     if(whitelist.includes(origin)){
         callback(null,true)
     }
     else{
         callback(new Error("Error de Cors"))
     }
 }

 }

 app.use(cors(corsOptions))


app.use("/api", routes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`)
})


