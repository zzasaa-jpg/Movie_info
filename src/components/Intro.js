import { Link } from 'react-router-dom';
function Into() {
    
    return (
        <div className="bg-[url('Images/bg.avif')] h-56 bg-cover bg-no-repeat m-0 sm:w-full sm:bg-cover sm:h-[500px] lg:h-[100vh]">
            
            <h1 className=" text-[#000000] text-left py-6 px-2 w-[350px] sm:text-[25px] sm:py-[40px] sm:w-96  sm:px-10 sm:pb-10 lg:text-[40px] lg:py-[100px] lg:w-[850px]">Welcome to billions of  movies here for your choice!<span className=' text-[#ffffff] sm:text-[#000000]'> let</span>'s Do it!</h1>

           {/* serach button */}
            <Link to="/search">
            <button className=' bg-[#04eaffe7] rounded-md text-black p-[5px]
                mx-2 my-3 outline-none ::placeholder placeholder-slate-50 w-52 hover:bg-[#359ea98b] sm:w-96 sm:p-2 sm:text-[20px] sm:rounded-md sm:mx-10 lg:w-[4t00px] shadow-xl lg:p-2 lg:text-xl lg:rounded-full'>
            Search Movies
            </button>
            </Link>
        </div>
        
    )
}

export default Into