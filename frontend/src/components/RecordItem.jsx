export default function RecordItem({record, onDeleteRecord}){
    return (
	<li>
	    <h3>{record.questionTitle}</h3>
	    <p>日付: {record.studyDate}</p>
	    <p>difficulty: {record.difficulty}</p>
	    <p>タグ: {record.tags.length > 0 ? record.tags.join(", ") : "なし"}</p>
	    <p>メモ: {record.memo || "なし"}</p>
	    <button type="button" onClick={() => onDeleteRecord(record.id)}>削除する</button>
	</li>
    )
}
