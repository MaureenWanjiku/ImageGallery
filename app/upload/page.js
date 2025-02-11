"use client"

import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"


const Upload = ({ isOpen, onClose }) => {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState('')
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const handleFIleChange = (e) => {
        const selectedFile = e.target.files[0]

        if(selectedFile) {
            setFile(selectedFile)
            setPreview(URL.createObjectURL(selectedFile))
        }
    }

    const handleImageUpload = async () => {
        if(!file) {
            setError("Please select a file to upload.")
            return
        } 

        setUploading(true)
        setError('')

        const formData = new FormData()
        formData.append('file', file)
        // formData.append("upload_preset", "gallery")

        try{
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json()
            console.log('Upload Response:', data)
            if(data.url) {
                alert("Upload successful! 🎉")
                setFile(null)
                setPreview("")
            } else {
                setError("Upload failed. Please try again.")
            }
        } catch(err) {
            setError('Something went wrong. Try again later.')
        }

        setUploading(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>

            <DialogContent>

                <h2 className='text-lg font-semibold'>Upload an Image</h2>

                <div>
                    <p>Image Description</p>
                    <Textarea placeholder="Write a Short Image Description" />
                </div>


                <div>
                    <p>Upload a Photo</p>

                    <Input type='file' accept="image/*" onChange={handleFIleChange} />

                    {preview && (
                        <img
                        src={preview}
                        alt='preview' 
                        className="w-full h-40 object-cover mt-2 rounded-lg"
                        />
                    )}

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                </div>

                {/* <Button disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </Button> */}



                <Button onClick={handleImageUpload} disabled={uploading} className='bg-cyan-600 hover:bg-cyan-700'>
                    {uploading ? 'Uploading...' : 'Add Image'}
                </Button>

                <Button className='bg-white border text-black hover:bg-red-500'>Cancel</Button>

            </DialogContent>

        </Dialog>
    )
}

export default Upload