const multer = require("multer");

const memoryStorage = multer.memoryStorage();
const upload = multer({memoryStorage}); 

module.exports = upload; 