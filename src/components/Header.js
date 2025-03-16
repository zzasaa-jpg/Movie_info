import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../Images/logo.png'
import { FaRegCircleUser } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { onAuthStateChanged , getAuth} from 'firebase/auth';
import app from '../FireBase/FireBase'
function Header() {
  let location = useLocation();
  let isLoginpage = location.pathname === '/';
  let isLoginpage2 = location.pathname === '/signin'
  let [user, setUser] = useState(null);
  let navigate = useNavigate()
  let auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    return () => unsubscribe();
    }, [auth]);

  if(isLoginpage){
    return null;
  }

  if(isLoginpage2){
    return null;
  }

  let handleuserinfo=()=>{
    navigate('/user-info')
  }
  
  return (
    // header component
    <div className='h-auto'>
      <header className=' bg-[#0dd0f7] text-white shadow-xl flex justify-between items-center p-3 sm:p-3'>
        {/* web logo */}
        <Link to="/">
          <img src={logo} alt='logo' className=' rounded-[3px] w-[72px] sm:w-[125px] lg:w-[130px]' />
        </Link>
        {/* navigation */}
        <nav className='flex'>
          <ul className='flex gap-2 sm:gap-8'>
            <li className=' cursor-pointer relative group text-[18px] flex justify-center items-center hover:underline sm:text-[25px] ' >Movie
            {/* box for links */}
              <div className=' z-10 absolute hidden top-7 left-[-25px] bg-[#ffffff] text-black text-[15px] px-3 py-2 rounded-[4px] cursor-pointer group-hover:block sm:bg-[#ffffff1e] sm:text-white sm:top-9'>
                <ul>
                  <li >
                    <Link className=' block hover:underline' to='/pu'>Popular</Link>
                  </li>
                  <li >
                    <Link className=' block hover:underline' to='/upcoming'>Upcoming</Link>
                  </li>
                  <li >
                    <Link className=' block hover:underline' to='/nowplaying'>Now_playing</Link>
                  </li>
                  <li >
                    <Link className=' block hover:underline' to='/toprated'>Top_rated</Link>
                  </li>

                </ul>
              </div>
            </li>

            <li className=' cursor-pointer relative group text-[18px] flex justify-center items-center hover:underline sm:text-[25px] ' >Tv Show
            {/* box for links */}
              <div className=' z-10 absolute hidden top-7 left-[-10px] bg-[#ffffff] text-black text-[15px] px-3 py-2 rounded-[4px] cursor-pointer group-hover:block sm:bg-[#ffffff1e] sm:text-white sm:top-9'>
                <ul>
                  <li >
                    <Link className=' block hover:underline' to='/airingtoday'>Airing_today</Link>
                  </li>
                  <li >
                    <Link className=' block hover:underline' to='/ontheair'>On_the_air</Link>
                  </li>
                  <li >
                    <Link className=' block hover:underline' to='/tvshow_popular'>Tv_show_popular</Link>
                  </li>
                  <li >
                    <Link className=' block hover:underline' to='/tvshow_top_rated'>Tv_show_top_rated</Link>
                  </li>

                </ul>
              </div>
            </li>
            <li className=' cursor-pointer text-[18px] flex justify-center items-center hover:underline sm:text-[25px] ' ><Link className='' to='/people'>People</Link></li>
          {user && (
                <div className='flex justify-center items-center'>
                    {
                      user.photoURL ? (
                        <img src={user.photoURL} alt="user logo" onClick={handleuserinfo}  className=' w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] lg:w-[35px] lg:h-[35px] rounded-full cursor-pointer'/ >

                      ):(
                        <FaRegCircleUser className='text-[25px] lg:text-[35px] cursor-pointer'onClick={handleuserinfo} />
                      )
                    }
                    
                </div>
            )}
          </ul>
        </nav>
      </header>

    </div>

  );
}

export default Header;
