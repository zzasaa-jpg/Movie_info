import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import image from '../noimage.png'
import Loader from '../Loader';

const SearchInfo = () => {
    const { id } = useParams();
    const [secshowPeopleInfo, setSecShowPeopleInfo] = useState();
    const [externalIds, setExternalIds] = useState({});


    useEffect(() => {
        const fetchMovieInfo = async () => {
            // page start from top
            window.scrollTo(0, 0);
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US&api_key=${apiKey}`);
                if (!response) {
                    throw new Error(`HTTP error status: ${response.status}`)
                }
                const data = await response.json();
                setSecShowPeopleInfo(data);

            } catch (error) {
                console.error("Error fetching movie information:", error);
            }
        };

        fetchMovieInfo();
    }, [id]);

    useEffect(() => {
        const fetchExternalIds = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/${id}/external_ids?api_key=bce07468313937fc605ca004fcc30c93`);
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const data = await response.json();
                setExternalIds(data);
            } catch (error) {
                console.error("Error fetching external IDs:", error);
            }
        };

        fetchExternalIds();
    }, [id]);



    if (!secshowPeopleInfo) {
        return <Loader />;
    }


    return (
        <div key={id} className='min-h-[100vh] bg-green-600 text-white sm:h-auto lg:h-auto flex items-start flex-col p-[10px] sm:p-[30px] sm:flex-row'>
            {/* person poster */}
            {
                secshowPeopleInfo.profile_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${secshowPeopleInfo.profile_path}`} alt='poster' className=' h-auto rounded-[10px] hover:transform hover:scale-110 hover:transition-transform duration-300 cursor-pointer sm:w-[180px]' width={100} />
                ) : (
                    <img src={image} alt='poster' className='h-[140px] rounded-[10px] sm:w-[120px] sm:h-[140px]' width={200} />
                )

            }
            {/* person information */}
            <div className='text-white flex flex-col py-[10px] text-[18px] sm:py-[10px] sm:px-[50px] lg:py-[10px]'>

                <h1 className='text-[18px]  mb-1sm:text-[30px]'><span className=' font-semibold' >Name:</span> {secshowPeopleInfo.name}</h1>
                <h1 className='text-[15px] mb-1'><span className=' font-semibold' >Birthday:</span> {secshowPeopleInfo.birthday}</h1>
                <h1 className='text-[15px] mb-1'><span className=' font-semibold' >Deathday:</span> {secshowPeopleInfo.deathday || 'Still Alive'}</h1>

                <h1 className='text-[15px] mb-1'><span className=' font-semibold' >Gender:</span> {secshowPeopleInfo.gender === 1 ? "Female" : secshowPeopleInfo.gender === 2 ? "Male" : "Unknown"}</h1>
                <h1 className='text-[15px] mb-1'><span className=' font-semibold' >Place_of_Birth:</span> {secshowPeopleInfo.place_of_birth}</h1>
                <h1 className='text-[15px] mb-1'><span className=' font-semibold' >also_known_as:</span> {secshowPeopleInfo.also_known_as && secshowPeopleInfo.also_known_as.join(", ")}</h1>
                <h1 className='text-[15px] mb-1' ><span className=' font-semibold' >popularity:</span> {secshowPeopleInfo.popularity}</h1>

                <h1 className='text-[15px] mb-1 '><span className=' font-semibold' >Known_For_Department:</span> {secshowPeopleInfo.known_for_department}</h1>
                <h1 className='text-[15px] mb-1 '><span className=' font-semibold' >Homepage:</span><a className=' underline' href={secshowPeopleInfo.homepage} target='_blank' rel="noopener noreferrer"> {secshowPeopleInfo.homepage ? secshowPeopleInfo.homepage : "No"}</a> </h1>
                <h1 className='text-[15px]  mb-1 text-justify '><span className=' font-semibold' >Biography:</span> {secshowPeopleInfo.biography}.</h1>
                
                {/* person social media */}
                <div className='text-[15px] flex flex-wrap  xl:absolute top-30 items-center gap-2 left-[600px]  sm:absolute top-30 sm:flex-wrap sm:text-[15px] sm:items-start'>
                    <h1 className='flex items-center gap-1'><ion-icon name="logo-instagram"></ion-icon> {externalIds.instagram_id ? externalIds.instagram_id : "No"}</h1>
                    <h1>|</h1>
                    <h1 className='flex items-center gap-1'><ion-icon name="logo-facebook"></ion-icon>{externalIds.facebook_id ? externalIds.facebook_id : "No"}</h1>
                    <h1>|</h1>
                    <h1 className='flex items-center gap-1'><ion-icon name="logo-tiktok"></ion-icon> {externalIds.tiktok_id ? externalIds.tiktok_id : "No"}</h1>
                    <h1>|</h1>
                    <h1 className='flex items-center gap-1'><ion-icon name="logo-twitter"></ion-icon> {externalIds.twitter_id ? externalIds.twitter_id : "No"}</h1>
                    <h1>|</h1>
                    <h1 className='flex items-center gap-1'><ion-icon name="logo-youtube"></ion-icon> {externalIds.youtube_id ? externalIds.youtube_id : "No"}</h1>
                </div>
            </div>
        </div>
    );
};

export default SearchInfo;
