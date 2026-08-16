import {useState, useEffect} from 'react';
import RecordForm from '../components/RecordForm';
import RecordFilter from "../components/RecordFilter";
import RecordList from '../components/RecordList';

export default function Home() {
    const [records, setRecords] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null);

    const [searchText,setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [tagFilter, setTagFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    
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
	const res = await fetch(`http://localhost:5000/records/${id}`,{
	    method: "DELETE",
	});
	if (!res.ok) {
	    alert("削除に失敗しました");
	    return;
	}
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
	const data = await res.json();
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

    const resetFilters = () => {
	setSearchText("");
	setStatusFilter("");
	setTagFilter("");
	setDifficultyFilter("");
    };
    const filteredRecords = records.filter((record) => {
	const keyword = searchText.trim().toLowerCase();
	const questionTitle = record.questionTitle?.toLowerCase() || "";
	const memo = record.memo?.toLowerCase() || "";
	const questionUrl = record.questionUrl?.toLowerCase() || "";

	const matchesSearch =
	      keyword === "" ||
	      questionTitle.includes(keyword) ||
	      memo.includes(keyword) ||
	      questionUrl.includes(keyword);
	const matchesStatus = statusFilter === "" || record.status === statusFilter;
	const matchesTag = tagFilter === "" || record.tags?.includes(tagFilter);
	const matchesDifficulty = difficultyFilter === "" ||
	      Number(record.difficulty) >= Number(difficultyFilter);

	return (matchesSearch && matchesStatus && matchesTag && matchesDifficulty); 
    })
    return (
	<main className="app-shell">
	    <header className="page-header">
		<h1>Study Tracker</h1>
		<p>競プロ・Web学習の記録を残して、復習しやすくするアプリ</p>
	    </header>
	    <RecordForm
		onAddRecord={addRecords}
		onUpdateRecord={updateRecord}
		editingRecord={editingRecord}
		onCancelEdit={cancelEdit}
	    />
	    <RecordFilter
		searchText={searchText}
		onSearchTextChange={setSearchText}
		statusFilter={statusFilter}
		onStatusFilterChange={setStatusFilter}
		tagFilter={tagFilter}
		onTagFilterChange={setTagFilter}
		difficultyFilter={difficultyFilter}
		onDifficultyFilterChange={setDifficultyFilter}
		onResetFilters={resetFilters}
	    />
	    <p className="record-count">
		表示件数: {filteredRecords.length} / {records.length}
	    </p>
	    <RecordList
		records={filteredRecords}
		onDeleteRecord={deleteRecords}
		onEditRecord={startEditRecord}
	    />
	</main>
    )
}
