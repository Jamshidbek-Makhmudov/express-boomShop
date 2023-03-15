import { Router } from "express"
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
export default router
