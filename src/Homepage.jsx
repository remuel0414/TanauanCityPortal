import React from 'react';
import LandingPage from './components/LandingPage';
import Announcements from './components/Announcements';
import FAQ from './components/FAQ';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import PictureGallery from './components/PictureGallery';

const Homepage = () => {
  return (
    <div style={{ backgroundColor: "#f1f5f9" }}> {/* Apply the background color */}
      {/* Navbar */}

      {/* LandingPage */}
      <LandingPage />

      {/* Announcements */}
      <Announcements />

      <PictureGallery />
      
      {/* FAQ */}
      <FAQ />

      {/* Contact Us */}
      <ContactUs />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
