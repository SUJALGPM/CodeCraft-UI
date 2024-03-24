import React, { useState, useRef, useEffect } from 'react';
import { message } from "antd";


const CodeSender = () => {

    //State Handle...
    const [codeSnippet, setCodeSnippet] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');


    // Send code snippet to server...
    const uploadCodeSnippet = async () => {

        if (!codeSnippet) {
            message.error("Plz enter some code to send...!!");
        }
        try {
            const response = await fetch('https://codecraft-backend-88rm.onrender.com/api/code-upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: codeSnippet }),
            });

            if (response.ok === true) {
                const data = await response.json();
                setGeneratedCode(data.data);
                message.success("Data Send Successfully...");
            } else {
                message.error("Failed to send data..!!");
            }

        } catch (error) {
            console.error('Error uploading code snippet:', error);
        }
    };


    // Handle textarea change....
    const handleTextareaChange = (e) => {
        setCodeSnippet(e.target.value);
    };


    return (
        <div>
            <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>Code Sharing Slide</h2>

            <div className='FileSender'>
                <h3>Enter code snippet and click Upload to share...</h3>
                <textarea
                    rows={10}
                    cols={50}
                    value={codeSnippet}
                    onChange={handleTextareaChange}
                    placeholder="Enter your code snippet here"
                />

                <div className='lowerfade'>
                    <button onClick={uploadCodeSnippet}>Upload</button>
                    {generatedCode && (
                        <div className='innnerfade'>
                            <h3> Share Code: <span>{generatedCode}</span></h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}



export default CodeSender;
