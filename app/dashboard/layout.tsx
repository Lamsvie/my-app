import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { SidebarDashboad } from './_components/sidebar-dashboard'
import { Toaster } from '@/components/ui/sonner'
import { verifySession } from '@/lib/auth'
import { redirect } from 'next/navigation'

const DashboardLayout = async ({ children }: { children : React.ReactNode }) => {
  const currentUser = await verifySession()
  console.log(currentUser);
  
  if (!currentUser) {
    redirect('/auth/login')
  }
  return (
    <SidebarProvider>
      <SidebarDashboad />
      <main className='w-full'>
        <SidebarTrigger />
        {children}
        <Toaster richColors />
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout