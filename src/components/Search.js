import React, { useState } from 'react';
import image from './noimage.png'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import ScrollButton from './ScrollButton';

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [noresults, setNoresults] = useState()
  const [loader, setLoader] = useState();

  const apiKey = process.env.REACT_APP_API_KEY;
  const handleSearch = async () => {
    try {
      setLoader(true)
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
      const data = await response.json();
      setSearchResults(data.results);
      if (data.results.length === 0) {
        setNoresults('No results found.');
      } else {
        setNoresults(null); 
      }
      setLoader(false);
    } catch (error) {
      console.error("error fetching for results:", error);
      setLoader(false)
    }
    finally {
      setLoader(false); 
    }
  }
  // handle event for input search
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  // handle key event for search input
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // navigate the information page
  const handleclickMovie = (result) => {
    navigate(`/search_info/${result.id}`)
  }

  return (
    <div className=' bg-[#00e1ff04] min-h-[100vh] '>
      {/* search input */}
      <input className=" bg-[#ffffff] rounded-[5px] text-balck p-[5px]
                    mx-[25px] my-3 outline-none ::placeholder placeholder-slate-400 w-52 sm:w-96 sm:p-2 sm:text-[20px] sm:rounded-md sm:mx-[90px] lg:w-[600px] shadow-xl lg:p-2 lg:text-xl lg:rounded-full"
        type='text'
        placeholder='Search....'
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />

      {/* search button */}
      <button className=' cursor-pointer bg-white px-[5px] py-[5px] rounded-[5px] shadow-xl hover:bg-[#ffffff67] sm:p-[9px] lg:p-[10px] lg:rounded-full' onClick={handleSearch}>Search</button>

      <hr className='border-t border-[#0000007a] mx-[10px]'></hr>
      <div className=' p-[10px]'>
        <h1 className='text-center'>{noresults}</h1>
        {
          loader ? (
            <Loader />
          ) : (
            <>
              {searchResults.map((result) => (
                < div key={result.id} className=' w-full sm:mx-auto sm:w-[600px] lg:w-[800px] mb-0'>
                  <div className=' flex cursor-pointer ' onClick={() => handleclickMovie(result)}>
                    <div className=''>
                      {/* moveie poster */}
                      {
                        result.poster_path ? (
                          <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt='poster' className='h-auto rounded-[10px] hover:transform hover:scale-110 hover:transition-transform duration-700 sm:w-[120px]' width={200} />
                        ) : (
                          <img src={image} alt='poster' className='h-auto rounded-[10px] hover:transform hover:scale-110 hover:transition-transform duration-700 sm:w-[120px]' width={200} />
                        )

                      }

                    </div>
                    {/* information of serch movies */}
                    <div className='flex flex-col w-full mx-[10px] my-[10px] '>
                      <h1 className=' text-black'>Title: {result.title}</h1>
                      <h1 className='text-black' key={result.id}>Original_title: {result.original_title}
                      </h1>
                      <h1 className=' text-black '>original_language: {result.original_language}</h1>
                    </div>
                  </div>
                  <hr className='border-t border-[#00000069] my-4'></hr>
                </div>
              ))}
            </>
          )
        }
      </div>
      <ScrollButton/>
    </div>
  );
}

export default Search;
