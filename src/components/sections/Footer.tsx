"use client";

import { useState } from 'react';
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiChevronRight,
  FiSend,
  FiDownload,
  FiHeart
} from 'react-icons/fi';
import { 
  AiOutlineRocket,
  AiOutlineGlobal,
  AiOutlineSafety,
  AiOutlineTeam
} from 'react-icons/ai';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setSubscriptionStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email.includes('@')) {
      setSubscriptionStatus('success');
      setEmail('');
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    } else {
      setSubscriptionStatus('error');
    }
  };

  const courses = [
    // 'Machine Learning Fundamentals',
    // 'Deep Learning Specialization',
    // 'Natural Language Processing',
    // 'Computer Vision',
    // 'AI Ethics & Governance',
    // 'MLOps & Deployment',
    // 'Reinforcement Learning',
    // 'Generative AI & LLMs',
    'AI for teachers',
    'AI for human resource professionals',
    'AI for content writers & copy writers',
    'AI for software developers ',
    'AI for software engineers',
    'AI for graphic designers',
    'AI for customer service',
    'AI for virtual assistant',


  ];

  const resources = [
    { name: 'Research Papers', count: '500+' },
    { name: 'Tutorial Videos', count: '200+' },
    { name: 'Code Examples', count: '1000+' },
    { name: 'Blog Articles', count: '150+' },
    { name: 'Case Studies', count: '75+' },
    { name: 'Webinars', count: '50+' }
  ];

  const quickLinks = [
    'Home',
    'Courses',
    'News',
    'Careers',
    'About Us',
    'Contact',
    'Help Center',
    'FAQ'
  ];

  const policies = [
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy',
    'Refund Policy',
    'Code of Conduct',
    'Accessibility Statement'
  ];

  const stats = [
    { value: '10K+', label: 'Students Enrolled' },
    { value: '50+', label: 'Expert Instructors' },
    { value: '200+', label: 'Courses Available' },
    { value: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:max-w-xl">
              <div className="flex items-center mb-4">
                <AiOutlineRocket className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Launch Your AI Career</h3>
              </div>
              <p className="text-blue-100">
                Join 10,000+ AI professionals who receive our weekly newsletter with the latest industry insights, course updates, and career opportunities.
              </p>
            </div>
            
            <div className="md:w-96">
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex">
                  <div className="relative flex-grow">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 rounded-l-lg text-gray-900 ring-1 ring-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={subscriptionStatus === 'loading'}
                    className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-r-lg font-medium transition-colors flex items-center disabled:opacity-50"
                  >
                    {subscriptionStatus === 'loading' ? (
                      'Subscribing...'
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Subscribe
                      </>
                    )}
                  </button>
                </div>
                
                {subscriptionStatus === 'success' && (
                  <p className="text-green-200 text-sm">Thank you for subscribing! Check your email for confirmation.</p>
                )}
                {subscriptionStatus === 'error' && (
                  <p className="text-red-200 text-sm">Please enter a valid email address.</p>
                )}
                
                <p className="text-blue-100 text-sm">
                  By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <AiOutlineGlobal className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Laudare AI Academy</h2>
              </div>
              <p className="text-gray-300 mb-6">
                Empowering the next generation of AI innovators with cutting-edge education, hands-on projects, and industry-leading expertise.
              </p>
              
              <div className="flex space-x-4 mb-6">
                {[
                  { icon: FiFacebook, label: 'Facebook' },
                  { icon: FiTwitter, label: 'Twitter' },
                  { icon: FiInstagram, label: 'Instagram' },
                  { icon: FiLinkedin, label: 'LinkedIn' },
                  { icon: FiYoutube, label: 'YouTube' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <FiMapPin className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">123 Innovation Drive, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">+234 (0) 372-345-3422</span>
              </div>
              <div className="flex items-center">
                <FiMail className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">hello@laudareai.academy</span>
              </div>
            </div>
          </div>

          {/* Courses Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <AiOutlineSafety className="w-5 h-5 mr-2 text-blue-400" />
              Popular Courses
            </h3>
            <ul className="space-y-3">
              {courses.slice(0, 6).map((course, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white flex items-center group transition-colors"
                  >
                    <FiChevronRight className="w-4 h-4 mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {course}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="/courses" 
                  className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center mt-2"
                >
                  View All Courses
                  <FiChevronRight className="w-4 h-4 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <AiOutlineTeam className="w-5 h-5 mr-2 text-purple-400" />
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-blue-300 text-sm font-medium mb-3">Navigation</h4>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-purple-300 text-sm font-medium mb-3">Legal</h4>
                <ul className="space-y-2">
                  {policies.map((policy, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                        {policy}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-6 text-center">Free Learning Resources</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {resources.map((resource, index) => (
              <a
                key={index}
                href="#"
                className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors group"
              >
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">{resource.count}</div>
                  <div className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    {resource.name}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Certifications Badge */}
        <div className="mt-12 bg-gray-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold mb-2">Industry Recognized Certifications</h4>
              <p className="text-gray-300 text-sm">
                Our courses are accredited by leading AI organizations and tech companies.
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0 max-w-[100%] overflow-auto">
              {['AWS', 'Google', 'Microsoft', 'NVIDIA', 'OpenAI'].map((company, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gray-900 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  {company} Certified
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download Apps */}
        <div className="hidden mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold mb-2">Learn On The Go</h4>
            <p className="text-gray-300 text-sm">Download our mobile app for iOS and Android</p>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-black hover:bg-gray-900 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center mr-3">
                <span className="text-black font-bold">iOS</span>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </button>
            <button className="flex items-center px-4 py-2 bg-black hover:bg-gray-900 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center mr-3">
                <FiDownload className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Laudare AI Academy. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Made with <FiHeart className="inline w-4 h-4 text-red-400" /> for AI education worldwide.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select className="bg-gray-800 text-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="en">English (US)</option>
                {/* <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option> */}
              </select>
              
              <select className="bg-gray-800 text-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="usd">NGN - Nigerian Naira</option>
                <option value="eur">USD - US Dollar</option>
                
              </select>
              
              <a href="#top" className="text-gray-400 hover:text-white text-sm transition-colors">
                Back to Top ↑
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              SSL Secured Connection
            </div>
            <div>ISO 27001 Certified</div>
            <div>GDPR Compliant</div>
            <div>24/7 Support Available</div>
            <div>Money-Back Guarantee</div>
          </div>
        </div>
      </div>
    </footer>
  );
}