'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { FiDownload } from "react-icons/fi";
import Nav from '../nav/page';

const DisplayImages = () => {
  const [images, setImages] = useState([])
  const [myImages, setMyImages] = useState([])
  
  const downloadImage = async(url) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = 'image.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Download failed:", error);
    }
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('api/images')
        const data = await response.json();
        setImages(data)

        const result = await fetch('api/fetchImages')
        const dbImages = await result.json();
        setMyImages(dbImages)


      } catch (error) {
        console.error('Error Fetching Images front:', error)
      }
    };
    fetchImages();
  }, [])
  console.log(images)

  return (
    <div>

      <Nav />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {[...images, ...myImages].map((image) => (
          <div key={image.id} className="relative rounded overflow-hidden shadow-lg group">
            <div className=''>
              <img
                src={image.webformatURL || image.url}
                alt={image.tags}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-center text-sm p-2">{image.tags || "Give it a Guess!"}</p>

                <button
                  className='absolute bottom-2 right-2 text-white text-2xl '
                  onClick={() => downloadImage(image.url || image.webformatURL)}
                >
                  <FiDownload />
                </button>

              </div>
            </div>
          </div>

        ))}
      </div>


    </div>
  )
}

export default DisplayImages