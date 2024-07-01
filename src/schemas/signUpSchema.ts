import {z} from 'zod'

// Directly using as it is a single value usernameValidation
export const usernameValidation = z
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .max(20, "Username can be atmost 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must contain only letters and numbers')

// signUpValidation is having more then one entity to checck that is why we need to make object
export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, {message:'Password must be at least 8 characters long'})
})