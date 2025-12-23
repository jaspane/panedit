import React from 'react';

interface ConsultationFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    monthlyRevenue: string;
    message: string;
    termsAccepted: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
  idPrefix?: string;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({
  formData,
  onInputChange,
  onSelectChange,
  onCheckboxChange,
  onSubmit,
  onNavigateToPrivacy,
  onNavigateToTerms,
  idPrefix = ''
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
        />
      </div>
      <div>
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={onInputChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
        />
      </div>
      <div>
        <input
          type="url"
          name="website"
          placeholder="Business Website (e.g., https://example.com)"
          value={formData.website}
          onChange={onInputChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
        />
      </div>
      <div>
        <select
          name="monthlyRevenue"
          value={formData.monthlyRevenue}
          onChange={onSelectChange}
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
          onChange={onInputChange}
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400 resize-none"
        ></textarea>
      </div>
      <div className="flex items-start gap-3 py-2">
        <input
          type="checkbox"
          id={`${idPrefix}termsAccepted`}
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={onCheckboxChange}
          required
          className="mt-1 w-5 h-5 rounded border-2 border-gray-600 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer bg-gray-800"
        />
        <label
          htmlFor={`${idPrefix}termsAccepted`}
          className="text-sm text-gray-300 leading-relaxed cursor-pointer"
        >
          I agree to the{' '}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToPrivacy();
            }}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Privacy Policy
          </button>{' '}
          and{' '}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToTerms();
            }}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Terms & Conditions
          </button>
          . By providing my phone number, I agree to receive text messages from Panedit.com.
        </label>
      </div>
      <button
        type="submit"
        disabled={!formData.termsAccepted}
        className="w-full bg-gradient-to-r from-blue-500 to-pink-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        Schedule My Free Consultation
      </button>
    </form>
  );
};

export default ConsultationForm;
