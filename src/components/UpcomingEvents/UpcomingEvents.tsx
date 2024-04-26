import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Event {
    _id: string;
    title: string;
    date: string;
    location: string;
    ticketSlots: number;
    pictureUrl: string;
}

const SkeletonLoading = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-96 bg-gray-300 rounded-md"></div>
        <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
    </div>
);

const UpcomingEvents = () => {
    const BACKEND_URL = 'https://event-platform-pi.onrender.com';
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/events`);
                const allEvents: Event[] = response.data.events;
                const today = new Date();
                const upcomingEvents = allEvents.filter(event => new Date(event.date) >= today);
                upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                const limitedEvents = upcomingEvents.slice(0, 4);
                setUpcomingEvents(limitedEvents);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <section className="bg-white">
            <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">Upcoming Events</h1>
                    <p className="max-w-lg mx-auto mt-4 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect</p>
                </div>

                {loading ? (
                    <SkeletonLoading />
                ) : (
                    <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
                        {upcomingEvents.map((event, index) => (
                            <div key={index}>
                                <img className="relative z-10 object-cover w-full rounded-md h-96" src={event.pictureUrl} alt="" />
                                <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-[#efcfe3]  rounded-md shadow">
                                    <p className="font-semibold text-gray-800 md:text-xl">{event.title}</p>
                                    <p className="mt-3 text-sm text-gray-500 md:text-sm">{event.location}</p>
                                    <p className="mt-3 text-sm text-[#6411ad]">{formatDate(event.date)}</p>
                                    <button className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#47126b] rounded hover:bg-[#6411ad] focus:outline-none focus:bg-[#6411ad]">Book Ticket</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-8">
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-[#47126b] rounded hover:bg-[#6411ad] focus:outline-none focus:bg-[#6411ad]">
                        <Link to="/events">Explore More Events</Link>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
