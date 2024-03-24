import React, { useState } from 'react';
import axios from 'axios';
import img1 from "../../assets/back.webp";
import { FaDownload } from 'react-icons/fa';
import { message } from 'antd';



const FileReciver = () => {


    //Handle get File...
    const [fileCode, setFileCode] = useState('');
    const [fileUrl, setFileUrl] = useState('');


    //Handle get file APIs....
    const handleDownload = async () => {

        try {

            if (!fileCode) {
                message.error("Plz Enter File Code..!!!")
            }

            const response = await axios.get(`https://codecraft-backend-88rm.onrender.com/api/file-retrieve/${fileCode}`, {
                responseType: 'blob',
            });

            // Create a URL object from the blob data
            const url = URL.createObjectURL(new Blob([response.data]));
            setFileUrl(url);

            // Automatically trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = `downloaded_file.${response.headers['content-type'].split('/')[1]}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            message.success("File Download Successfully...");
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };


    return (
        <div className="fileGet">
            <div className='fileImgGet'>
                <img src={img1} />
            </div>

            <div className='innerfileget'>
                <h3>File Code : </h3>
                <input
                    type="text"
                    value={fileCode}
                    onChange={(e) => setFileCode(e.target.value)}
                    placeholder="Enter file code"
                />
                <div className='download-icon-container'>
                    <FaDownload onClick={handleDownload} className='download-icon' />
                </div>
            </div>
            {/* <button onClick={handleDownload}>Download File</button> */}
            {/* {fileUrl && <a href={fileUrl} download>Download link</a>} */}
        </div>
    );
};

export default FileReciver;
