import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CodeSender from './CodeContent/CodeSender';
import CodeReciver from './CodeContent/CodeReciver';
import FileSender from './FileContent/FileSender';
import FileReciver from './FileContent/FileReciver';


const MasterContent = () => {


    //Pagination States....
    const [currentPage, setCurrentPage] = useState(1);
    const [pageName, setPageName] = useState('');

    //Handle Previous pagination....
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    //Handle Next pagination....
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    //Pagination wise Contentt Display...
    useEffect(() => {
        if (currentPage === 1) {
            setPageName('Code Sender Slide')
        } else if (currentPage === 2) {
            setPageName('File Sender Slide')
        }else if(currentPage === 3){
            setPageName('File Conversion Slide')
        }
    }, [currentPage]);





    return (
        <div className='Cover'>
            {/* LEFT-SIDE-CONTENT */}
            <div className='sideImage'>
                <div className="slider-container">
                    {currentPage === 1 && (
                        <div className='PageSlide'>
                            <CodeSender />
                        </div>
                    )}

                    {currentPage === 2 && (
                        <div className='PageSlide'>
                            <div className='InnerPage2'>
                                <div className='textpro'>
                                    <h2>Upload Documents Here...</h2>
                                </div>
                                <FileSender />
                            </div>
                        </div>
                    )}

                    {currentPage === 3 && (
                        <div className='PageSlide'>
                            <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>Slide 3</h2>
                            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>Content for Slide 3 goes here...</p>
                        </div>
                    )}


                    <div className='Pagination'>
                        <button disabled={currentPage === 1} onClick={handlePrevPage}><FaArrowLeft /></button>
                        <span className='PageName'><h4>{pageName}</h4></span>
                        <button disabled={currentPage === 3} onClick={handleNextPage}><FaArrowRight /></button>
                    </div>
                </div>
            </div>


            {/* RIGHT-SIDE-CONTENT */}
            <div className='mainContent'>
                {currentPage === 1 && (
                    <CodeReciver />
                )}
                {currentPage === 2 && (
                    <FileReciver />
                )}
            </div>
        </div>
    )
}

export default MasterContent;
