import React, { useState, useEffect, lazy } from 'react';
import { Suspense, memo } from 'react';
import { submitContactForm } from '@/lib/supabase';
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

// Lazy load heavy components
const SplashCursor = lazy(() => 
  import('@/components/ui/splash-cursor').then(module => ({ 
    default: module.SplashCursor 
  }))
);
import { Vortex } from '@/components/ui/vortex';
const Footer = lazy(() => 
  import('@/components/ui/demo').then(module => ({ 
    default: module.default 
  }))
);

// Loading fallback component
const ComponentLoader = memo(() => (
  <div className="flex items-center justify-center p-4">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
));
ComponentLoader.displayName = 'ComponentLoader';

// Memoized service card component
const ServiceCard = memo(({ icon: Icon, title, description, items, gradient, hoverColor }: {
  icon: any;
  title: string;
  description: string;
  items: string[];
  gradient: string;
  hoverColor: string;
}) => (
  <div className={`animate-on-scroll bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 sm:p-8 rounded-2xl border border-gray-700 hover:${hoverColor} transition-all duration-300 hover:shadow-xl hover:shadow-${hoverColor.split('-')[1]}-500/10 group`}>
    <div className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className={`text-xl sm:text-2xl font-bold mb-4 text-${hoverColor.split('-')[1]}-400`}>{title}</h3>
    <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
      {description}
    </p>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
          <CheckCircle className="w-4 h-4 text-green-400" />
          {item}
        </li>
      ))}
    </ul>
  </div>
));
ServiceCard.displayName = 'ServiceCard';

