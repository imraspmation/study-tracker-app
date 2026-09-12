const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
    {
	studyDate: {
	    type: String,
	},
	questionTitle: {
	    type: String,
	    required: true,
	    trim: true,
	    maxlength: 100,
	},
	questionUrl: {
	    type: String,
	},
	difficulty: {
	    type: Number,
	    min: 0,
	},
	tags: {
	    type: [String],
	    enum: [
		"dp",
		"graph",
		"binary-search",
		"math",
		"greedy",
	    ],
	    default: [],
	},
	status: {
	    type: String,
	    enum: ["","solved", "review", "unsolved"],
	    default: "",
	},
	memo: {
	    type: String,
	},
    },
    {
	timestamps: true,
    }
);

module.exports = mongoose.model("Record", recordSchema);
