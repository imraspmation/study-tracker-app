export default function RecordForm() {
    return (
	<>
	    <h1>学習を記録する</h1>
	    <div>
		<label for="question-title">問題名 : </label>
		<input type="text" id="question-title" name="question-title"/>
	    </div>
	    <div>
		<label for="difficulty">difficulty : </label>	    
		<input type="text" id="difficulty" name="difficulty"/>
	    </div>
	    <div>
		<label for="tags">タグを選択してください(複数可)</label>
		<select name="tags" id="tags" multiple>
		    <option value="dp">DP</option>
		    <option value="graph">graph</option>
		    <option value="binary-search">binary-search</option>
		    <option value="math">math</option>
		    <option value="greedy">greedy</option>
		</select>
	    </div>

	    <div>
		<label for="memo">メモ</label>
		<textarea id="memo" name="memo" rows="5" cols="33" placeholder="ここにメモを記入"></textarea>
	    </div>
	    
	</>
    )
}
