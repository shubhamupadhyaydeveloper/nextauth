import {NextRequest} from 'next/server'
import jwt from 'jsonwebtoken';
import { tokenData } from '@/app/api/users/login/route';

export function getUserId (request:NextRequest) {
    try {
    const token = request.cookies.get('jwt')?.value || '';
    const decodedToken = jwt.verify(token,process.env.NEXT_SECRET!) as tokenData
    return decodedToken.userId
    } catch (error) {
        console.log('Error in getUserId',error)
    }
}
