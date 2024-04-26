import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Ticket {
    id: string;
    title: string;
    date: string;
    location: string;
    ticketSlots: number;
}

const Ticket = () => {
    const BACKEND_URL = 'https://event-platform-pi.onrender.com';
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cancelTicketId, setCancelTicketID] = useState<string>('');
    const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
    const [itemsPerPage] = useState(8);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('token');
                const authHeader = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    }
                };
                const response = await axios.get(`${BACKEND_URL}/user/tickets`, authHeader);


                setTickets(response.data.tickets);
            } catch (error: any) {
                toast.error(error.response.data.error)
            }
        };

        fetchTickets();
    }, [cancelTicketId]); // Add cancelTicketId to the dependency array

    const handleCancel = async (ticketId: string) => {
        try {
            const token = localStorage.getItem('token');
            const authHeader = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                }
            };
            const response = await axios.delete(`${BACKEND_URL}/user/tickets/${ticketId}`, authHeader)
            if (response.data.success) {
                toast.success('Ticket canceled successfully')
                setIsCancelOpen(false);
                setCancelTicketID(ticketId); // Trigger refetch by updating cancelTicketId
            }
        } catch (error: any) {
            toast.error(error.response.data.error)
        }
    };

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = tickets.slice(indexOfFirstItem, indexOfLastItem);

    const handleCancelModal = (ticketId: string) => {
        setCancelTicketID(ticketId)
        setIsCancelOpen(true)
    }

    const closeDeleteModal = () => {
        setIsCancelOpen(false);
    }
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <section className="container mt-10 px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <h2 className="text-lg font-medium text-gray-800 ">List of all Ticket you booked</h2>
            </div>

            {isCancelOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75">
                            </div>
                        </div>
                        <div className="relative inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <h3 className="text-lg font-bold leading-6 text-center text-gray-800 capitalize " id="modal-title">
                                Cancel ticket
                            </h3>
                            <div className="mt-4 flex justify-center">
                                <p> Do you want to Cancel it?</p>
                            </div>
                            <div className="mt-4 flex justify-center ">
                                <button type="button" onClick={closeDeleteModal} className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                    close
                                </button>
                                <button type="submit" onClick={() => handleCancel(cancelTicketId)} className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#FF2026] rounded-md sm:mx-2 hover:bg-[#ff5a60] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="bg-[#ac46a1] bg-opacity-10 ">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            <div className="flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded " />
                                                <span>Title</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Number Of Ticket
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Date
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200  ">
                                    {currentTickets.map((ticket) => (
                                        <tr key={ticket.id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded  dark:ring-offset-gray-900 " />
                                                    <div className="flex items-center gap-x-2">
                                                        <span>{ticket.title}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm text-gray-700 whitespace-nowrap">{ticket.ticketSlots}</td>
                                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{formatDate(ticket.date)}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <button className="text-red-500 ml-4 hover:underline" onClick={() => handleCancelModal(ticket.id)} >Cancel</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <ul className="flex">
                    {Array.from({ length: Math.ceil(tickets.length / itemsPerPage) }, (_, i) => (
                        <li key={i}>
                            <button
                                onClick={() => paginate(i + 1)}
                                className={`px-3 py-1 mx-1 rounded-md ${currentPage === i + 1 ? 'bg-[#b34a8a] text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Ticket;
