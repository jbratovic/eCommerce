
import './App.css';
import CommerceMain from './components/CommerceMain';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                
                <CommerceMain />
            </div>
        </BrowserRouter>
    );
}

export default App;
