import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { message } from 'antd';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';

const FileShare1 = () => {

    // File store in state...
    const [file, setFile] = useState(null);
    const [fileSize, setFileSize] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [fileCode, setFileCode] = useState('');


    // Handle file drop from drag and drop feature
    const handleDrop = (file) => {
        setFile(file);
        setFileSize(file.size);
        setFileName(file.name);
    };


    // Clear selected file
    const handleCancel = () => {
        setFile(null);
        setFileSize(null);
        setFileName(null);
    };


    // Send file to server...
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Check file select or not....
        if (!file) {
            message.error('Please select a file to upload.');
            return;
        }

        //Configure file using instance....
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://codecraft-backend-88rm.onrender.com/api/file-store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.code);
            setFileCode(response.data.code);
            message.success('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
            message.error('Error uploading file.');
        }
    };


    return (
        <div>
            <div className='FileSenderNew'>
                <div className='FileUpper'>
                    <FileUploader handleChange={handleDrop} name="file" hoverTitle="Drop here" />
                    {file && fileSize && fileName && (
                        <div className='filedetail'>
                            <h3>File Name : <span className="file-code">{fileName}</span></h3>
                            <h3>File Size : <span className="file-code">{fileSize}</span></h3>
                        </div>
                    )}
                    {fileCode && (
                        <div>
                            <h3>File Share : <span className="file-code">{fileCode}</span></h3>
                        </div>
                    )}
                </div>

                <div className='FileLower'>
                    <form onSubmit={handleSubmit}>
                        <button onClick={handleCancel} className='btn1'>Cancel</button>
                        <button type="submit" className='btn2' style={{ marginLeft: '231px' }}>Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FileShare1;
