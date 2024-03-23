import mongoose,{Model} from "mongoose";
import { TuserSchema } from "@/types/types";

const userSchema = new mongoose.Schema<TuserSchema>({
    username : {
        type : String,
        required : [true,'Username is required'],
        unique : true
    },
    email : {
        type : String,
        required : [true,'Email is required'],
        unique : true
    },
    password : {
        type : String,
        required :[true,"Password is required"],
        minLength : [4,"Atleast 4 digit"]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type:Boolean,
        default : false
    },
    verifyToken : String,
    verifyTokenExpiry : Date,
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date
},{timestamps : true})

const User: Model<TuserSchema> = mongoose.models?.users || mongoose.model("users",userSchema)

export default User;