import RecordItem from "./RecordItem";

export default function RecordList({records}) {
    return (
	<>
	    <h1>学習記録一覧</h1>
	    <ul>
		{records.map((record) => (
		    <RecordItem key={record.id} record={record} />
		))}
	    </ul>
	</>
    )
}
		// {for (record of records){
		//     <RecordItem record={record} />
		// }}
