
function Footer() {
    return (
        <footer className="flex flex-col md:flex-row py-8 md:py-14 px-12 w-[95%] bg-white mx-auto mt-5 gap-10 rounded-lg">
            <div>
                <ul className="capitalize font-semibold">
                    <div className="text-xl font-bold text-blue-500">
                        <span className='text-4xl'>B</span>
                        ook-
                        <span className='text-2xl'>W</span>
                        ook
                    </div>
                    <li className="cursor-pointer tracking-wider mt-1">Home</li>
                    <li className="cursor-pointer tracking-wider mt-1">Search</li>
                    <li className="cursor-pointer tracking-wider mt-1">login</li>
                    <li className="cursor-pointer tracking-wider mt-1">Cart</li>
                </ul>
            </div>
            <div className="h-[160px] w-[2px] bg-black hidden md:block">
            </div>
            <div>
                <ul className="capitalize font-semibold">
                    <div className="text-xl font-bold text-blue-500">
                        <span className='text-4xl'>C</span>
                        ontact-
                        <span className='text-2xl'>U</span>
                        s
                    </div>
                    <li className="cursor-pointer tracking-wider mt-1">test@gmail.com</li>
                    <li className="cursor-pointer tracking-wider mt-1">+9511849241</li>
                    <li className="cursor-pointer tracking-wider mt-1">02525-88050</li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer