import mongoose, {Schema,Document} from "mongoose";

// Structuring of mongoose database


// Creation of interface(schema) with the typescript for type safety
// in ts string datatype is lowercase string
export interface Message extends Document{
    content: string,
    createdAt: Date
}

// This is mongoose schema made with mongoose 
// This has datatype in uppercase String
const MessageSchema: Schema<Message>  = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required: true
    }
})

export interface User extends Document{
    username: string,
    password: string,
    email: string,
    verifyCode: string,
    isVerified: boolean,
    verifyCodeExpiry: Date,
    isAcceptingMessages: boolean,
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema ({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'please use valid email']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "VerifyCode is required"]
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "Verify Code Expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: {
        type: [MessageSchema]
    }
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);

export default UserModel;