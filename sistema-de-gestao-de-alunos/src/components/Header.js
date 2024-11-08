"use client";

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { HomeIcon, UserIcon } from '@heroicons/react/24/solid';
import MenuButton from '../components/MenuButton';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };
    
    return (
        <header style={headerStyles}>
            <MenuButton />
            
            <a href="/dashboard">
                <HomeIcon className="h-8 w-8 text-white mr-2" />
            </a>

            {/* User Menu */}
            <div className="relative">
                <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center bg-gray-200 rounded-full p-2"
                >
                    <UserIcon className="h-6 w-6 text-white" />
                </button>

                {/* Menu Dropdown */}
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="border-t border-gray-200"></div>
                        {/* Opções */}
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                                onClick={handleLogout}
                            >
                                Sair
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}

const headerStyles = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007BFF',
    padding: '.2rem 1rem'
};