import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import ScrollButton from '../ScrollButton';

function Tvshow_popular() {
    const [tvshowpopular, setTvShowPopular] = useState([]);
    const [currentPage, setCurrentPage] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)

    const fetchTvShowPopular = async (page) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}&api_key=${apiKey}`);

            if (!response.ok) {
                throw new Error("Failed to fetch");
            }

            const data = await response.json();
            setTvShowPopular(prevData => [...prevData, ...data.results]);
            setLoader(false)
        } catch (error) {
            console.error(error);
            setError(error)
            setLoader(false)
        }
    };


    useEffect(() => {
        fetchTvShowPopular(currentPage);
    }, [currentPage]);
    // next page handling
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }
  
    // navigate the page for information
    const handleShowInfo = (tvshowpopular) => {
        navigate(`/info_show_sec/${tvshowpopular.id}`)
    }

    return (
        <div className=' p-[20px] bg-blue-600 min-h-[100vh]'>
            <h1 className='text-[17px] px-0 py-0 text-white sm:text-[25px]'>Tvshow popular</h1>
            <div className="flex justify-center items-center flex-wrap gap-5 py-10 px-6 w-[100%] h-auto">
                {
                    loader ? (
                        <Loader/>
                    ):
                    (
                        <>
                        {
                            error ? (
                                <h1 className='text-[20px] italic text-white font-semibold sm:text-[15px]'>{error.toString()}</h1>
                            ) : (      
                                tvshowpopular.map((tvshowpopular, index) => (
                                    <div className=' bg-[#ffffff36] rounded-md shadow-xl  h-[250px] w-60 hover:transform hover:scale-110 hover:transition-transform duration-700 sm:h-[360px]' onClick={()=>handleShowInfo(tvshowpopular)} key={index}>
                                         {/* tv show poster */}
                                        {tvshowpopular.poster_path ? (
                                            <img src={`https://image.tmdb.org/t/p/w500${tvshowpopular.poster_path}`} className='h-40 w-full object-contain bg-[#00000090] rounded-md sm:h-56' alt='movie' />
                                        ) : (
                                            <img src={`https://image.tmdb.org/t/p/w500${tvshowpopular.poster_path}`} className='h-40 w-full object-contain bg-[#00000090] rounded-md text-white sm:h-56' alt='No poster available' />
                                        )}
                                        {/* tv show information */}
                                        <div className=' w-40 py-2 px-3  text-white sm:w-72'>
        
                                            <h1 key={tvshowpopular.id} className=' font-semibold text-[10px] sm:text-[14px]   '>Title: {tvshowpopular.title.substring(0, 12)}...</h1>
                                            <h1 className=' font-semibold text-[9px] sm:text-[14px] '> Original_Title: {tvshowpopular.original_title.substring(0, 12)}...</h1>
                                            <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Language: {tvshowpopular.original_language}</h1>
                                            <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Popularity: {tvshowpopular.popularity}</h1>
                                            <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Release_Date: {tvshowpopular.release_date}</h1>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                        </>
                    )
                }
            </div>
             {/* buttons for next and back */}
            <div className=' text-white flex justify-center items-center'>
                <button className='bg-[#ffffff73] p-2 rounded-[4px] cursor-pointer w-28 shadow-xl hover:bg-[#0000ff]' onClick={handleNextPage}>Load More</button>
            </div>
            <ScrollButton/>
        </div>
    );
}

export default Tvshow_popular;
