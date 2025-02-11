'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { IoMdReverseCamera } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import Upload from '../upload/page';

const Home = () => {
  const [images, setImages] = useState([])
  const [uploadModal, setUploadModal] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('api/images')
        const data = await response.json();
        setImages(data)
      } catch (error) {
        console.error('Error Fetching Images front:', error)
      }
    };
    fetchImages();
  }, [])
  console.log(images)

  return (
    <div>

      <div className='flex p-4 bg-white shadow-md'>

        <nav className='flex justify-between items-center w-full'>

          <div className='flex items-center gap-2 ml-5 cursor-pointer'>
            <IoMdReverseCamera className='text-cyan-600 text-2xl' />
            <p className='text-xl font-bold text-cyan-700'>Pictoria</p>
          </div>

          <div className='w-full max-w-lg'>
            <input
              type='text'
              placeholder='Search'
              className='bg-white border-2 focus:outline-none rounded-full p-3 w-full' />
          </div>

          <div className='flex gap-5 mr-5'>

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

            { uploadModal && <Upload isOpen={uploadModal} onClose={() => setUploadModal(false)} />}
        
          </div>

        </nav>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 h-100 md:h-82 lg:h-120">
        {images.map((image) => (
          <div key={image.id} className="rounded overflow-hidden shadow-lg">
            <div className='relative'>
              <img
                src={image.webformatURL}
                alt={image.tags}
                className="w-full h-full object-cover"
              />
              <div className='overlay absolute top-0 left-0 w-full bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
                <p className='text-white'>{image.tags || 'Give it a Guess!'}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Home