import express from "express";
import connectDB from "./connect.db.js";
import productRoutes from "./product/product.routes.js"; //renamed router as productRoutes
import sellerRoutes from "./seller/seller.routes.js"; // import and renamed seller router

const app = express();
app.use(express.json());

//?==============database Connection======================
connectDB();

//?==============register routes==========================
app.use(productRoutes); //renamed router as productRoutes
app.use(sellerRoutes); // seller routes from seller.routes.js file
//?================port and server========================
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
