const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

const user = require('./user')

mongoose.connect('mongodb+srv://Arham:123@cluster0.qa4g3jt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('mongoose connected'))

app.post("/", async (req, res) => {
  console.log(req.body);

  let login_users = new user(req.body);
  console.log(login_users);

  let save_user = await login_users.save()

  res.send(save_user)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
