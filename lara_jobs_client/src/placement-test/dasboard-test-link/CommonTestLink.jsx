import { AcademicCapIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";

const CommonTestLink = () => {
    return (
        <div className="bg-white rounded-lg shadow p-6 text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
                <AcademicCapIcon className="h-12 w-12 text-sky-600" />
            </div>
            {/* <h2 className="text-xl font-semibold text-gray-800 mb-2">Ready for a Challenge?</h2> */}
            <p className="text-gray-600 mb-4">
                <strong>Take simple Aptitude Test</strong> <br /> This test is designed to evaluate your critical thinking and problem-solving abilities.
            </p>
            <Link
                to='/test/4'
                className="inline-block px-8 py-3 text-base font-medium rounded-md text-sky-700 bg-purple-100 hover:bg-purple-200 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                Take the Aptitude Test
            </Link>
        </div>
    )
}

export default CommonTestLink;