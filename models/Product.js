//model papka nimaga kerak?
//mongoDB da collectionlar ichida modellar boladi; userga tegishli, productga tegishli shularni saqlab turadi
import { Schema, model } from "mongoose" //bu bizga 1ta model yaratishga yordam berdi
//new Schemani parametrida object korinishida bizni user haqida backend malumotlarimiz boladi
//bu yerda required:true degani, user sign-up qilayotganda shu keylar kiritilishi shart degani
//unique:true degani esa, bir xil emailni 2marta kiritib bolmaydi degani

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, requried: true },
    price: { type: Number, required: true },
    //  user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // bu optional bolib, update bolgan qismini chiqarib beradi
)

const Product = model("Product", ProductSchema)
export default Product
