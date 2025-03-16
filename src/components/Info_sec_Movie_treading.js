import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import image from './noimage.png';
import bgblack from '../Images/bg_not.png';
import Loader from './Loader';

const Info_sec_Movie_treading = () => {
    const { id } = useParams();
    const [secshowInfo, setSecShowInfo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchMovieTrending = async () => {
            window.scrollTo(0,0);
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`);
                const data = await response.json();
                setSecShowInfo(data);
                setLoader(false);
            } catch (error) {
                console.error("Error fetching movie information:", error);
            }
        };

        fetchMovieTrending();
    }, [id]);

    useEffect(() => {
        const fetchMovieVideos = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${apiKey}`);
                const data = await response.json();
                setVideos(data.results);
                setLoader(false);
            } catch (error) {
                console.error("Error fetching movie information:", error);
            }
        };

        fetchMovieVideos();
    }, [id]);


    if (!secshowInfo) {
        return <Loader/>;
    }

    // calculating the movei time
    const hours = Math.floor(secshowInfo.runtime / 60);
    const minute = secshowInfo.runtime % 60;

    return (
        <div className=' relative min-h-[100vh] text-white sm:h-auto lg:h-auto '>
            {/* background poster */}
            <div className='relative bg-black '>
            {/* background poster of movie  */}
                {
                    secshowInfo.backdrop_path ?
                        (
                            <img
                                src={`https://image.tmdb.org/t/p/w1280${secshowInfo.backdrop_path}`}
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

            {/* poster of movie */}
            {
                secshowInfo.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${secshowInfo.poster_path}`} alt='poster' className=' absolute top-20 left-5 h-auto rounded-[10px] hover:transform hover:scale-110 hover:transition-transform duration-700 cursor-pointer sm:w-[180px] sm:top-32 lg:top-[380px] ' width={100} />
                ) : (
                    <img src={image} alt='poster' className='absolute top-20 left-5 h-auto rounded-[10px] hover:transform hover:scale-110 hover:transition-transform duration-700 cursor-pointer sm:w-[180px] sm:top-32 lg:top-[380px] ' width={200} />
                )
            }

            {/* movie information */}
            <div className='text-white absolute top-24 left-44 sm:top-64 sm:left-[395px] lg:top-[550px] lg:left-[700px]' >
                <h1 className='text-[18px] sm:text-[40px]'>Title: {secshowInfo.title}</h1>
                <h1 className='text-[15px] sm:text-[20px]'>Original_Title: {secshowInfo.original_title}</h1>
            </div>
            <div className='text-black pt-[50px] px-[10px] text-[18px] sm:py-[0px]  lg:mx-5 lg:pt-[20px] lg:px-[0px]'>
                <h1 className='mb-2'><span className=' font-semibold '>Genres:</span> {secshowInfo.genres.map(genre => genre.name).join(', ')}</h1>
                <h1 className='mb-2'><span className=' font-semibold'>Original_Language:</span> {secshowInfo.original_language}</h1>
                <h1 className=' text-justify lg:overflow-x-auto cursor-grab lg:h-[50px]'><span className=' font-semibold'>OverView Of Movie:</span> {secshowInfo.overview}</h1>
                <h1 className=' mb-1'>
                    <span className='font-semibold'>Homepage:</span> <a className='underline' href={secshowInfo.homepage} target='_blank' rel="noopener noreferrer">
                        {secshowInfo.homepage ? `${secshowInfo.homepage.substring(0, 40)}...` : "No"}...
                    </a>
                </h1>
                <h1 className='mb-2'><span className='font-semibold'>Producation:</span> {secshowInfo.production_companies.map(company => `${company.name} (${company.origin_country})`).join(', ')}</h1>
                <h1 className='mb-2'><span className=' font-semibold' >Release_Date:</span> {secshowInfo.release_date}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Runtime:</span> {hours}h {minute}min</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Status:</span> {secshowInfo.status}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Tagline:</span> {secshowInfo.tagline}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Spoken_Language:</span> {secshowInfo.spoken_languages.map(language => `${language.english_name}`).join(', ')}</h1>
            </div>
            
            {/* Movie videos */}
            <div className='  flex overflow-y-auto lg:px-[0px]'>
                {
                    loader ? (
                        <Loader/>
                    ):(
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

export default Info_sec_Movie_treading;
