'use client'
import React, { useState } from 'react'
import { useSearchParams ,useRouter} from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2 } from "lucide-react"
import {toast} from 'sonner'

const VerifyEmail = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    try {
      setLoading(true)
      const request = await fetch('/api/users/verifyemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      })
      const response = await request.json()
      if(response.error){
        toast.error(response.error)
      } else{
        toast.success('user verified')
        router.push('/')
      }
    } catch (error) {
      console.log('Error in verifyEmail', error)
    } finally {
      setLoading(false)
    }
  }
  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="flex items-center">Sorry Token is missing try again</h1>
      </div>
    )
  }
  return (
    <div className="flex gap-2 flex-col md:flex-row justify-center items-center h-screen">
     <h1>Click here for user verification</h1>
      <Button onClick={handleClick} disabled={loading} className="flex items-center">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        verify
      </Button>
    
  </div>
  
  )
}

export default VerifyEmail;
