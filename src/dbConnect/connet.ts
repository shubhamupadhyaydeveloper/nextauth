import mongoose,{Connection} from "mongoose";
let cashedConnection:Connection | null

export async function connectToMongodb() {
    try {
        if(cashedConnection) {
            console.log('cashedconnect to mongodb')
            return cashedConnection
        }
        const newConnection = await mongoose.connect(process.env.MONGO_URL as string)
        cashedConnection = newConnection.connection;
        console.log('new mongodb connection')
        return cashedConnection;
    } catch (error) {
        console.log("Error in connectToMongodb",error)
    }
}