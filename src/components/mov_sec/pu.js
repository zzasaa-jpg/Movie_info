import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import ScrollButton from '../ScrollButton';

function Popular() {
    const [populars, setPopulars] = useState([]);
    const [currentPage, setCurrentPage] = useState(20);
    const navigate = useNavigate();
    const [loader, setLoader]= useState(true);
   
    
        const fetchPopularMovies = async (page) => {
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${apiKey}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }

                const data = await response.json();
                setPopulars(prevData => [...prevData, ...data.results]);
                setLoader(false)
            } catch (error) {
                console.error(error);
            }
        };

       
    useEffect(()=>{
        fetchPopularMovies(currentPage);
    }, [currentPage]);
    
    // next page handling
    const handleNextPage = () => {
        setCurrentPage(currentPage +1);
    }

    // navigate the page for information
    const handleclickMovieinfo = (popular) => {
        navigate(`/info_mov_sec/${popular.id}`)
    }

    return (
        <div className=' p-[20px] bg-red-600 min-h-[100vh]'>
                <h1 className='text-[17px] px-0 py-0 text-white sm:text-[25px]'>Popular Movies</h1>
                <div className="flex justify-center flex-wrap items-center gap-5 py-10 px-6 w-[100%] h-auto ">
                    {
                        loader?(
                            <Loader/>
                        ):(
                            <>
                            
                            {populars.map((popular, index) => (
                                <div className=' cursor-pointer bg-[#ffffff36] rounded-md shadow-xl  h-[250px] w-60 hover:transform hover:scale-110 hover:transition-transform duration-700 sm:h-[360px]' onClick={()=>handleclickMovieinfo(popular)} key={index}>
                                     {/* movie poster */}
                                    {
                                        loader?(
                                            <Loader/>
                                        ):(
                                            <>
                                            
                                            {popular.poster_path ? (
                                                <img src={`https://image.tmdb.org/t/p/w500${popular.poster_path}`} className='h-40 w-full object-contain bg-[#00000090] rounded-md sm:h-56' alt='movie' />
                                            ) : (
                                               <img src={`https://image.tmdb.org/t/p/w500${popular.poster_path}`} className='h-40 w-full object-contain bg-[#00000090] rounded-md text-white sm:h-56' alt='No poster available' />
                                            )}
                                            
                                            </>
                                        )
                                    }
                                    {/* movie information */}
                                    <div className=' w-40 py-2 px-3  text-white sm:w-72'>
                                        <h1 key={popular.id} className=' font-semibold text-[10px] sm:text-[14px]   '>Title: {popular.title.substring(0, 12)}...</h1>
                                        <h1 className=' font-semibold text-[9px] sm:text-[14px] '> Original_Title: {popular.original_title.substring(0, 12)}...</h1>
                                        <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Language: {popular.original_language}</h1>
                                        <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Popularity: {popular.popularity}</h1>
                                        <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Release_Date: {popular.release_date}</h1>
                                    </div>
                                </div>
                            ))}
                            </>
                        )
                    }
            </div>
             {/* buttons for next and back */}
            <div className=' text-white flex justify-center items-center'>
                      <button className='bg-[#ffffff73] p-2 rounded-[4px] cursor-pointer w-28 shadow-xl hover:bg-[#ff0000]' onClick={handleNextPage}>Load More</button>
            </div>
            <ScrollButton/>

        </div>
    );
}

export default Popular;
