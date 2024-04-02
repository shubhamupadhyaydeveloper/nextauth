'use client'

import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { Loader2 } from "lucide-react"
import { toast } from 'sonner'
import { LogOut } from 'lucide-react';


const Logout = () => {
    const [loading, setLoading] = useState(false)
    const handleLogout = async () => {
        try {
            setLoading(true)
            const request = await fetch('/api/users/logout', {
                method: 'GET'
            })
            const response = await request.json()
            toast.success('logout successful')
        } catch (error) {
            console.log('Error in logout', error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div>
            <Button disabled={loading} onClick={handleLogout}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <LogOut size={'1rem'} />
            </Button>
        </div>
    )
}

export default Logout;
