import express from "express";
import Product from "./amazon.db.model.js";
import mongoose from "mongoose";

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
  //extract product id from req.params
  const productId = req.params.id;
  // validate for mongo id
  const isValidMongoId = mongoose.isValidObjectId(productId);
  // if the id is not valid throw error

  if (!isValidMongoId) {
    return res.status(400).send("Not Valid Mongo ID");
  }
  // find product details by id from db
  const requiredProduct = await Product.findOne({ _id: productId });

  //send response with product details
  return res.status(200).send({ Product_Details: requiredProduct });
});

//? delete product by id

router.delete("/product/delete/:id", async (req, res) => {
  //extract product id from req.params
  const productId = req.params.id;
  // validate for mongo id
  const isValidMongoId = mongoose.isValidObjectId(productId);
  // if the id is not valid throw error

  if (!isValidMongoId) {
    return res.status(400).send("Not Valid Mongo ID");
  }
  // find product details by id from db
  const requiredProduct = await Product.findOne({ _id: productId });

  //if product not found in db throw null message

  if (!requiredProduct) {
    return res.status(404).send({ MESSAGE: "Product doesn't exist" });
  }
  // delete product
  await Product.deleteOne({ _id: productId });
  //send response with product details
  return res.status(200).send({ message: "Product deleted successfully" });
});

//? edit product details

router.put("/product/edit/:id", async (req, res) => {
  //extract product id from req.params
  const productId = req.params.id;
  // validate for mongo id
  const isValidMongoId = mongoose.isValidObjectId(productId);
  // if the id is not valid throw error

  if (!isValidMongoId) {
    return res.status(400).send("Not Valid Mongo ID");
  }
  // find product details by id from db
  const requiredProduct = await Product.findOne({ _id: productId });

  //if product not found in db throw null message

  if (!requiredProduct) {
    return res.status(404).send({ MESSAGE: "Product doesn't exist" });
  }
  // extract product details from body

  const newValues = req.body;
  //console.log(newValues);

  //edit product
  await Product.updateOne(
    { _id: productId },
    {
      $set: {
        name: newValues.name,
        price: newValues.price,
        category: newValues.category,
        expiryDate: newValues.expiryDate,
        freeShipping: newValues.freeShipping,
        brand: newValues.brand,
        quantity: newValues.quantity,
      },
    }
  );

  //send response
  return res.status(200).send({ MESSAGE: "Product Details Updated" });
});

export default router;
