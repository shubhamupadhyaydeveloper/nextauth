import User from "@/models/user.model"
import { NextRequest,NextResponse } from "next/server"
import { getUserId } from "@/utils/getuserid"

export async function GET(request:NextRequest) {
    try {
     const userId = getUserId(request)
     if(!userId) return NextResponse.json({error :"Token is not found"})
     const userData = await User.findById(userId)
     if(!userData) return NextResponse.json({error : 'User is not find'});
     return NextResponse.json({user : userData,message : true})
    } catch (error) {
        console.log('Error in profileApi',error)
    }
}