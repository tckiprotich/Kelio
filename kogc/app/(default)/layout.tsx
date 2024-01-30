'use client'

import { useEffect } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client';

import AOS from 'aos'
import 'aos/dist/aos.css'

import Footer from '@/components/ui/footer'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })

  return (
    <UserProvider>
    <>
  
    
      <main className="grow">

        {children}

      </main>

      <Footer />
     
      
    </>
    </UserProvider>
  )
}
