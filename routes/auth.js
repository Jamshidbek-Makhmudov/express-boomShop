import { Router } from "express"
const router = Router()

router.get("/login", (req, res) => {
  res.render("login", { title: "login", isLogin: true }) //routerda render qilganimzda paramertni 2-sida optional qilib titleni jonatib yuborsak boladi
  //keyin uni hbs head da tutib olib titleni qoyib qoysak boladi
  //isLogin ni ham true qilib uni props qilib jonatib navbar.hbs tutib olib if else orqali true bolsa active qil yoki qilma deb qoysak boladi
})

router.get("/register", (req, res) => {
  res.render("register", { title: "Sign-up", isRegister: true })
})

//login modulda buttonni bosgan about modulga jonatib yuboradi
router.post("/login", (req, res) => {
  console.log(req.body)
  res.redirect("/about")
})

//register modulda buttonni bosgan about modulga jonatib yuboradi
router.post("/register", (req, res) => {
  console.log(req.body)
  res.redirect("/about")
})
export default router
