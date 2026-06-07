import RecordItem from "./RecordItem";

export default function RecordList({records,onDeleteRecord}) {
    return (
	<>
	    <h1>学習記録一覧</h1>
	    <ul>
		{records.map((record) => (
		    <RecordItem key={record.id} record={record} onDeleteRecord={onDeleteRecord} />
		))}
	    </ul>
	</>
    )
}
		// {for (record of records){
		//     <RecordItem record={record} />
		// }}
