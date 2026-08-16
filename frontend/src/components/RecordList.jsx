import RecordItem from "./RecordItem";

export default function RecordList({records,onDeleteRecord, onEditRecord}) {
    return (
	<section>
	    <h2 className="card-title">学習記録一覧</h2>
	    {records.length === 0 ? (
		<div className="empty-message">まだ学習記録がありません</div>
	    ) : (
	     <ul className="records-list">
		 {records.map((record) => (
		     <RecordItem
			 key={record._id}
			 record={record}
			 onDeleteRecord={onDeleteRecord}
			 onEditRecord={onEditRecord}
		     />
		 ))}
	     </ul>

	    )}
	</section>
    )
}
		// {for (record of records){
		//     <RecordItem record={record} />
		// }}
