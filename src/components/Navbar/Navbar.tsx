import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };
    const handleClick = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <nav className="bg-white shadow">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <a href="/" className="mx-auto">
                            <h1 className="text-2xl font-bold">Event <span className='text-[#6d23b6]'>MP</span></h1>
                        </a>
                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
                                {!isOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                    <div className={`lg:flex lg:items-center ${isOpen ? 'block' : 'hidden'}`}>
                        <Link to="/" className="block mx-4 mt-4 text-gray-700 capitalize lg:mt-0 hover:text-[#6d23b6]">Home</Link>
                        <Link to="/events" className="block mx-4 text-gray-700 capitalize hover:text-[#6d23b6]">Events</Link>
                        <a href="#" className="block mx-4 mt-4 text-gray-700 capitalize lg:mt-0 hover:text-[#6d23b6]">Contact</a>
                        {token ? (
                            <div className="relative">
                                <button onClick={toggleProfileMenu} className="block mx-4 mt-4 text-gray-700 capitalize lg:mt-0 hover:text-[#6d23b6] focus:outline-none">
                                    <BsPersonCircle className="w-6 h-6" />
                                </button>
                                {profileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                        <Link to="/tickets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ticket</Link>
                                        <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleClick}>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/signin" className="block mx-4 mt-4 text-gray-700 capitalize lg:mt-0 hover:text-[#6d23b6]">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
