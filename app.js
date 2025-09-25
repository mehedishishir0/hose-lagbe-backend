require("dotenv").config()
const express = require("express")
const cors = require("cors")
const createError = require("http-errors")
const { errorResponse } = require("./response/response")
const connectDB = require("./config/dbConfig")
const userRouter = require("./routes/userRoute")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/api/v1/auth", userRouter)

const port = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Hello from the backend")
})

app.use((req, res, next) => {
    next(createError(404, "Route not found"))
})


app.use((error, req, res, next) => {
    errorResponse(res, {
        statusCode: error.statusCode,
        message: error.message,
    });
});

app.listen(port, async () => {
    connectDB()
    console.log(`Server is running on port ${port}`)
})