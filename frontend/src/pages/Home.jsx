import {useState, useEffect} from 'react';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';

export default function Home() {
    const [records, setRecords] = useState([]);
    useEffect(() => {
	const fetchRecords = async () => {
	    const res = await fetch("http://localhost:5000/records");
	    console.log(res);
	    const data = await res.json();
	    console.log(data);
	    setRecords(data)
	};
	fetchRecords();
    },[]);
    const addRecords = async (newRecord) => {
	const res = await fetch("http://localhost:5000/records", {
	    method: "POST",
	    headers: {
		"Content-Type":"application/json",
	    },
	    body: JSON.stringify(newRecord),
	});
	const savedRecord = await res.json();
	setRecords([...records, savedRecord]);
    };
    const deleteRecords = (id) => {
	setRecords(records.filter((record) => record.id !== id));
    }
    return (
	<>
	    <RecordForm onAddRecord={addRecords}/>
	    <RecordList records={records} onDeleteRecord={deleteRecords}/>
	</>
    )
}
