const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
require("dotenv").config();

const Record = require("./models/Record");

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
	console.log("MongoDB connected");
    })
    .catch((err) => {
	console.error("MongoDB connection error:", err);
    });

app.get("/records", async (req, res) => {
    try {
	const records = await Record.find().sort({createdAt: -1});
	res.json(records);
    } catch (err) {
	res.status(500).json({ message: "Failed to fetch records"});
    }
});
app.post("/records", async (req, res) => {
    try {
	const newRecord = await Record.create(req.body);
	res.status(201).json(newRecord);
    } catch (err) {
	console.log(err)
	res.status(400).json({message: "Failed to create record"});
    }
});
app.patch("/records/:id", async (req, res) => {
    try {
	const updatedRecord = await Record.findByIdAndUpdate(
	    req.params.id,
	    req.body,
	    {
		returnDocument: "after",
		runValidators: true,
	    }
	);

	if (!updatedRecord) {
	    return res.status(404).json({message: "Record not found"});
	}
	res.status(200).json(updatedRecord);
    } catch (err) {
	res.status(400).json({message: "failed to update record"})
    }
})
app.delete("/records/:id", async (req, res) => {
    try {
	const deletedRecord = await Record.findByIdAndDelete(req.params.id);
	if (!deletedRecord) {
	    return res.status(404).json({message: "Record not found"});
	}
	res.status(204).send();
    } catch (err) {
	res.status(500).json({message: "Failed to delete record"});
    }
    // const id = Number(req.params.id);

    // records = records.filter((record) => record.id !== id);
    // res.status(204).send();
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
