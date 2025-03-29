import { ChartPieIcon } from "@heroicons/react/16/solid";
import { ArrowRightEndOnRectangleIcon, CogIcon, HomeIcon } from "@heroicons/react/20/solid";
import React from "react";

const Sidebar = ({ userRole }) => {
    return (
        <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
            <div className="space-y-3">
                <div className="flex items-center">
                    <h2 className="text-xl font-bold text-white">Dashboard</h2>
                </div>

                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="rounded-sm">
                            <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <HomeIcon className="w-6 h-6 text-gray-100" />
                                <span className="text-gray-100">Home</span>
                            </a>
                        </li>

                        {/* Admin-specific links */}
                        {userRole === "ADMIN" && (
                            <>
                                <li className="rounded-sm">
                                    <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <CogIcon className="w-6 h-6 text-gray-100" />
                                        <span className="text-gray-100">Admin Dashboard</span>
                                    </a>
                                </li>
                            </>
                        )}

                        {/* Candidate-specific links */}
                        {userRole === "CANDIDATE" && (
                            <>
                                <li className="rounded-sm">
                                    <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <ChartPieIcon className="w-6 h-6 text-gray-100" />
                                        <span className="text-gray-100">Dashboard</span>
                                    </a>
                                </li>
                            </>
                        )}

                        {/* Common links for both roles */}
                        <li className="rounded-sm">
                            <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <CogIcon className="w-6 h-6 text-gray-100" />
                                <span className="text-gray-100">Settings</span>
                            </a>
                        </li>
                        <li className="rounded-sm">
                            <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-gray-100" />
                                <span className="text-gray-100">Logout</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
