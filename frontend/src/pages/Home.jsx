import {useState, useEffect} from 'react';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';

export default function Home() {
    const [records, setRecords] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null);
    useEffect(() => {
	const fetchRecords = async () => {
	    const res = await fetch("http://localhost:5000/records");
	    const data = await res.json();
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
	    const data = await res.json();
	    if (!res.ok) {
		const error = new Error(data.message || "保存に失敗しました");
		error.fieldErrors = data.errors;
		throw error;
		// console.error("作成に失敗", savedRecord);
		// return;
	    }
	    setRecords([...records, data]);
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
    const startEditRecord = (record) => {
	setEditingRecord(record);
    };
    const updateRecord = async (updatedData) => {
	const res = await fetch(
	    `http://localhost:5000/records/${editingRecord._id}`,
	    {
		method: "PATCH",
		headers: {
		    "Content-Type": "application/json",
		},
		body: JSON.stringify(updatedData),
	    }
	);
	const data = res.json();
	if (!res.ok) {
	    const error = new Error(data.message || "更新に失敗しました");
	    error.fieldErrors = data.errors;
	    throw error;
	    // console.error("更新に失敗しました")
	    // return;
	}
	// console.log(await res.json());
	// const updatedRecord = await res.json();
	setRecords(
	    records.map((record) =>
		record._id === data._id ? data : record
	    )
	);

	setEditingRecord(null);
    }
    const cancelEdit = () => {
	setEditingRecord(null);
    }
    return (
	<>
	    <RecordForm
		onAddRecord={addRecords}
		onUpdateRecord={updateRecord}
		editingRecord={editingRecord}
		onCancelEdit={cancelEdit}
	    />
	    <RecordList
		records={records}
		onDeleteRecord={deleteRecords}
		onEditRecord={startEditRecord}
	    />
	</>
    )
}
