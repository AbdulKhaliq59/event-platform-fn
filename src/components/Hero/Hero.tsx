import NavBar from '../Navbar/Navbar'
import eventImages from '/images/eventBG2.jpg';
const Hero = () => {
    return (
        <header>
            <NavBar />
            <div className="w-full bg-center bg-cover h-[38rem]" style={{ backgroundImage: `url(${eventImages})` }}>
                <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-white lg:text-4xl">Enjoy your event with <span className="text-[#6411ad]">Event Management</span> Project</h1>
                        <button className="w-[70%] px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-[#47126b] rounded-md lg:w-[15%] hover:bg-[#6411ad] focus:outline-none focus:bg-[#6411ad]">Explore Event</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Hero