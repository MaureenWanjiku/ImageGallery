'use client'

import React, { useState } from 'react'
import { IoMdReverseCamera } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import Upload from '@/component/upload';

const Nav = () => {
    const [uploadModal, setUploadModal] = useState(false)

    return (
        <div>
            <div className='p-4 bg-white shadow-md'>

                <nav className='flex flex-col md:flex-row justify-between items-center w-full gap-4'>

                    <div className='flex items-center gap-2 ml-5 cursor-pointer'>
                        <IoMdReverseCamera className='text-cyan-600 text-3xl' />
                        <p className='text-2xl font-bold text-cyan-700'>Pictoria</p>
                    </div>

                    <div className='w-full max-w-md'>
                        <input
                            type='text'
                            placeholder='Search'
                            className='bg-white border-2 focus:outline-none rounded-full p-3 w-full' />
                    </div>

                    <div className='flex flex-col md:flex-row gap-5 mr-5'>

                        <button className=' border rounded-full px-4 bg-white hover:bg-cyan-600 hover:text-white'>Log In</button>
                        <button className=' border rounded-full px-4 bg-white hover:bg-cyan-600 hover:text-white'>Sign Up</button>

                        <button
                            className="flex items-center bg-cyan-600 py-2 px-4 outline-none rounded-full hover:bg-cyan-700"
                            onClick={() => setUploadModal(true)}
                        >
                            <div className="flex items-center gap-1">
                                <MdOutlineFileUpload className="text-2xl text-white" />
                                <span className="text-white font-bold">Upload</span>
                            </div>

                        </button>

                        {uploadModal && <Upload isOpen={uploadModal} onClose={() => setUploadModal(false)} />}

                    </div>

                </nav>

            </div>
        </div>
    )
}

export default Nav