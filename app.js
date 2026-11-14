const express = require("express");
const app = express(); //server
app.use(express.json());
const userModel = require("./models/Users")
require("./config/db")
const products = [
   {id:1,name:'mouse',price:200000},
   {id:2,name:'keyboard',price:700000},
   {id:3,name:'PC',price:40000000},
   {id:4,name:'mouse pad',price:10000},
]
app.get('/',(req,res)=>{
    res.send('<h1>hello world:)</h1>')
})
app.get("/product/:id" , (req,res)=>{
    const product = products.find(item=>{
        return item.id == req.params.id
    })
    if (product) {
        res.send(product)
    } else {
        res.send("product not found")
    }
})

app.get('/about',(req,res)=>{
    res.send('about page:)')
})
app.post('/users', async (req, res) => {
  const {name, username, email} = req.body;
  if (!name?.trim() || !username?.trim() || !email?.trim()) {
    return res.status(422).json({message: "invalid info !"});
  }
  try {
    const user = await userModel.create({name, username, email});
    res.status(201).json({message: "user created successfully!", user});
  } catch (err) {
    res.status(500).json({message: "error creating user", error: err.message});
  }
});
app.get('/contact',(req,res)=>{
    res.send('contact page:)')
})
app.listen(3000, () => {
  console.log("server is running!");
});
