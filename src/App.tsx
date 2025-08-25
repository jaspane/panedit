import React, { useState, useEffect } from 'react';
import { SplashCursor } from '@/components/ui/splash-cursor';
import { Vortex } from '@/components/ui/vortex';
import { 
  Bot, 
  TrendingUp, 
  Users, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Phone,
  Mail,
  Calendar,
  X,
  Star,
  Award,
  Target
} from 'lucide-react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+1 ',
    company: '',
    message: ''
  });

  useEffect(() => {
    // Add smooth scrolling animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
    setFormData({ firstName: '', lastName: '', email: '', phone: '+1 ', company: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle phone number formatting
    if (name === 'phone') {
      // Ensure it always starts with +1
      let formattedValue = value;
      if (!formattedValue.startsWith('+1')) {
        formattedValue = '+1 ' + formattedValue.replace(/^\+?1?\s*/, '');
      }
      // Remove any non-digit characters except + and spaces
      formattedValue = formattedValue.replace(/[^\d+\s]/g, '');
      
      setFormData({
        ...formData,
        [name]: formattedValue
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <SplashCursor />
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 bg-black/20 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Panèdit
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Book a Call
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-160 sm:pt-200">
        <div className="max-w-6xl mx-auto text-center w-full">
          <div className="animate-on-scroll">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Automate Your Business with
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block mt-1 sm:mt-2">
                AI-Powered Solutions
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Transform your business operations with intelligent AI chat agents, automated lead generation, 
              and seamless CRM integrations. Scale faster, work smarter.
            </p>
            
            {/* YouTube Video 1 */}
            <div className="mb-8 sm:mb-12 w-full max-w-5xl mx-auto px-4">
              <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/4PZYb86j4wg"
                  title="Panèdit AI Automation Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Calendar className="w-5 h-5" />
                Book Your Free Consultation
              </button>
              <a
                href="#features"
                className="border border-gray-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 animate-on-scroll px-4">
            <div className="text-center p-4">
              <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">77%</div>
              <div className="text-sm sm:text-base text-gray-400">AI Global Adoption</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">85%</div>
              <div className="text-sm sm:text-base text-gray-400">Average Cost Reduction</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl sm:text-4xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-sm sm:text-base text-gray-400">AI-Powered Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Solutions</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Comprehensive automation solutions designed to streamline your operations and accelerate growth. Improve ALL your business processes with AI: Social Media, Legal, Project Management, and More...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="animate-on-scroll bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 sm:p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-400">AI Chat Agents</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                Deploy intelligent conversational AI that handles customer inquiries, qualifies leads, and provides 24/7 support with human-like interactions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Natural Language Processing
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Multi-platform Integration
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Contextual Conversations
                </li>
              </ul>
            </div>

            <div className="animate-on-scroll bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 sm:p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-purple-400">Lead Generation</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                Automate your lead generation process with AI-powered prospecting, qualification, and nurturing systems that work around the clock.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Automated Prospecting
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Lead Scoring & Qualification
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Personalized Outreach
                </li>
              </ul>
            </div>

            <div className="animate-on-scroll bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 sm:p-8 rounded-2xl border border-gray-700 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-pink-400">CRM Integration</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                Seamlessly connect your existing CRM systems with our AI solutions for unified customer data management and automated workflows.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Salesforce, HubSpot, Pipedrive
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Data Synchronization
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Workflow Automation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Panèdit</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="animate-on-scroll">
              <img 
                src="https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="AI Technology" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="animate-on-scroll space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-blue-400">Lightning Fast Implementation</h3>
                  <p className="text-sm sm:text-base text-gray-300">Get your AI systems up and running in days, not months. Our proven methodology ensures rapid deployment with minimal disruption.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-purple-400">Precision Targeting</h3>
                  <p className="text-sm sm:text-base text-gray-300">Our AI algorithms learn from your data to deliver highly targeted results, improving conversion rates by up to 300%.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-pink-400">Enterprise-Grade Security</h3>
                  <p className="text-sm sm:text-base text-gray-300">Bank-level encryption and compliance with GDPR, CCPA, and SOC 2 standards ensure your data is always protected.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vortex Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="w-full">
          <div className="w-full h-[40rem] overflow-hidden">
            <Vortex
              backgroundColor="black"
              rangeY={800}
              particleCount={500}
              baseHue={220}
              className="flex items-center flex-col justify-center px-4 md:px-10 py-8 w-full h-full"
            >
              <div className="text-center animate-on-scroll">
                <h2 className="text-white text-3xl md:text-6xl font-bold text-center mb-6">
                  Experience the Future of
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block mt-2">
                    AI Automation
                  </span>
                </h2>
                <p className="text-white text-lg md:text-2xl max-w-3xl mt-6 text-center mb-8 opacity-90">
                  Watch as intelligent particles dance around your content, just like our AI solutions seamlessly integrate into your business processes.
                </p>
                
                {/* Stats in Vortex */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                    <div className="text-white/80">Businesses Automated</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
                    <div className="text-white/80">Client Satisfaction</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="text-3xl font-bold text-pink-400 mb-2">$2M+</div>
                    <div className="text-white/80">Cost Savings Generated</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition duration-300 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Start Your AI Journey
                  </button>
                  <button className="px-8 py-4 text-white border border-white/30 rounded-full hover:bg-white/10 transition duration-300">
                    Watch Demo
                  </button>
                </div>
              </div>
            </Vortex>
          </div>
        </div>
      </section>

                  {/* YouTube Video 2 */}
            <div className="mb-8 sm:mb-12 w-full max-w-5xl mx-auto px-4">
              <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/4PZYb86j4wg"
                  title="Panèdit AI Automation Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll w-full">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 sm:p-12 rounded-3xl border border-gray-700">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
              Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Transform</span> Your Business?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
              Join hundreds of companies already using AI to scale their operations and accelerate growth.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
            >
              <Phone className="w-6 h-6" />
              Book Your Free Strategy Call
            </button>
            <p className="text-gray-400 mt-4 text-xs sm:text-sm px-2">No commitment required • 30-minute consultation • Custom AI roadmap included</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-800 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Panèdit
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Transforming businesses with intelligent AI automation solutions.
              </p>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">AI Chat Agents</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Lead Generation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">CRM Integration</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@panedit.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"><a href="https://panedit.com/">Panèdit</a></span>. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-gray-700 max-w-md w-full relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              Book Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Free Consultation</span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                 placeholder="+1 555 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your automation needs..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Schedule My Free Consultation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;