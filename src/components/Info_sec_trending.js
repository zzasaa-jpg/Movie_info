import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import image from './noimage.png'
import bgblack from '../Images/bg_not.png'
import Loader from './Loader';

const Info_sec_Trending = () => {
    const { id } = useParams();
    const [secTrendingTv, setTrendingTv] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        const fetchTrendingTv = async () => {
            window.scrollTo(0,0);
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${apiKey}`);
                const data = await response.json();
                setTrendingTv(data);
            } catch (error) {
                console.error("Error fetching movie information:", error);
            }
        };

        fetchTrendingTv();
    }, [id]);

    useEffect(() => {
        const fetchTvVideo = async () => {
            window.scrollTo(0,0);
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=${apiKey}`);
                const data = await response.json();
                setVideos(data.results);
                setLoader(false);
            } catch (error) {
                console.error("Error fetching movie information:", error);
            }
        };

        fetchTvVideo();
    }, [id]);


    if (!secTrendingTv) {
        return <Loader/>;
    }

    return (
        <div className=' relative min-h-[100vh] text-white sm:h-auto lg: box-content '>
            {/* bacground poster */}
            <div className='relative bg-black '>
                {/* background poster of movie  */}
                {
                    secTrendingTv.backdrop_path ?
                        (

                            <img
                                src={`https://image.tmdb.org/t/p/w1280${secTrendingTv.backdrop_path}`}
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
                secTrendingTv.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${secTrendingTv.poster_path}`} alt='poster' className=' absolute top-20 left-5 h-auto rounded-[10px] hover:transform hover:scale-110 hover:transition-transform duration-700 cursor-pointer sm:w-[180px] sm:top-32 lg:top-[380px] ' width={100} />
                ) : (
                    <img src={image} alt='poster' className='absolute top-20 left-5 h-[180px] rounded-[10px] sm:w-[180px] sm:top-32 lg:top-[380px]' width={200} />
                )

            }
            {/* movie information */}
            <div className='text-white absolute top-24 left-44 sm:top-64 sm:left-[395px] lg:top-[550px] lg:left-[700px]' >
                <h1 className='text-[18px] sm:text-[40px]'>Name: {secTrendingTv.name}</h1>
                <h1 className='text-[15px] sm:text-[20px]'>First_air_date: {secTrendingTv.first_air_date}</h1>
            </div>
            <div className='text-black py-[50px] px-[10px] text-[18px] sm:py-[0px] lg:mx-5 lg:py-[10px] lg:px-[0px]'>
                <h1 className='mb-2'><span className='font-semibold'>Genres:</span> {secTrendingTv.genres && secTrendingTv.genres.length> 0 ? (secTrendingTv.genres.map(genre => genre.name).join(', ')) : ('No genres available')}
                </h1>
                
                <h1 className='text-[15px] mb-1'><span className='font-semibold'>Homepage:</span> <a className='underline' href={secTrendingTv.homepage} target='_blank' rel="noopener noreferrer">{secTrendingTv.homepage ?`${secTrendingTv.homepage.substring(0, 40)}...` : "No"}...</a>
                </h1>

                <h1 className='mb-2 text-justify'><span className='font-semibold'>last_episode_to_air:</span> {secTrendingTv.last_episode_to_air ? secTrendingTv.last_episode_to_air.name : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>Producation:</span> {secTrendingTv.production_companies && secTrendingTv.production_companies.length > 0 ? (secTrendingTv.production_companies.map(company => `${company.name} (${company.origin_country})`).join(', ')) : ('No production companies available')}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>last_air_date:</span> {secTrendingTv.last_air_date ? secTrendingTv.last_air_date : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>original_name:</span> {secTrendingTv.original_name ? secTrendingTv.original_name : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>original_language:</span> {secTrendingTv.original_language ? secTrendingTv.original_language : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold h-[50px] overflow-x-auto'>overview:</span> {secTrendingTv.overview ? secTrendingTv.overview : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>popularity:</span> {secTrendingTv.popularity ? secTrendingTv.popularity : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>Runtime:</span> {secTrendingTv.episode_run_time && secTrendingTv.episode_run_time.length > 0 ? (`${secTrendingTv.episode_run_time.join(', ')} min`) : ('No runtime information')}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>number_of_episodes:</span> {secTrendingTv.number_of_episodes ? secTrendingTv.number_of_episodes : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>number_of_seasons:</span> {secTrendingTv.number_of_seasons ? secTrendingTv.number_of_seasons : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>Tagline:</span> {secTrendingTv.tagline ? secTrendingTv.tagline : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>Type:</span> {secTrendingTv.type ? secTrendingTv.type : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>Status:</span> {secTrendingTv.status ? secTrendingTv.status : "No information"}
                </h1>

                <h1 className='mb-2'><span className='font-semibold'>Spoken Language:</span> {secTrendingTv.spoken_languages && secTrendingTv.spoken_languages.length > 0 ? (secTrendingTv.spoken_languages.map(language => `${language.english_name}`).join(', ')) : ('No spoken languages available')}
                </h1>

            </div>
            {/* movie videos */}
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

export default Info_sec_Trending;
