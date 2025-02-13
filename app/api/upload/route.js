import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient()

export async function POST(req) {

  try {

    //extract data from the request
    const formData = await req.formData()

    const file = formData.get('file')
    
    //check if file exists
    if (!file) {
      return NextResponse.json({ error: 'No file Uploaded' }, { status: 400 })
    }

    //convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    //uploading the image to cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        upload_preset: "gallery"
      },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)

    })

     //Check if upload was successfull
     if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('Cloudinary Upload Failed')
    }

    //save the url to db
    const uploadedImage = await prisma.image.create({
      data: {
        url: uploadResult.secure_url,
      },
    });

    //return image if successful.
    return NextResponse.json({ url: uploadedImage.url}, {status: 200})


  } catch(error) {
    console.error('Upload error:', error)
    return NextResponse.json({error: error.message}, {status: 500})
  }
}