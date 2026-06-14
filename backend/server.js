const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const records = [
    {
	id: 1,
	studyDate: "2026-06-05",
	questionTitle: "ABC350 C",
	questionUrl: "https://atcoder.jp/",
	difficulty: 400,
	tags:["graph"],
	status:"review",
	memo:"サンプルデータ",
    },
];

app.get("/records", (req, res) => {
    res.json(records);
});
app.post("/records", (req, res) => {
    const newRecord = {
	id: Date.now(),
	...req.body,
    };
    records.push(newRecord);
    res.status(201).json(newRecord);
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
})
