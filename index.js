import express from "express"
const app = express() //expressni bita varuablega ovolish kerak
const PORT = process.env.PORT || 4100 //terminal da portni ozi tanlash yoki 4100 degani
app.listen(PORT, () => {
  //listen methodi qaysi portda ishlashini korsatib beradi
  console.log(`server is running on ${PORT}  local host!`)
})
