import React from 'react';
import { X } from 'lucide-react';

interface TermsAndConditionsProps {
  onClose: () => void;
  isDarkMode: boolean;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onClose, isDarkMode }) => {
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
            Terms & Conditions
          </h1>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
            aria-label="Close terms and conditions"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className={`prose prose-lg max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
          <p className="lead">
            These Terms of Service govern your use of the Panèdit.com website and services. By accessing or using our Site, you agree to be bound by these terms.
          </p>

          <div className="my-8 space-y-2">
            <p className="font-semibold">Table of Contents:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li><a href="#section-1" onClick={(e) => handleAnchorClick(e, 'section-1')} className="text-blue-400 hover:text-blue-300 cursor-pointer">General Terms</a></li>
              <li><a href="#section-2" onClick={(e) => handleAnchorClick(e, 'section-2')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Intellectual Property Rights</a></li>
              <li><a href="#section-3" onClick={(e) => handleAnchorClick(e, 'section-3')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Linking and Framing</a></li>
              <li><a href="#section-4" onClick={(e) => handleAnchorClick(e, 'section-4')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Disclaimers</a></li>
              <li><a href="#section-5" onClick={(e) => handleAnchorClick(e, 'section-5')} className="text-blue-400 hover:text-blue-300 cursor-pointer">SMS/Text Messaging</a></li>
              <li><a href="#section-6" onClick={(e) => handleAnchorClick(e, 'section-6')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Warranties</a></li>
              <li><a href="#section-7" onClick={(e) => handleAnchorClick(e, 'section-7')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Indemnification</a></li>
              <li><a href="#section-8" onClick={(e) => handleAnchorClick(e, 'section-8')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Online Commerce</a></li>
              <li><a href="#section-9" onClick={(e) => handleAnchorClick(e, 'section-9')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Interactive Features</a></li>
              <li><a href="#section-10" onClick={(e) => handleAnchorClick(e, 'section-10')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Registration and Passwords</a></li>
              <li><a href="#section-11" onClick={(e) => handleAnchorClick(e, 'section-11')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Limitation of Liability</a></li>
              <li><a href="#section-12" onClick={(e) => handleAnchorClick(e, 'section-12')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Educational Purposes</a></li>
              <li><a href="#section-13" onClick={(e) => handleAnchorClick(e, 'section-13')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Termination</a></li>
              <li><a href="#section-14" onClick={(e) => handleAnchorClick(e, 'section-14')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Refund Policy</a></li>
              <li><a href="#section-15" onClick={(e) => handleAnchorClick(e, 'section-15')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Copyright (DMCA)</a></li>
              <li><a href="#section-16" onClick={(e) => handleAnchorClick(e, 'section-16')} className="text-blue-400 hover:text-blue-300 cursor-pointer">Governing Law</a></li>
            </ol>
          </div>

          <section id="section-1" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">1. General Terms</h2>
            <p>
              This website (the "Site") is owned and operated by Panèdit.com LLC ("Panèdit.com," "we" or "us"). By using the Site, you agree to be bound by these Terms of Service and to use the Site in accordance with these Terms of Service, our{' '}
              <button
                type="button"
                onClick={() => {
                  window.location.hash = 'privacy';
                }}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Privacy Policy
              </button>
              {' '}and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through the Site or from Panèdit.com.
            </p>
            <p className="mt-4">
              <strong>Important:</strong> Accessing the Site, in any manner, whether automated or otherwise, constitutes use of the Site and your agreement to be bound by these Terms of Service.
            </p>
            <p className="mt-4">
              We reserve the right to change these Terms of Service or to impose new conditions on use of the Site, from time to time, in which case we will post the revised Terms of Service on this website. By continuing to use the Site after we post any such changes, you accept the Terms of Service, as modified.
            </p>
          </section>

          <section id="section-2" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">2. Intellectual Property Rights</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Our Limited License to You</h3>
            <p>
              This Site and all the materials available on the Site are the property of us and/or our affiliates or licensors, and are protected by copyright, trademark, and other intellectual property laws. The Site is provided solely for your personal noncommercial use.
            </p>
            <p className="mt-4">
              You may not use the Site or the materials available on the Site in a manner that constitutes an infringement of our rights or that has not been authorized by us. More specifically, unless explicitly authorized in these Terms of Service or by the owner of the materials, you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Modify, copy, reproduce, republish, upload, post, transmit, or translate any material from the Site</li>
              <li>Sell, create derivative works, exploit, or distribute any material from the Site in any manner or medium</li>
              <li>Use any material from the Site for commercial purposes</li>
            </ul>
            <p className="mt-4">
              You may, however, from time to time, download and/or print one copy of individual pages of the Site for your personal, non-commercial use, provided that you keep intact all copyright and other proprietary notices.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Your License to Us</h3>
            <p>
              By posting or submitting any material (including, without limitation, comments, blog entries, Facebook postings, photos and videos) to us via the Site, internet groups, social media venues, or to any of our staff via email, text or otherwise, you are representing:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>That you are the owner of the material, or are making your posting or submission with the express consent of the owner of the material</li>
              <li>That you are thirteen years of age or older</li>
            </ul>
            <p className="mt-4">
              <strong className="text-yellow-400">Critical:</strong> When you submit, email, text or deliver or post any material, you are granting us, and anyone authorized by us, a royalty-free, perpetual, irrevocable, non-exclusive, unrestricted, worldwide license to use, copy, modify, transmit, sell, exploit, create derivative works from, distribute, and/or publicly perform or display such material, in whole or in part, in any manner or medium, now known or hereafter developed, for any purpose.
            </p>
            <p className="mt-4">
              You acknowledge and agree that any contributions originally created by you for us shall be deemed a "work made for hire" under Section 101 of the United States Copyright Law. Panèdit.com shall be deemed the author and exclusive owner thereof and shall have the right to exploit any or all of the results and proceeds in any and all media throughout the universe, in perpetuity, in all languages.
            </p>
          </section>

          <section id="section-3" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">3. Limitations on Linking and Framing</h2>
            <p>
              You may establish a hypertext link to the Site so long as the link does not state or imply any sponsorship of your site by us or by the Site. However, you may not, without our prior written permission:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Frame or inline link any of the content of the Site</li>
              <li>Incorporate into another website or other service any of our material, content or intellectual property</li>
            </ul>
          </section>

          <section id="section-4" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">4. Disclaimers</h2>
            <p>
              Throughout the Site, we may provide links and pointers to Internet sites maintained by third parties. Our linking to such third-party sites does not imply an endorsement or sponsorship of such sites, or the information, products or services offered on or through the sites.
            </p>
            <p className="mt-4">
              Neither we nor affiliates operate or control in any respect any information, products or services that third parties may provide on or through the Site or on websites linked to by us on the Site.
            </p>
            <p className="mt-4">
              <strong>Important:</strong> If applicable, any opinions, advice, statements, services, offers, or other information or content expressed or made available by third parties, including information providers, are those of the respective authors or distributors, and not Panèdit.com.
            </p>
            <p className="mt-4">
              Neither Panèdit.com nor any third-party provider of information guarantees the accuracy, completeness, or usefulness of any content. Furthermore, Panèdit.com neither endorses nor is responsible for the accuracy and reliability of any opinion, advice, or statement made on any of the Sites by anyone other than an authorized Panèdit.com representative while acting in his/her official capacity.
            </p>
          </section>

          <section id="section-5" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">5. SMS/Text Messaging Privacy</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Information Collection</h3>
            <p>
              If you opt in to receive text messages from Panedit.com, we may collect your mobile phone number and information about your subscription to our messaging program (such as the date/time you opted in, the opt-in source, and message delivery details). We may also collect the content of messages you send to us.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">How We Use Information</h3>
            <p>
              We use this information to send you the text messages you requested (e.g., marketing promotions, account alerts, order updates, customer support), to provide customer service, and to help us comply with applicable laws and industry guidelines.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Sharing</h3>
            <p>
              We may share your information with service providers who help us deliver text messages (such as messaging platforms and telecommunications providers). We do not sell or rent your mobile number. We do not share your mobile number with third parties for their own marketing purposes.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Your Choices</h3>
            <p>
              You can opt out at any time by replying STOP to any message. For help, reply HELP or contact us at{' '}
              <a href="mailto:info@panedit.com" className="text-blue-400 hover:text-blue-300 underline">
                info@panedit.com
              </a>
              .
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Data Retention & Security</h3>
            <p>
              We keep SMS-related information as needed to operate our program and for legal/compliance purposes, and we maintain reasonable safeguards to protect it.
            </p>
          </section>

          <section id="section-6" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">6. Warranties</h2>
            <div className={`p-6 rounded-lg border-2 ${isDarkMode ? 'bg-red-900/20 border-red-500/50' : 'bg-red-50 border-red-300'} mt-4`}>
              <p className="font-bold text-lg mb-2">IMPORTANT DISCLAIMER</p>
              <p className="uppercase">
                THE INFORMATION, PRODUCTS AND SERVICES OFFERED ON OR THROUGH THE SITE AND BY PANÈDIT.COM AND ANY THIRD-PARTY SITES ARE PROVIDED "AS IS" AND WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED.
              </p>
              <p className="mt-4 uppercase">
                TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
              </p>
              <p className="mt-4 uppercase">
                WE DO NOT WARRANT THAT THE SITE OR ANY OF ITS FUNCTIONS WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT ANY PART OF THIS SITE, INCLUDING BULLETIN BOARDS, OR THE SERVERS THAT MAKE IT AVAILABLE, ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
            </div>
          </section>

          <section id="section-7" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">7. Indemnification</h2>
            <p>
              You agree at all times to defend, indemnify and hold harmless Panèdit.com, its affiliates, their successors, transferees, assignees and licensees and their respective parent and subsidiary companies, agents, associates, officers, directors, shareholders and employees of each from and against any and all claims, causes of action, damages, liabilities, costs and expenses, including legal fees and expenses, arising out of or related to your breach of any obligation, warranty, representation or covenant set forth herein.
            </p>
          </section>

          <section id="section-8" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">8. Online Commerce</h2>
            <p>
              Certain sections of the Site may allow you to purchase many different types of products and services online that are provided by third parties. We are not responsible for the quality, accuracy, timeliness, reliability or any other aspect of these products and services.
            </p>
            <p className="mt-4">
              If you make a purchase from a merchant on the Site or on a site linked to by the Site, the information obtained during your visit to that merchant's online store or site, and the information that you give as part of the transaction, may be collected by both the merchant and us.
            </p>
            <p className="mt-4">
              <strong>Important:</strong> You release us and our affiliates from any damages that you incur, and agree not to assert any claims against us or them, arising from your purchase or use of any products or services made available by third parties through the Site.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Your Responsibilities</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>You agree to be financially responsible for all purchases made by you or someone acting on your behalf through the Site</li>
              <li>You agree to use the Site for legitimate, non-commercial purposes only</li>
              <li>You agree not to make any purchases for speculative, false or fraudulent purposes</li>
              <li>You agree to only purchase goods or services for yourself or for another person for whom you are legally permitted to do so</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Personal Use Only</h3>
            <p>
              Your purchase is for personal use only. Sharing of purchases is not permitted and will be considered unauthorized, an infringing use of our copyrighted material, and may subject violators to liability.
            </p>
            <p className="mt-4">
              If payment for a course is declined, our system will automatically disable access to our premium materials. We'll make every attempt to contact you to help resolve this issue. Once the billing issue is resolved, we'll restore access.
            </p>
          </section>

          <section id="section-9" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">9. Interactive Features</h2>
            <p>
              This Site may include a variety of features, such as bulletin boards, web logs, chat rooms, and email services, which allow feedback to us and real-time interaction between users.
            </p>
            <p className="mt-4">
              <strong>Important:</strong> Responsibility for what is posted on bulletin boards, web logs, chat rooms, and other public posting areas on the Site, or sent via any email services on the Site, lies with each user – you alone are responsible for the material you post or send.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Prohibited Uses</h3>
            <p>It is a condition of your use of the Site that you do not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Restrict or inhibit any other user from using and enjoying the Site</li>
              <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
              <li>Interfere with or disrupt any servers or networks used to provide the Site or its features</li>
              <li>Use the Site to instigate or encourage others to commit illegal activities or cause injury or property damage to any person</li>
              <li>Gain unauthorized access to the Site, or any account, computer system, or network connected to this Site, by means such as hacking, password mining or other illicit means</li>
              <li>Obtain or attempt to obtain any materials or information through any means not intentionally made available through this Site</li>
              <li>Post or transmit any unlawful, threatening, abusive, libelous, defamatory, obscene, vulgar, pornographic, profane or indecent information of any kind</li>
              <li>Post or transmit any information, software or other material that violates or infringes upon the rights of others</li>
              <li>Post or transmit any information, software or other material that contains a virus or other harmful component</li>
              <li>Post, transmit or exploit any information, software or other material for commercial purposes, or that contains advertising</li>
              <li>Advertise or solicit to anyone to buy or sell products or services, or to make donations of any kind, without our express written approval</li>
              <li>Gather for marketing purposes any email addresses or other personal information that has been posted by other users of the Site</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Content Moderation</h3>
            <p>
              Panèdit.com may host message boards, chats and other public forums on its Sites. Any user failing to comply with the terms and conditions of this Agreement may be expelled from and refused continued access to the message boards, chats or other public forums in the future.
            </p>
            <p className="mt-4">
              Panèdit.com or its designated agents may remove or alter any user-created content at any time for any reason. Panèdit.com has no obligation whatsoever to monitor any of the content or postings on the message boards, chat rooms or other public forums on the Sites.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Community Standards</h3>
            <p>
              We occasionally include access to an online community as part of our programs. We want every single member to add value to the group. Therefore, we reserve the right to remove anyone at any time.
            </p>
          </section>

          <section id="section-10" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">10. Registration and Passwords</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Registration</h3>
            <p>
              To access certain features of the Site, we may ask you to provide certain demographic information including your gender, year of birth, zip code and country. In addition, if you elect to sign-up for a particular feature of the Site, such as chat rooms, web logs, or bulletin boards, you may also be asked to register with us on the form provided.
            </p>
            <p className="mt-4">
              You agree to provide true, accurate, current and complete information about yourself as prompted by the Site's registration form. If we have reasonable grounds to suspect that such information is untrue, inaccurate, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).
            </p>
            <p className="mt-4">
              Our use of any personally identifiable information you provide to us as part of the registration process is governed by the terms of our{' '}
              <button
                type="button"
                onClick={() => {
                  window.location.hash = 'privacy';
                }}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Privacy Policy
              </button>
              .
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Passwords</h3>
            <p>
              To use certain features of the Site, you will need a username and password, which you will receive through the Site's registration process. You are responsible for maintaining the confidentiality of the password and account, and are responsible for all activities (whether by you or by others) that occur under your password or account.
            </p>
            <p className="mt-4">
              <strong>Important:</strong> You agree to notify us immediately of any unauthorized use of your password or account or any other breach of security, and to ensure that you exit from your account at the end of each session. We cannot and will not be liable for any loss or damage arising from your failure to protect your password or account information.
            </p>
          </section>

          <section id="section-11" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">11. Limitation of Liability</h2>
            <div className={`p-6 rounded-lg border-2 ${isDarkMode ? 'bg-red-900/20 border-red-500/50' : 'bg-red-50 border-red-300'} mt-4`}>
              <p className="font-bold text-lg mb-2">CRITICAL LIMITATION</p>
              <p className="uppercase">
                UNDER NO CIRCUMSTANCES, INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE, SHALL WE, OUR SUBSIDIARY AND PARENT COMPANIES OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES THAT RESULT FROM THE USE OF, OR THE INABILITY TO USE, THE SITE, INCLUDING OUR MESSAGING, BLOGS, COMMENTS OF OTHERS, BOOKS, EMAILS, PRODUCTS, OR SERVICES, OR THIRD-PARTY MATERIALS, PRODUCTS, OR SERVICES MADE AVAILABLE THROUGH THE SITE OR BY US IN ANY WAY.
              </p>
              <p className="mt-4 uppercase">
                (BECAUSE SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN CATEGORIES OF DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IN SUCH STATES, OUR LIABILITY AND THE LIABILITY OF OUR SUBSIDIARY AND PARENT COMPANIES OR AFFILIATES IS LIMITED TO THE FULLEST EXTENT PERMITTED BY SUCH STATE LAW.)
              </p>
              <p className="mt-4 uppercase">
                YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT WE ARE NOT LIABLE FOR ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF ANY USER. IF YOU ARE DISSATISFIED WITH THE SITE, ANY MATERIALS, PRODUCTS, OR SERVICES ON THE SITE, OR WITH ANY OF THE SITE'S TERMS AND CONDITIONS, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE AND THE PRODUCTS, SERVICES AND/OR MATERIALS.
              </p>
            </div>
          </section>

          <section id="section-12" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">12. Educational Purposes</h2>
            <div className={`p-6 rounded-lg border-2 ${isDarkMode ? 'bg-yellow-900/20 border-yellow-500/50' : 'bg-yellow-50 border-yellow-300'} mt-4`}>
              <p className="font-bold text-lg mb-2">IMPORTANT DISCLAIMER</p>
              <p className="uppercase">
                PANÈDIT.COM IS NOT AN INVESTMENT ADVISORY SERVICE, IS NOT AN INVESTMENT ADVISER, AND DOES NOT PROVIDE PERSONALIZED FINANCIAL ADVICE OR ACT AS A FINANCIAL ADVISOR.
              </p>
              <p className="mt-4 uppercase">
                WE EXIST FOR EDUCATIONAL PURPOSES ONLY, AND THE MATERIALS AND INFORMATION CONTAINED HEREIN AND IN OUR PRODUCTS AND SERVICES ARE FOR GENERAL INFORMATIONAL PURPOSES ONLY. NONE OF THE INFORMATION PROVIDED BY US IS INTENDED AS INVESTMENT, TAX, ACCOUNTING OR LEGAL ADVICE, AS AN OFFER OR SOLICITATION OF AN OFFER TO BUY OR SELL, OR AS AN ENDORSEMENT, RECOMMENDATION OR SPONSORSHIP OF ANY SECURITY, OR FUND.
              </p>
              <p className="mt-4 uppercase">
                OUR INFORMATION SHOULD NOT BE RELIED UPON FOR PURPOSES OF TRANSACTING IN SECURITIES OR OTHER INVESTMENTS.
              </p>
            </div>
            <p className="mt-6">
              <strong>We do not offer or provide tax, legal or investment advice</strong> and you are responsible for consulting tax, legal, or financial professionals before acting on any information provided by us.
            </p>
            <p className="mt-4">
              This Site is continually under development and Panèdit.com makes no warranty of any kind, implied or express, as to its accuracy, completeness or appropriateness for any purpose.
            </p>
            <p className="mt-4">
              You acknowledge and agree that no representation has been made by Panèdit.com or its affiliates and relied upon as to the future income, expenses, sales volume or potential profitability that may be derived from the participation in this program.
            </p>
          </section>

          <section id="section-13" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">13. Termination</h2>
            <p>
              We may cancel or terminate your right to use the Site or any part of the Site at any time without notice. In the event of cancellation or termination, you are no longer authorized to access the part of the Site affected by such cancellation or termination.
            </p>
            <p className="mt-4">
              The restrictions imposed on you with respect to material downloaded from the Site, and the disclaimers and limitations of liabilities set forth in these Terms of Service, shall survive any termination.
            </p>
          </section>

          <section id="section-14" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">14. Refund Policy</h2>
            <p>
              Your purchase of a product or service or ticket to an event may or may not provide for any refund. Each specific product, service, event or course will specify its own refund policy.
            </p>
          </section>

          <section id="section-15" className="mt-12">
            <h2 className="text-2xl font-bold mb-4">15. Copyright (DMCA)</h2>
            <p>
              The Digital Millennium Copyright Act of 1998 (the "DMCA") provides recourse for copyright owners who believe that material appearing on the Internet infringes their rights under the U.S. copyright law.
            </p>
            <p className="mt-4">
              If you believe in good faith that materials hosted by Panèdit.com infringe your copyright, you, or your agent may send to Panèdit.com a notice requesting that the material be removed or access to it be blocked.
            </p>
            <p className="mt-4">
              All notices and counter notices must meet the then current statutory requirements imposed by the DMCA; see{' '}
              <a
                href="http://www.loc.gov/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                http://www.loc.gov/copyright
              </a>
              {' '}for details.
            </p>
            <div className={`mt-6 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
              <p className="font-semibold mb-2">Panèdit.com's Copyright Agent:</p>
              <p>
                <a href="mailto:info@panedit.com" className="text-blue-400 hover:text-blue-300 underline">
                  info@panedit.com
                </a>
              </p>
            </div>
          </section>

          <section id="section-16" className="mt-12 pb-12">
            <h2 className="text-2xl font-bold mb-4">16. Governing Law</h2>
            <p>
              This Agreement shall be binding upon and inure to the benefit of Panèdit.com and our respective assigns, successors, heirs, and legal representatives. Neither this Agreement nor any rights hereunder may be assigned without the prior written consent of Panèdit.com.
            </p>
            <p className="mt-4">
              <strong>These Terms of Use shall be governed by and construed in accordance with the laws of The United Kingdom</strong> and any dispute shall be subject to binding arbitration in The United Kingdom.
            </p>
            <p className="mt-4">
              If any provision of this agreement shall be unlawful, void or for any reason unenforceable, then that provision shall be deemed severable from this agreement and shall not affect the validity and enforceability of any remaining provisions.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Changes to Terms</h3>
            <p>
              Although it is highly unlikely, this policy may be changed at any time at our discretion. If we should update this policy, we will post the updates to this page on our Website.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Contact Information</h3>
            <p>
              If you have any questions or concerns regarding these terms, please direct them to:{' '}
              <a href="mailto:info@panedit.com" className="text-blue-400 hover:text-blue-300 underline">
                info@panedit.com
              </a>
            </p>
          </section>

          <div className={`mt-12 p-6 rounded-lg border ${isDarkMode ? 'bg-blue-900/20 border-blue-500/50' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-sm text-center">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-sm text-center mt-2">
              By continuing to use this Site, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
