import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MoviesTrending from './components/MoviesTrending';
import Treadingtv from './components/treadingtv';
import Search from './components/Search';
import Pu from './components/mov_sec/pu'
import Upcoming from './components/mov_sec/Upcoming';
import Nowplaying from './components/mov_sec/Nowplaying'
import Toprated from './components/mov_sec/Toprated';
import PageLayout from './components/PageLayout';
import AiringToady from './components/tv_show_sec/Airing_today';
import Ontheair from './components/tv_show_sec/On_the_air';
import Tvshowpopular from './components/tv_show_sec/Tv_show_popular';
import Tvshowtoprated from './components/tv_show_sec/Tv_show_top_rated';
import People from './components/people/People';
import SearchInfo from './components/Search_Info';
import Infomovsec from './components/mov_sec/Info_mov_sec';
import Infoshowsec from './components/tv_show_sec/Info_show_sec';
import Infopeoplesec from './/components/people/Info_people_sec';
import Infosectrending from './components/Info_sec_trending';
import InfosecMovietrendingday from './components/Info_sec_Movie_treading';
import Email from './FireBase/Email';
import SignIn from './FireBase/Signin';
import PrivateRoutes from './components/Private';
import Userinfo from './FireBase/User_Info';
import Nopage from './components/Nopage';
function App() {

  return (
    <BrowserRouter>
      <div className="App font-font-pop bg-[#00e0ff] h-auto w-full">
      <Header />
        <Routes>

          <Route element={<PrivateRoutes/>}>
            <Route path="/app" element={<PageLayout />} />
            <Route path='/movetr' element={<MoviesTrending />} />
            <Route path='/treadingtv' element={<Treadingtv />} />
            <Route path="/search" element={<Search />} />
            <Route path="/pu" element={<Pu />} />
            <Route path='/upcoming' element={<Upcoming />} />
            <Route path='/nowplaying' element={<Nowplaying />} />
            <Route path='/toprated' element={<Toprated />} />
            <Route path='airingtoday' element={<AiringToady />} />
            <Route path='ontheair' element={<Ontheair />} />
            <Route path='tvshow_popular' element={<Tvshowpopular />} />
            <Route path='tvshow_top_rated' element={<Tvshowtoprated />} />
            <Route path='people' element={<People />} />
            <Route path='search_info/:id' element={<SearchInfo />} />
            <Route path='info_mov_sec/:id' element={<Infomovsec />} />
            <Route path='info_show_sec/:id' element={<Infoshowsec />} />
            <Route path='info_people_sec/:id' element={<Infopeoplesec />} />
            <Route path='info_sec_trending/:id' element={<Infosectrending />} />
            <Route path='info_sec_movei_trending_day/:id' element={<InfosecMovietrendingday />} />
            <Route path='user-info' element={<Userinfo/>}/>
            <Route path='*' element={<Nopage/>}/>
          </Route>
          <Route path='/' element={<Email/>}/>
          <Route path='signin' element={<SignIn/>}/>

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;