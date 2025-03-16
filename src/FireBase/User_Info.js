import React, {useState, useEffect} from 'react';
import { onAuthStateChanged , getAuth, signOut} from 'firebase/auth';
import app from './FireBase';
import { useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";

function Userinfo() {
    let [user, setUser] = useState(null);
    let auth = getAuth(app);
    let navigate = useNavigate();
    
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
        
        const handleSignOut = async () => {
            try {
                await signOut(auth);
                navigate('/')
                localStorage.removeItem("isSignIn");
            } catch (error) {
                console.error('Sign-out error:', error);
            }
        };
    
  return (
    <div className='flex justify-center items-center h-screen bg-[#0dd0f700] p-2 lg:p-0'>
         {user && (
                <div className=" w-screen sm:w-96 md:w-[500px] lg:w-[600px] lg:h-60 flex gap-10 items-center bg-[#0dd0f7] shadow-2xl p-5 rounded-[15px]">
                   

                    
                            <FaRegCircleUser className=' text-[100px] sm:text-[100px] md:text-[150px] lg:text-[200px]' />
                        
                   

                    <div className='flex flex-col'>

                        <h2 className=' md:text-[20px] lg:text-[25px] font-semibold'>User Information:</h2>
                        <h1 className=" md:text-[20px] lg:text-[25px]">Email: {user.email}</h1>
                        <h1 className=" md:text-[20px] lg:text-[25px]">Name: {user.displayName? user.displayName : "user name"}</h1>
                        <button className="border border-black text-[15px] px-[5px] w-fit lg:w-20 sm:text-[20px] md:text-[20px] lg:text-[20px] rounded-[4px] hover:text-white" onClick={handleSignOut}>Logout</button>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Userinfo;