//jwt tokkenlar user dasturdan chiqib ketib qayta kirganda, uni malumotlari saqlab turish uchun kerak
//shunda u har safar qayta qayta login qilavermaydi
// jwt tokenlar sessionlarda saqlanadi, va ma'lum vaqtdan keyin ochib ketadi
//bomasa dastur qotishni boshlaydi;
import jwt from "jsonwebtoken"
const generateJWTToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
  return accessToken
}
export { generateJWTToken }
