const statusLabels = {
    solved: "解けた",
    review: "要復習",
    unsolved: "解けなかった",
    "": "未選択",
};

const statusClassNames = {
    solved: "status-solved",
    review: "status-review",
    unsolved: "status-unsolved",
    "":"",
}

export default function RecordItem({record, onDeleteRecord,onEditRecord}){
    const statusLabel = statusLabels[record.status] || "";
    const statusClassName = statusClassNames[record.status] || "";
    
    return (
	<li className="record-card">
	    <div className="record-card-header">
		<div>
		    <h3 className="record-title">{record.questionTitle}</h3>
		    <p className="record-meta">日付: {record.studyDate || "未入力"}</p>
		</div>
		<span className={`badge status-badge ${statusClassName}`}>
		    {statusLabel}
		</span>
	    </div>
	    {record.questionUrl && (
		<p className="record-meta">
		    URL: {" "}
		    <a href={record.questionUrl} target="_blank" rel="noreferrer">
			問題ページを開く
		    </a>
		</p>
	    )}
	    
	    <p className="record-meta">
		difficulty: {record.difficulty ?? "未入力"}
	    </p>

	    <div className="badge-row">
		{record.tags && record.tags.length > 0 ? (
		    record.tags.map((tag) => (
			<span className="badge" key={tag}>
			    {tag}
			</span>
		    ))
		) : (
		    <span className="badge">タグなし</span>
		)}
	    </div>
	    <p className="record-meta">
		メモ: {record.memo || "なし"}
	    </p>
	    <div className="record-actions">
		<button
		    className="btn btn-secondary"
		    type="button"
		    onClick={() => onEditRecord(record)}>
		    編集
		</button>
		
		<button
		    className="btn btn-danger"
		    type="button"
		    onClick={() => onDeleteRecord(record._id)}>
		    削除する
		</button>
	    </div>
	</li>
    )
}
