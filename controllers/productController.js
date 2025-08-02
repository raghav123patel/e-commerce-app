const Product = require("../models/productModel");
const imagekit = require("../config/imagekit");
exports.createProduct = async() => {
    try{
      const {name, description, price, category,stock} = req.body;
      const images = req.file;
      if(!name || !description || !price || !category || stock || !images){
        return res.status(401).json({
            success: "false",
            message: "provide all the product details",
        })
      }
      const upload = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "image_uploads",
      })
      const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        images: upload.url ,

      })
      return res.status(200).json({
        success: "true",
        product,
        message: "product created successfully",
      })
    } catch(error) {
        return res.status(500).json({
            success: "false",
            message: "product cannot be created"
        })
    }
}