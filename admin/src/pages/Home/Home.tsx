import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-black opacity-90">
            <div className="flex justify-center flex-col items-center">
                <h1 className="text-white text-center">
                    <span className="font-extrabold text-7xl">At <span className="text-blue-600">Book</span>-Woook</span>
                    <br />
                    <span className="font-bold text-4xl">we believe in the power of books to inspire,
                        educate, and transform lives.</span>
                </h1>
                <div className='mt-5 text-center button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
                    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]'>
                    <Link to={"/auth/signup"} className='flex flex-col justify-center items-center h-full text-white font-bold text-lg'>Explore <br /> Book-Wook</Link>
                </div>
            </div>
        </div>
    )
}
