import { useState, useEffect } from 'react';
import axios from 'axios';

interface Ticket {
    id: string;
    title: string;
    date: string;
    location: string;
    attendee: number;
    ticketRemain: string | number;
}

const Booking = () => {
    const BACKEND_URL = 'https://event-platform-pi.onrender.com';
    const token = localStorage.getItem('token')
    const authHeader = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    }
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const fetchBookedTickets = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/booked-tickets`, authHeader); // Adjust the endpoint according to your backend route
                setTickets(response.data.tickets);
            } catch (error) {
                console.error('Error fetching booked tickets:', error);
            }
        };

        fetchBookedTickets();
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
        <section className="container mt-20 px-4 mx-auto">
            <div>
                <h2 className="text-lg font-medium text-gray-800">List of Tickets</h2>

                <div className="-mx-4 mt-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#ac46a1] bg-opacity-10">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            <div className="flex items-center gap-x-3">
                                                <input type="checkbox" className="text-[#47126b] border-gray-300 rounded" />
                                                <span>Title</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Date
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Location
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Attendee
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Ticket remain
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tickets.map((ticket) => (
                                        <tr key={ticket.id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded" />
                                                    <div className="flex items-center gap-x-2">
                                                        <span>{ticket.title}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {formatDate(ticket.date)}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {ticket.location}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {ticket.attendee}
                                            </td>
                                            <td className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${ticket.ticketRemain === 'Soldout' ? 'text-red-500 bg-red-100 rounded-full px-2' : ''}`}>
                                                {ticket.ticketRemain}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Booking;
