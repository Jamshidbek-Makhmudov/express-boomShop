//cookieparser kutbxonasini yuklab olib ishlatganimzdan keyin req.cookies.token qilsak tokenni chiqarib berdi
//uni yuklashdan oldin esa undefined berayotgan edi
const varMiddleware = (req, res, next) => {
  const isAuth = req.cookies.token ? true : false
  res.locals.token = isAuth
  next()
}
export default varMiddleware
