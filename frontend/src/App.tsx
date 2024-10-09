import { useEffect } from 'react';
import './App.css';

function App() {
   
    async function populateWeatherData() {
        const response = await fetch('https://localhost:7085/parkings-angers');
        await response.json();
    }

    useEffect(() => {
        populateWeatherData();
    }, []);

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
        </div>
    );

}

export default App;