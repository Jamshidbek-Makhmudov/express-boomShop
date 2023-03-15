import { Router } from "express"
import Product from "../models/Product.js"

const router = Router()
router.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "views", "index.html"))
  res.render("index", { title: "Boom shop", isMain: true, token: true })
})
router.get("/about", (req, res) => {
  res.render("about", { title: "about", isAbout: true })
})
router.get("/products", (req, res) => {
  res.render("products", { title: "products", isProducts: true })
})
router.get("/add", (req, res) => {
  res.render("add", { title: "add products", isAdd: true })
})
router.post("/add-products", async (req, res) => {
  const { title, description, image, price } = req.body
  //Product.create ni parametriga req.body berdik sababi req.body ham object qabul qiladi va Productni ichidagi objectlar bn bir xil
  const products = await Product.create(req.body)
  console.log(products)
  res.redirect("/about")
})

export default router
