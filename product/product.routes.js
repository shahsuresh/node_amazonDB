import express from "express";
import Product from "./amazon.db.model.js";

const router = express.Router();

//? Add products to db

router.post("/product/add", async (req, res) => {
  // extract new product from req.body
  const newProduct = req.body;
  console.log(newProduct);
  // add new product to db
  await Product.create(newProduct);
  // send response
  return res.status(200).send({ message: "New Product Added Successfully" });
});

//? get product lists from database

router.get("/product/list", async (req, res) => {
  //get product list using find()
  const productList = await Product.find(
    {},
    { name: 1, price: 1, category: 1, brand: 1 }
  );
  // send response
  return res.status(200).send({ productsList: productList });
});

//? get product details by id

router.get("/product/details/:id", async (req, res) => {
  return res.status(200).send({ message: "Searching product....." });
});

export default router;
