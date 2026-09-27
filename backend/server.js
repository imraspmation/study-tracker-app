const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const recordRoutes = require("./routes/recordRoutes");
const app = express();

app.use(
    cors({
	origin: [
	    process.env.FRONTEND_URL,
	    "http://localhost:5173",
	],
    })
);

app.use(express.json());
app.use("/records", recordRoutes);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
    });
};
startServer();
