'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

type Mentor = {
    name: string;
    email: string;
    bio: string;
    calendly: string;
};

export default function Counselor() {
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');
    const router = useRouter();

    const [mentor, setMentor] = useState<Mentor | null>(null);

    // Fetch the counselor data from local storage
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const mentor = localStorage.getItem('mentors');
                if (mentor && id && typeof id === 'string') {
                    const mentorData = JSON.parse(mentor);
                    const selectedMentor = mentorData[id];
                    if (selectedMentor) {
                        setMentor(selectedMentor);
                    }
                    console.log('Mentor:', selectedMentor);
                }
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBookDetails();
    }, [id]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
            {mentor ? (
                <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img className="h-48 w-full object-cover md:w-48" src="/img/logo.svg" alt="ChitChat Logo"/>
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{mentor.firstName} {mentor.lastName}</div>
                            <p className="mt-2 text-gray-500">{mentor.about}</p>
                            <p className="mt-2 text-gray-500">{mentor.email}</p>
                            <div className="mt-4 flex space-x-4">
                                <a href={mentor.calendly} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Schedule a session
                                </a>
                                <a href="/mchat" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Chat with {mentor.firstName}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
        </div>
    );
}