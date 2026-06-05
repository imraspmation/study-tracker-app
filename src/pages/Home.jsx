import {useState} from 'react';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';

export default function Home() {
    const [records, setRecords] = useState([]);
    const addRecords = (newRecord) => {
	setRecords([...records, newRecord]);
    };
    return (
	<>
	    <RecordForm onAddRecord={addRecords}/>
	    <RecordList records={records}/>
	</>
    )
}
