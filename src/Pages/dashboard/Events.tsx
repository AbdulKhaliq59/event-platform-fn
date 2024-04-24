import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Event {
    _id: string;
    title: string;
    date: string;
    location: string;
    ticketSlots: number;
    pictureUrl: string;
}

const Events: React.FC = () => {
    const BACKEND_URL = 'https://event-platform-pi.onrender.com'
    const [events, setEvents] = useState<Event[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        ticketSlots: 0,
        pictureUrl: "",
    });

    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const [deleteChurchId, setDeleteChurchId] = useState<string>('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response: any = await axios.get<Event[]>(`${BACKEND_URL}/events`);
                setEvents(response.data.events);

            } catch (error: any) {

                toast.error(error.response.data.error || "Internal Server error")
            }
        };

        fetchEvents();
    }, []);
    const handleNewEventClick = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };


    const handleDeleteModal = (churchId: string) => {


        setDeleteChurchId(churchId)
        setIsDeleteOpen(true)
    }
    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
    }
    const handleDelete = async (eventId: string) => {
        try {
            const response = await fetch(`${BACKEND_URL}/event/${eventId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete event");
            }

            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
            setIsDeleteOpen(false);
            toast.success("Event deleted successfully");
        } catch (error: any) {
            toast.error(error.message || "Error deleting event");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        const updatedFormData = { ...formData };

        if (type === 'file') {
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files && fileInput.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = () => {
                    if (typeof reader.result === 'string') {
                        updatedFormData.pictureUrl = reader.result;

                        setFormData(updatedFormData);
                    }
                };
                reader.readAsDataURL(file);
            }
        } else {

            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND_URL}/event`, formData);

            setIsOpen(false);
            const response: any = await axios.get<Event[]>(`${BACKEND_URL}/events`);
            setEvents(response.data.events);
            toast.success("Event Created Successfully")
        } catch (error: any) {
            toast.error(error.response.data.error);
        }
    };
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
                <h2 className="text-lg font-medium text-gray-800">List of Events</h2>
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center mt-4 gap-x-3">
                        <button className="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto hover:text-white hover:bg-[#47126b]" onClick={handleNewEventClick}>
                            New Event
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <div className="relative inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize " id="modal-title">
                                    Add New Event
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="title" className="block mt-4 text-sm font-medium text-gray-700 ">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    />

                                    <label htmlFor="date" className="block mt-4 text-sm font-medium text-gray-700 ">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    />

                                    <label htmlFor="location" className="block mt-4 text-sm font-medium text-gray-700 ">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    />

                                    <label htmlFor="ticketSlots" className="block mt-4 text-sm font-medium text-gray-700 ">
                                        Ticket Slots
                                    </label>
                                    <input
                                        type="number"
                                        id="ticketSlots"
                                        name="ticketSlots"
                                        value={formData.ticketSlots}
                                        onChange={handleChange}
                                        className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    />

                                    <label htmlFor="pictureUrl" className="block mt-4 text-sm font-medium text-gray-700 ">
                                        Picture
                                    </label>
                                    <input
                                        type="file"
                                        id="pictureUrl"
                                        name="pictureUrl"
                                        onChange={handleChange}
                                        className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    />


                                    <div className="mt-4 sm:flex sm:items-center sm:justify-end">
                                        <button type="button" onClick={handleCloseModal} className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                            Cancel
                                        </button>
                                        <button type="submit" className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#47126b] rounded-md sm:mx-2 hover:bg-[#5b108e] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                            Create Event
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div className="-mx-4 mt-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#ac46a1] bg-opacity-10">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            <div className="flex items-center gap-x-3">
                                                <input type="checkbox" className="text-[#47126b] border-gray-300 rounded" />
                                                <span>Name</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Date
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Location
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Ticket Slots
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {events.map((event) => (
                                        <tr key={event._id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded" />
                                                    <div className="flex items-center gap-x-2">
                                                        <span>{event.title}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {formatDate(event.date)}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {event.location}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {event.ticketSlots}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <button className="text-[#235552] hover:underline">Edit</button>
                                                <button className="text-red-600 ml-4 hover:underline" onClick={() => handleDeleteModal(event._id)}>Delete</button>
                                                <button className="text-blue-600 ml-4 hover:underline" >View More</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {isDeleteOpen && (
                                        <div className="fixed inset-0 z-10 overflow-y-auto">
                                            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                                    <div className="absolute inset-0 bg-gray-500 opacity-75">
                                                    </div>
                                                </div>
                                                <div className="relative inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                                    <h3 className="text-lg font-bold leading-6 text-center text-gray-800 capitalize " id="modal-title">
                                                        Delete church
                                                    </h3>
                                                    <div className="mt-4 flex justify-center">
                                                        <p> Do you want to delete it?</p>
                                                    </div>
                                                    <div className="mt-4 flex justify-center ">
                                                        <button type="button" onClick={closeDeleteModal} className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                                            Cancel
                                                        </button>
                                                        <button type="submit" onClick={() => handleDelete(deleteChurchId)} className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#FF2026] rounded-md sm:mx-2 hover:bg-[#ff5a60] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                                            delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events;