const App = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    firstName: '',
    email: '',
    phone: ''
  });
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
    
    const submitForm = async () => {
      try {
        console.log('Form submission started...');
        console.log('Environment check:', {
          supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'Present' : 'Missing',
          supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing',
          actualUrl: import.meta.env.VITE_SUPABASE_URL,
          actualKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Key exists' : 'No key'
        });
        
        // Prepare data for Supabase
        const submissionData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company || undefined,
          website: formData.website || undefined,
          monthly_revenue: formData.monthlyRevenue || undefined,
          message: formData.message || undefined,
        };

        console.log('Attempting to submit form with data:', submissionData);

        await submitContactForm(submissionData);
        
        console.log('Form submitted successfully!');
        
        // Store submitted data for success dialog
        setSubmittedData({
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone
        });
        
        // Success - close modal and reset form
        setIsModalOpen(false);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', website: '', monthlyRevenue: '', message: '' });
        
        // Show custom success dialog
        setShowSuccessDialog(true);
        
      } catch (error) {
        console.error('Form submission error:', error);
        console.error('Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          type: typeof error
        });
        
        // More specific error messages
        if (error instanceof Error) {
          if (error.message.includes('Supabase is not connected')) {
            alert('Please connect to Supabase first by clicking the "Connect to Supabase" button in the top right corner.');
          } else {
            alert(`Error: ${error.message}`);
          }
        } else {
          alert(`There was an error submitting your request. Error: ${JSON.stringify(error)}. Please check the console for details and try again.`);
        }
      }
    };

    submitForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Service data for rendering
  const services = [
    {
      icon: Bot,
      title: "AI Chat Agents",
      description: "Deploy intelligent conversational AI that handles customer inquiries, qualifies leads, and provides 24/7 support with human-like interactions.",
      items: ["Natural Language Processing", "Multi-platform Integration", "Contextual Conversations"],
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      hoverColor: "border-blue-500/50"
    },
    {
      icon: TrendingUp,
      title: "Lead Generation",
      description: "Automate your lead generation process with AI-powered prospecting, qualification, and nurturing systems that work around the clock.",
      items: ["Automated Prospecting", "Lead Scoring & Qualification", "Personalized Outreach"],
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
      hoverColor: "border-purple-500/50"
    },
    {
      icon: Users,
      title: "CRM Integration",
      description: "Seamlessly connect your existing CRM systems with our AI solutions for unified customer data management and automated workflows.",
      items: ["Salesforce, HubSpot, Pipedrive", "Data Synchronization", "Workflow Automation"],
      gradient: "bg-gradient-to-r from-pink-500 to-pink-600",
      hoverColor: "border-pink-500/50"
    },
    {
      icon: Target,
      title: "Project Management",
      description: "Streamline project workflows with AI-powered task automation, resource allocation, and intelligent progress tracking for maximum efficiency.",
      items: ["Automated Task Assignment", "Resource Optimization", "Progress Analytics"],
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
      hoverColor: "border-green-500/50"
    },
    {
      icon: Users,
      title: "Hiring Systems",
      description: "Transform your recruitment process with AI-driven candidate screening, automated interviews, and intelligent talent matching systems.",
      items: ["Resume Screening & Ranking", "Automated Interview Scheduling", "Skills Assessment & Matching"],
      gradient: "bg-gradient-to-r from-orange-500 to-orange-600",
      hoverColor: "border-orange-500/50"
    },
    {
      icon: TrendingUp,
      title: "Sales Administration",
      description: "Optimize your sales operations with AI-powered pipeline management, automated follow-ups, and intelligent sales forecasting tools.",
      items: ["Pipeline Automation", "Smart Follow-up Sequences", "Sales Forecasting & Analytics"],
      gradient: "bg-gradient-to-r from-cyan-500 to-cyan-600",
      hoverColor: "border-cyan-500/50"
    },
    {
      icon: Zap,
      title: "Proposal Automation",
      description: "Generate professional proposals automatically with AI-powered content creation, dynamic pricing, and customized templates for faster deal closure.",
      items: ["Dynamic Proposal Generation", "Smart Pricing Optimization", "Template Customization"],
      gradient: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      hoverColor: "border-indigo-500/50"
    },
    {
      icon: Bot,
      title: "Content Creation",
      description: "Scale your content marketing with AI-powered blog posts, social media content, and marketing materials that maintain your brand voice.",
      items: ["Blog Post Generation", "Social Media Automation", "Brand Voice Consistency"],
      gradient: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      hoverColor: "border-yellow-500/50"
    },
    {
      icon: Users,
      title: "Onboarding Automation",
      description: "Streamline client and employee onboarding with automated workflows, document collection, and personalized welcome sequences.",
      items: ["Automated Welcome Sequences", "Document Collection & Processing", "Progress Tracking & Reminders"],
      gradient: "bg-gradient-to-r from-teal-500 to-teal-600",
      hoverColor: "border-teal-500/50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Suspense fallback={null}>
        <SplashCursor />
      </Suspense>
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
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-1 sm:pt-1">
        <div className="max-w-6xl mx-auto text-center w-full">
          <div className="animate-on-scroll">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Automate Your Business with
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block mt-1 sm:mt-2">
                AI-Powered Solutions
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Transform business operations with intelligent AI chat agents, automated lead generation, 
               seamless CRM integrations and More... Scale faster, work smarter.
            </p>
            
            {/* YouTube Video 1 */}
            <div className="mb-8 sm:mb-12 w-full max-w-5xl mx-auto px-4">
              <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/gNZ1gSSluAw"
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
      <section id="services" className="py-4 sm:py-5 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Solutions</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Comprehensive automation solutions designed to streamline your operations and accelerate growth. Improve ALL your business processes with AI: Social Media, Legal, Project Management, and More...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
            {services.slice(6).map((service, index) => (
              <ServiceCard key={index + 6} {...service} />
            ))}
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
            
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-lg">
                <img 
                  src="/Profile Picture.png" 
                  alt="Jasper Panè" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  Jasper Panè
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">AI Business Consultant</p>
                <p className="text-gray-300 text-sm sm:text-base">Las Vegas, NV - USA</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="animate-on-scroll">
              <img 
                src="https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="AI Technology" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="animate-on-scroll space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-blue-400">Lightning Fast Implementation</h3>
                  <p className="text-sm sm:text-base text-gray-300">Get your AI systems up and running in days, not months. Our proven methodology ensures rapid deployment with minimal disruption. Most Implementation done within 72 Hours after onboarding!</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-purple-400">Precision Targeting</h3>
                  <p className="text-sm sm:text-base text-gray-300">Our AI algorithms learn from your data to deliver highly targeted results, improving conversion rates by up to 300%. Offline private AI implementation available.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-pink-400">Enterprise-Grade Security</h3>
                  <p className="text-sm sm:text-base text-gray-300">Bank-level encryption and compliance with GDPR, CCPA, and SOC 2 standards ensure your data is always protected. HIPPA Compliant available for Medical Sector.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vortex Section */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 relative z-10">
        <div className="w-full">
          <div className="w-full h-[50rem] sm:h-[55rem] overflow-hidden">
            <Vortex
              backgroundColor="black"
              rangeY={800}
              particleCount={300}
              baseHue={220}
              className="flex items-center flex-col justify-center px-4 sm:px-6 md:px-10 py-4 sm:py-8 w-full h-full"
            >
              <div className="text-center animate-on-scroll">
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-4 sm:mb-6 leading-tight">
                  Experience the Future of
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block mt-1 sm:mt-2">
                    AI Automation
                  </span>
                </h2>
                <p className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl max-w-3xl mt-4 sm:mt-6 text-center mb-6 sm:mb-8 opacity-90 px-2">
                  Watch as intelligent particles dance around your content, just like our AI solutions seamlessly integrate into your business processes.
                </p>
                
                {/* Stats in Vortex */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 mb-6 sm:mb-8 px-2">
                  <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/20">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1 sm:mb-2">500+</div>
                    <div className="text-white/80 text-sm sm:text-base">Processes Automated</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/20">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1 sm:mb-2">95%</div>
                    <div className="text-white/80 text-sm sm:text-base">Client Satisfaction</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/20">
                    <div className="text-2xl sm:text-3xl font-bold text-pink-400 mb-1 sm:mb-2">$2M+</div>
                    <div className="text-white/80 text-sm sm:text-base">Cost Savings Generated</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition duration-300 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
                  >
                    <Calendar className="w-5 h-5" />
                    Start Your AI Journey
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 sm:px-8 py-3 sm:py-4 text-white border border-white/30 rounded-full hover:bg-white/10 transition duration-300 text-sm sm:text-base w-full sm:w-auto">
                    Watch Demo
                  </button>
                </div>
              </div>
            </Vortex>
          </div>
        </div>
      </section>

                  {/* YouTube Video 2 */}
          <section id="about" className="py-4 sm:py-6 px-4 sm:px-6 relative z-10">
            <div className="mb-8 sm:mb-12 w-full max-w-5xl mx-auto px-4">
              <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/s4QXrW4BAIw"
                  title="Panèdit AI Automation Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </section>
      
      {/* CTA Section */}
      <section className="py-3 sm:py-4 px-4 sm:px-6 relative z-10">
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

      {/* New Footer Component */}
      <Suspense fallback={<ComponentLoader />}>
        <Footer />
      </Suspense>

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
              <div className="grid grid-cols-2 gap-4">
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
                  placeholder="Phone Number (e.g., +1 555 123 4567)"
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
                <input
                  type="url"
                  name="website"
                  placeholder="Business Website (e.g., https://example.com)"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <select
                  name="monthlyRevenue"
                  value={formData.monthlyRevenue}
                  onChange={handleSelectChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                >
                  <option value="" className="text-gray-400">Select Company Monthly Revenue (USD)</option>
                  <option value="5K - 50K">$5K - $50K</option>
                  <option value="50K - 100K">$50K - $100K</option>
                  <option value="100K - 500K">$100K - $500K</option>
                  <option value="500K - 5M">$500K - $5M</option>
                </select>
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your automation needs... For Instance: Help with Social Media Engagement, Facilitate On-Boarding, Assist Collections, Etc..."
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

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-3xl border border-gray-700 max-w-md w-full relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
            <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <button
                onClick={() => setShowSuccessDialog(false)}
                className="absolute -top-2 -right-2 text-gray-400 hover:text-white transition-colors p-2"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              
              {/* Success Message */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Success, {submittedData.firstName}!
                  </span>
                </h3>
                <p className="text-gray-300 text-lg mb-2">
                  Thank you for your consultation request!
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  We've received your information and will contact you within 24 hours to schedule your free AI strategy session.
                </p>
                
                {/* Contact Information Display */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4">
                  <p className="text-gray-300 text-sm mb-3 font-medium">We'll reach out to you via:</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-blue-400">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{submittedData.email}</span>
                    </div>
                    {submittedData.phone && (
                      <div className="flex items-center justify-center gap-2 text-purple-400">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{submittedData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowSuccessDialog(false)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Got it!
                </button>
                <button
                  onClick={() => {
                    setShowSuccessDialog(false);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 border border-gray-600 px-6 py-3 rounded-full font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Another
                </button>
              </div>
              
              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>We typically respond within 2-4 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
App.displayName = 'App';

export default App;