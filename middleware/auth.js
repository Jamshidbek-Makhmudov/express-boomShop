//bu middleware biz reatcda custom hookga tenglasak boladi
//bunda function ishlaganda if ishlasa redirect qiladi else bolsa shu function middlewareni ishlatgan joyimizda next(), ya'ni
//keyingi functionga otqazib yuboradi
const authMiddleware = (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect("/login")
  }
  next()
}
export default authMiddleware
