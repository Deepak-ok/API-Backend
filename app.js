const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 4000;
const web=require('./Routes/web')
const connectDB=require('./DB/connectDB')
const fileUpload=require('express-fileupload')



const cookieParser=require('cookie-parser')
app.use(cookieParser())


connectDB()
app.use(fileUpload({ useTempFiles: true }));

app.use(express.json()); //because comes in json format


app.use('/api',web)  //localhost:8000/api

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`)
})
