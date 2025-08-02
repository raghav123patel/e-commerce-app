const express = require("express");
const upload = require("../middlewares/multerMiddleware");
const {auth, admin} = require("../middlewares/authMiddleware")
const {createProduct} = require("../controllers/productController")
const router = express.Router();
router.post("/create", auth, admin,upload.single("images"),createProduct );

module.exports = router;