import React, { useState, useRef } from 'react';
import { 
  CheckCircle, 
  X, 
  Download, 
  ArrowLeft, 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  Calendar,
  DollarSign,
  Users,
  Zap,
  Target,
  Award,
  TrendingUp,
  Bot,
  Shield,
  Clock,
  Star
} from 'lucide-react';

interface ClientData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  employees: string;
  currentChallenges: string;
  goals: string;
  timeline: string;
  budget: string;
}

interface ServiceTier {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  deliverables: string[];
  icon: any;
  gradient: string;
  popular?: boolean;
}

const ProposalGenerator: React.FC = () => {
  const [step, setStep] = useState<'form' | 'proposal'>('form');
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [clientData, setClientData] = useState<ClientData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    employees: '',
    currentChallenges: '',
    goals: '',
    timeline: '',
    budget: ''
  });

  const proposalRef = useRef<HTMLDivElement>(null);

  const serviceTiers: ServiceTier[] = [
    {
      id: 'foundations',
      name: 'AI Foundations',
      price: '$2,500',
      duration: '2-4 weeks',
      description: 'Perfect for businesses starting their AI journey with essential automation tools.',
      features: [
        'AI Chat Agent Setup',
        'Basic Lead Qualification',
        'Email Automation',
        'CRM Integration (1 platform)',
        'Performance Analytics',
        '30-day support'
      ],
      deliverables: [
        'Configured AI chat agent',
        'Lead qualification system',
        'Email automation workflows',
        'CRM integration',
        'Analytics dashboard',
        'Training documentation'
      ],
      icon: Bot,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'transformations',
      name: 'AI Transformations',
      price: '$7,500',
      duration: '4-8 weeks',
      description: 'Comprehensive AI automation suite for growing businesses ready to scale operations.',
      features: [
        'Advanced AI Chat Agents',
        'Multi-channel Lead Generation',
        'Automated Proposal Creation',
        'Advanced CRM Workflows',
        'Sales Pipeline Automation',
        'Content Generation System',
        'Performance Optimization',
        '90-day support'
      ],
      deliverables: [
        'Multi-platform AI agents',
        'Lead generation system',
        'Proposal automation',
        'Advanced CRM workflows',
        'Sales pipeline automation',
        'Content creation tools',
        'Optimization reports',
        'Staff training program'
      ],
      icon: TrendingUp,
      gradient: 'from-purple-500 to-purple-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'AI Enterprise',
      price: '$15,000',
      duration: '8-12 weeks',
      description: 'Enterprise-grade AI ecosystem with custom solutions and dedicated support.',
      features: [
        'Custom AI Solutions',
        'Enterprise CRM Integration',
        'Advanced Analytics & BI',
        'Multi-department Automation',
        'Custom API Development',
        'Security & Compliance',
        'Dedicated Account Manager',
        '1-year premium support'
      ],
      deliverables: [
        'Custom AI ecosystem',
        'Enterprise integrations',
        'Advanced analytics platform',
        'Multi-department workflows',
        'Custom APIs',
        'Security implementation',
        'Dedicated support team',
        'Quarterly optimization reviews'
      ],
      icon: Award,
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value
    });
  };

  const toggleTier = (tierId: string) => {
    setSelectedTiers(prev => 
      prev.includes(tierId) 
        ? prev.filter(id => id !== tierId)
        : [...prev, tierId]
    );
  };

  const generateProposal = () => {
    if (selectedTiers.length === 0) {
      alert('Please select at least one service tier to generate a proposal.');
      return;
    }
    setStep('proposal');
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateTotal = () => {
    return selectedTiers.reduce((total, tierId) => {
      const tier = serviceTiers.find(t => t.id === tierId);
      if (tier) {
        const price = parseInt(tier.price.replace(/[$,]/g, ''));
        return total + price;
      }
      return total;
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Automation <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Proposal Generator</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create professional, customized proposals for AI automation consultancy services in minutes.
            </p>
          </div>

          {/* Client Information Form */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Building className="w-6 h-6 text-blue-400" />
              Client Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={clientData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={clientData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={clientData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={clientData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={clientData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                <select
                  name="industry"
                  value={clientData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Size</label>
                <select
                  name="employees"
                  value={clientData.employees}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={clientData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                >
                  <option value="">Select Timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Challenges</label>
                <textarea
                  name="currentChallenges"
                  value={clientData.currentChallenges}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white resize-none"
                  placeholder="Describe the main challenges your business is facing..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Business Goals</label>
                <textarea
                  name="goals"
                  value={clientData.goals}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white resize-none"
                  placeholder="What are your primary business objectives for AI automation?"
                />
              </div>
            </div>
          </div>

          {/* Service Tier Selection */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-400" />
              Select Service Tiers
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {serviceTiers.map((tier) => {
                const isSelected = selectedTiers.includes(tier.id);
                const Icon = tier.icon;
                
                return (
                  <div
                    key={tier.id}
                    onClick={() => toggleTier(tier.id)}
                    className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      isSelected 
                        ? `border-${tier.gradient.split('-')[1]}-500 bg-gradient-to-br ${tier.gradient}/10` 
                        : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    {/* Selection Indicator */}
                    <div className="absolute top-4 right-4">
                      {isSelected ? (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      ) : (
                        <div className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center">
                          <X className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                    </div>

                    <div className={`w-16 h-16 bg-gradient-to-r ${tier.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-blue-400 mb-2">{tier.price}</div>
                    <div className="text-sm text-gray-400 mb-4">{tier.duration}</div>
                    <p className="text-gray-300 mb-4 text-sm">{tier.description}</p>
                    
                    <div className="space-y-2">
                      {tier.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {feature}
                        </div>
                      ))}
                      {tier.features.length > 4 && (
                        <div className="text-sm text-gray-500">
                          +{tier.features.length - 4} more features
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedTiers.length > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Selected Services</h3>
                    <p className="text-gray-300">
                      {selectedTiers.length} tier{selectedTiers.length > 1 ? 's' : ''} selected
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">
                      {formatCurrency(calculateTotal())}
                    </div>
                    <div className="text-sm text-gray-400">Total Investment</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={generateProposal}
              disabled={!clientData.companyName || !clientData.contactName || !clientData.email || selectedTiers.length === 0}
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 mx-auto"
            >
              <Target className="w-6 h-6" />
              Generate Professional Proposal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Print Controls */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg shadow-lg print:hidden">
        <button
          onClick={() => setStep('form')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Form
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:shadow-lg transition-all"
        >
          <Download className="w-4 h-4" />
          Download/Print Proposal
        </button>
      </div>

      {/* Proposal Document */}
      <div ref={proposalRef} className="max-w-5xl mx-auto p-8 pt-24 print:pt-8">
        {/* Header */}
        <div className="text-center mb-12 border-b border-gray-200 pb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Panèdit
              </h1>
              <p className="text-gray-600">AI Automation Consultancy</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            AI Automation Proposal
          </h2>
          <p className="text-xl text-gray-600">
            Prepared for {clientData.companyName}
          </p>
          <p className="text-gray-500 mt-2">
            {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Client Overview */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Building className="w-6 h-6 text-blue-600" />
            Client Overview
          </h3>
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Company Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{clientData.companyName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{clientData.contactName}</span>
                  </div>
                  {clientData.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{clientData.email}</span>
                    </div>
                  )}
                  {clientData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{clientData.phone}</span>
                    </div>
                  )}
                  {clientData.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span>{clientData.website}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Project Details</h4>
                <div className="space-y-2 text-sm">
                  {clientData.industry && (
                    <div><span className="font-medium">Industry:</span> {clientData.industry}</div>
                  )}
                  {clientData.employees && (
                    <div><span className="font-medium">Company Size:</span> {clientData.employees}</div>
                  )}
                  {clientData.timeline && (
                    <div><span className="font-medium">Timeline:</span> {clientData.timeline}</div>
                  )}
                </div>
              </div>
            </div>
            
            {clientData.currentChallenges && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">Current Challenges</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{clientData.currentChallenges}</p>
              </div>
            )}
            
            {clientData.goals && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Business Goals</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{clientData.goals}</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Services */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Star className="w-6 h-6 text-purple-600" />
            Recommended Solutions
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {serviceTiers
              .filter(tier => selectedTiers.includes(tier.id))
              .map((tier) => {
                const Icon = tier.icon;
                return (
                  <div key={tier.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${tier.gradient} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{tier.name}</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{tier.price}</div>
                    <div className="text-sm text-gray-500 mb-4">{tier.duration}</div>
                    <p className="text-gray-700 mb-4 text-sm">{tier.description}</p>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-800 text-sm">Key Features:</h5>
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <h5 className="font-semibold text-gray-800 text-sm">Deliverables:</h5>
                      {tier.deliverables.map((deliverable, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <Award className="w-3 h-3 text-blue-500" />
                          {deliverable}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Investment Summary */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-green-600" />
            Investment Summary
          </h3>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
            <div className="space-y-4">
              {serviceTiers
                .filter(tier => selectedTiers.includes(tier.id))
                .map((tier) => (
                  <div key={tier.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <div>
                      <span className="font-semibold text-gray-800">{tier.name}</span>
                      <span className="text-gray-600 ml-2">({tier.duration})</span>
                    </div>
                    <span className="font-bold text-blue-600">{tier.price}</span>
                  </div>
                ))}
              
              <div className="flex justify-between items-center pt-4 border-t-2 border-blue-200">
                <span className="text-xl font-bold text-gray-800">Total Investment</span>
                <span className="text-3xl font-bold text-blue-600">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">30-Day Money Back Guarantee</span>
              </div>
              <p className="text-green-700 text-sm">
                We're confident in our AI solutions. If you're not completely satisfied within the first 30 days, 
                we'll provide a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Timeline */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-orange-600" />
            Implementation Timeline
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold text-gray-800">Discovery & Planning (Week 1)</h4>
                <p className="text-gray-600 text-sm">Requirements analysis, system audit, and implementation roadmap</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold text-gray-800">Development & Integration (Weeks 2-6)</h4>
                <p className="text-gray-600 text-sm">AI system development, testing, and integration with existing tools</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold text-gray-800">Training & Launch (Weeks 7-8)</h4>
                <p className="text-gray-600 text-sm">Team training, system optimization, and full deployment</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h4 className="font-semibold text-gray-800">Ongoing Support</h4>
                <p className="text-gray-600 text-sm">Continuous monitoring, optimization, and dedicated support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-gray-800 to-black text-white p-8 rounded-2xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-gray-300">Contact us to discuss your AI automation journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Mail className="w-6 h-6 text-blue-400" />
              <span className="font-semibold">Email</span>
              <span className="text-gray-300">ai@panedit.com</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Phone className="w-6 h-6 text-purple-400" />
              <span className="font-semibold">Phone</span>
              <span className="text-gray-300">+1 (315) 726-3348</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Globe className="w-6 h-6 text-pink-400" />
              <span className="font-semibold">Website</span>
              <span className="text-gray-300">panedit.com</span>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              This proposal is valid for 30 days from the date above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalGenerator;