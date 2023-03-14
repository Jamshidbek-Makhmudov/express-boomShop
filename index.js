//middlwware bu loyiha ishlashidan oldin ishlaydigan function bu; bu modullar kopayib ketganda ularni handle qilish uchun kerak
//nodejs va express bn ishlaganda malumotlarni malumotlar bazasida saqlashimiz kerak boladi;
//malumorlat bazasi -data base ya'ni mongoDb deyiladi; unga sign in qilin nodejs bn mongoDb ni mongoose orqali boglaymiz
//buni npm install mongoose qilamiz yoki qanday connect qilish kerak deb googlega yozsak chiqarib beradi
import express from "express"
//
//express uchun middleware package- sign-in/sign-up qilganda userga har xil validation errorlarni korsatish uchun kerak
import flash from "connect-flash"
//session
//bu javascriptda loacl storage vazifasini bajaradi lekin farqi qanchadir tuib keyin ochib ketadi
//flash bn birga yuklab olinishi kerak ular birga ishlaydi
import session from "express-session"
import { create } from "express-handlebars" //
import mongoose from "mongoose" //mongoose ulandi
import * as dotenv from "dotenv" // dotenv ni npm install qilgandan song shu ham ovolish kerak; dotenv.config() ham kerak
//routes
import AuthRoutes from "./routes/auth.js"
import ProductsRoutes from "./routes/products.js"

//
dotenv.config()
//
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

// mongoose.set("strictQuery", false)

//
//middleware
//bu yerda esa middlewarelar yani modulelar kopayib ketganda ularni route papka ochib use orqali ularni osha joyga kochirib qoysak boladi
//mongoDb bn ishlashda shuni yozish kerak ya'ni mongoDB bn faqat json fayl orqali ishlanadi
//publicdagi fayllarni static qili qoyadi keyin hamma joyda ishlatsa boladi
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//validation middleware flash; sessionlar bn ishlaydi, qanchadir vaqt turib keyin ochib ketadi; maxAge- bu qancha vaqt turishi
app.use(session({ secret: "jamshid", resave: false, saveUninitialized: false }))
app.use(flash())

app.use(AuthRoutes)
app.use(ProductsRoutes)

const startApp = () => {
  try {
    mongoose.set("strictQuery", false)
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB connected!")
      })
      .catch((error) => {
        console.log("MongoDB connection error:", error)
      })
    //shu kod errorni qanday errorligini korsatib berdi
    process.on("uncaughtException", function (err) {
      console.log(err)
    })

    const PORT = process.env.PORT || 4100
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

startApp()

// mongoose.connect(
//   process.env.MONGO_URI,
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   },
//   () => {
//     console.log("mongoDb connected")
//   }
// )

// const PORT = process.env.PORT || 4100 //terminal da portni ozi tanlash yoki 4100 degani

// app.listen(PORT, () => {
//   //listen methodi qaysi portda ishlashini korsatib beradi
//   console.log(`server is running on ${PORT}  local host!`)
// })

// //mongodb+srv://Jamshidbek:<password>@cluster0.eujzar6.mongodb.net/?retryWrites=true&w=majority
