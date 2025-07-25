const mongoose=require('mongoose')

// const LocalDB='mongodb://localhost:27017/Jobs'  // in that line that jobs is a database folder on a compass

const connectDB=async () => {
    try {
          await mongoose.connect(process.env.MONGO_LIVE_URL)
      
        console.log('MongoDB Connected')
    } catch (error) {
        console.log('MongoDB connection error',error)
    }
    
}
module.exports=connectDB