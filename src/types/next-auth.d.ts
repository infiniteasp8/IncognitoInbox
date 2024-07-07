import  "next-auth";
import { DefaultSession } from "next-auth";
// This part is redefining the User interface of next auth to provide some more data types, so redfeining the interface
declare module 'next-auth'{
    interface User{
        _id?: string ;
        isVerified: boolean;
        isAcceptingMessages?: boolean;
        username?: string
    }
    interface Session{
        user:{
            _id?: string;
            isVerified: boolean;
            isAcceptingMessages?: boolean;
            username?: string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?: string;
        isVerified: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
}