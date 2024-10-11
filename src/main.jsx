import ReactDom from 'react-dom/client';
import App from './App.jsx';
import "./index.css"

let rootEle = document.getElementById('root');
ReactDom.createRoot(rootEle).render(<App />)