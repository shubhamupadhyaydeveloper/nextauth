import { NextRequest, NextResponse } from 'next/server'
import { TloginApi } from '@/types/types'
import bcryptjs from 'bcryptjs'
import User from '@/models/user.model'
import jwt from 'jsonwebtoken'
import { connectToMongodb } from '@/dbConnect/connet'
// mongo db connection
connectToMongodb()

export async function POST(request: NextRequest) {
    try {
        const reqBody: TloginApi = await request.json()
        const { email,password } = reqBody;
        if (!email || !password) {
            return NextResponse.json({ error: "Invalid credentials" })
        }

        const user = await User.findOne({ email })
        if(!user) return NextResponse.json({error : 'User not found'},{status : 404})

        // verify password
        const verifyPassword =  await bcryptjs.compare(password , user?.password ||  '')
        if(!verifyPassword) return NextResponse.json({error : "Invalid password"},{status : 400})

        const jwtData = {
            user: user?._id,
            email: user?.email
        }

        const token = jwt.sign(jwtData, process.env.NEXT_SECRET!, {
            expiresIn: "5d"
        })

        const response = NextResponse.json({
            message: user,
            success : true
        },{status :  200})

        response.cookies.set('jwt',token,{httpOnly : true,maxAge : 5 * 24 * 60 * 60 * 1000})
   
        return response;
    } catch (error) {
        console.log('Error in login user', error)
    }
}