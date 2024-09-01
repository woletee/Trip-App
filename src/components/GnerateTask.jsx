import React, { useState } from 'react';

const GenerateTask = () => {
    const [inputGrid, setInputGrid] = useState('1 0 2\n0 1 0\n2 0 1');
    const [outputGrid, setOutputGrid] = useState('2 0 2\n0 2 0\n2 0 2');
    const [generatedTasks, setGeneratedTasks] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/generate-ttasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inputGrid: inputGrid.split('\n').map(row => row.split(' ').map(Number)),
                    outputGrid: outputGrid.split('\n').map(row => row.split(' ').map(Number)),
                }),
            });
            const data = await response.json();
            console.log("Generated tasks:", data.tasks);
            setGeneratedTasks(data.tasks);
        } catch (error) {
            console.error("Error generating tasks:", error);
        }
    };

    return (
        <div>
            <h2>Generate ARC Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Input Grid:</label>
                    <textarea
                        value={inputGrid}
                        onChange={(e) => setInputGrid(e.target.value)}
                        placeholder="Enter input grid row by row, e.g., 0 1 0\n1 0 1\n0 1 0"
                        rows={5}
                        style={{ width: '100%', fontFamily: 'monospace' }}
                    />
                </div>
                <div>
                    <label>Output Grid:</label>
                    <textarea
                        value={outputGrid}
                        onChange={(e) => setOutputGrid(e.target.value)}
                        placeholder="Enter output grid row by row, e.g., 0 2 0\n2 0 2\n0 2 0"
                        rows={5}
                        style={{ width: '100%', fontFamily: 'monospace' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                >
                    Generate Tasks
                </button>
            </form>

            {generatedTasks.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>Generated Tasks</h3>
                    {generatedTasks.map((task, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '1rem',
                                padding: '1rem',
                                border: '1px solid #bdc3c7',
                                borderRadius: '5px',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            <h4>Task {index + 1}</h4>
                            <p>Input Grid:</p>
                            <pre>{task.input_grid.map(row => row.join(' ')).join('\n')}</pre>
                            <p>Output Grid:</p>
                            <pre>{task.output_grid.map(row => row.join(' ')).join('\n')}</pre>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <img src={`data:image/png;base64,${task.images.original_input}`} alt="Original Input Grid" />
                                <img src={`data:image/png;base64,${task.images.original_output}`} alt="Original Output Grid" />
                                <img src={`data:image/png;base64,${task.images.generated_input}`} alt="Generated Input Grid" />
                                <img src={`data:image/png;base64,${task.images.generated_output}`} alt="Generated Output Grid" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenerateTask;
