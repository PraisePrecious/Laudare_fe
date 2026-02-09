"use client";

import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiClock, FiShield, FiEye, FiFileText, FiMail, FiLock, FiGlobe } from 'react-icons/fi';
import { TbCookie } from 'react-icons/tb';

export default function PrivacyPolicy() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    { id: 'introduction', title: 'Introduction & Scope' },
    { id: 'information', title: 'Information We Collect' },
    { id: 'usage', title: 'How We Use Your Information' },
    { id: 'sharing', title: 'Information Sharing' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'security', title: 'Data Security' },
    { id: 'rights', title: 'Your Rights' },
    { id: 'children', title: "Children's Privacy" },
    { id: 'changes', title: 'Policy Changes' },
    { id: 'contact', title: 'Contact Us' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FiShield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <span className="flex items-center text-gray-600">
                  <FiClock className="w-4 h-4 mr-1" />
                  10 min read
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  Version 2.1
                </span>
              </div>
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden md:grid lg:col-span-3 mb-8 lg:mb-0">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        toggleSection(section.id);
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        openSection === section.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{section.title}</span>
                        {openSection === section.id ? (
                          <FiChevronUp className="w-4 h-4" />
                        ) : (
                          <FiChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Stats Card */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Privacy Highlights</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Data Categories</span>
                      <span className="text-sm font-medium">4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Retention Period</span>
                      <span className="text-sm font-medium">24 months</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Update Frequency</span>
                      <span className="text-sm font-medium">Quarterly</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Tools</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <FiEye className="w-5 h-5 mr-2" />
                    View Your Data
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <TbCookie className="w-5 h-5 mr-2" />
                    Cookie Settings
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FiMail className="w-5 h-5 mr-2" />
                    Contact DPO
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Hero Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-12 border-b border-gray-200">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-6">
                    <FiShield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Your Privacy Matters
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    We are committed to protecting your personal information and being transparent about our practices.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                      <FiGlobe className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium">GDPR Compliant</span>
                    </div>
                    <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                      <FiLock className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium">Encrypted Data</span>
                    </div>
                    <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                      <FiFileText className="w-5 h-5 text-purple-600 mr-2" />
                      <span className="text-sm font-medium">Clear Policies</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Content */}
              <div className="px-8 py-12">
                <div className="max-w-3xl mx-auto space-y-12">
                  {/* Introduction */}
                  <section id="introduction" className="scroll-mt-24">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-blue-600">1</span>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Introduction & Scope</h2>
                        <div className="prose prose-lg text-gray-600">
                          <p>
                            This Privacy Policy describes how we collect, use, and share your personal information when you use our services. 
                            We are committed to protecting your privacy and handling your data with transparency and care.
                          </p>
                          <p>
                            This policy applies to all users of our website, mobile applications, and services. 
                            By using our services, you agree to the collection and use of information in accordance with this policy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Information We Collect */}
                  <section id="information" className="scroll-mt-24">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-green-600">2</span>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Information We Collect</h2>
                        <div className="prose prose-lg text-gray-600">
                          <p>We collect several types of information for various purposes to provide and improve our service to you.</p>
                          
                          <div className="mt-6 space-y-6">
                            <div className="p-6 bg-gray-50 rounded-xl">
                              <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                              <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                  Name, email address, and contact information
                                </li>
                                <li className="flex items-center">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                  Account credentials and profile information
                                </li>
                                <li className="flex items-center">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                  Payment and billing information
                                </li>
                              </ul>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-xl">
                              <h3 className="font-semibold text-gray-900 mb-3">Usage Data</h3>
                              <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                  IP address, browser type, and device information
                                </li>
                                <li className="flex items-center">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                  Pages visited and time spent on our services
                                </li>
                                <li className="flex items-center">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                  Search queries and interactions with our content
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Cookies Section */}
                  <section id="cookies" className="scroll-mt-24">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <TbCookie className="w-6 h-6 text-yellow-600" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Cookies & Tracking Technologies</h2>
                        <div className="prose prose-lg text-gray-600">
                          <p>
                            We use cookies and similar tracking technologies to track activity on our service and hold certain information.
                          </p>
                          
                          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <div className="flex items-start">
                              <TbCookie className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-semibold text-yellow-800 mb-2">Cookie Preferences</h4>
                                <p className="text-yellow-700 mb-4">
                                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                                  However, if you do not accept cookies, you may not be able to use some portions of our service.
                                </p>
                                <button className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium hover:bg-yellow-200 transition-colors">
                                  Manage Cookie Settings
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Your Rights */}
                  <section id="rights" className="scroll-mt-24">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-purple-600">✓</span>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Rights</h2>
                        <div className="prose prose-lg text-gray-600">
                          <p>You have certain rights regarding your personal information under applicable data protection laws.</p>
                          
                          <div className="mt-6 grid md:grid-cols-2 gap-4">
                            {[
                              { title: 'Access', desc: 'Request a copy of your personal data' },
                              { title: 'Rectification', desc: 'Correct inaccurate or incomplete data' },
                              { title: 'Erasure', desc: 'Request deletion of your personal data' },
                              { title: 'Restriction', desc: 'Limit processing of your data' },
                              { title: 'Portability', desc: 'Receive your data in a structured format' },
                              { title: 'Objection', desc: 'Object to certain types of processing' },
                            ].map((right, index) => (
                              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                                <h4 className="font-semibold text-gray-900 mb-1">{right.title}</h4>
                                <p className="text-sm text-gray-600">{right.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Contact Information */}
                  <section id="contact" className="scroll-mt-24">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                      <div className="flex items-center mb-6">
                        <FiMail className="w-8 h-8 text-blue-600 mr-4" />
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                          <p className="text-gray-600">Have questions about our privacy practices?</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">Data Protection Officer</h3>
                          <div className="space-y-2">
                            <p className="text-gray-600">Email: privacy@example.com</p>
                            <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
                            <p className="text-gray-600">Response Time: 48 hours</p>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">Postal Address</h3>
                          <address className="text-gray-600 not-italic">
                            123 Privacy Street<br />
                            Data Protection City<br />
                            State 12345<br />
                            United States
                          </address>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                          We typically respond to privacy inquiries within 2 business days.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Footer */}
                  <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <p className="text-gray-600">
                          This policy is effective as of {new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          We may update this privacy policy from time to time.
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Accept & Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <a href="/terms" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <FiFileText className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Terms of Service</h3>
                <p className="text-sm text-gray-600">Read our terms and conditions for using our services.</p>
              </a>
              
              <a href="/cookies" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <TbCookie className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Cookie Policy</h3>
                <p className="text-sm text-gray-600">Detailed information about our cookie usage.</p>
              </a>
              
              <a href="/data-request" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <FiEye className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Request Form</h3>
                <p className="text-sm text-gray-600">Submit requests regarding your personal data.</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}