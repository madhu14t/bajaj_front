// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { w3cwebsocket as W3CWebSocket } from 'websocket';

// const client = new W3CWebSocket('https://bajaj-back.onrender.com');

// function App() {
//     const [inputData, setInputData] = useState('');
//     const [responseData, setResponseData] = useState(null);
//     const [error, setError] = useState('');
//     const [visibleSections, setVisibleSections] = useState({
//         fullResponse: true
//     });

//     useEffect(() => {
//         client.onopen = () => {
//             console.log('WebSocket Client Connected');
//         };

//         client.onmessage = (message) => {
//             console.log(message.data);
//         };
//     }, []);

//     const isValidJSON = (str) => {
//         try {
//             JSON.parse(str);
//         } catch (e) {
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async () => {
//         if (!isValidJSON(inputData)) {
//             setError('Invalid JSON format');
//             return;
//         }

//         try {
//             const response = await axios.post('https://bajaj-back.onrender.com/bfhl', JSON.parse(inputData));
//             setResponseData(response.data);
//             setError('');
//         } catch (error) {
//             console.error('Error submitting data:', error);
//             setError('Error submitting data');
//         }
//     };

//     const handleVisibilityChange = () => {
//         setVisibleSections({
//             ...visibleSections,
//             fullResponse: !visibleSections.fullResponse
//         });
//     };

//     return (
//         <div>
//             <h1>21BPS1459</h1>
//             <textarea
//                 rows="10"
//                 cols="50"
//                 value={inputData}
//                 onChange={(e) => setInputData(e.target.value)}
//                 placeholder='Enter JSON here...'
//             />
//             <br />
//             <button onClick={handleSubmit}>Submit</button>

//             {error && <div style={{ color: 'red' }}>{error}</div>}

//             {responseData && (
//                 <div>
//                     <h2>Response:</h2>
//                     <label>
//                         <input
//                             type="checkbox"
//                             checked={visibleSections.fullResponse}
//                             onChange={handleVisibilityChange}
//                         />
//                         Full Response
//                     </label>
//                     {visibleSections.fullResponse && (
//                         <div>
//                             <pre>{JSON.stringify(responseData, null, 2)}</pre>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }
// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('https://bajaj-back.onrender.com');

function App() {
    const [inputData, setInputData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState('');
    const [visibleSections, setVisibleSections] = useState({
        fullResponse: true,
        numbers: false,
        alphabets: false,
        highest_lowercase_alphabet: false
    });

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            console.log(message.data);
        };
    }, []);

    const isValidJSON = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!isValidJSON(inputData)) {
            setError('Invalid JSON format');
            return;
        }

        try {
            const response = await axios.post('https://bajaj-back.onrender.com/bfhl', JSON.parse(inputData));
            setResponseData(response.data);
            setError('');
        } catch (error) {
            console.error('Error submitting data:', error);
            setError('Error submitting data');
        }
    };

    const handleVisibilityChange = (section) => {
        setVisibleSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div>
            <h1>21BPS1459</h1>
            <textarea
                rows="10"
                cols="50"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder='Enter JSON here...'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {responseData && (
                <div>
                    <h2>Response:</h2>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={visibleSections.numbers}
                                onChange={() => handleVisibilityChange('numbers')}
                            />
                            Numbers
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={visibleSections.alphabets}
                                onChange={() => handleVisibilityChange('alphabets')}
                            />
                            Alphabets
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={visibleSections.highest_lowercase_alphabet}
                                onChange={() => handleVisibilityChange('highest_lowercase_alphabet')}
                            />
                            Highest Lowercase Alphabet
                        </label>
                    </div>
                    <div>
                        {visibleSections.fullResponse && (
                            <div>
                                <pre>{JSON.stringify(responseData, null, 2)}</pre>
                            </div>
                        )}
                        {visibleSections.numbers && (
                            <div>
                                <h3>Numbers:</h3>
                                <pre>{JSON.stringify(responseData.numbers, null, 2)}</pre>
                            </div>
                        )}
                        {visibleSections.alphabets && (
                            <div>
                                <h3>Alphabets:</h3>
                                <pre>{JSON.stringify(responseData.alphabets, null, 2)}</pre>
                            </div>
                        )}
                        {visibleSections.highest_lowercase_alphabet && (
                            <div>
                                <h3>Highest Lowercase Alphabet:</h3>
                                <pre>{JSON.stringify(responseData.highest_lowercase_alphabet, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
