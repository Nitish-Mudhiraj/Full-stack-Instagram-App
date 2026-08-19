const dotenv = require("dotenv")
dotenv.config()

const app = require("./src/app")
const connectToDb = require("./src/config/database")



connectToDb()
app.listen(3000, ()=>{
    console.log("server is running the 3000 port")
})