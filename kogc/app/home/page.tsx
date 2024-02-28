// @ts-nocheck
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type Mentor = {
    name: string;
    email: string;
    bio: string;
    calendly: string;
};

export default function Page() {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        fetch('/api/mentor')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data) {
                    setMentors(data.data);
                    // save to local storage
                    localStorage.setItem('mentors', JSON.stringify(data.data));
                    console.log('Mentors:', data.data);
                } else {
                    console.error('Unexpected response data', data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    function handlePreviewClick(index) {
        router.push(`/counsellor/${index}?id=${index}`);
        // console.log(index)
    }

    return (
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mentors.map((mentor, index) => (
                <div key={index} className='pt-10 mx-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 p-6'>
                    <a href="">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{mentor.firstName} {mentor.lastName} </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">{mentor.about}</p>
                    
                    <button 
                    onClick={() => handlePreviewClick(index)}
                    className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        
                        View Mentor {mentor.firstName}
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    )
}