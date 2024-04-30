import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import eventImage from '/images/event1.jpg'
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

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
const AllEvents = () => {
    const BACKEND_URL = 'https://event-platform-pi.onrender.com';
    const [events, setEvents] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const [numberOfTickets, setNumberOfTickets] = useState(0);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/events`);
                setEvents(response.data.events);
                setLoading(false)
            } catch (error) {

                toast.error("Internal Server error")
            }
        };

        fetchEvents();
    }, []);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleBookTicket = (event: Event) => {
        if (localStorage.getItem('token')) {
            setSelectedEvent(event);
            setShowModal(true);
        } else {
            toast.error("Please sign in to book ticket")
            navigate('/signin');
        }
    };
    const handleChange = (e: any) => {
        setNumberOfTickets(e.target.value)
    }
    const closeModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };
    const handleBook = async () => {
        try {
            if (!selectedEvent) {
                toast.error("No event selected");
                return;
            }
            if (!numberOfTickets || numberOfTickets <= 0) {
                toast.error("Invalid number of tickets");
                return;
            }
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }
            const authHeader = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                }
            }
            const response: any = await axios.post(`${BACKEND_URL}/booking`, {
                eventId: selectedEvent._id,
                numberOfTickets
            },
                authHeader
            );

            if (response.data.success === true) {
                toast.success("Ticket Booked Successfully");
                setShowModal(false);

                // Fetch updated events data after booking
                const updatedResponse = await axios.get(`${BACKEND_URL}/events`);
                setEvents(updatedResponse.data.events);
            }
        } catch (error: any) {
            toast.error("Internal Server error");
        }
    }

    const filteredEvents = events.filter(event =>
        (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
        event.ticketSlots > 0
    );


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
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">All Events</h1>
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="px-4 py-2 mt-4 mb-4 w-full max-w-lg mx-auto text-gray-700 placeholder-gray-400 bg-white border border-[#efcfe3] rounded-lg focus:outline-none focus:border-[#efcfe3]"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {loading ? (<SkeletonLoading />) : (
                    <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
                        {filteredEvents.map((event, index) => (
                            <div key={index}>
                                <img className="relative z-10 object-cover w-full rounded-md h-96" src={event?.pictureUrl !== null ? event.pictureUrl : eventImage} alt="" />
                                <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-[#efcfe3]  rounded-md shadow">
                                    <p className="font-semibold text-gray-800 md:text-xl">{event.title}</p>
                                    <p className="mt-3 text-sm text-gray-500 md:text-sm">{event.location}</p>
                                    <p className="mt-3 text-sm text-[#6411ad]">{formatDate(event.date)}</p>
                                    <button onClick={() => handleBookTicket(event)} className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#47126b] rounded hover:bg-[#6411ad] focus:outline-none focus:bg-[#6411ad]">Book Ticket</button>
                                </div>
                            </div>
                        ))}
                    </div>

                )}

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mr-2 text-sm font-semibold text-white bg-[#47126b] rounded hover:bg-[#6411ad] focus:outline-none focus:bg-[#6411ad]"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentEvents.length < eventsPerPage}
                        className="px-4 py-2 ml-2 text-sm font-semibold text-white bg-[#47126b] rounded hover:bg-[#6411ad] focus:outline-none focus:bg-[#6411ad]"
                    >
                        Next
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed z-30 inset-0 flex items-center justify-center overflow-y-auto">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Book Ticket</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500"><span className='font-bold mr-4'>Event Title: </span>{selectedEvent?.title}</p>
                                    <p className="text-sm text-gray-500"><span className='font-bold mr-4'>Event Location: </span>{selectedEvent?.location}</p>
                                    <p className="text-sm text-gray-500"><span className='font-bold mr-4'>Event Date: </span>{selectedEvent ? formatDate(selectedEvent.date) : ''}</p>
                                    <p className="text-sm text-gray-500"><span className='font-bold mr-4'>Remain Slots:</span>{selectedEvent?.ticketSlots}</p>
                                    <label htmlFor="numberOfTickets" className="block text-sm font-medium text-gray-700">
                                        Number of Tickets
                                    </label>
                                    <input
                                        type="number"
                                        id="numberOfTickets"
                                        name="numberOfTickets"
                                        value={numberOfTickets}
                                        onChange={handleChange}
                                        className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Close
                            </button>
                            <button onClick={handleBook} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#47126b] text-base font-medium text-white hover:bg-[#6411ad] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#47126b] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Book ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </section>
    );
};

export default AllEvents;
