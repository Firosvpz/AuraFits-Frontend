import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle scroll for background opacity
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animate desktop links on mount
    useEffect(() => {
        const links = document.querySelectorAll('.gym-glass-nav-link');
        links.forEach((link, index) => {
            setTimeout(() => {
                link.classList.add('animate-in');
            }, index * 100);
        });
    }, []);

    // Animate mobile links when menu opens
    useEffect(() => {
        if (isOpen) {
            const mobileLinks = document.querySelectorAll('.gym-glass-nav-mobile-link');
            mobileLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.classList.add('animate-in');
                }, index * 100);
            });
        }
    }, [isOpen]);

    return (
        <nav className={`gym-glass-nav-container fixed w-full z-50  top-0 ${isScrolled ? 'scrolled' : ''}`}>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <span className="gym-glass-nav-logo heading-3d text-4xl font-bold text-[#FFD700] bolkit ">AuraFits</span>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <a href="#home" className="gym-glass-nav-link text-white text-lg font-medium hover:text-[#FFD700] metamorphous-regular">Home</a>
                        <a href="#about" className="gym-glass-nav-link text-white text-lg font-medium hover:text-[#FFD700] metamorphous-regular">About Us</a>
                        <a href="#bookings" className="gym-glass-nav-link text-white text-lg font-medium hover:text-[#FFD700] metamorphous-regular">My Bookings</a>
                        <a href="#bookings" className="gym-glass-nav-link text-white text-lg font-medium hover:text-[#FFD700] metamorphous-regular">Trainers</a>
                        <a href="#facilities" className="gym-glass-nav-link text-white text-lg font-medium hover:text-[#FFD700] metamorphous-regular">Facilities</a>
                        <a href="#contact" className="gym-glass-nav-link text-white text-lg font-medium hover:text-[#FFD700] metamorphous-regular">Contact</a>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="gym-glass-nav-hamburger inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#000] focus:outline-none focus:ring-2 focus:text-[#FFD700]"
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className={isOpen ? 'gym-glass-nav-hamburger-open' : ''}>
                                <span className="block w-5 h-0.5 bg-white mb-1.5"></span>
                                <span className="block w-5 h-0.5 bg-white mb-1.5"></span>
                                <span className="block w-5 h-0.5 bg-white"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`md:hidden gym-glass-nav-mobile-menu ${isOpen ? 'gym-glass-nav-mobile-open' : 'gym-glass-nav-mobile-closed'}`}>
                <div className="px-2 pt-2 pb-3 sm:px-3 bg-[#000] bg-opacity-90 backdrop-blur-md flex">
                    <a href="#home" className="gym-glass-nav-mobile-link block px-3 py-2 rounded-md text-sm metamorphous-regular font-medium text-white hover:bg-black hover:text-[#FFD700]">Home</a>
                    <a href="#about" className="gym-glass-nav-mobile-link block px-3 py-2 rounded-md text-sm metamorphous-regular font-medium text-white hover:bg-black hover:text-[#FFD700]">About Us</a>
                    <a href="#bookings" className="gym-glass-nav-mobile-link block px-3 py-2 rounded-md text-sm metamorphous-regular font-medium text-white hover:bg-black hover:text-[#FFD700]">My Bookings</a>
                    <a href="#facilities" className="gym-glass-nav-mobile-link block px-3 py-2 rounded-md text-sm metamorphous-regular font-medium text-white hover:bg-black hover:text-[#FFD700]">Trainers</a>
                    <a href="#contact" className="gym-glass-nav-mobile-link block px-3 py-2 rounded-md text-sm metamorphous-regular font-medium text-white hover:bg-black hover:text-[#FFD700]">Contact Us</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;