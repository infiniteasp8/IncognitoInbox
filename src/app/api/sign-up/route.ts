import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

/*
IF exisitngUserByEmail exisits then 
    IF exisitngUserByEmail.iserified THen
    success: flase, (no need to register again as it is verifuied by email)
    ELSE 
    save the updated user and verify the email
    END IF
ELSE
create and save the new user and verify the email
*/



export async function POST (request: Request){
    await dbConnect();

    try {
        const {username, email, password} = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if(existingUserVerifiedByUsername){
            return Response.json({
            success: false,
            message: "Username already taken"
            }, {status: 400})
        }

        const existingUserByEmail = await UserModel.findOne({
            email
        })
        const verifyCode = Math.floor(100000 + Math.random()*900000).toString();

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User with this email already exists"
                }, {status:400})
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+ 3600000);
                await existingUserByEmail.save();
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10);
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            const newUser = new UserModel({  
                username,
                password: hashedPassword,
                email,
                verifyCode,
                isVerified: false,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessages: true,
                messages: []
            })
            await newUser.save() 
            // Send verification email 
            // emailResponse this will give .sucess true if mail sent
            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            )
            if(!emailResponse.success){
                return Response.json({
                    success: false,
                    message: emailResponse.message
                }, {status: 500})  
            }
        }
        return Response.json({
            success: false,
            message:"User registered successfully. Please verify your email"
        }, {status: 201})
    } catch (error) {
        console.error("Error registering user", error);
        return Response.json({
            success: false,
            message:"Error registering user"
        },

        {
            status: 500
        }
    )
    }
}