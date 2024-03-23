import { Document } from "mongoose"

export type TuserSchema = Document & {
    username: string,
    email: string
    password: string,
    isVerified: boolean,
    isAdmin: boolean,
    verifyToken: string,
    verifyTokenExpiry: Date,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date
}

export type TsignUpApi =  {
    username : string,
    email : string,
    password : string
}