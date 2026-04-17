const mongoose = require("mongoose")

mongoose.set('strictQuery', false)

const connectDB = async () => {
    const uri = process.env.MONGO_URI
    if (!uri) {
        console.error("Error: MONGO_URI is not defined. Set it in server/.env or Railway environment variables.")
        process.exit(1)
    }
    try {
        const conn = await mongoose.connect(uri)
        console.log("Mongo DB Connected: ", conn.connection.host)
    }
    catch(err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB