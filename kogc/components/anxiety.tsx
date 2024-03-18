
import React, { useState } from 'react';
import Link from 'next/link';

export default function Create() {
    
    return (
        <div className="flex flex-col   border-2 h-40 items-center justify-center">
            <div className="py-4 px-8  shadow-lg rounded-lg my-20">
                <div className="mt-4">
                    <label htmlFor="formFile" className="text-xl font-bold mb-2">Anxiety Group Chat </label>
                    
                </div>
                <Link href="/anxiety">
                <button
                className='bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                    Chat Now
                </button>
                </Link>
            </div>
        </div>
    );
}