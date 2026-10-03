const {z} = require("zod");

const recordSchema = z.object({
    studyDate: z
	.string()
	.default(""),
    questionTitle: z
	.string()
	.trim()
	.min(1, {error: "問題名は必須です",})
	.max(100, {error: "問題名は100文字以内で入力してください",}),
    questionUrl: z.union([
	z.literal(""),
	z.httpUrl({error: "URLの形式が正しくありません"}),
    ]),
    difficulty: z
	.number()
	.min(0, {error: "difficultyは0以上で入力してください",})
	.optional(),
    tags: z.array(
	z.enum(["dp","graph","binary-search","math","greedy"])
	    .default([]),
    ),
    status: z
	.enum(["","solved","review","unsolved"]),
    memo: z
	.string()
	.max(1000, {error: "メモは1000文字以内で入力してください"})
	.default(""),
});

module.exports = {recordSchema};
