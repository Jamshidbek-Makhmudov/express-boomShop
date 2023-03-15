import { Router } from "express"
import authMiddleware from "../middleware/auth.js"
import userMiddleware from "../middleware/user.js"
import Product from "../models/Product.js"

const router = Router()
router.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "views", "index.html"))
  res.render("index", {
    title: "Boom shop",
    isMain: true,
    //  token: true
  })
})
router.get("/about", async (req, res) => {
  const products = await Product.find().lean() // bu method Productdagi barcha productlarni chiqarib berdi
  //uni userga chiqarib berish uchun render parametriga yozib propsdan jonatib yuborsak boldi
  //.lean() esa mongoosedagi objectlarni jsondan parse qilib chiqarib berdi

  res.render("about", {
    title: "about",
    isAbout: true,
    products: products.reverse(),
    userId: req.userId ? req.userId.toString() : null,
  })
})
router.get("/products", (req, res) => {
  res.render("products", { title: "products", isProducts: true })
})
router.get("/add", authMiddleware, (req, res) => {
  // if (!req.cookies.token) {
  //   res.redirect("/login")
  // }
  res.render("add", {
    title: "add products",
    isAdd: true,
    errorAddingProducts: req.flash("errorAddingProducts"),
  })
})
router.post("/add-products", userMiddleware, async (req, res) => {
  const { title, description, image, price } = req.body
  if (!title || !description || !image || !price) {
    req.flash("errorAddingProducts", " Error! all fields must be filled!")
    res.redirect("/add")
    return
  }

  //Product.create ni parametriga req.body berdik sababi req.body ham object qabul qiladi va Productni ichidagi objectlar bn bir xil
  await Product.create({ ...req.body, user: req.userId })

  res.redirect("/about")
})

export default router
