"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      // Web3Forms API Endpoint
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "5a2e46da-f8d2-4a8f-879e-387fb2461b4b", // Using a dummy key or instructing user
          subject: "New Contact Form Submission - Uma Crystal",
          from_name: formData.name,
          ...formData
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        console.error("Web3Forms Error:", result);
        alert(result.message || "Something went wrong. Please ensure your access key is correct.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error submitting form. Please check your connection or try again later.");
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      if (isSuccess) {
        setTimeout(() => setIsSuccess(false), 5000);
      }
    }
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-light max-w-2xl mx-auto font-light">
            We are a fresh startup and we love hearing from our community. Get in touch for inquiries, collaborations, or just to say hi!
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* Left Form Side */}
          <div className="w-full lg:w-3/5 p-8 md:p-12">
            <h2 className="text-3xl font-heading font-bold text-text mb-2">Send us a Message</h2>
            <p className="text-gray-500 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
            
            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl flex flex-col items-center justify-center text-center h-64">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. We will contact you soon.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-green-700 font-medium underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
                    placeholder="+91 93271 05966"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          {/* Right Info Side */}
          <div className="w-full lg:w-2/5 bg-gray-50 p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-gray-200">
            <h3 className="text-2xl font-heading font-bold text-text mb-8">Contact Information</h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Phone</h4>
                  <p className="text-gray-600">+91 93271 05966</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Email</h4>
                  <p className="text-gray-600">umacrystal2909@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Address</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Uma Crystal,<br />
                    Khambhat, Gujarat,<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0 font-bold">
                  G
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">GST Number</h4>
                  <p className="text-gray-600">24AAACU1234A1Z5</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <a 
                href="https://wa.me/919327105966" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors flex justify-center items-center shadow-md hover:shadow-lg"
              >
                <WhatsAppIcon className="w-6 h-6 mr-2" />
                Direct WhatsApp Chat
              </a>
            </div>
          </div>
          
        </div>
      </section>

      {/* Map Embed - Using dummy Ahmedabad coordinates/place */}
      <section className="mt-20">
        <div className="w-full h-96 bg-gray-200 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59174.56239127622!2d72.59765275631776!3d22.318081745404554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f87b2803b9b4d%3A0x8e826b63d76e2570!2sKhambhat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715620000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Uma Crystal Location"
            className="absolute inset-0"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
