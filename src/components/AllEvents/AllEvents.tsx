import { useState } from 'react';
import event1 from '/images/event1.jpg';
import event2 from '/images/event2.jpg';
import event3 from '/images/event3.jpg';
import event4 from '/images/event4.jpg';

const AllEvents = () => {
    const [events] = useState([
        {
            title: "All the features you want to know",
            date: "21 October 2019",
            location: "Kigali BK Arena",
            imageUrl: event1
        },
        {
            title: "How to use sticky note for problem solving",
            date: "20 October 2019",
            location: "Intare conference Arena",
            imageUrl: event2
        },
        {
            title: "How to use sticky note for problem solving",
            date: "20 October 2019",
            location: "Kigali Serena Hotel",
            imageUrl: event3
        },
        {
            title: "How to use sticky note for problem solving",
            date: "20 October 2019",
            location: "Kigali Pele Stadium",
            imageUrl: event4
        },
        // Add more events as needed
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');

    // Logic for pagination
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Change page
    const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

    // Filter events based on search term
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="bg-white">
            <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">All Events</h1>
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="px-4 py-2 mt-4 mb-4 w-full max-w-lg mx-auto text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
                    {filteredEvents.map((event, index) => (
                        <div key={index}>
                            <img className="relative z-10 object-cover w-full rounded-md h-96" src={event.imageUrl} alt="" />
                            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow">
                                <a href="#" className="font-semibold text-gray-800 hover:underline md:text-xl">{event.title}</a>
                                <p className="mt-3 text-sm text-gray-500 md:text-sm">{event.location}</p>
                                <p className="mt-3 text-sm text-[#6411ad]">{event.date}</p>
                                <button className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#47126b] rounded hover:bg-[#6411ad] focus:outline-none focus:bg-[#6411ad]">Book Ticket</button>
                            </div>
                        </div>
                    ))}
                </div>

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
        </section>
    );
};

export default AllEvents;
