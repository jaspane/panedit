import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Target, 
  Users, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Quote,
  Play,
  ExternalLink,
  X,
  Menu,
  Mail,
  Phone,
  MapPin,
  Building,
  DollarSign,
  Clock,
  Award,
  Bot,
  MessageSquare,
  BarChart3,
  Workflow,
  Database,
  Globe,
  Lightbulb,
  Rocket,
  Sun,
  Moon
} from 'lucide-react';
import { Vortex } from './components/ui/vortex';
import { SplashCursor } from './components/ui/splash-cursor';
import Footer from './components/ui/demo';
import ProposalGenerator from './components/ProposalGenerator';
import { supabase, submitContactForm, type ContactSubmission } from './lib/supabase';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    monthlyRevenue: '',
    message: ''
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Check for proposal hash on mount
  useEffect(() => {
    if (window.location.hash === '#proposal') {
      setShowProposal(true);
    }
  }, []);

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#proposal') {
        setShowProposal(true);
      } else {
        setShowProposal(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submissionData: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'> = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        website: formData.website || null,
        monthly_revenue: formData.monthlyRevenue || null,
        message: formData.message || null
      };

      await submitContactForm(submissionData);
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        monthlyRevenue: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showProposal) {
    return <ProposalGenerator />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900'
    }`}>
      <SplashCursor />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-black/80 backdrop-blur-md border-gray-800' 
          : 'bg-white/80 backdrop-blur-md border-gray-200'
      } border-b`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                <Brain className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Panèdit
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className={`hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Services</a>
              <a href="#about" className={`hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>About</a>
              <a href="#testimonials" className={`hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Testimonials</a>
              <a href="#contact" className={`hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Contact</a>
              <button
                onClick={() => {
                  window.location.hash = 'proposal';
                  setShowProposal(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Proposal
              </button>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t ${isDarkMode ? 'border-gray-800 bg-black/90' : 'border-gray-200 bg-white/90'} backdrop-blur-md`}
            >
              <div className="px-4 py-4 space-y-4">
                <a href="#services" className={`block hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Services</a>
                <a href="#about" className={`block hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>About</a>
                <a href="#testimonials" className={`block hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Testimonials</a>
                <a href="#contact" className={`block hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Contact</a>
                <button
                  onClick={() => {
                    window.location.hash = 'proposal';
                    setShowProposal(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Get Proposal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <Vortex
          backgroundColor={isDarkMode ? "#000000" : "#ffffff"}
          rangeY={800}
          particleCount={500}
          baseHue={220}
          className="w-full h-full"
        >
          <div className="relative z-10 text-center px-4 md:px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Transform Your Business with{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI Automation
                </span>
              </h1>
              <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Scale faster, work smarter with our cutting-edge AI solutions for chat agents, 
                lead generation, CRM integrations, and more.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <a
                href="#contact"
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Get Started Today
                <ArrowRight className="h-5 w-5" />
              </a>
              <button
                onClick={() => {
                  window.location.hash = 'proposal';
                  setShowProposal(true);
                }}
                className={`px-8 py-4 rounded-full text-lg font-semibold border-2 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  isDarkMode 
                    ? 'border-gray-600 hover:border-blue-400 hover:text-blue-400' 
                    : 'border-gray-300 hover:border-purple-400 hover:text-purple-400'
                }`}
              >
                View Proposal Generator
                <Target className="h-5 w-5" />
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Deploy AI solutions in weeks, not months" },
                { icon: Shield, title: "Enterprise Ready", desc: "Secure, scalable, and compliant solutions" },
                { icon: TrendingUp, title: "Proven Results", desc: "Average 300% ROI within 6 months" }
              ].map((feature, idx) => (
                <div key={idx} className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 border-black/10 hover:bg-black/10'
                }`}>
                  <feature.icon className="h-8 w-8 text-blue-400 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </Vortex>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-24 px-4 md:px-6 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 to-black' 
          : 'bg-gradient-to-br from-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Solutions</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive AI automation services designed to transform your business operations and accelerate growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: "AI Chat Agents",
                description: "Intelligent conversational AI that handles customer inquiries, qualifies leads, and provides 24/7 support with human-like interactions.",
                features: ["24/7 Customer Support", "Lead Qualification", "Multi-language Support", "CRM Integration"],
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Target,
                title: "Lead Generation",
                description: "Automated lead generation systems that identify, qualify, and nurture prospects across multiple channels to fill your sales pipeline.",
                features: ["Multi-channel Outreach", "Lead Scoring", "Automated Follow-ups", "Analytics Dashboard"],
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Database,
                title: "CRM Integration",
                description: "Seamless integration with your existing CRM systems to automate data entry, lead tracking, and customer relationship management.",
                features: ["Data Synchronization", "Automated Workflows", "Custom Fields", "Real-time Updates"],
                gradient: "from-green-500 to-teal-500"
              },
              {
                icon: Workflow,
                title: "Project Management",
                description: "AI-powered project management tools that optimize resource allocation, predict bottlenecks, and ensure on-time delivery.",
                features: ["Resource Optimization", "Timeline Prediction", "Risk Assessment", "Team Collaboration"],
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Users,
                title: "Hiring Systems",
                description: "Intelligent recruitment automation that screens candidates, schedules interviews, and identifies the best talent for your team.",
                features: ["Resume Screening", "Interview Scheduling", "Candidate Scoring", "Onboarding Automation"],
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: BarChart3,
                title: "Sales Administration",
                description: "Comprehensive sales automation including proposal generation, contract management, and performance analytics.",
                features: ["Proposal Automation", "Contract Management", "Sales Analytics", "Performance Tracking"],
                gradient: "from-pink-500 to-rose-500"
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`group p-8 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={`py-24 px-4 md:px-6 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI in Action</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Watch how our AI automation solutions transform businesses and deliver real results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Demo Video */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50' 
                  : 'bg-white border-gray-200 hover:border-blue-500/50'
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI Automation Demo</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    See how our AI chat agents handle customer inquiries
                  </p>
                </div>
              </div>
              <div className="p-6">
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo Video
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Success Story Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 hover:border-green-500/50' 
                  : 'bg-white border-gray-200 hover:border-green-500/50'
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Client Success Story</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    How we helped a client achieve 300% ROI in 6 months
                  </p>
                </div>
              </div>
              <div className="p-6">
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-blue-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  Watch Success Story
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 px-4 md:px-6 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 to-black' 
          : 'bg-gradient-to-br from-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Panèdit</span>?
              </h2>
              <p className={`text-xl mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We're not just another AI consultancy. We're your strategic partner in digital transformation, 
                combining cutting-edge technology with deep business expertise to deliver measurable results.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Lightbulb,
                    title: "Innovation First",
                    description: "We stay ahead of the curve, implementing the latest AI technologies and methodologies."
                  },
                  {
                    icon: Users,
                    title: "Expert Team",
                    description: "Our team of AI specialists, data scientists, and business strategists ensure success."
                  },
                  {
                    icon: Rocket,
                    title: "Rapid Deployment",
                    description: "Get your AI solutions up and running in weeks, not months, with our proven methodology."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`p-8 rounded-2xl border ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white border-gray-200'
              } shadow-2xl`}>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "500+", label: "Projects Completed" },
                    { number: "300%", label: "Average ROI" },
                    { number: "24/7", label: "Support Available" },
                    { number: "99.9%", label: "Uptime Guarantee" }
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-24 px-4 md:px-6 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Don't just take our word for it. Here's what our clients have to say about their AI transformation journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart Inc.",
                content: "Panèdit transformed our customer service with their AI chat agents. We've seen a 400% increase in lead qualification and our team can now focus on closing deals instead of answering basic questions.",
                rating: 5,
                avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              },
              {
                name: "Michael Chen",
                role: "Operations Director, GrowthCorp",
                content: "The CRM integration was seamless and the automation has saved us 20+ hours per week. Our sales team's productivity has increased by 250% since implementing their solutions.",
                rating: 5,
                avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Manager, InnovateLab",
                content: "Their lead generation system is incredible. We went from 50 qualified leads per month to over 300. The ROI has been phenomenal and the quality of leads is outstanding.",
                rating: 5,
                avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              },
              {
                name: "David Park",
                role: "Founder, ScaleUp Solutions",
                content: "The project management AI has revolutionized how we handle client projects. We're delivering faster, with better quality, and our client satisfaction scores have never been higher.",
                rating: 5,
                avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              },
              {
                name: "Lisa Thompson",
                role: "HR Director, TalentFirst",
                content: "Their hiring system automation has cut our recruitment time in half while improving candidate quality. We're now able to scale our team efficiently without compromising on talent.",
                rating: 5,
                avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              },
              {
                name: "James Wilson",
                role: "Sales Director, RevenueMax",
                content: "The sales administration automation has streamlined our entire process. Proposal generation that used to take hours now takes minutes, and our close rate has improved by 180%.",
                rating: 5,
                avatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-blue-400 mb-4" />
                <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 px-4 md:px-6 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 to-black' 
          : 'bg-gradient-to-br from-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Transform</span> Your Business?
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Let's discuss how our AI automation solutions can accelerate your growth and streamline your operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl border ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white border-gray-200'
              } shadow-2xl`}
            >
              <h3 className="text-2xl font-bold mb-6">Get Your Free Consultation</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Message sent successfully!</span>
                  </div>
                  <p className="text-sm text-green-300 mt-1">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-red-400">
                    <X className="w-5 h-5" />
                    <span className="font-semibold">Failed to send message</span>
                  </div>
                  <p className="text-sm text-red-300 mt-1">
                    Please try again or contact us directly.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="john@company.com"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Your Company"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Monthly Revenue
                    </label>
                    <select
                      name="monthlyRevenue"
                      value={formData.monthlyRevenue}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="">Select Range</option>
                      <option value="0-10k">$0 - $10k</option>
                      <option value="10k-50k">$10k - $50k</option>
                      <option value="50k-100k">$50k - $100k</option>
                      <option value="100k-500k">$100k - $500k</option>
                      <option value="500k+">$500k+</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tell us about your project
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Describe your current challenges and what you'd like to achieve with AI automation..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Ready to transform your business with AI? We're here to help you every step of the way.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <a href="mailto:ai@panedit.com" className={`hover:text-blue-400 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ai@panedit.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <a href="tel:+13157263348" className={`hover:text-purple-400 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      +1 (315) 726-3348
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Las Vegas, NV - USA
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-2xl border ${
                isDarkMode 
                  ? 'bg-gray-800/30 border-gray-700' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Response Time
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  We typically respond to all inquiries within 24 hours. For urgent matters, 
                  please call us directly.
                </p>
              </div>
              
              <div className={`p-6 rounded-2xl border ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20' 
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
              }`}>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-400" />
                  Free Consultation
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Schedule a free 30-minute consultation to discuss your AI automation needs 
                  and get a custom solution roadmap.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
};

export default App;