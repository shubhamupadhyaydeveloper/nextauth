'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {FieldValues, useForm} from 'react-hook-form'
import {z} from 'zod'
import { signUpZodSchema } from "@/utils/datavalidation"
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from "lucide-react"
import {toast} from 'sonner'

const Signup = () => {

  const {handleSubmit,register,formState : {errors,isSubmitting},reset} = useForm<z.infer<typeof signUpZodSchema>>({
    resolver : zodResolver(signUpZodSchema)
  })
  
  const handleFormSubmit = async (data : FieldValues) =>  {
   try {
     const request = await fetch('/api/users/signup',{
       method : 'POST',
       headers : {
         'Content-Type' : 'application/json'
       },
       body : JSON.stringify(data)
     })
     const response = await request.json()
     if(response.error){
      toast.error(response.error)
    } else {
      toast.success('signup Successful')
    }
     reset()
   } catch (error) {
      console.log('Error in sendData')
   }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" maxLength={100} placeholder="Robinson" required 
                 {...register('username')}
                 />
                 {errors.username && (<p className="text-red-600 text-md">{errors.username.message}</p>)}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register('email')}
                />
                {errors.email && (<p className="text-red-600 text-md">{errors.email.message}</p>)}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required
               {...register('password')}
              />
                 {errors.password && (<p className="text-red-600 text-md">{errors.password.message}</p>)}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      </form>
    </div>
  )
}

export default Signup;
