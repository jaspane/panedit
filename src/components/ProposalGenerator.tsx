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
  Star,
  Edit3,
  Save,
  Plus,
  Lock,
  Eye,
  EyeOff
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
  price: number;
  duration: string;
  description: string;
  features: string[];
  deliverables: string[];
  icon: any;
  gradient: string;
  popular?: boolean;
  monthlyMaintenance?: {
    enabled: boolean;
    price: number;
    description: string;
  };
}

const ProposalGenerator: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [step, setStep] = useState<'form' | 'proposal'>('form');
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [isEditingTiers, setIsEditingTiers] = useState(false);
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

  const [serviceTiers, setServiceTiers] = useState<ServiceTier[]>([
    {
      id: 'foundations',
      name: 'AI Foundations',
      price: 3750, // 50% of AI Transformations (7500 * 0.5)
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
        {
          keyDeliverable: 'AI Chat Agent System',
          includedFeatures: ['24/7 customer support bot', 'Lead qualification workflows', 'Multi-platform integration']
        },
        {
          keyDeliverable: 'Lead Management System',
          includedFeatures: ['Automated lead scoring', 'Email nurture sequences', 'CRM data sync']
        },
        {
          keyDeliverable: 'Analytics & Reporting',
          includedFeatures: ['Performance dashboard', 'Conversion tracking', 'Monthly reports']
        },
        {
          keyDeliverable: 'Training & Documentation',
          includedFeatures: ['Staff training sessions', 'User manuals', 'Video tutorials']
        }
      ],
      icon: Bot,
      gradient: 'from-blue-500 to-blue-600',
      monthlyMaintenance: {
        enabled: false,
        price: 299,
        description: 'Ongoing system monitoring, updates, and basic support'
      }
    },
    {
      id: 'transformations',
      name: 'AI Transformations',
      price: 7500,
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
        {
          keyDeliverable: 'Advanced AI Agent Network',
          includedFeatures: ['Multi-channel deployment', 'Advanced NLP capabilities', 'Custom conversation flows']
        },
        {
          keyDeliverable: 'Automated Lead Generation',
          includedFeatures: ['Prospect identification', 'Outreach automation', 'Lead scoring algorithms']
        },
        {
          keyDeliverable: 'Proposal & Sales Automation',
          includedFeatures: ['Dynamic proposal generation', 'Sales pipeline automation', 'Follow-up sequences']
        },
        {
          keyDeliverable: 'Content Creation System',
          includedFeatures: ['Blog post automation', 'Social media content', 'Email templates']
        },
        {
          keyDeliverable: 'Advanced Analytics Platform',
          includedFeatures: ['Real-time dashboards', 'Performance optimization', 'ROI tracking']
        },
        {
          keyDeliverable: 'Comprehensive Training Program',
          includedFeatures: ['Team workshops', 'Documentation suite', 'Ongoing support']
        }
      ],
      icon: TrendingUp,
      gradient: 'from-purple-500 to-purple-600',
      popular: true,
      monthlyMaintenance: {
        enabled: false,
        price: 599,
        description: 'Advanced monitoring, optimization, and priority support'
      }
    },
    {
      id: 'enterprise',
      name: 'AI Enterprise',
      price: 30000, // 4X AI Transformations (7500 * 4)
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
        {
          keyDeliverable: 'Custom AI Ecosystem',
          includedFeatures: ['Tailored AI solutions', 'Enterprise architecture', 'Scalable infrastructure']
        },
        {
          keyDeliverable: 'Enterprise Integration Suite',
          includedFeatures: ['Multi-CRM connectivity', 'ERP integration', 'Legacy system bridges']
        },
        {
          keyDeliverable: 'Advanced Analytics & BI Platform',
          includedFeatures: ['Executive dashboards', 'Predictive analytics', 'Custom reporting']
        },
        {
          keyDeliverable: 'Multi-Department Automation',
          includedFeatures: ['Cross-functional workflows', 'Department-specific tools', 'Process optimization']
        },
        {
          keyDeliverable: 'Custom API Development',
          includedFeatures: ['Bespoke integrations', 'Third-party connectors', 'API documentation']
        },
        {
          keyDeliverable: 'Enterprise Security & Compliance',
          includedFeatures: ['Security audits', 'Compliance frameworks', 'Data protection protocols']
        },
        {
          keyDeliverable: 'Dedicated Support Team',
          includedFeatures: ['Account manager', 'Technical specialists', 'Priority support']
        },
        {
          keyDeliverable: 'Quarterly Business Reviews',
          includedFeatures: ['Performance analysis', 'Optimization recommendations', 'Strategic planning']
        }
      ],
      icon: Award,
      gradient: 'from-pink-500 to-pink-600',
      monthlyMaintenance: {
        enabled: false,
        price: 1299,
        description: 'White-glove service with dedicated account management'
      }
    }
  ]);

  const proposalRef = useRef<HTMLDivElement>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'panedit') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value
    });
  };

  const selectTier = (tierId: string) => {
    setSelectedTier(selectedTier === tierId ? '' : tierId);
  };

  const toggleMaintenance = (tierId: string) => {
    setServiceTiers(prev => prev.map(tier => 
      tier.id === tierId 
        ? {
            ...tier,
            monthlyMaintenance: {
              ...tier.monthlyMaintenance!,
              enabled: !tier.monthlyMaintenance!.enabled
            }
          }
        : tier
    ));
  };

  const updateTierField = (tierId: string, field: string, value: any) => {
    setServiceTiers(prev => prev.map(tier => 
      tier.id === tierId 
        ? { ...tier, [field]: value }
        : tier
    ));
  };

  const updateMaintenanceField = (tierId: string, field: string, value: any) => {
    setServiceTiers(prev => prev.map(tier => 
      tier.id === tierId 
        ? {
            ...tier,
            monthlyMaintenance: {
              ...tier.monthlyMaintenance!,
              [field]: value
            }
          }
        : tier
    ));
  };

  const calculateTierPrices = () => {
    setServiceTiers(prev => {
      const transformationsPrice = prev.find(t => t.id === 'transformations')?.price || 7500;
      
      return prev.map(tier => {
        if (tier.id === 'foundations') {
          return { ...tier, price: Math.round(transformationsPrice * 0.5) };
        } else if (tier.id === 'enterprise') {
          return { ...tier, price: transformationsPrice * 4 };
        }
        return tier;
      });
    });
  };

  const handleSaveChanges = () => {
    calculateTierPrices();
    setIsEditingTiers(false);
  };

  const generateProposal = () => {
    if (!selectedTier) {
      alert('Please select a service tier to generate a proposal.');
      return;
    }
    setStep('proposal');
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateTotal = () => {
    const selectedTierData = serviceTiers.find(t => t.id === selectedTier);
    if (!selectedTierData) return 0;
    
    let total = selectedTierData.price;
    if (selectedTierData.monthlyMaintenance?.enabled) {
      total += selectedTierData.monthlyMaintenance.price;
    }
    return total;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Password Protection Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-gray-700 shadow-2xl">
            {/* Exit Button */}
            <button
              onClick={() => {
               window.history.pushState({}, '', '/');
               window.location.reload();
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Lock Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </div>
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Proposal Generator
                </span>
              </h1>
              <p className="text-gray-300">
                This tool is password protected. Please enter the access code to continue.
              </p>
            </div>
            
            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Access Code
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setAuthError('');
                    }}
                    className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {authError && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {authError}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Access Proposal Generator
              </button>
            </form>
            
            {/* Exit to Homepage Button */}
            <button
              onClick={() => {
                window.location.hash = '';
                window.location.reload();
              }}
              className="w-full mt-4 border border-gray-600 py-3 rounded-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Return to Homepage
            </button>
            
            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-700 text-center">
              <p className="text-gray-400 text-sm">
                Authorized personnel only. Contact admin for access.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-400" />
                Select Service Tier
              </h2>
              <button
                onClick={() => isEditingTiers ? handleSaveChanges() : setIsEditingTiers(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isEditingTiers 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isEditingTiers ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    Edit Tiers
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {serviceTiers.map((tier) => {
                const isSelected = selectedTier === tier.id;
                const Icon = tier.icon;
                
                return (
                  <div
                    key={tier.id}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected 
                        ? `border-${tier.gradient.split('-')[1]}-500 bg-gradient-to-br ${tier.gradient}/10 shadow-lg` 
                        : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                    } ${!isEditingTiers ? 'cursor-pointer hover:scale-105' : ''}`}
                    onClick={!isEditingTiers ? () => selectTier(tier.id) : undefined}
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
                        <div className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center bg-gray-700/50">
                          <X className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className={`w-16 h-16 bg-gradient-to-r ${tier.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Editable Tier Name */}
                    {isEditingTiers ? (
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => updateTierField(tier.id, 'name', e.target.value)}
                        className="w-full text-xl font-bold mb-2 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                      />
                    ) : (
                      <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    )}
                    
                    {/* Editable Price */}
                    {isEditingTiers ? (
                      <div className="mb-2">
                        <input
                          type="number"
                          value={tier.price}
                          onChange={(e) => updateTierField(tier.id, 'price', parseInt(e.target.value) || 0)}
                          className="w-full text-3xl font-bold text-blue-400 bg-gray-700 border border-gray-600 rounded px-2 py-1"
                        />
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-blue-400 mb-2">{formatCurrency(tier.price)}</div>
                    )}
                    
                    {/* Editable Duration */}
                    {isEditingTiers ? (
                      <input
                        type="text"
                        value={tier.duration}
                        onChange={(e) => updateTierField(tier.id, 'duration', e.target.value)}
                        className="w-full text-sm text-gray-400 mb-4 bg-gray-700 border border-gray-600 rounded px-2 py-1"
                      />
                    ) : (
                      <div className="text-sm text-gray-400 mb-4">{tier.duration}</div>
                    )}
                    
                    {/* Editable Description */}
                    {isEditingTiers ? (
                      <textarea
                        value={tier.description}
                        onChange={(e) => updateTierField(tier.id, 'description', e.target.value)}
                        className="w-full text-gray-300 mb-4 text-sm bg-gray-700 border border-gray-600 rounded px-2 py-1 resize-none"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-300 mb-4 text-sm">{tier.description}</p>
                    )}
                    
                    <div className="space-y-2 mb-6">
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

                    {/* Monthly Maintenance Option */}
                    <div className="border-t border-gray-600 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-300">Monthly Maintenance</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMaintenance(tier.id);
                          }}
                          className={`w-12 h-6 rounded-full transition-all duration-300 ${
                            tier.monthlyMaintenance?.enabled 
                              ? 'bg-green-500' 
                              : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                            tier.monthlyMaintenance?.enabled 
                              ? 'translate-x-6' 
                              : 'translate-x-0.5'
                          }`}></div>
                        </button>
                      </div>
                      
                      {tier.monthlyMaintenance?.enabled && (
                        <div className="space-y-2">
                          {isEditingTiers ? (
                            <>
                              <input
                                type="number"
                                value={tier.monthlyMaintenance.price}
                                onChange={(e) => updateMaintenanceField(tier.id, 'price', parseInt(e.target.value) || 0)}
                                className="w-full text-lg font-bold text-green-400 bg-gray-700 border border-gray-600 rounded px-2 py-1"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <textarea
                                value={tier.monthlyMaintenance.description}
                                onChange={(e) => updateMaintenanceField(tier.id, 'description', e.target.value)}
                                className="w-full text-xs text-gray-400 bg-gray-700 border border-gray-600 rounded px-2 py-1 resize-none"
                                rows={2}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </>
                          ) : (
                            <>
                              <div className="text-lg font-bold text-green-400">
                                {formatCurrency(tier.monthlyMaintenance.price)}/month
                              </div>
                              <p className="text-xs text-gray-400">
                                {tier.monthlyMaintenance.description}
                              </p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedTier && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Selected Service</h3>
                    <p className="text-gray-300">
                      {serviceTiers.find(t => t.id === selectedTier)?.name}
                      {serviceTiers.find(t => t.id === selectedTier)?.monthlyMaintenance?.enabled && 
                        ' + Monthly Maintenance'
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">
                      {formatCurrency(calculateTotal())}
                    </div>
                    <div className="text-sm text-gray-400">
                      {serviceTiers.find(t => t.id === selectedTier)?.monthlyMaintenance?.enabled 
                        ? 'Setup + First Month' 
                        : 'Total Investment'
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={generateProposal}
              disabled={!clientData.companyName || !clientData.contactName || !clientData.email || !selectedTier}
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

  const selectedTierData = serviceTiers.find(t => t.id === selectedTier);

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

        {/* Selected Service */}
        {selectedTierData && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 text-purple-600" />
              Your Selected Solution
            </h3>
            
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${selectedTierData.gradient} rounded-xl flex items-center justify-center`}>
                    <selectedTierData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">{selectedTierData.name}</h4>
                    <div className="text-sm text-gray-500">{selectedTierData.duration}</div>
                  </div>
                </div>
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              
              <p className="text-gray-700 mb-6">{selectedTierData.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-gray-800 text-lg mb-4">Key Features:</h5>
                  <div className="space-y-3">
                    {selectedTierData.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-800 text-lg mb-4">Deliverables:</h5>
                  <div className="space-y-3">
                    {selectedTierData.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center gap-3 mb-2">
                          <Award className="w-5 h-5 text-blue-500" />
                          <span className="font-semibold text-gray-800">{deliverable.keyDeliverable}</span>
                        </div>
                        <div className="ml-8 space-y-1">
                          {deliverable.includedFeatures.map((feature, featureIdx) => (
                            <div key={featureIdx} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly Maintenance Display */}
              {selectedTierData.monthlyMaintenance?.enabled && (
                <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h5 className="font-semibold text-green-800 text-lg">Monthly Maintenance Included</h5>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-green-700 text-sm">
                      {selectedTierData.monthlyMaintenance.description}
                    </p>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(selectedTierData.monthlyMaintenance.price)}/month
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Non-Selected Services */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <X className="w-6 h-6 text-red-600" />
            Alternative Solutions (Not Selected)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceTiers
              .filter(tier => tier.id !== selectedTier)
              .map((tier) => (
                <div key={tier.id} className="relative bg-gray-50 p-6 rounded-xl border border-gray-200 opacity-60">
                  {/* Large X Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <X className="w-32 h-32 text-red-500 opacity-30" strokeWidth={3} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${tier.gradient} rounded-xl flex items-center justify-center opacity-50`}>
                        <tier.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-600 line-through">{tier.name}</h4>
                        <div className="text-2xl font-bold text-gray-500 line-through">{formatCurrency(tier.price)}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-4 line-through">{tier.description}</p>
                    
                    <div className="space-y-2">
                      {tier.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <X className="w-4 h-4 text-red-400" />
                          <span className="line-through">{feature}</span>
                        </div>
                      ))}
                      {tier.features.length > 3 && (
                        <div className="text-sm text-gray-400 line-through">
                          +{tier.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
              {selectedTierData && (
                <>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <span className="font-semibold text-gray-800">{selectedTierData.name}</span>
                      <span className="text-gray-600 ml-2">({selectedTierData.duration})</span>
                    </div>
                    <span className="font-bold text-blue-600">{formatCurrency(selectedTierData.price)}</span>
                  </div>
                  
                  {selectedTierData.monthlyMaintenance?.enabled && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <div>
                        <span className="font-semibold text-gray-800">Monthly Maintenance</span>
                        <span className="text-gray-600 ml-2">(First Month)</span>
                      </div>
                      <span className="font-bold text-green-600">
                        {formatCurrency(selectedTierData.monthlyMaintenance.price)}
                      </span>
                    </div>
                  )}
                </>
              )}
              
              <div className="flex justify-between items-center pt-4 border-t-2 border-blue-200">
                <span className="text-xl font-bold text-gray-800">Total Investment</span>
                <span className="text-3xl font-bold text-blue-600">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
              
              {selectedTierData?.monthlyMaintenance?.enabled && (
                <div className="text-sm text-gray-600 text-center pt-2">
                  Ongoing maintenance: {formatCurrency(selectedTierData.monthlyMaintenance.price)}/month after first month
                </div>
              )}
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
                <p className="text-gray-600">Requirements analysis, system audit, and implementation roadmap</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold text-gray-800">Development & Integration (Weeks 2-6)</h4>
                <p className="text-gray-600">AI system development, testing, and integration with existing tools</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold text-gray-800">Training & Launch (Weeks 7-8)</h4>
                <p className="text-gray-600">Team training, system optimization, and full deployment</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h4 className="font-semibold text-gray-800">Ongoing Support</h4>
                <p className="text-gray-600">Continuous monitoring, optimization, and dedicated support</p>
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