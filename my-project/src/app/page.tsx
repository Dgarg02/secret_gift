"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FloatingHearts from "@/components/FloatingHearts";
import CreationInterface from "@/components/CreationInterface";
import SuccessState from "@/components/SuccessState";
import PasswordScreen from "@/components/PasswordScreen";
import MessageReveal from "@/components/MessageReveal";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

import { useState } from "react";
import AboutPage from "@/components/AboutUs";

export default function Home() {
  const [screen, setScreen] = useState("hero");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  return (
    <div className="gradient-bg min-h-screen relative overflow-hidden">
      
      <FloatingHearts />

      <Navbar onGetStarted={() => setScreen("create")} />

      {screen === "hero" && <Hero onCreate={() => setScreen("create")} />}

      {screen === "create" && (
        <CreationInterface
          onGenerate={(msg, pass) => {
            setMessage(msg);
            setPassword(pass);
            setGeneratedLink("https://secretgift.com/" + Math.random().toString(36).slice(2));
            setScreen("success");
          }}
        />
      )}

      {screen === "success" && (
        <SuccessState link={generatedLink} onCreateAnother={() => setScreen("hero")} />
      )}

      {/* Static Sections */}
      <HowItWorks />
      <Features />
      <AboutPage/>
      {/* <Pricing /> */}
      <Footer />
    </div>
  );
}
