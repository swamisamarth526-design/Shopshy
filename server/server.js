const path = require("path")
const express = require("express")
const app = express()
const cors = require("cors")

const envPath = path.resolve(__dirname, ".env")
const rootEnvPath = path.resolve(__dirname, "..", ".env")
if (require("fs").existsSync(envPath)) {
  require("dotenv").config({ path: envPath })
} else if (require("fs").existsSync(rootEnvPath)) {
  require("dotenv").config({ path: rootEnvPath })
} else {
  require("dotenv").config()
}

const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "..", "client", "build")))

// connect to the mongodb database
connectDB()

app.use('/api/items', require("./routes/items"))
app.use('/api/payment', cors(), require("./routes/payment"))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
})

app.listen(PORT, console.log("Server is running on port ", PORT))