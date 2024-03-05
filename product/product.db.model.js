import mongoose from "mongoose";
//? set Rule for collection fields
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  expiryDate: Date,
  freeShipping: Boolean,
  brand: String,
  quantity: Number,
});
//? create table/model for product

const Product = mongoose.model("Product", productSchema);

//? Export Schema
export default Product;
