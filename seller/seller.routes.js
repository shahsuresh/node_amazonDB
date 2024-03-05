import express from "express";
import Seller from "./seller.model.js";

const router = express.Router();

//? add seller details

router.post("/seller/add", async (req, res) => {
  //extract seller details from req.body
  const sellerDetails = req.body;
  //console.log(sellerDetails);

  //find seller with given email

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

router.get("/seller/search", async (req, res) => {
  // extract seller name letters from req.body
  const { searchedText } = req.body;

  // match the searched text with seller firstName
  const sellerName = await Seller.find({
    $or: [
      { firstName: { $regex: `${searchedText}`, $options: "i" } },
      { lastName: { $regex: `${searchedText}`, $options: "i" } },
    ],
  });

  // if match not found, send message NOT FOUND
  if (sellerName.length === 0) {
    return res.status(404).send({ message: "No Seller Exist with such Names" });
  }

  // if seller name searched text matches with seller names, show result
  res.status(200).send({ message: "Seller Details", sellerName });
});
export default router;
