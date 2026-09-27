const express = require("express");

const {
    getRecords,
    createRecord,
    updateRecord,
    deleteRecord,
} = require("../controllers/recordController");

const router = express.Router();

router.get("/", getRecords);
router.post("/", createRecord);
router.patch("/:id", updateRecord);
router.delete("/:id", deleteRecord);

module.exports = router;
