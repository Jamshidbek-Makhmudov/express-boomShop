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
router.get("/products", async (req, res) => {
  const user = req.userId ? req.userId.toString() : null
  const myProducts = await Product.find({ user: user }).populate("user").lean()

  //populate methodi mongoDB dagi user object korinishida boganiuchun uni ichidan ozimizni firstname bn lastnameni
  // ovolish uchun kerak bu populate togri ishlashi uchun Product modulids ref:"user bolishi kerak"

  res.render("products", {
    title: "products",
    isProducts: true,
    myProducts: myProducts, //bu UI da korinishi uchun props qilib jonatib yuboramiz
  })
  //bu bizga userimiz create qilgan productlarnigina alohida pageda chiqarish uchun kerak
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

router.get("/product/:id", async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id).populate("user").lean()

  res.render("product", {
    product: product,
  })
  // res.send("Product detail")
  //bu router.get har bir product uchun alohida page ochib beradi, buni :id qilganimiz uchun generic boladi
})
router.get("/edit-product/:id", async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id).populate("user").lean()

  res.render("edit-product", {
    product: product,
    errorEditProduct: req.flash("errorEditProduct"),
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

router.post("/edit-product/:id", async (req, res) => {
  const { title, description, image, price } = req.body
  const id = req.params.id
  if (!title || !description || !image || !price) {
    req.flash("errorEditProduct", "All fields is required")
    res.redirect(`/edit-product/${id}`)
    return
  }

  await Product.findByIdAndUpdate(id, req.body, { new: true })
  res.redirect("/products")
})

router.post("/delete-product/:id", async (req, res) => {
  const id = req.params.id
  await Product.findByIdAndRemove(id)
  res.redirect("/about")
})
export default router
