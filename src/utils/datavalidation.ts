'use client'

import {z} from 'zod'

export const signUpZodSchema = z.object({
    username : z.string().min(1,'username not empty'),
    email : z.string().email(),
    password : z.string().min(4,'password at least 4 digits')
})

export const loginZodScheam = z.object({
    email : z.string().email(),
    password : z.string().min(4,"password at least 4 digits")
})