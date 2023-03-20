//model papka nimaga kerak?
//mongoDB da collectionlar ichida modellar boladi; userga tegishli, productga tegishli shularni saqlab turadi
import { Schema, model } from "mongoose" //bu bizga 1ta model yaratishga yordam berdi
//new Schemani parametrida object korinishida bizni user haqida backend malumotlarimiz boladi
//bu yerda required:true degani, user sign-up qilayotganda shu keylar kiritilishi shart degani
//unique:true degani esa, bir xil emailni 2marta kiritib bolmaydi degani

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // img: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User = model("User", UserSchema)
export default User
