"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FloatingHearts from "@/components/FloatingHearts";
import OurExperience from "@/components/OurExperience";
import AboutPage from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
      <>
        <Navbar/>
        <Hero />
        <OurExperience/>
        <AboutPage/>
        <Testimonials/>
        <Footer/>
      </>
  );
}
