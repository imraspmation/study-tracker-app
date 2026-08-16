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
	setError,
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

    const onSubmit = async (data) => {
	const submitData = {
	    ...data,
	    questionTitle: data.questionTitle.trim(),
	    questionUrl: data.questionUrl.trim(),
	    difficulty: data.difficulty === "" ? undefined : Number(data.difficulty),
	    tags: data.tags || [],
	};

	try{
	    if (editingRecord) {
		await onUpdateRecord(submitData);
	    } else {
		await onAddRecord(submitData);
	    }
	    reset(initialFormData);
	} catch (err) {
	    if (err.fieldErrors) {
		Object.entries(err.fieldErrors).forEach(([field, message]) => {
		    setError(field, {
			type: "server",
			message,
		    });
		});
		return;
	    }
	    setError("root.server", {
		type: "server",
		message: err.message || "保存に失敗しました",
	    });
	}
    };
    const handleCancel = () => {
	reset(initialFormData);
	onCancelEdit();
    }


    return (
	<section className="card">
	    <h2 className="card-title">
		{editingRecord ? "学習記録を編集する" : "学習を記録する"}
	    </h2>
	    
	    <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
		<div className="form-control">
		    <label htmlFor="study-date">日付</label>
		    <input className="input" type="date" id="study-date" {...register("studyDate")}/>
		</div>
		<div className="form-control">
		    <label htmlFor="question-title">問題名 : </label>
		    <input className="input" type="text" id="question-title"
			   {...register("questionTitle", {
			       required: "問題名は必須です",
			       maxLength: {
				   value: 100,
				   message: "問題名は100文字以内で入力してください",
			       },
			   })}
		    />
		    {errors.questionTitle && (
			<p className="error-text">{errors.questionTitle.message}</p>
		    )}
		</div>
		<div className="form-control">
		    <label htmlFor="question-url">URL : </label>
		    <input className="input" type="text" id="question-url"
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
		    {errors.questionUrl && <p className="error-text">{errors.questionUrl.message}</p>}
		</div>
		
		<div className="form-control">
		    <label htmlFor="difficulty">difficulty : </label>
		    <input className="input" type="number" id="difficulty"
			   {...register("difficulty", {
			       min: {
				   value: 0,
				   message: "difficultyは0以上で入力してください",
			       },
			   })}
		    />
		    {errors.difficulty && <p className="error-text">{errors.difficulty.message}</p>}
		</div>
		<fieldset className="checkbox-group">
		    <legend className="fieldset-label">タグ</legend>
		    {tagGroup.map((tag) => (
			<label className="checkbox-label" key={tag}>
			    <input type="checkbox" value={tag} {...register("tags")}/>
			    {tag}
			</label>
		    ))}
		</fieldset>
		<div className="form-control">
		    <label htmlFor="status-select">ステータス</label>
		    <select className="select" id="status-select"
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
		    {errors.status && <p className="error-text">{errors.status.message}</p>}
		</div>

		<div className="form-control">
		    <label htmlFor="memo">メモ</label>
		    <textarea className="textarea" id="memo" name="memo" rows="5" cols="33" placeholder="解法メモ・詰まった点・復習ポイントなど"
			      {...register("memo",{
				  maxLength: {
				      value: 1000,
				      message: "メモは1000文字以内で入力してください",
				  },
			      })}
		    />
		    {errors.memo && (
			<p className="error-text">{errors.memo.message}</p>
		    )}
		</div>
		<div className="button-row">
		    <button className="btn btn-primary" type="submit">
			{editingRecord ? "更新する" : "記録する"}
		    </button>
		    {editingRecord && (
			<button className="btn btn-secondary" type="button" onClick={handleCancel}>
			    キャンセル
			</button>
		    )}
		</div>
	    </form>
	</section>
    )
}

