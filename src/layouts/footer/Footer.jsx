import React from 'react';
import { Facebook, Instagram, MessageCircleCode } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-black">
      <div className="container mx-auto px-4">
       

        {/* Footer Bottom Section */}
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex items-center space-x-6">
            <div className="text-[#FFD700]">
              © {new Date().getFullYear()} AuraFits
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20" />
            <div className="text-sm text-[#FFD700]">
              Elite Fitness Experience
            </div>
          </div>
          
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-900 hover:bg-blue-700 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://wa.me/15551234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center"
            >
              <MessageCircleCode className="h-6 w-6" />
            </a>
          </div>

          <div className="flex items-center">
            <div className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-white/20 backdrop-blur-sm">
              <span className="text-sm text-white">Member Support 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;