import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { submitNewsletterSignup } from '@/lib/supabase';

interface NewsletterSignupProps {
  isDarkMode: boolean;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!consentGiven) {
      setErrorMessage('Please agree to our privacy policy to continue');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      await submitNewsletterSignup({
        email: email.trim(),
        name: name.trim() || undefined,
        consent_given: consentGiven,
        source: 'faq_section',
        user_agent: navigator.userAgent,
      });

      setStatus('success');
      setEmail('');
      setName('');
      setConsentGiven(false);

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error: any) {
      console.error('Newsletter signup failed:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden ${
        isDarkMode ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="animate-on-scroll">
          <div className={`rounded-3xl p-8 sm:p-12 shadow-2xl border relative overflow-hidden ${
            isDarkMode
              ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>

            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, ${isDarkMode ? '#3b82f6' : '#dbeafe'} 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 mb-4 shadow-lg animate-pulse-slow">
                  <Mail className="w-8 h-8 text-white" aria-hidden="true" />
                </div>

                <h2
                  id="newsletter-heading"
                  className={`text-3xl sm:text-4xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Stay Ahead with{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-pink-400 to-pink-500 bg-clip-text text-transparent">
                    AI Insights
                  </span>
                </h2>

                <p className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Get exclusive AI automation strategies, case studies, and industry insights delivered to your inbox.
                  Join 5,000+ business leaders transforming their operations.
                </p>
              </div>

              {status === 'success' ? (
                <div
                  role="alert"
                  aria-live="polite"
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" aria-hidden="true" />
                  <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    You're In! 🎉
                  </h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Thank you for subscribing! Check your inbox for a welcome email with exclusive resources.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="newsletter-name"
                        className={`block text-sm font-semibold ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        Name <span className="text-gray-500 font-normal"></span>
                      </label>
                      <input
                        type="text"
                        id="newsletter-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                          isDarkMode
                            ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/50'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/50'
                        }`}
                        aria-describedby="name-description"
                      />
                      <p id="name-description" className="sr-only">
                        Optional: Enter your name to personalize your newsletter experience
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="newsletter-email"
                        className={`block text-sm font-semibold ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="newsletter-email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="you@company.com"
                        required
                        disabled={isSubmitting}
                        aria-invalid={emailError ? 'true' : 'false'}
                        aria-describedby={emailError ? 'email-error' : 'email-description'}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                          emailError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                            : isDarkMode
                              ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/50'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/50'
                        }`}
                      />
                      {emailError && (
                        <p id="email-error" role="alert" className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          {emailError}
                        </p>
                      )}
                      <p id="email-description" className="sr-only">
                        Required: Enter your email address to receive our newsletter
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="newsletter-consent"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      disabled={isSubmitting}
                      required
                      aria-describedby="consent-description"
                      className="mt-1 w-5 h-5 rounded border-2 border-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    />
                    <label
                      htmlFor="newsletter-consent"
                      className={`text-sm leading-relaxed cursor-pointer ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <span id="consent-description">
                        I agree to receive marketing emails and understand I can unsubscribe at any time.
                        View our{' '}
                        <a
                          href="/privacy-policy"
                          className="text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </label>
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-red-400">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !email || !!emailError}
                    className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex items-center justify-center gap-2 text-lg"
                    aria-label={isSubmitting ? 'Subscribing to newsletter' : 'Subscribe to newsletter'}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" aria-hidden="true" />
                        <span>Subscribe Now</span>
                      </>
                    )}
                  </button>

                  <p className={`text-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    No spam. Unsubscribe anytime with one click. We respect your privacy.
                  </p>
                </form>
              )}

              <div className={`mt-8 pt-8 border-t grid grid-cols-3 gap-8 text-center ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div>
                  <div className={`text-3xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent`}>
                    5,000+
                  </div>
                  <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Subscribers
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent`}>
                    Weekly
                  </div>
                  <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Insights
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent`}>
                    Free
                  </div>
                  <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Forever
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
