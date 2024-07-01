import {z} from "zod"

export const messageSchema = z.object({
    content: z.string()
    .min(10, "Message must be of atleast 10 characters")
    .max(300, "Message can be atmost 300 characters long")
})