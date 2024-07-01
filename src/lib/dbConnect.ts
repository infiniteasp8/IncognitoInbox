import mongoose from "mongoose";

// Manage the conditions that if the connection already exists dont make one more, else make one connection

type ConnectionObject = {
    // ? is for the making isConnected a optional field
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to Database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI ||'', {});
        connection.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB connection failed", error);
        // If not able to connect to database end the process
        process.exit(1);
    }
}
export default dbConnect;