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
import { Link } from "react-router-dom"

export function SignUp() {
    return (
        <Card className="mx-auto max-w-sm shadow-xl">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="Max" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Robinson" required />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    {/* <Button type="submit" className="w-full">
            Create an account
          </Button> */}

                    <div className='button pt-1 pb-1 bg-blue-500  cursor-pointer select-none
        active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
        active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
        rounded-full  border-[1px] border-blue-400'>
                        <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Sign Up</span>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm">
                    Already have an account?
                    <Link to="/auth/login" className="underline ">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
