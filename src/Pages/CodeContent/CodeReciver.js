import React, { useState, useRef, useEffect } from 'react';
import { message } from "antd";
import { FaDownload } from 'react-icons/fa';
import img1 from "../../assets/back.webp"

const CodeReciver = () => {

    //Handle State...
    const [codeDigit, setCodeDigit] = useState('');
    const [fetchData, setFetchData] = useState('');


    // Get code from server....
    const uploadDigitSnippet = async () => {
        try {
            const response = await fetch(`https://codecraft-backend-88rm.onrender.com/api/code-get/${codeDigit}`, {
                method: 'GET'
            });

            if (response.ok === true) {
                const data = await response.json();
                console.log("fetch :", data);
                setFetchData(data.data);
                message.success("Data Fetch Successfully...");
            } else {
                message.error("Failed to Fetch data..!!");
            }

        } catch (error) {
            console.error('Error fetch data:', error);
        }
    };


    //Handle Digit...
    const handleDigitCode = (e) => {
        setCodeDigit(e.target.value);
    };


    // Copy text to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(fetchData)
            .then(() => {
                message.success("Text copied to clipboard");
            })
            .catch((error) => {
                console.error('Error copying text:', error);
                message.error("Failed to copy text");
            });
    };


    return (
        <div>
            <div className='txthandle'>
                <h3 >Code Receiving Slide</h3>
            </div>
            <div className='FileReciver'>
                {/* <div className='fileImgGet'>
                    <img src={img1} />
                </div> */}
                <div className='FilerecieveInner'>
                    <h4>Enter Code : </h4>
                    <input
                        value={codeDigit}
                        onChange={handleDigitCode}
                        placeholder="Enter your code here"
                    />
                    <div className='download-icon-container2'>
                        <FaDownload onClick={uploadDigitSnippet} className='download-icon' />
                    </div>
                </div>
                {fetchData && (
                    <div className='FetchedData'>
                        <div className='dynoData'>
                            <h3>Fetched Data :-</h3>
                            <button onClick={copyToClipboard}>Copy Message</button>
                        </div>
                        <textarea
                            rows={10}
                            cols={50}
                            value={fetchData}
                            readOnly
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CodeReciver;
