import React from 'react';
import { 
  Brain, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram,
  Mail,
  Phone,
  MapPin,
  Sun,
  Moon
} from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <footer className={`relative pt-4 pb-12 overflow-hidden transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
        : 'bg-gradient-to-br from-gray-100 via-white to-gray-50'
    }`}>
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] ${
          isDarkMode 
            ? 'bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#d1d5db_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db_1px,transparent_1px)]'
        }`}></div>
        <div className={`absolute inset-0 bg-gradient-to-br ${
          isDarkMode 
            ? 'from-blue-500/5 via-purple-500/5 to-pink-500/5'
            : 'from-blue-500/3 via-purple-500/3 to-pink-500/3'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 max-w-7xl mx-auto">
          <div className="group">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Brain className="h-6 w-6" />
              </div>
              <span className="ml-3 text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Panèdit
              </span>
            </div>
            <p className={`leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Transforming businesses with intelligent AI automation solutions that scale operations and accelerate growth.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Instagram, href: "#" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg ${
                    isDarkMode 
                      ? 'bg-gray-800/90 border-gray-700 text-gray-400' 
                      : 'bg-white/90 border-gray-300 text-gray-600'
                  }`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`text-lg font-bold tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Services</h4>
            <ul className="space-y-4">
              {[
                "AI Chat Agents",
                "Lead Generation",
                "CRM Integration",
                "Project Management",
                "Hiring Systems",
                "Sales Administration"
              ].map((service, idx) => (
                <li key={idx}>
                  <a href="#" className={`hover:text-blue-400 transition-colors duration-300 flex items-center group ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`text-lg font-bold tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Company</h4>
            <ul className="space-y-4">
              {[
                "About Us",
                "Case Studies",
                "Blog",
                "Careers",
                "Contact",
                "Proposal"
              ].map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item === "Proposal" ? "#" : "#"} 
                    onClick={item === "Proposal" ? (e) => {
                      e.preventDefault();
                      // This will need to be handled by the parent component
                      window.location.hash = 'proposal';
                    } : undefined}
                    className={`hover:text-blue-400 transition-colors duration-300 flex items-center group ${
                      isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`text-lg font-bold tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact</h4>
            <ul className="space-y-4">
              <li className="text-gray-400 flex items-center">
                <a href="#" onclick="window.open('https://www.google.com/maps/place/Las+Vegas,+NV/')" className={`hover:text-blue-400 transition-colors duration-300 flex items-center group ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>                
                <MapPin className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                Las Vegas, NV - USA
                </a>                 
              </li>
              <li>
                <a href="mailto:ai@panedit.com" className={`hover:text-blue-400 transition-colors duration-300 flex items-center group ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  <Mail className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  ai@panedit.com
                </a>
              </li>
              <li>
                <a href="tel:+13157263348" className={`hover:text-blue-400 transition-colors duration-300 flex items-center group ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  <Phone className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  +1 (315) 726-3348
                </a>
              </li>
            </ul>
            
            {/* Profile Picture and Thank You Message */}
            <div className="mt-8 text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 shadow-lg ${
                isDarkMode ? 'border-blue-400' : 'border-purple-400'
              }`}>
                <img 
                  src="/Profile Picture.png" 
                  alt="Jasper Panè" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Thank You for your Time!
              </p>
            </div>
          </div>
        </div>

        <div className={`mt-24 pt-8 border-t text-center ${
          isDarkMode ? 'border-gray-800' : 'border-gray-300'
        }`}>
          {/* Theme Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50' 
                  : 'bg-white/50 border-gray-300 text-gray-700 hover:bg-gray-100/50'
              }`}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">Dark Mode</span>
                </>
              )}
            </button>
          </div>
          
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; 2025 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"><a href="https://panedit.com/"><u>Panèdit</u></a></span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;