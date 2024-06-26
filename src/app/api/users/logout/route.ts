import {NextResponse,NextRequest} from 'next/server'

export async function GET(request:NextRequest) {
    try {
        const response = NextResponse.json({
            message : "Logout successful",
            success : true
        },{status : 200})

        response.cookies.set('jwt' , "" , {httpOnly : true, expires : new Date(0)})
        return response
    } catch (error) {
        console.log("Error in Logout",error)
    }
}