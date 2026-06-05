import RecordItem from "./RecordItem";

export default function RecordList({records}) {
    return (
	<>
	    <h1>学習記録一覧</h1>
	    <ul>
		{for (record of records){
		    <RecordItem record={record} />
		}}
	    </ul>
	</>
    )
}
