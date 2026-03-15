import React from 'react';
import { NavLink } from 'react-router-dom';
import { DocumentTextIcon, HomeIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    return (
        <div className="max-md:hidden w-64 border-r border-gray-200 bg-white flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <h1 className="text-xl font-bold text-blue-600">NexEmail</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`
                    }
                >
                    <HomeIcon className="w-5 h-5 mr-3" />
                    Dashboard
                </NavLink>
            </nav>
            <div className="p-4 border-t border-gray-200">
                <div className="text-xs text-center text-gray-500">
                    Built with React & MERN
                </div>
            </div>
        </div>
    );
};

export default Sidebar;