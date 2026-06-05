import {useState} from 'react';

export default function RecordForm({onAddRecord}) {
    const [formData, setFormData] = useState({
	studyDate: "",
	questionTitle: "",
	questionUrl: "",
	difficulty: "",
	tags:[],
	status:"",
	memo:"",
    });
    const handleChange = (e) => {
	const {name, value} = e.target;
	setFormData({
	    ...formData,
	    [name]: value,
	});
    };
    const handleTagChange = (e) => {
	const {value, checked} = e.target;
	if (checked) {
	    setFormData({
		...formData,
		tags:[...formData.tags,value]
	    })
	} else {
	    setFormData({
		...formData,
		tags: formData.tags.filter((tag) => tag !== value),
	    });
	}
    };
    const handleSubmit = (e) => {
	e.preventDefault();
	const newRecord = {
	    // FIXME: use UUID
	    id: Date.now(),
	    ...formData,
	}
	console.log(newRecord)
	onAddRecord(newRecord)
	setFormData({
	    studyDate: "",
	    questionTitle: "",
	    questionUrl: "",
	    difficulty: "",
	    tags:[],
	    status:"",
	    memo:"",
	});
    }

    const tagGroup = ["dp", "graph","binary-search","math","greedy"];
    
    return (
	<>
	    <h1>学習を記録する</h1>
	    <form onSubmit={handleSubmit}>
		<div>
		    <label htmlFor="study-date">日付</label>
		    <input type="date" id="study-date" name="studyDate" value={formData.studyDate} onChange={handleChange}/>
		</div>
		<div>
		    <label htmlFor="question-title">問題名 : </label>
		    <input type="text" id="question-title" name="questionTitle" value={formData.questionTitle} onChange={handleChange}/>
		</div>
		<div>
		    <label htmlFor="question-url">URL : </label>
		    <input type="text" id="question-url" name="questionUrl" value={formData.questionUrl} onChange={handleChange} />
		</div>
		<div>
		    <label htmlFor="difficulty">difficulty : </label>	    
		    <input type="number" id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}/>
		</div>
		<fieldset>
		    <legend>タグを選択してください(複数可)</legend>
		    {tagGroup.map((tag) => (
			<label key={tag}>
			    <input type="checkbox" name="tags" value={tag} checked={formData.tags.includes(tag)} onChange={handleTagChange}/>
			    {tag}
			</label>
		    ))}
		</fieldset>
		<div>
		    <label htmlFor="status-select">ステータス</label>
		    <select id="status-select" name="status" value={formData.status} onChange={handleChange}>
			<option value="">1つ選択してください</option>
			<option value="solved">解けた</option>
			<option value="review">要復習</option>
			<option value="unsolved">解けなかった</option>
		    </select>
		</div>

		<div>
		    <label htmlFor="memo">メモ</label>
		    <textarea id="memo" name="memo" rows="5" cols="33" placeholder="ここにメモを記入" value={formData.memo} onChange={handleChange} />
		</div>
		<button type="submit">記録する</button>
	    </form>
	</>
    )
}


	    // <div>
	    // 	<label htmlFor="tags">タグを選択してください(複数可)</label>
	    // 	<select name="tags" id="tags" multiple>
	    // 	    <option value="dp">DP</option>
	    // 	    <option value="graph">graph</option>
	    // 	    <option value="binary-search">binary-search</option>
	    // 	    <option value="math">math</option>
	    // 	    <option value="greedy">greedy</option>
	    // 	</select>
	    // </div>
