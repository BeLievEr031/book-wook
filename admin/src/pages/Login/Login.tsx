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

export function Login() {
    return (
        <Card className="mx-auto max-w-sm">
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
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <div className='button pt-1 pb-1 bg-blue-500  cursor-pointer select-none
        active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
        active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
        rounded-full  border-[1px] border-blue-400'>
                        <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Login</span>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/auth/signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
