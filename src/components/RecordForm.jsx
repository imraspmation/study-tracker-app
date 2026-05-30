export default function RecordForm() {
    return (
	<>
	    <h1>学習を記録する</h1>
	    <form>
		<div>
		    <label htmlFor="study-date">日付</label>
		    <input type="date" id="study-date" name="studyDate"/>
		</div>
		<div>
		    <label htmlFor="question-title">問題名 : </label>
		    <input type="text" id="question-title" name="questionTitle"/>
		</div>
		<div>
		    <label htmlFor="difficulty">difficulty : </label>	    
		    <input type="number" id="difficulty" name="difficulty"/>
		</div>
		<fieldset>
		    <legend>タグを選択してください</legend>
		    <label>
			<input type="checkbox" name="tags" value="dp" />
			DP
		    </label>
		    <label>
			<input type="checkbox" name="tags" value="graph" />
			graph
		    </label>
		    <label>
			<input type="checkbox" name="tags" value="binary-search" />
			binary-search
		    </label>
		    <label>
			<input type="checkbox" name="tags" value="math" />
			math
		    </label>
		    <label>
			<input type="checkbox" name="tags" value="greedy" />
			greedy
		    </label>
		</fieldset>
		<div>
		    <label htmlFor="memo">メモ</label>
		    <textarea id="memo" name="memo" rows="5" cols="33" placeholder="ここにメモを記入"></textarea>
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
