//middlwware bu loyiha ishlashidan oldin ishlaydigan function bu; bu modullar kopayib ketganda ularni handle qilish uchun kerak
import express from "express"
import { create } from "express-handlebars" //
const app = express() //expressni bita varuablega ovolish kerak
//filename bn dirname ni qolda ysab oldik
//
//handlebarda createni tortib olamiz va hbs varuableiga tenglab olamiz bu
//bizga module nomlarini handlebras deb yozishni oldini oladi
const hbs = create({ defaultLayout: "main", extname: "hbs" })
/////

// express handlebarsni yuklab olish
app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "./views")
//

app.use(() => {
  console.log("middleware")
})

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "views", "index.html"))
  res.render("index")
})
app.get("/about", (req, res) => {
  res.render("about")
})
app.get("/products", (req, res) => {
  res.render("products")
})
app.get("/add", (req, res) => {
  res.render("add")
})
app.get("/login", (req, res) => {
  res.render("login")
})
app.get("/register", (req, res) => {
  res.render("register")
})

const PORT = process.env.PORT || 4100 //terminal da portni ozi tanlash yoki 4100 degani
app.listen(PORT, () => {
  //listen methodi qaysi portda ishlashini korsatib beradi
  console.log(`server is running on ${PORT}  local host!`)
})
