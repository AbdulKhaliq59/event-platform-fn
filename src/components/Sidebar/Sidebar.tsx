
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdEvent } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { IoTicket } from "react-icons/io5";

interface Menu {
    name: string;
    link: string;
    icon: React.ComponentType<any>;
    margin?: boolean;
}

const Sidebar: React.FC = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const menus: Menu[] = [
        { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
        { name: "events", link: "/dashboard/events", icon: MdEvent },
        { name: "booking", link: "/dashboard/booking", icon: IoTicket },
        { name: "Logout", link: "/logout", icon: IoIosLogOut },
    ];

    const handleClick = (link: string) => {
        if (link === '/logout') {
            localStorage.removeItem('token');
            navigate('/');
        }
        else {
            navigate(link);
            setOpen(false);
        }
    };

    return (
        <section className="flex">

            <div
                className={`bg-[#47126b] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-300 px-4`}
            >
                <div className="py-3 flex justify-between items-center">
                    {/* Logo */}
                    {open && (
                        <Link to="/">
                            <h1 className="text-2xl font-bold ">Event <span className='text-[#e192c3]'>MP</span></h1>
                        </Link>
                    )}
                    {/* Hamburger Icon */}
                    <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {/* Menu Items */}
                    {menus?.map((menu, i) => (
                        <div
                            key={i}
                            className={` ${menu?.margin && "mt-5"} group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-[black] rounded-md`}
                            onClick={() => handleClick(menu.link)}
                        >
                            <div><menu.icon size="20" /></div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                {menu.name}
                            </h2>
                            <h2
                                className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu.name}
                            </h2>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Sidebar;
