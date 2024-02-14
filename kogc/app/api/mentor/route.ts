// @ts-nocheck
import { NextResponse } from 'next/server';
import MentorModel from '../../../Models/mentors'
import connectDB from '../../../utils/connectmongo'
// import { getSession } from '@auth0/nextjs-auth0';


export async function POST(req: Request, res: NextResponse) {
    try {
      await connectDB()
      const body = await req.json()
      console.log("Receiving body data", body)
      const { firstName, lastName, email, about, calendly } = { firstName: body.firstName, lastName: body.lastName, email: body.email, about: body.about, calendly: body.eventLink }
  
      // creating a new mentor
      // check if email already exists
      const mentor = await MentorModel.findOne({ email: email })
      if (mentor) {
        return NextResponse.json({ message: 'You are already a mentor', status: 200 });
      }
  
      const newMentor = new MentorModel({
        firstName,
        lastName,
        email,
        about,
        calendly
      })
      await newMentor.save()
      return NextResponse.json({ message: 'You are now a counsellor', status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
  
  export async function GET(req: Request, res: NextResponse) {
    try {
      //get all mentors from the database
      await connectDB()
      const mentors = await MentorModel.find({})
      return NextResponse.json({ message: 'Request successful', status: 200, data: mentors });
    } catch (error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }