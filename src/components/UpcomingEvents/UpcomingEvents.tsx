import event1 from '/images/event1.jpg';
import event2 from '/images/event2.jpg';
import event3 from '/images/event3.jpg';
import event4 from '/images/event4.jpg';
import { Link } from 'react-router-dom';
const UpcomingEvents = () => {
    const upcomingEvents = [
        {
            title: "All the features you want to know",
            date: "21 October 2019",
            Location: "Kigali BK Arena",
            imageUrl: event1
        },
        {
            title: "How to use sticky note for problem solving",
            date: "20 October 2019",
            Location: "Intare conference Arena",
            imageUrl: event2
        },
        {
            title: "How to use sticky note for problem solving",
            date: "20 October 2019",
            Location: "Kigali Serena Hotel",
            imageUrl: event3
        },
        {
            title: "How to use sticky note for problem solving",
            date: "20 October 2019",
            Location: "Kigali Pele Stadium",
            imageUrl: event4
        },
    ];

    const limitedEvents = upcomingEvents.slice(0, 4);

    return (
        <section className="bg-white">
            <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">Upcoming Events</h1>

                    <p className="max-w-lg mx-auto mt-4 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
                    {limitedEvents.map((event, index) => (
                        <div key={index}>
                            <img className="relative z-10 object-cover w-full rounded-md h-96" src={event.imageUrl} alt="" />

                            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow">
                                <a href="#" className="font-semibold text-gray-800 hover:underline md:text-xl">
                                    {event.title}
                                </a>

                                <p className="mt-3 text-sm text-gray-500 md:text-sm">
                                    {event.Location}
                                </p>

                                <p className="mt-3 text-sm text-[#6411ad]">{event.date}</p>

                                <button className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#47126b] rounded hover:bg-[#6411ad] focus:outline-none focus:bg-[#6411ad]">
                                    Book Ticket
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-[#47126b] rounded hover:bg-[#6411ad] focus:outline-none focus:bg-[#6411ad]">
                        <Link to="/events">
                            Explore More Events
                        </Link>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
