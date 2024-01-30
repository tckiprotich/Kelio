import { NextResponse } from 'next/server';
import NewsModel from '../../../Models/newsletter'
import connectDB from '../../../utils/connectmongo'


export async function POST(req: Request, res: NextResponse) {
    await connectDB()
    const body = await req.json()
    console.log(body)

    const { email } = body

    const newEmail = new NewsModel({
        email
    })

    await newEmail.save()
    return NextResponse.json({ message: 'You have joined the newsletter', status: 200 });

}