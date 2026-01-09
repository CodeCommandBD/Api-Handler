import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string().min(3, "কমপক্ষে ৩ অক্ষরের username দাও"),
    email: z.string().email("সঠিক email দাও"),
    password: z.string().min(6,"কমপক্ষে ৬ অক্ষরের password দাও")
})

export const loginSchema = z.object({
  email: z.string().email("সঠিক email দাও"),
  password: z.string().min(6, "কমপক্ষে ৬ অক্ষরের password দাও"),
});