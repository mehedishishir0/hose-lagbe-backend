require("dotenv").config()
const express = require("express")
const cors = require("cors")
const createError = require("http-errors")
const { errorResponse } = require("./response/response")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Hello from the backend")
})

app.use((req, res, next) => {
    next(createError.NotFound())
})

app.use((error, req, res, next) => {
    errorResponse(res, {
        statusCode: error.statusCode,
        message: error.message,
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})