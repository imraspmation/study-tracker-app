import {useState, useEffect} from 'react';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';

export default function Home() {
    const [records, setRecords] = useState([]);
    useEffect(() => {
	const fetchRecords = async () => {
	    const res = await fetch("http://localhost:5000/records");
	    console.log(`res:${res}`);
	    const data = await res.json();
	    console.log(`data:${data}`);
	    setRecords(data)
	};
	fetchRecords();
    },[]);
    const addRecords = async (newRecord) => {
	try{
	    const res = await fetch("http://localhost:5000/records", {
		method: "POST",
		headers: {
		    "Content-Type":"application/json",
		},
		body: JSON.stringify(newRecord),
	    });
	    const savedRecord = await res.json();
	    if (!res.ok) {
		console.error("作成に失敗", savedRecord);
		return;
	    }
	    setRecords([...records, savedRecord]);
	} catch (err) {
	    console.log("通信エラー:", err)
	}
    };
    const deleteRecords = async (id) => {
	await fetch(`http://localhost:5000/records/${id}`,{
	    method: "DELETE",
	});
	setRecords(records.filter((record) => record._id !== id));
    }
    return (
	<>
	    <RecordForm onAddRecord={addRecords}/>
	    <RecordList records={records} onDeleteRecord={deleteRecords}/>
	</>
    )
}
