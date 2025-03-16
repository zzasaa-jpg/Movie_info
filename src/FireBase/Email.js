import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import app from './FireBase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../FireBase/logo.png';
import Typewriter from "typewriter-effect";

function Email() {
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const auth = getAuth(app);

    useEffect(() => {
        // Check if the user is already signed in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem("isSignIn", true);
                navigate('/app');
            }
        });

        // Unsubscribe when component unmounts
        return () => unsubscribe();
    }, [auth, navigate]);

    let handleEmail = (e) => {
        setEmail(e.target.value)
    }

    let handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSignUpEmail = async (e) => {
        e.preventDefault();
        setEmail(e.target.value)
        setPassword(e.target.value)
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            // The signed-in user info
            const user = userCredential.user;
            console.log(user[0]);
            localStorage.setItem("isSignIn", true);
            navigate('/app');
        } catch (error) {
            setError(true)
            let errormessage = error.message;
            let errorCode = error.code;


            switch (errorCode) {
                case "auth/invalid-email":
                    toast.error('This email address is invalid!', {
                        theme: 'colored'
                    })
                    break;

                case "auth/missing-email":
                    toast.error('This email address is missing!', {
                        theme: 'colored'
                    })
                    break;
                case "auth/missing-password":
                    toast.error('Password is missing!', {
                        theme: 'colored'
                    })
                    break;
                case "auth/invalid-credential":
                    toast.error('invalid-credential!', {
                        theme: 'colored'
                    })
                    break;
                case "auth/user-disabled":
                    toast.error('This email address is disabled by the administrator!', {
                        theme: 'colored'
                    })
                    break;
                case "auth/user-not-found":
                    toast.error('This email address is not registered!', {
                        theme: 'colored'
                    })
                    break;
                case "auth/wrong-password":
                    toast.error('The password is invalid or the user does not have a password!', {
                        theme: 'colored'
                    })
                    break;
                default:
                    setMessageError(errormessage);
                    break;
            }

        }
    };


    const handleShow = () => {
        setShow(!show)
    }

    return (

        <div className='h-screen flex justify-center flex-col'>
            <div className='font-font-open font-semibold italic w-auto text-white flex justify-center items-center text-center text-[25px] lg:text-[40px]'>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Welcome to movie website.")
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString("Best movie platform.")
                            .start();
                    }}
                />
            </div>

            <div className='font-font-open bg-[#0dd0f700] p-2'>
                <ToastContainer />
                <main className='flex flex-col sm:flex-row md:flex-row justify-center lg:items-center gap-[5px] sm:gap-[10px] md:gap-[20px] lg:gap-[80px]'>

                    <section className='flex justify-center items-center flex-col gap-[20px]'>
                        <img src={logo} alt="logo" className='hidden sm:w-[280px] sm:h-[280px] sm:rounded-2xl sm:block md:w-[300px] md:h-[300px] md:rounded-2xl md:block lg:w-[400px] lg:h-[400px] lg:rounded-2xl lg:block shadow-2xl shadow-zinc-500' />
                    </section>

                    <section>
                        <div className='flex p-1'>
                            <h1 className='text-black'>{error && <h1 className='text-[10px] font-semibold'>{messageError.message}</h1>}</h1>
                        </div>

                        <div className=' bg-[#0dd0f7] w-auto sm:w-[400px] md:w-[500px] lg:w-[600px] h-[380px] sm:h-[400px] md:h-[400px] lg:h-[400px] gap-1 flex flex-col shadow-[#666666] shadow-2xl rounded-[20px] p-2'>

                            <h1 className='text-[30px] sm:text-[35px] md:text-[38px] lg:text-[40px] text-center'>LogIn</h1>

                            <form onSubmit={handleSignUpEmail} className='flex flex-col gap-2 '>
                                <div className='flex  items-center gap-2'>
                                    <MdAlternateEmail className='h-5 w-5 ' />
                                    <h1 className='font-semibold text-[20px]'>Email</h1>
                                </div>

                                <input className='bg-transparent border-[1px] border-black p-2 rounded-[10px] text-[20px] w-full placeholder:text-[#4f4f4f]' placeholder='Enter the Email...' type="email" name="" id="email" onChange={handleEmail} />

                                <div className='flex items-center gap-2'>
                                    <MdPassword className='
             h-5 w-5 ' onMouseEnter={handleShow} onMouseLeave={handleShow} />

                                    <h1 className='font-semibold text-[20px]'>Password</h1>
                                </div>

                                <input className='bg-transparent border-[1px] border-black p-2 rounded-[10px] text-[20px] w-full placeholder:text-[#4f4f4f]' placeholder='Enter the Password...' type={show ? "password" : "text"} name="" id="password" onChange={handlePassword} />
                                {/* <input className='bg-transparent border-[1px] border-black p-2 rounded-[4px] text-[20px]' type="password" name="" id="password" onChange={handlePassword}/> */}
                                <button type='submit' className='cursor-pointer text-[20px] border-black border-[1px] hover:text-white hover:bg-[#2ac7e7]   w-full p-2 rounded-[10px]'>Login</button>

                            </form>

                            <h1 className='pt-2 text-center'>Create a New account <Link className='underline' to='/signin'>Signin</Link></h1>

                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Email;