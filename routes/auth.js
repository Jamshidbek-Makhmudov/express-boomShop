import { Router } from "express"
//backend modelimizni ovoldik
import User from "../models/User.js"
//bcrypt npm package bizga userdan keladigan passwordni hash qilish uchun kerak
import bcrypt from "bcrypt"
//jwt tokennni import qilib registrate da ishlatamiz, user create bolgan shu userni id sini ovolamiz
import { generateJWTToken } from "../services/token.js"
const router = Router()

router.get("/login", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/about")
    return
  }
  res.render("login", {
    title: "login",
    isLogin: true,
    loginError: req.flash("loginError"), //pastda yozgan flashimizni shu yerdan UI ga jonatib yuboramiz
  }) //routerda render qilganimzda paramertni 2-sida optional qilib titleni jonatib yuborsak boladi
  //keyin uni hbs head da tutib olib titleni qoyib qoysak boladi
  //isLogin ni ham true qilib uni props qilib jonatib navbar.hbs tutib olib if else orqali true bolsa active qil yoki qilma deb qoysak boladi
})
router.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.redirect("/login")
})

router.get("/register", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/about")
    return
  }
  res.render("register", {
    title: "Sign-up",
    isRegister: true,
    registerError: req.flash("registerError"),
  })
})

//login
//login modulda buttonni bosgan about modulga jonatib yuboradi
router.post("/login", async (req, res) => {
  //req.body bu object uni ichidan destructure qilib email bn passwordni chiqarib oldik endi uzun req.body.email
  //degan uzun kodlarni yozmasdan shunchaki object ichida email va password deb yozib ketsak boladi
  //email bn passwordni destructure qilib chiqarib olishmiz bizga validation errorllarni berishda ham qulaylik beradi

  const { email, password } = req.body
  if (!email || !password) {
    //flashni shunday ishlatamiz; parametr ichida 1-key nomi; 2-message bolishi kerak;
    req.flash("loginError", "all fields must be filled!")
    res.redirect("/login") // bu qaysi page yuborishni korsatadi
    return
  }

  //mongoose dagi userni topish uchun loginda kerak boladi
  const existUser = await User.findOne({ email })
  if (!existUser) {
    req.flash("loginError", "user not found!")
    res.redirect("/login") // bu qaysi page yuborishni korsatadi
    return false
  }

  //user bn mongoosedagi passworlarni solishtir
  //bunda mongoosedagi paswordni existUserdan ovosak boladi, sababi User.findOne deb sorov yuborilganda, mongoosedagi
  //user barcha malumotlariga access qilish mumkin boladi
  const isPassEqual = await bcrypt.compare(password, existUser.password)
  if (!isPassEqual) {
    req.flash("loginError", "incorrect password!")
    res.redirect("/login") // bu qaysi page yuborishni korsatadi
    return false
  }
  //login qilgan userni idsini olib jwt tokenga ovolib, cookiega solib qoyamiz
  const token = generateJWTToken(existUser._id)
  res.cookie("token", token, { httpOnly: true, secure: true })
  res.redirect("/about")
})

//register
//register modulda buttonni bosgan about modulga jonatib yuboradi
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body
  if (!firstname || !lastname || !email || !password) {
    req.flash("registerError", "all fields must be filled!")
    res.redirect("/register")
    return
  }
  const candidate = await User.findOne({ email })
  if (candidate) {
    req.flash("registerError", "current email is already takken!")
    res.redirect("/register")
    return
  }
  //bcryptni sign-up qilishda ishlatish
  const hashedPassword = await bcrypt.hash(password, 10)

  // console.log(req.body)
  const userData = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    password: hashedPassword,
  }
  const user = await User.create(userData)
  //user idsini olib token parametriga beramiz
  const token = generateJWTToken(user._id)
  //tokenni ozimizni cookieda saqlaymiz; cookie 3ta parametr qabul qiladi. 1-key-nome; 2-value; 3-configuartisya optional
  res.cookie("token", token, { httpOnly: true, secure: true })
  res.redirect("/about")
})
export default router
