import { NextResponse } from "next/server";

export async function GET() {
    try{
        const response = await fetch (
            `https://pixabay.com/api/?key=${process.env.PIXABAY_ACCESS_KEY}&per_page=20`, {
                // headers: {
                //     Authorization: `client_id=${process.env.UNSPLASH_SECRET_KEY}`
                // }
            }
        )

        if(!response.ok) throw new Error('Failed to Fetch Images'); 

        const data = await response.json()
        return NextResponse.json(data.hits)

    } catch (error) {'Error Fetching Images:', error}
    return Response.json({error: 'Internal Server Error'}, {status: 500})
    
}
