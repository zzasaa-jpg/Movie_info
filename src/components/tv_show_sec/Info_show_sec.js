import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import image from '../noimage.png'
import bgblack from '../../Images/bg_not.png'
import Loader from '../Loader';

const Info_show_sec = () => {
    const { id } = useParams();
    const [secshowInfo, setSecShowInfo] = useState(null);
    useEffect(() => {
        // page start from top
        window.scrollTo(0,0);
        const fetchShowInfo = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${apiKey}`);
                const data = await response.json();
                setSecShowInfo(data);
            } catch (error) {
                console.error("Error fetching movie information:", error);
            }
        };

        fetchShowInfo();
    }, [id]);

    if (!secshowInfo) {
        return <Loader/>;
    }
   
    return (
        <div className=' relative min-h-[100vh] bg-blue-600 text-white sm:h-auto lg:h-auto '>
            <div className='relative bg-black '>
                 {/* background poster of tv show */}
                {
                    secshowInfo.backdrop_path ?
                        (

                            <img
                                src={`https://image.tmdb.org/t/p/w1280${secshowInfo.backdrop_path}`}
                                alt="Backdrop"
                                style={{ width: '100%', height: 'auto' }}
                                className='w-full h-auto '
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
             {/* poster of tv show */}
            {
                secshowInfo.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${secshowInfo.poster_path}`} alt='poster' className=' absolute top-20 left-5 h-auto rounded-[10px] hover:transform hover:scale-110 hover:transition-transform duration-700 cursor-pointer sm:w-[180px] sm:top-32 lg:top-[380px] ' width={100} />
                ) : (
                    <img src={image} alt='poster' className='absolute top-16 left-5 w-[160px] h-[200px] rounded-[10px] hover:transform hover:scale-110 hover:transition-transform duration-700 cursor-pointer sm:w-[180px] sm:top-32 lg:top-[380px] lg:h-[240px]' width={200} />
                )
            }
             {/* tv show information */}
            <div className='text-white absolute top-24 left-44 sm:top-64 sm:left-[395px] lg:top-[550px] lg:left-[700px]' >
                <h1 className='text-[18px] sm:text-[40px]'>Name: {secshowInfo.name}</h1>
                <h1 className='text-[15px] sm:text-[20px]'>Original_Name: {secshowInfo.original_name}</h1>
            </div>
            <div className='text-white py-[50px] px-[10px] text-[18px] sm:py-[30px]  lg:mx-10 lg:py-[10px]'>
                <h1 className='mb-2'><span className=' font-semibold '>Genres:</span> {secshowInfo.genres.map(genre => genre.name).join(', ')}</h1>
                <h1 className='mb-2'><span className=' font-semibold'>Original_Language:</span> {secshowInfo.original_language}</h1>
                <h1 className='mb-2'><span className=' font-semibold'>HomePage:</span><a className='underline' href={secshowInfo.homepage} target='_blank' rel='noopener noreferrer'>
                    {secshowInfo.homepage ? `${secshowInfo.homepage.substring(0, 40)}...` : "No Information"}
                </a> </h1>
                <h1 className='mb-2 text-justify'><span className=' font-semibold'>OverView Of Movie:</span> {secshowInfo.overview}</h1>
                <h1 className='mb-2 text-justify'><span className=' font-semibold'>Episode_run_time:</span> {secshowInfo.episode_run_time}mins</h1>
                <h1 className='mb-2'><span className='font-semibold'>Producation:</span> {secshowInfo.production_companies.map(company => `${company.name} (${company.origin_country})`).join(', ')}</h1>
                <h1 className='mb-2'><span className=' font-semibold' >First_Air_Date:</span> {secshowInfo.first_air_date}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Last_air_date:</span> {secshowInfo.last_air_date}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Number_of_seasons:</span> {secshowInfo.number_of_seasons}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Number_of_episodes:</span> {secshowInfo.number_of_episodes}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Status:</span> {secshowInfo.status}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Tagline:</span> {secshowInfo.tagline}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Status:</span> {secshowInfo.status}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Type:</span> {secshowInfo.type}</h1>
                <h1 className=' mb-2' ><span className=' font-semibold' >Spoken_Language:</span> {secshowInfo.spoken_languages.map(language => `${language.english_name}`).join(', ')}</h1>
            </div>
        </div>
    );
};

export default Info_show_sec;
