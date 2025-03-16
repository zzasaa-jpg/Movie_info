import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import image from '../noimage.png'
import bgblack from '../../Images/bg_not.png'
import Loader from '../Loader';

const SearchInfo = () => {
    const { id } = useParams();
    const [secshowInfo, setSecShowInfo] = useState(null);

    useEffect(() => {
        // page start from top
        window.scrollTo(0,0);
        const fetchMovieInfo = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`);
                const data = await response.json();
                setSecShowInfo(data);
            } catch (error) {
                console.error("Error fetching movie information:", error);
            }
        };

        fetchMovieInfo();
    }, [id]);

    if (!secshowInfo) {
        return <Loader />;
    }
    // calculating the movie time
    const hours = Math.floor(secshowInfo.runtime / 60);
    const minute = secshowInfo.runtime % 60;

    return (
        <div className=' relative min-h-[100vh] bg-red-600 text-white sm:h-auto lg:h-auto '>
            {/* {/* movie videos */}
            <div className='relative bg-black '>
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
                    <img src={image} alt='poster' className='absolute top-20 left-5 h-[180px] rounded-[10px] sm:w-[180px] sm:top-32 lg:top-[380px]' width={200} />
                )
            }
            {/* movie information */}
            <div className='text-white absolute top-24 left-44 sm:top-64 sm:left-[395px] lg:top-[550px] lg:left-[700px]' >
                <h1 className='text-[18px] sm:text-[40px]'>Title: {secshowInfo.title}</h1>
                <h1 className='text-[15px] sm:text-[20px]'>Original_Title: {secshowInfo.original_title}</h1>
            </div>
            <div className='text-white py-[50px] px-[10px] text-[18px] sm:py-[30px]  lg:mx-10 lg:py-[10px]'>
                <h1 className='mb-2'><span className=' font-semibold '>Genres:</span> {secshowInfo.genres.map(genre => genre.name).join(', ')}</h1>
                <h1 className='mb-2'><span className=' font-semibold'>Original_Language:</span> {secshowInfo.original_language}</h1>
                <h1 className='mb-2 text-justify cursor-grab lg:overflow-x-auto lg:h-[50px]'><span className=' font-semibold'>OverView Of Movie:</span> {secshowInfo.overview}</h1>
                <h1 className='mb-2'><span className='font-semibold'>Producation:</span> {secshowInfo.production_companies.map(company => `${company.name} (${company.origin_country})`).join(', ')}</h1>
                <h1 className='mb-2'><span className=' font-semibold' >Release_Date:</span> {secshowInfo.release_date}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Runtime:</span> {hours}h {minute}min</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Status:</span> {secshowInfo.status}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Tagline:</span> {secshowInfo.tagline}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Spoken_Language:</span> {secshowInfo.spoken_languages.map(language => `${language.english_name}`).join(', ')}</h1>
            </div>

        </div>
    );
};

export default SearchInfo;
