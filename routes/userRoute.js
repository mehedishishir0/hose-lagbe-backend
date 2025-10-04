const { userGet, login, sginUp } = require("../controllers/userControllers");

const userRouter = require("express").Router();


userRouter.get("/",userGet)
userRouter.post("/login",login)
userRouter.post("/signup",sginUp)


module.exports = userRouter