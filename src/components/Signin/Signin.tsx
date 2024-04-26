import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import eventImage from '/images/event3.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {

    const BACKEND_URL = 'https://event-platform-pi.onrender.com';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            if (email === 'admin@example.com') {
                const response = await axios.post(`${BACKEND_URL}/auth/signin`, {
                    email,
                    password,
                });

                toast.success('Login successful');
                localStorage.setItem('token', response.data.token);
                window.location.href = '/dashboard'; 
                setIsLoggedIn(true);
            }
            const response = await axios.post(`${BACKEND_URL}/auth/signin`, {
                email,
                password,
            });

            toast.success('Login successful');
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
            setIsLoggedIn(true);
        } catch (error: any) {
            toast.error(error.response.data.Error);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="bg-white">
            <div className="flex justify-center h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: `url(${eventImage})` }}>
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">Event MP</h2>

                            <p className="max-w-xl mt-3 text-gray-300">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                                autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                                molestiae
                            </p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        <div className="text-center">
                            <div className="flex justify-center mx-auto">
                                <Link to="/">
                                    <h1 className="text-2xl font-bold ">Event <span className='text-[#47126b]'>MP</span></h1>
                                </Link>
                            </div>
                            <p className="mt-3 text-gray-500 ">Sign in to access your account</p>
                        </div>
                        <div className="mt-8">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 ">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@example.com"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-[#822faf] focus:ring-[#822faf] focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm text-gray-600 ">Password</label>
                                    <a href="#" className="text-sm text-gray-400 focus:text-[#6411ad] hover:text-[#6411ad] hover:underline">Forgot password?</a>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Your Password"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-[#822faf] focus:ring-[#822faf] focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-[#6411ad] rounded-lg hover:bg-[#822faf] focus:outline-none focus:bg-[#822faf] focus:ring focus:ring-[#822faf] focus:ring-opacity-50"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                        <p className="mt-6 text-sm text-center text-gray-400">
                            Don't have an account yet?{' '}
                            <Link to="/signup" className="text-[#6411ad] focus:outline-none focus:underline hover:underline">
                                Sign up
                            </Link>
                            .
                        </p>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default Signin;
