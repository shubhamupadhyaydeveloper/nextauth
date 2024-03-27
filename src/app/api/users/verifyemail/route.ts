import {NextResponse,NextRequest} from 'next/server'
import User from '@/models/user.model'
import { connectToMongodb } from '@/dbConnect/connet'

// mongodb connection
connectToMongodb()

export async function GET(request:NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')
    if(!token) return NextResponse.json({error : 'Token is missing'},{status : 401})

    const user = await User.findOne({verifyToken : token,verifyTokenExpiry : {$gt : Date.now()}})
    if(!user) return NextResponse.json({error : "User not found"},{status : 404})
    

    // clean up data
    user.isVerified = true;
    user.verifyToken  = '';
    user.verifyTokenExpiry = new Date(0);

    await user.save()
    
    return NextResponse.json({
        message: "Email verified successfully",
        success: true
    })
 
  } catch (error) {
    console.log('Error in verifyUser',error)
  }
}