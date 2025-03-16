import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import ScrollButton from '../ScrollButton';

function People() {
    const [people, setPeople] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    const fetchpeople = async (page) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        try {
            const response = await fetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}&api_key=${apiKey}`)
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            setPeople(prevData => [...prevData, ...data.results]);
            setLoader(false)

        } catch (error) {
            console.log(error)
           
            
        }
        
    }

    useEffect(() => {
         fetchpeople(currentPage);
    }, [currentPage])
    // next page handling
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }
    // navigate the page for information
    const handleShowInfo=(person)=>{
        navigate(`/info_people_sec/${person.id}`)
    }
    return (
        <div className=' p-[20px] bg-green-600 min-h-[100vh]'>
            <h1 className='text-[17px] px-0 py-0 text-white sm:text-[25px]'>Popular People</h1>
            <div className="flex justify-center items-center flex-wrap gap-5 py-10 px-6 w-[100%] h-auto">
                {
                    loader ? (
                        <Loader/>
                    ):(
                        <>
                        {people.map((person, index) => (
                            <div className=' cursor-pointer bg-[#ffffff36] rounded-md shadow-xl  h-[250px] w-60 hover:transform hover:scale-110 hover:transition-transform duration-700 sm:h-[360px]' onClick={()=>handleShowInfo(person)} key={index}>
                                 {/* person poster */}
                                {person.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} className='h-40 w-full object-contain bg-[#00000090] rounded-md sm:h-56' alt='person' />
                                ) : (
                                    <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} className='h-40 w-full object-contain bg-[#00000090] rounded-md text-white sm:h-56' alt='No poster available' />
                                )}
                                {/* person information */}
                                <div className=' w-40 py-2 px-3  text-white sm:w-72'>
                                    <h1 key={people.id} className=' font-semibold text-[10px] sm:text-[14px]   '>Name: {person.name}</h1>
                                    <h1 className=' font-semibold text-[9px] sm:text-[14px] '> Original_Name: {person.original_name}</h1>
                                    <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Known: {person.known_for_department}</h1>
                                    <h1 className='font-semibold text-[9px] sm:text-[14px] ' > Popularity: {person.popularity}</h1>
                                    <h1 className='font-semibold text-[9px] sm:text-[14px] ' > known_for: {person.known_for.map(known_for=>known_for.title).join(', ').substring(0, 15)}...</h1>
                                </div>
                            </div>
                        ))}
                        </>
                    )
                }
            </div>
            {/* buttons for next and back */}
            <div className=' text-white flex justify-center items-center'>
                <button className='bg-[#ffffff73] p-2 rounded-[4px] cursor-pointer w-28 shadow-xl hover:bg-[#00ff007e]' onClick={handleNextPage}>Load More</button>
            </div>
            <ScrollButton/>
        </div>
    )
}

export default People;
