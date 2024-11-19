'use server'

import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const loginSchema = z.object({
    email : z.string().email({message: "Veuillez saisir un mail correct"}),
    password : z.string().min(4, {message: "Min password 4 lettres!"})
})

export const login = async (state : any, formData : FormData) => {

    try {
        
        const fielvalidator = loginSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password")
        })
    
        if (!fielvalidator.success) {
            return {
                errors: fielvalidator.error.flatten().fieldErrors
            }
        }

        const { email, password } = fielvalidator.data

        // Faire un post pour authentification

        const res = await axios.post('http://localhost:8000/api/auth/login', {
            email,
            password
        })

        if (res.data.token) {
            const token = res.data.token

            // Stockage de token dans cookies
            cookies().set('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                path: '/',
                secure: process.env.NODE_ENV === 'production'
            })

        }

    } catch (error: any) {        
        return { type: 'error', message: error?.response?.data?.msg }
        
    }

    redirect('/dashboard')
}