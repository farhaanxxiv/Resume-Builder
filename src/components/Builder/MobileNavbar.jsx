import React, { useState } from 'react';
import AvailableTemplates from '../Resume/AvailableTemplates';
import AddSection from './AddSection';

const Navbar = () => {
    const [isLeftOpen, setLeftOpen] = useState(false);
    const [isRightOpen, setRightOpen] = useState(false);

    const toggleLeftNavbar = () => setLeftOpen(!isLeftOpen);
    const toggleRightNavbar = () => setRightOpen(!isRightOpen);

    return (
        <div>
            {/* Left Navbar */}
            <div
                className={`fixed top-0 bottom-0 left-0 w-64 bg-gray-800 text-white transform ${isLeftOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                <button
                    className="block text-left w-full p-4 bg-gray-700 hover:bg-gray-600"
                    onClick={toggleLeftNavbar}
                >
                    X
                </button>
                <AddSection />
            </div>

            {/* Right Navbar */}
            <div
                className={`fixed top-0 bottom-0 right-0 w-64 bg-gray-800 text-white transform ${isRightOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                <button
                    className="block text-left w-full p-4 bg-gray-700 hover:bg-gray-600"
                    onClick={toggleRightNavbar}
                >
                    X
                </button>
                <AvailableTemplates />

            </div>

            {/* Toggle Buttons */}
            <div className="border-b border-[#303030] shadow-[0px_0px_15px_#414141] fixed top-0 left-0 w-full bg-black p-2 py-4 flex justify-between">
                <button
                    className="w-fit white  z-50"
                    onClick={toggleLeftNavbar}
                >
                    Add Section &nbsp;&nbsp; +
                </button>
                <button
                    className="w-fit white  z-50"
                    onClick={toggleRightNavbar}
                >
                    Pick Template &nbsp;&nbsp; +
                </button>
            </div>
        </div>
    );
};

export default Navbar;
