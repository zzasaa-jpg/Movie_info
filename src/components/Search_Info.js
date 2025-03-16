import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import image from './noimage.png';
import bgblack from '../Images/bg_not.png';
import Loader from './Loader';

const SearchInfo = () => {
    const { id } = useParams();
    const [movieInfo, setMovieInfo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () =>{
        setIsVisible(!isVisible);
    }

    useEffect(() => {
        const fetchMovieSearchInfo = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
                const data = await response.json();
                setMovieInfo(data);
            } catch (error) {
                console.error("Error fetching movie information:", error);
            }
        };

        fetchMovieSearchInfo();
    }, [id]);


    useEffect(() => {
        const fetchMovieSearchVideo = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}}/videos?language=en-US&api_key=${apiKey}`);
                const data = await response.json();
                setVideos(data.results);
            } catch (error) {
                console.error("Error fetching movie information:", error);
            }
        };

        fetchMovieSearchVideo();
    }, [id]);


    if (!movieInfo) {
        return <Loader/>;
    }
    //  calculating the movie time
    const hours = Math.floor(movieInfo.runtime / 60);
    const minute = movieInfo.runtime % 60;
    return (
        <div className=' relative min-h-[100vh] text-white sm:h-auto lg:h-auto '>
            <div className='relative bg-black '>
                {/* background poster of movie */}
                {
                    movieInfo.backdrop_path ?
                        (

                            <img
                                src={`https://image.tmdb.org/t/p/w1280${movieInfo.backdrop_path}`}
                                alt="Backdrop"
                                style={{ width: '100%', height: 'auto' }}
                                className='w-full h-auto'
                            />
                        ) :
                        (
                            <img
                                src={bgblack}
                                alt="Backdrop"
                                style={{ width: '100%', height: 'auto' }}
                                className='w-full h-auto'
                            />
                        )

                }
                <div className='absolute inset-0 bg-black opacity-60'></div>
            </div>

            {/* movie poster */}
            {
                movieInfo.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`} alt='poster' className=' absolute top-20 left-5 h-auto rounded-[10px] hover:transform hover:scale-110 hover:transition-transform duration-700 cursor-pointer sm:w-[180px] sm:top-32 lg:top-[40px] ' width={100} />
                ) : (
                    <img src={image} alt='poster' className='absolute top-20 left-5 h-[220px] rounded-[10px] hover:transform hover:scale-110 hover:transition-transform duration-700 cursor-pointer sm:w-[180px] sm:top-32 lg:top-[40px] ' width={100} />
                )
            }

            {/* movie information */}
            <div className='text-white absolute top-24 left-44 sm:top-64 sm:left-[395px] lg:top-[550px] lg:left-[750px]' >
                <h1 className='text-[18px] sm:text-[40px]'>Title: {movieInfo.title}</h1>
                <h1 className='text-[15px] sm:text-[20px]'>Original_Title: {movieInfo.original_title}</h1>
            </div>
            <div className='text-black static pt-[50px] px-[10px] text-[18px] sm:py-[30px]  lg:mx-10 lg:py-[10px] lg:absolute lg:top-[320px] lg:text-white lg:px-[0px]'>
                <h1 className='mb-2'><span className=' font-semibold '>Genres:</span> {movieInfo.genres.map(genre => genre.name).join(', ')}</h1>
                <h1 className='mb-2'><span className=' font-semibold'>Original_Language:</span> {movieInfo.original_language}</h1>
                <h1 className='mb-2 text-justify cursor-grab lg:overflow-x-auto lg:h-[50px]'><span className=' font-semibold'>OverView Of Movie:</span> {movieInfo.overview}</h1>
                <h1 className='mb-2'><span className='font-semibold'>Producation:</span> {movieInfo.production_companies.map(company => `${company.name} (${company.origin_country})`).join(', ')}</h1>
                <h1 className='mb-2'><span className=' font-semibold' >Release_Date:</span> {movieInfo.release_date}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Runtime:</span> {hours}h {minute}min</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Status:</span> {movieInfo.status}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Tagline:</span> {movieInfo.tagline}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Status:</span> {movieInfo.status}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Spoken_Language:</span> {movieInfo.spoken_languages.map(language => `${language.english_name}`).join(', ')}</h1>
            </div>
            
            {/* movie videos */}
            <div className='  flex overflow-y-auto static lg:absolute lg:top-[20px] lg:overflow-y-auto lg:left-[680px] lg:w-[560px]'>
                <button className=' hidden lg:bg-[#00000000] lg:text-white lg:flex lg:justify-center lg:items-center lg:text-[30px] lg:outline-none lg:border-none' onClick={toggleVisibility}>
                    {
                        isVisible ? (
                            <ion-icon name="close-circle-outline"></ion-icon>
                        ):(
                            <ion-icon name="open-outline"></ion-icon>
                        )
                    }
                </button>
                {/* Video visibility */}
                {
                    isVisible && (
                        <>
                        {videos.map((video) => (
                            <div key={video.key} className=' p-[10px]'>
                                <iframe
                                    title={`Movie Trailer ${video.name}`}
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    frameBorder="0"
                                    allowFullScreen
                                    style={{ borderRadius: '10px' }}
                                    className=' w-[300px] h-[200px] lg:w-[500px] lg:h-[300px]'
                                ></iframe>
                            </div>
                        ))}
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default SearchInfo;
