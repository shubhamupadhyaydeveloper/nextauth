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
import {useForm,FieldValues} from 'react-hook-form'
import { useRouter } from "next/navigation"
import { z} from 'zod'
import { loginZodScheam } from "@/utils/datavalidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import {toast} from 'sonner'

const Login = () => {
  const {register,handleSubmit,formState :{errors,isSubmitting},reset} = useForm<z.infer<typeof loginZodScheam>>({
    resolver : zodResolver(loginZodScheam)
  })
  const router = useRouter()

  const handleFormSubmit = async (data:FieldValues) => {
     // api 
     const request = await fetch('/api/users/login',{
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
       toast.success('login Successful')
       router.push('/')
     }
      reset()
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(handleFormSubmit)} >
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email')}
                />
              {errors.email && (<p className="text-red-600 text-md">{errors.email.message}</p>)}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" 
                 {...register('password')}
                />
                   {errors.password && (<p className="text-red-600 text-md">{errors.password.message}</p>)}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting} >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default Login;
