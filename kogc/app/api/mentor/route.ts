import { NextResponse } from 'next/server';
import MentorModel from '../../../Models/mentors'
import connectDB from '../../../utils/connectmongo'
// import { getSession } from '@auth0/nextjs-auth0';


export async function POST(req: Request, res: NextResponse) {

    await connectDB()
    const body = await req.json()
    const about = body.about
    const username = body.username // calendly username
    const useremail = body.email // email

    // creating a new mentor
    // check if email already exists
    const mentor = await MentorModel.findOne({ email: useremail })
    if (mentor) {
        return NextResponse.json({ message: 'You are already a mentor', status: 200 });
    }

    const newMentor = new MentorModel({
        name: username,
        email: useremail,
        bio: about,

    })
    await newMentor.save()
    return NextResponse.json({ message: 'You are now a counsellor', status: 200 });

}




export async function GET (req: Request, res: NextResponse) {
    //get all mentors from the database
    await connectDB()
    const mentors = await MentorModel.find({})
    return NextResponse.json({ message: 'Request successful', status: 200, data: mentors });

}