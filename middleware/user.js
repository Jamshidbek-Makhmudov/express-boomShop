//bu function middleware bizga jwt tokenlarni ovolish uchun kerak, ovosak bizkeyin ularni userga qayta korsatishimiz mumkin
import jwt from "jsonwebtoken"
import User from "../models/User.js" //bu login qilgan userni mongoosedagi malumotlari
const userMiddleware = async (req, res, next) => {
  if (!req.cookies.token) {
    // res.redirect("/login")
    next()
    return
  }
  const token = req.cookies.token //cookiedagi user tokeni
  const decode = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findById(decode.userId) //cookiedagi tokenni idsini mongoosedan qidirib ovoldik
  req.userId = user._id
  next()
}
export default userMiddleware
