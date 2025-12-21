import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
  isDarkMode: boolean;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose, isDarkMode }) => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
            aria-label="Close privacy policy"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className={`prose prose-lg max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
          <p className="lead">
            This privacy policy sets out how Panèdit.com uses and protects your personal data. This
            privacy policy is provided in a layered format so you can click through to the specific
            areas set out below.
          </p>

          <div className="my-8 space-y-2">
            <p className="font-semibold">Table of Contents:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li><a href="#section-1" onClick={(e) => handleAnchorClick(e, 'section-1')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Important Information and Who We Are</a></li>
              <li><a href="#section-2" onClick={(e) => handleAnchorClick(e, 'section-2')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Types of Personal Data We Collect About You</a></li>
              <li><a href="#section-3" onClick={(e) => handleAnchorClick(e, 'section-3')} className="text-blue-400 hover:text-blue-300 cursor-pointer">How Is Your Personal Data Collected?</a></li>
              <li><a href="#section-4" onClick={(e) => handleAnchorClick(e, 'section-4')} className="text-blue-400 hover:text-blue-300 cursor-pointer">How We Use Your Personal Data</a></li>
              <li><a href="#section-5" onClick={(e) => handleAnchorClick(e, 'section-5')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Disclosures of Your Personal Data</a></li>
              <li><a href="#section-6" onClick={(e) => handleAnchorClick(e, 'section-6')} className="text-blue-400 hover:text-blue-300 cursor-pointer">International Transfers</a></li>
              <li><a href="#section-7" onClick={(e) => handleAnchorClick(e, 'section-7')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Data Security</a></li>
              <li><a href="#section-8" onClick={(e) => handleAnchorClick(e, 'section-8')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Data Retention</a></li>
              <li><a href="#section-9" onClick={(e) => handleAnchorClick(e, 'section-9')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Your Legal Rights</a></li>
              <li><a href="#section-10" onClick={(e) => handleAnchorClick(e, 'section-10')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Contact Details</a></li>
              <li><a href="#section-11" onClick={(e) => handleAnchorClick(e, 'section-11')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Complaints</a></li>
              <li><a href="#section-12" onClick={(e) => handleAnchorClick(e, 'section-12')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Changes to the Privacy Policy</a></li>
              <li><a href="#section-13" onClick={(e) => handleAnchorClick(e, 'section-13')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Third Party Links</a></li>
            </ol>
          </div>

          <section id="section-1" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">1. Important Information and Who We Are</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Privacy Policy</h3>
            <p>
              This privacy policy gives you information about how Panèdit.com collects and uses your
              personal data through your use of this website, including any data you may provide
              when you purchase a service from us.
            </p>
            <p>
              This website is not intended for children and we do not knowingly collect data relating to
              children.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Controller</h3>
            <p>
              Panèdit.com LLC is the controller and responsible for your personal data (referred to as
              "Panèdit.com", "we", "us" or "our" in this privacy policy).
            </p>
            <p>
              If you have any questions about this privacy policy, including any requests to exercise
              your legal rights (
              <a
                href="#section-9"
                onClick={(e) => handleAnchorClick(e, 'section-9')}
                className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
              >
                paragraph 9
              </a>
              ), please contact us using the information set out in
              the contact details section (
              <a
                href="#section-10"
                onClick={(e) => handleAnchorClick(e, 'section-10')}
                className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
              >
                paragraph 10
              </a>
              ).
            </p>
          </section>

          <section id="section-2" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">2. The Types of Personal Data We Collect About You</h2>
            <p>
              Personal data means any information about an individual from which that person can be
              identified. We may collect, use, store and transfer different kinds of personal data about
              you which we have grouped together as follows:
            </p>

            <dl className="mt-6 space-y-4">
              <div>
                <dt className="font-semibold">Identity Data</dt>
                <dd>Includes first name, last name, any previous names, username or similar identifier, marital status, title, date of birth and gender.</dd>
              </div>
              <div>
                <dt className="font-semibold">Contact Data</dt>
                <dd>Includes billing address, delivery address, email address and telephone numbers.</dd>
              </div>
              <div>
                <dt className="font-semibold">Financial Data</dt>
                <dd>Includes bank account and payment card details.</dd>
              </div>
              <div>
                <dt className="font-semibold">Transaction Data</dt>
                <dd>Includes details about payments to and from you and other details of services you have purchased from us.</dd>
              </div>
              <div>
                <dt className="font-semibold">Technical Data</dt>
                <dd>Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, device ID and other technology on the devices you use to access this website.</dd>
              </div>
              <div>
                <dt className="font-semibold">Profile Data</dt>
                <dd>Includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</dd>
              </div>
              <div>
                <dt className="font-semibold">Usage Data</dt>
                <dd>Includes information about how you interact with and use our website and services.</dd>
              </div>
              <div>
                <dt className="font-semibold">Marketing and Communications Data</dt>
                <dd>Includes your preferences in receiving marketing from us and our third parties and your communication preferences.</dd>
              </div>
            </dl>

            <p className="mt-6">
              We also collect, use and share <strong>aggregated data</strong> such as statistical or demographic data
              which is not personal data as it does not directly (or indirectly) reveal your identity.
            </p>
          </section>

          <section id="section-3" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">3. How Is Your Personal Data Collected?</h2>
            <p>We use different methods to collect data from and about you including through:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Your interactions with us</h3>
            <p>You may give us your personal data by filling in online forms or by corresponding with us by post, phone, email or otherwise. This includes personal data you provide when you:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Apply for our services</li>
              <li>Subscribe to our service or publications</li>
              <li>Request marketing to be sent to you</li>
              <li>Give us feedback or contact us</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Automated technologies or interactions</h3>
            <p>
              As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions and
              patterns. We collect this personal data by using cookies, server logs and other similar
              technologies.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Third parties or publicly available sources</h3>
            <p>We will receive personal data about you from various third parties and public sources:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Analytics providers such as Google and Meta based outside the UK</li>
              <li>Advertising networks such as ClickFunnels based outside the UK and Hyros based inside the UK</li>
              <li>Scheduling providers such as Calendly based outside the UK</li>
              <li>Providers of technical, payment and delivery services based both inside and outside the UK</li>
              <li>Publicly available sources such as Companies House and the Electoral Register based inside the UK</li>
            </ul>
          </section>

          <section id="section-4" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">4. How We Use Your Personal Data</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Legal Basis</h3>
            <p>The law requires us to have a legal basis for collecting and using your personal data. We rely on one or more of the following legal bases:</p>

            <dl className="mt-6 space-y-4">
              <div>
                <dt className="font-semibold">Performance of a contract with you</dt>
                <dd>Where we need to perform the contract we are about to enter into or have entered into with you.</dd>
              </div>
              <div>
                <dt className="font-semibold">Legitimate interests</dt>
                <dd>We may use your personal data where it is necessary to conduct our business and pursue our legitimate interests, for example to prevent fraud and enable us to give you the best and most secure customer experience.</dd>
              </div>
              <div>
                <dt className="font-semibold">Legal obligation</dt>
                <dd>We may use your personal data where it is necessary for compliance with a legal obligation that we are subject to.</dd>
              </div>
              <div>
                <dt className="font-semibold">Consent</dt>
                <dd>We rely on consent only where we have obtained your active agreement to use your personal data for a specified purpose, for example if you subscribe to an email newsletter.</dd>
              </div>
            </dl>

            <h3 className="text-xl font-semibold mt-8 mb-3">Direct Marketing</h3>
            <p>
              You will receive marketing communications from us if you have requested information
              from us or purchased services from us and you have not opted out of receiving the
              marketing.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Opting Out of Marketing</h3>
            <p>
              You can ask us to stop sending you marketing communications at any time by following
              the opt-out links within any marketing communication sent to you or by contacting us.
            </p>
          </section>

          <section id="section-5" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">5. Disclosures of Your Personal Data</h2>
            <p>We may share your personal data where necessary with the parties set out below:</p>

            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Hyros, Meta and Google – for advertisement tracking</li>
              <li>Slack – for internal communication with team members</li>
              <li>Zapier – used for automations to connect different software</li>
              <li>DocuSign – used for clients to sign our Terms and Conditions</li>
              <li>Payfunnels – used for processing payment details</li>
              <li>Stripe – used for storing payment details</li>
              <li>Active Campaign – for email marketing</li>
              <li>Skool.com – for hosting our services</li>
              <li>Sub-contractors who assist us in providing our services</li>
            </ul>

            <p className="mt-6">
              We require all third parties to respect the security of your personal data and to treat it in
              accordance with the law.
            </p>
          </section>

          <section id="section-6" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">6. International Transfers</h2>
            <p>
              We may transfer your personal data to service providers that carry out certain functions
              on our behalf. This may involve transferring personal data outside the UK to countries
              which have laws that do not provide the same level of data protection as the UK law.
            </p>
            <p className="mt-4">
              Whenever we transfer your personal data out of the UK to service providers, we ensure a
              similar degree of protection is afforded to it by ensuring appropriate safeguards are in place.
            </p>
          </section>

          <section id="section-7" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from
              being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In
              addition, we limit access to your personal data to those employees, agents, contractors
              and other third parties who have a business need to know.
            </p>
            <p className="mt-4">
              We have put in place procedures to deal with any suspected personal data breach and
              will notify you and any applicable regulator of a breach where we are legally required to
              do so.
            </p>
          </section>

          <section id="section-8" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">8. Data Retention</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">How long will you use my personal data for?</h3>
            <p>
              We will only retain your personal data for as long as reasonably necessary to fulfil the
              purposes we collected it for, including for the purposes of satisfying any legal, regulatory,
              tax, accounting or reporting requirements.
            </p>
            <p className="mt-4">
              By law we have to keep basic information about our clients (including Contact, Identity,
              Financial and Transaction Data) for six years after they cease being clients for tax
              purposes.
            </p>
          </section>

          <section id="section-9" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">9. Your Legal Rights</h2>
            <p>You have a number of rights under data protection laws in relation to your personal data. You have the right to:</p>

            <ul className="list-disc list-inside space-y-3 ml-4 mt-4">
              <li><strong>Request access</strong> to your personal data (commonly known as a "subject access request")</li>
              <li><strong>Request correction</strong> of the personal data that we hold about you</li>
              <li><strong>Request erasure</strong> of your personal data in certain circumstances</li>
              <li><strong>Object to processing</strong> of your personal data where we are relying on a legitimate interest</li>
              <li><strong>Request the transfer</strong> of your personal data to you or to a third party</li>
              <li><strong>Withdraw consent</strong> at any time where we are relying on consent to process your personal data</li>
              <li><strong>Request restriction</strong> of processing of your personal data</li>
            </ul>

            <p className="mt-6">
              If you wish to exercise any of the rights set out above, please contact us using the details in{' '}
              <a
                href="#section-10"
                onClick={(e) => handleAnchorClick(e, 'section-10')}
                className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
              >
                section 10
              </a>
              .
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">No Fee Usually Required</h3>
            <p>
              You will not have to pay a fee to access your personal data (or to exercise any of the
              other rights). However, we may charge a reasonable fee if your request is clearly
              unfounded, repetitive or excessive.
            </p>
          </section>

          <section id="section-10" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">10. Contact Details</h2>
            <p>If you have any questions about this privacy policy or about the use of your personal data or you want to exercise your privacy rights, please contact us:</p>

            <div className={`mt-6 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
              <p className="mb-2">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:info@panedit.com"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  info@panedit.com
                </a>
              </p>
              <p><strong>Postal Address:</strong> 6527 Candy Apple Cir. Las Vegas, NV 89142</p>
            </div>
          </section>

          <section id="section-11" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">11. Complaints</h2>
            <p>
              If you have concerns about our privacy practices, please contact us first so we can try to
              resolve them. You may also file a complaint with the U.S. Federal Trade Commission
              (FTC) and/or with your state Attorney General or state consumer protection office.
            </p>
          </section>

          <section id="section-12" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">12. Changes to the Privacy Policy and Your Duty to Inform Us of Changes</h2>
            <p>
              We keep our privacy policy under regular review. It is important that the personal data
              we hold about you is accurate and current. Please keep us informed if your personal data
              changes during your relationship with us, for example a new address or email address.
            </p>
          </section>

          <section id="section-13" className="mt-12 pb-12">
            <h2 className="text-2xl font-bold mb-4">13. Third-Party Links</h2>
            <p>
              This website may include links to third-party websites, plug-ins and applications. Clicking
              on those links or enabling those connections may allow third parties to collect or share
              data about you. We do not control these third-party websites and are not responsible for
              their privacy statements. When you leave our website, we encourage you to read the
              privacy policy of every website you visit.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
