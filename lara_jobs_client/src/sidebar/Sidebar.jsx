import { ChartPieIcon } from "@heroicons/react/16/solid";
import { ArrowRightEndOnRectangleIcon, CogIcon, HomeIcon } from "@heroicons/react/20/solid";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        // Remove items from localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('candidate_id');

        toast.success("Logout Success");

        window.location.href = "/signin";
    };

    return (
        <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
            <div className="space-y-3">
                <div className="flex items-center">
                    <h2 className="text-xl font-bold text-white">Dashboard</h2>
                </div>

                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="rounded-sm">
                            <button 
                                onClick={() => navigate("/dashboard")} 
                                className="flex items-center p-2 space-x-3 rounded-md">
                                <HomeIcon className="w-6 h-6 text-gray-100" />
                                <span className="text-gray-100">Home</span>
                            </button>
                        </li>

                        <li className="rounded-sm">
                            <button 
                                className="flex items-center p-2 space-x-3 rounded-md">
                                <ChartPieIcon className="w-6 h-6 text-gray-100" />
                                <span className="text-gray-100">Dashboard</span>
                            </button>
                        </li>

                        <li className="rounded-sm">
                            <button 
                                className="flex items-center p-2 space-x-3 rounded-md">
                                <CogIcon className="w-6 h-6 text-gray-100" />
                                <span className="text-gray-100">Settings</span>
                            </button>
                        </li>

                        <li className="rounded-sm">
                            <button 
                                onClick={logout} 
                                className="flex items-center p-2 space-x-3 rounded-md">
                                <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-gray-100" />
                                <span className="text-gray-100">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
