const Record = require("../models/Record.js");
const {recordSchema} = require("../validators/recordSchema");

const formatZodErrors = (zodError) => {
    const errors = {};

    zodError.issues.forEach((issue) => {
	const field = issue.path[0];

	if (field && !errors[field]) {
	    errors[field] = issue.message;
	}
    });
    return errors;
}

const getRecords = async (req, res) => {
    try {
	const records = await Record.find().sort({createdAt: -1});
	res.status(200).json(records);
    } catch (err) {
	res.status(500).json({ message: "記録の取得に失敗しました"});
    }
};

const createRecord = async (req, res) => {
    try {
	const result = recordSchema.safeParse(req.body);
	if (!result.success) {
	    return res.status(400).json({
		message: "入力内容に誤りがあります",
		errors: formatZodErrors(result.error),
	    });
	}

	const newRecord = await Record.create(result.data);
	res.status(201).json(newRecord);
    } catch (err) {
	console.error(err)
	res.status(500).json({
	    message:"記録の保存に失敗しました",
	});
    }
};

const updateRecord = async (req, res) => {
    try {
	const result = recordSchema.safeParse(req.body);
	if (!result.success) {
	    return res.status(400).json({
		message: "入力内容に誤りがあります",
		errors: formatZodErrors(result.error),
	    });
	}

	const updatedRecord = await Record.findByIdAndUpdate(
	    req.params.id,
	    result.data,
	    {
		returnDocument: "after",
		runValidators: true,
	    }
	);

	if (!updatedRecord) {
	    return res.status(404).json({message: "記録が見つかりません"});
	}

	res.status(200).json(updatedRecord);
    } catch (err) {
	console.error(err)
	res.status(500).json({message: "記録の更新に失敗しました"});
    }
}

const deleteRecord = async (req, res) => {
    try {
	const deletedRecord = await Record.findByIdAndDelete(req.params.id);
	if (!deletedRecord) {
	    return res.status(404).json({message: "記録が見つかりません"});
	}
	res.status(204).send();
    } catch (err) {
	console.log(err);
	res.status(500).json({message: "記録の削除に失敗しました"});
    }

}

module.exports = {
    getRecords,
    createRecord,
    updateRecord,
    deleteRecord,
};
