//middlwware bu loyiha ishlashidan oldin ishlaydigan function bu; bu modullar kopayib ketganda ularni handle qilish uchun kerak
import AuthRoutes from "./routes/auth.js"
import ProductsRoutes from "./routes/products.js"
import express from "express"
import { create } from "express-handlebars" //
const app = express() //expressni bita varuablega ovolish kerak
//filename bn dirname ni qolda ysab oldik
//
//handlebarda createni tortib olamiz va hbs varuableiga tenglab olamiz bu
//bizga module nomlarini handlebras deb yozishni oldini oladi
const hbs = create({ defaultLayout: "main", extname: "hbs" })

// express handlebarsni yuklab olish
app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "./views")

//
app.use(express.urlencoded({ extended: true }))
//
//bu yerda esa middlewarelar yani modulelar kopayib ketganda ularni route papka ochib use orqali ularni osha joyga kochirib qoysak boladi
app.use(AuthRoutes)
app.use(ProductsRoutes)

//publicdagi fayllarni static qili qoyadi keyin hamma joyda ishlatsa boladi
app.use(express.static("puplic"))
const PORT = process.env.PORT || 4100 //terminal da portni ozi tanlash yoki 4100 degani
app.listen(PORT, () => {
  //listen methodi qaysi portda ishlashini korsatib beradi
  console.log(`server is running on ${PORT}  local host!`)
})
