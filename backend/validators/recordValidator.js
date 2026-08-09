const allowedTags = ["dp","graph","binary-search","math","greedy"];
const allowedStatuses = ["", "solved", "review", "unsolved"];

const isString = (value) => typeof value === "string";

function validateRecordInput(body) {
    const errors = {};
    const data = {};

    // 日付
    if (body.studyDate === undefined || body.studyDate === null || body.studyDate === "") {
	data.studyDate = "";
    } else if (!isString(body.studyDate)) {
	errors.studyDate = "日付の形式が正しくありません";
    } else {
	data.studyDate = body.studyDate;
    }

    //問題名
    if (!isString(body.questionTitle) || body.questionTitle.trim() === "") {
	errors.questionTitle = "問題名は必須です";
    } else if (body.questionTitle.trim().length > 100) {
	errors.questiontitle = "問題名は100文字以内で入力してください";
    } else {
	data.questionTitle = body.questionTitle.trim();
    }

    // URL
    if (body.questionUrl === undefined || body.questionUrl === null || body.questionUrl.trim?.() === "") {
	data.questionUrl = "";
    } else if (!isString(body.questionUrl)) {
	errors.questionUrl = "URLの形式が正しくありません";
    } else {
	const trimmedUrl = body.questionUrl.trim();
	try {
	    const url = new URL(trimmedUrl);
	    if (!["http:", "https:"].includes(url.protocol)) {
		errors.questionUrl = "URLは http または https で入力してください";
	    } else {
		data.questionUrl = trimmedUrl;
	    }
	} catch {
	    errors.questionUrl = "URLの形式が正しくありません";
	}
    }
    // difficulty
    if (body.difficulty === undefined || body.difficulty === null || body.difficulty === "") {
	data.difficulty = undefined;
    } else {
	const difficultyNumber = Number(body.difficulty);

	if (Number.isNaN(difficultyNumber)) {
	    errors.difficulty = "difficultyは数値で入力してください";
	} else if (difficultyNumber < 0) {
	    errors.difficulty = "difficultyは0以上で入力してください";
	} else {
	    data.difficulty = difficultyNumber;
	}
    }
    // tags
    if (body.tags === undefined || body.tags === null) {
	data.tags = [];
    } else if (!Array.isArray(body.tags)) {
	errors.tags = "タグの形式が正しくありません";
    } else {
	const invalidTag = body.tags.find((tag) => !allowedTags.includes(tag));
	if (invalidTag) {
	    errors.tags = "許可されていないタグが含まれています";
	} else {
	    data.tags = body.tags;
	}
    }

    // status
    if (body.status === undefined || body.status === null || body.status === "") {
	data.status = "";
    } else if (!allowedStatuses.includes(body.status)) {
	errors.status = "ステータスの値が正しくありません";
    } else {
	data.status = body.status;
    }

    // memo
    if (body.memo === undefined || body.memo === null) {
	data.memo = "";
    } else if (!isString(body.memo)) {
	errors.memo = "メモの形式が正しくありません";
    } else if (body.memo > 1000) {
	errors.memo = "メモは1000文字以内で入力してください";
    } else {
	data.memo = body.memo;
    }

    return {
	isValid: Object.keys(errors).length === 0,
	errors,
	data,
    };
}
module.exports = {
    validateRecordInput,
};
