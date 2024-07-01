import {z} from "zod"

export const signInSchema = z.object({
    // While logging in the user must enter username or email or identifier and password
    identifier: z.string(),
    password: z.string(),
})