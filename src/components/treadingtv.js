import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function Trendingtv() {
  const [trendingTv, setTrendingTv] = useState([]);
  const navigate = useNavigate();
  const[loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchTrendingTv = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${apiKey}`
          );
        if (!response.ok) {
          throw new Error(`Failed to fetch trending`);
        }
        const data = await response.json();
        setTrendingTv(data.results);
        setLoader(false)
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingTv();
  }, []);

  // navigate the information page
  const handleclickTrendingTv = (trendingTv) => {
    navigate(`/info_sec_trending/${trendingTv.id}`)
  }

  return (
    <div>
      <div className='p-[10px] shadow-xl bg-[#4bc1d1]'>
        <h1 className='mr-1 sm:mr-2 text-white sm:text-2xl'>Treading_Tv:</h1>
      </div>
      <div className="flex items-center gap-5 py-[5px] px-6 w-[100%] h-[310px] overflow-y-hidden  bg-[url('Images/tv.avif')] bg-cover bg-no-repeat sm:h-[440px]">
                <h2 className='text-[17px] pr-[50px] py-0 text-white sm:text-[25px] sm:pr-[76px]'>Trending Tv</h2>
                {
                  loader ?(
                    <Loader/>
                  ):(
                    <>
                    
                    {trendingTv.map((movie, index) => (
                        < div className=' bg-[#ffffff36] rounded-md shadow-xl p-2 h-[250px] w-60 hover:transform hover:scale-110 hover:transition-transform duration-700 cursor-pointer sm:h-[360px]' onClick={()=>handleclickTrendingTv(movie)} key={index}>
                          {
                            loader ?(
                              <Loader/>
                            ):
                            (
                              <>
                              {/* movie poster */}
                            {movie.poster_path ? (
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='h-40 w-full object-contain bg-[#00000090] rounded-md sm:h-56' alt='tv' />
                            ) : (
                                <p>No poster available</p>
                            )}
                              </>
                            )
                          }
                          {/* movie information */}
                            <div className=' w-40 py-2 px-3 cursor-pointer  text-white sm:w-72'>
                                <h1 key={movie.id} className=' font-semibold text-[10px] sm:text-[14px]'>Movie: {movie.name.substring(0, 12)}...</h1>
                                <h1 className=' font-semibold text-[9px] sm:text-[14px]'> original_name: {movie.original_name.substring(0,9)}...</h1>
                                <h1 className='font-semibold text-[9px] sm:text-[14px]' > Language: {movie.original_language}</h1>
                                <h1 className='font-semibold text-[9px] sm:text-[14px]' > Popularity: {movie.popularity}</h1>
                                <h1 className='font-semibold text-[9px] sm:text-[14px]' > first_air_date: {movie.first_air_date}</h1>
                            </div>
                        </div>
                    ))}
                    </>
                  )
                }
            </div>
    </div>
  );
}

export default Trendingtv;
