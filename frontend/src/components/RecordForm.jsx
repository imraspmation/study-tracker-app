import {useEffect,useState} from 'react';
import {useForm} from "react-hook-form";

const initialFormData = {
	studyDate: "",
	questionTitle: "",
	questionUrl: "",
	difficulty: "",
	tags:[],
	status:"",
	memo:"",
}
const tagGroup = ["dp", "graph","binary-search","math","greedy"];

export default function RecordForm({
    onAddRecord,
    onUpdateRecord,
    editingRecord,
    onCancelEdit
}) {
    const {
	register,
	handleSubmit,
	reset,
	formState: {errors},
    } = useForm({
	defaultValues: initialFormData,
    })
    useEffect(() => {
	if (editingRecord) {
	    reset({
		studyDate: editingRecord.studyDate || "",
		questionTitle: editingRecord.questionTitle || "",
		questionUrl: editingRecord.questionUrl || "",
		difficulty: editingRecord.difficulty || "",
		tags: editingRecord.tags || [],
		status: editingRecord.status || "",
		memo: editingRecord.memo || "",
	    });
	} else {
	    reset(initialFormData);
	}
    }, [editingRecord, reset]);

    const onSubmit = (data) => {
	const submitData = {
	    ...data,
	    difficulty: data.difficulty === "" ? "" : Number(data.difficulty),
	    tags: data.tags || [],
	};
	if (editingRecord) {
	    onUpdateRecord(submitData);
	} else {
	    onAddRecord(submitData);
	}
	reset(initialFormData);
    };
    const handleCancel = () => {
	reset(initialFormData);
	onCancelEdit();
    }


    return (
	<>
	    <h1>{editingRecord ? "学習記録を編集する" : "学習を記録する"}</h1>
	    <form onSubmit={handleSubmit(onSubmit)}>
		<div>
		    <label htmlFor="study-date">日付</label>
		    <input type="date" id="study-date" {...register("studyDate")}/>
		</div>
		<div>
		    <label htmlFor="question-title">問題名 : </label>
		    <input type="text" id="question-title"
			   {...register("questionTitle", {
			       required: "問題名は必須です",
			       maxLength: {
				   value: 100,
				   message: "問題名は100文字以内で入力してください",
			       },
			   })}
		    />
		    {errors.questionTitle && (
			<p>{errors.questionTitle.message}</p>
		    )}
		</div>
		<div>
		    <label htmlFor="question-url">URL : </label>
		    <input type="text" id="question-url"
			   {...register("questionUrl", {
			       validate: (value) => {
				   if (!value) return true;
				   try {
				       new URL(value);
				       return true;
				   } catch {
				       return "URLの形式が正しくありません";
				   }
			       },
			   })}
		    />
		    {errors.questionUrl && <p>{errors.questionUrl.message}</p>}
		</div>
		
		<div>
		    <label htmlFor="difficulty">difficulty : </label>
		    <input type="number" id="difficulty"
			   {...register("difficulty", {
			       min: {
				   value: 0,
				   message: "difficultyは0以上で入力してください",
			       },
			   })}
		    />
		    {errors.difficulty && <p>{errors.difficulty.message}</p>}
		</div>
		<fieldset>
		    <legend>タグを選択してください(複数可)</legend>
		    {tagGroup.map((tag) => (
			<label key={tag}>
			    <input type="checkbox" value={tag} {...register("tags")}/>
			    {tag}
			</label>
		    ))}
		</fieldset>
		<div>
		    <label htmlFor="status-select">ステータス</label>
		    <select id="status-select"
			    {...register("status", {
				validate: (value) => {
				    const allowedStatuses = ["","solved", "review", "unsolved"]
				    return (
					allowedStatuses.includes(value) || "ステータスの値が正しくありません"
				    );
				},
			    })}
		    >
			<option value="">1つ選択してください</option>
			<option value="solved">解けた</option>
			<option value="review">要復習</option>
			<option value="unsolved">解けなかった</option>
		    </select>
		    {errors.status && <p>{errors.status.message}</p>}
		</div>

		<div>
		    <label htmlFor="memo">メモ</label>
		    <textarea id="memo" name="memo" rows="5" cols="33" placeholder="ここにメモを記入"
			      {...register("memo",{
				  maxLength: {
				      value: 1000,
				      message: "メモは1000文字以内で入力してください",
				  },
			      })}
		    />
		</div>
		<button type="submit">
		    {editingRecord ? "更新する" : "記録する"}
		</button>
		{editingRecord && (
		    <button type="button" onClick={handleCancel}>
			キャンセル
		    </button>
		)}
	    </form>
	</>
    )
}

