import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { connectToMongodb } from "@/dbConnect/connet";
import { TsignUpApi } from "@/types/types";
import { nodeMailer } from "@/utils/nodemailer";

connectToMongodb()

export async function POST(request: NextRequest) {
   try {

      const reqBody: TsignUpApi = await request.json()
      const { username, email, password } = reqBody

      if (!username || !email || !password) return NextResponse.json({ error: "Value is missing in signupapi" }, { status: 400 })

      const user = await User.findOne({ email })
      if (user) return NextResponse.json({ message: "user already exist" }, { status: 409 })

      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)

      const newUser = new User({
         username,
         email,
         password: hashedPassword
      })

      await newUser.save()

      // sendEmail to user
      await nodeMailer({ email, emailType: 'VERIFY', userId: newUser._id })

      return NextResponse.json({ newUser, success: true })
   } catch (error) {
      NextResponse.json({ error: "Error in Singupapi" + error }, { status: 500 })
   }
}