import {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './Header';
import Posts from './Posts';

function App() {
    const [jobIds, setJobIds] = useState([]);
    useEffect(() => {
        axios.get("https://hacker-news.firebaseio.com/v0/jobstories.json").then((response) => {
            setJobIds(response.data);
        });
    }, []);

    return <>
        <Header />
        <Posts items={jobIds}/>
    </>;
}


export default App;