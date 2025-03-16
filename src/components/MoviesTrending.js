import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function TrendingMovie() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [timePeriod, setTimePeriod] = useState('day')
    const navigate= useNavigate();
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const apiKey = process.env.REACT_APP_API_KEY;
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/movie/${timePeriod}?language=en-US&api_key=${apiKey}`
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch trending movies');
                }

                const data = await response.json();
                setTrendingMovies(data.results);
                setLoader(false)
            } catch (error) {
                console.error(error);
            }
        };

        fetchTrendingMovies();
    }, [timePeriod]);
    
    // handle for timeperiod of day and week
    const handleSwitchTimePeriod = (newTimePeriod) => {
        setTimePeriod(newTimePeriod);
    };
    // navigate the information
    const handleclickTrendingMovieInfo =(movie) =>{
        navigate(`/info_sec_movei_trending_day/${movie.id}`)
    }
    

    return (
        <div className=''>
            {/* buttons for swith the day to week */}
            <div className=' px-[10px] py-[10px] shadow-xl flex bg-[#4bc1d1] items-center '>
                <h1 className='text-white  mr-1 sm:mr-2 sm:text-2xl'>Treading:</h1>
                <button
                    className={`text-black p-1 outline-double text-[12px] rounded-l-[2px] sm:p-[10px] sm:rounded-l-[8px] sm:text-[17px]  ${timePeriod === 'day' ? 'bg-[#09d335]' : 'bg-white'}`}
                    onClick={() => handleSwitchTimePeriod('day')}
                >
                    Today
                </button>
                <button
                    className={`p-1 outline-double text-[12px] rounded-r-[2px] sm:p-[10px] sm:rounded-r-[8px] sm:text-[17px]  ${timePeriod === 'week' ? 'bg-[#09d335]' : 'bg-white'} `}
                    onClick={() => handleSwitchTimePeriod('week')}
                >
                    Week
                </button>
            </div>
          
            <div className="flex items-center gap-5 py-10 px-6 w-[100%] h-[310px]  overflow-y-hidden  bg-[url('Images/trbg.avif')] bg-cover bg-no-repeat  sm:h-[440px] ">
                <h1 className='text-[17px] px-0 py-0 text-white sm:text-[25px]'>TrendingMovie Movies ({timePeriod === 'day' ? 'Today' : 'This Week'})</h1>
                {
                    loader ?(
                       <Loader/>
                    ):(
                        <>
                        {trendingMovies.map((movie, index) => (
                            <div className=' bg-[rgba(255,255,255,0.21)] rounded-md shadow-xl p-2 h-[250px] w-60 hover:transform hover:scale-110 hover:transition-transform duration-700 sm:h-[360px]' onClick={()=>handleclickTrendingMovieInfo(movie)} key={index}>
                                {
                                    loader ?(
                                        <Loader/>
                                    ):(
                                        <>
                                        {/* movei poster */}
                                        {movie.poster_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='h-40 w-full object-contain bg-[#00000090] rounded-md cursor-pointer sm:h-56' alt='movie' />
                                        ) : (
                                            <p>No poster available</p>
                                        )}
                                        </>
                                    )
                                }

                                {/* movie information */}
                                <div className=' w-40 py-2 px-3 cursor-pointer  text-white sm:w-72'>
                                    <h1 key={movie.id} className=' font-semibold text-[10px] sm:text-[14px]   '>Title: {movie.title.substring(0, 12)}...</h1>
                                    <h1 className=' font-semibold text-[9px] sm:text-[14px] '> Original_Title: {movie.original_title.substring(0, 12)}...</h1>
                                    <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Language: {movie.original_language}</h1>
                                    <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Popularity: {movie.popularity}</h1>
                                    <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Release_Date: {movie.release_date}</h1>
                                </div>
                            </div>
                        ))}
                        </>
                    )
                }


            </div>
        </div>
    )
}

export default TrendingMovie;
