const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
require("dotenv").config();
app.use(express.json());

const authRoute = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute)

const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
    console.log(`server is listening at the ${PORT}`);
})

