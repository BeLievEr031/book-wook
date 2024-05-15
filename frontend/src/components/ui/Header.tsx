import { ShoppingCart, User } from 'lucide-react'
import { Button } from './button'
import { Input } from './input'

function Header() {
    return (
        <header className='flex justify-center items-center gap-10 h-[80px] bg-white shadow-lg px-4'>
            <div className="hidden text-xl font-bold text-blue-500 md:block">
               <span className='text-4xl'>B</span> 
                ook-
                <span className='text-2xl'>W</span>
                ook
            </div>
            <Input className='w-2/3'placeholder='Search your book here'/>
            <Button className='flex gap-4' variant={"login"}>
                <User/>
                Login
            </Button>
            <div className='hidden md:flex cursor-pointer gap-2 md-block'>
            <ShoppingCart />
            <span className='font-bold'> Cart </span>
            </div>
        </header>
    )
}

export default Header