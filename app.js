const express = require("express");
const app = express(); //server
const userRouter = require("./routes/user")
app.use(express.json());
require("./config/db");




app.use("/users/" , userRouter)












///////////////////////////kos sher//////////////////////////////////////////
const products = [
  { id: 1, name: "mouse", price: 200000 },
  { id: 2, name: "keyboard", price: 700000 },
  { id: 3, name: "PC", price: 40000000 },
  { id: 4, name: "mouse pad", price: 10000 },
];
app.get("/", (req, res) => {
  res.send("<h1>hello world:)</h1>");
});
app.get("/product/:id", (req, res) => {
  const product = products.find((item) => {
    return item.id == req.params.id;
  });
  if (product) {
    res.send(product);
  } else {
    res.send("product not found");
  }
});

app.get("/about", (req, res) => {
  res.send("about page:)");
});

app.get("/contact", (req, res) => {
  res.send("contact page:)");
});
app.listen(3000, () => {
  console.log("server is running!");
});
