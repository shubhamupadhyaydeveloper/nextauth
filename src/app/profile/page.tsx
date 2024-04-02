'use client'
import React, { useEffect, useState } from 'react'
import Logout from './_components/Logout'

type userData =  {
  username : string,
  email : string,
  _id : string,
  isVerified : boolean
}

const ProfilePage =   () => {
 const [userData , setUserData] = useState<userData>()

 useEffect(()  => {
   const getData = async () =>  {
     try {
      const request = await fetch('/api/users/me')
      const response = await request.json()
      setUserData(response.user)
     } catch (error) {
        console.log('Error in getData',error)
     }
   }
   getData()
 },[])

  return (
    <div className="flex justify-center items-center h-screen">
       <div className="flex items-center flex-col gap-2 bg-gray-100 p-5 rounded-md">
           <h1>username : {userData?.username}</h1>
           <h1>email : {userData?.email}</h1>
           <h1>isVerified : {userData?.isVerified ? 'true' : 'false'}</h1>
           <Logout />
       </div>
    </div>
  )
}

export default ProfilePage;
