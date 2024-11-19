import React from 'react'
import { LoginForm } from './_components/login-form'
import { verifySession } from '@/lib/auth'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const currentUser = await verifySession()
  if (currentUser) {
    redirect('/dashboard')
  }
  return (
    <div className='flex items-center justify-center h-screen'>
        <LoginForm />
    </div>
  )
}

export default LoginPage