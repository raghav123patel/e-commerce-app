const express = require("express");
const upload = require("../middlewares/multerMiddleware");
const {auth, admin} = require("../middlewares/authMiddleware")
const router = express.Router();
router.post("/create", upload.single("images"), auth, admin );

module.exports = router;