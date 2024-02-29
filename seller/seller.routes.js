import express from "express";
import Seller from "./seller.model.js";

const router = express.Router();

//? add seller details

router.post("/seller/add", async (req, res) => {
  //extract seller details from req.body
  const sellerDetails = req.body;
  //console.log(sellerDetails);

  //find seller with new email

  const sellerEmail = await Seller.findOne({ email: sellerDetails.email });

  // if seller with existing email, throw error

  if (sellerEmail) {
    return res.status(409).send({ message: "Email Already Exists" });
  }

  //else , insert new seller details in db

  await Seller.create(sellerDetails);

  //send response

  return res.status(201).send({ message: "Seller details added successfully" });
});

//? get seller details

router.get("/seller/list", async (req, res) => {
  // extract pagination data from req.body
  const { page, limit } = req.body;

  //calculate skip

  const skip = (page - 1) * limit;

  //get seller list from db
  const sellerList = await Seller.aggregate([
    { $match: {} },
    { $skip: skip },
    { $limit: limit },
  ]);
  return res.status(201).send({ Seller_List: sellerList });
});

//? search seller

export default router;
