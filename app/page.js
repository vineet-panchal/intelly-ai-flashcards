"use client";

// Import necessary modules and components
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import Image from "next/image";
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import "@/app/css/landing-page.css";
import { React, useState } from "react";
import Link from "next/link";
import logo from "@/public/flash-card.png";
import Footer from "@/app/components/Footer";

// Define the Home component
export default function Home() {
  // State for managing navbar menu and icon toggling
  const [active, setActive] = useState("navbar-menu");
  const [icon, setIcon] = useState("navbar-toggler");

  // Function to toggle navbar menu and icon
  const navToggle = () => {
    if (active === "navbar-menu") {
      setActive("navbar-menu active");
    } else setActive("navbar-menu");

    if (icon === "navbar-toggler") {
      setIcon("navbar-toggler toggle");
    } else setIcon("navbar-toggler");
  };

  // Function to handle subscription checkout
  const handleSubmit = async (subscriptionName, subscriptionValue) => {
    try {
      const checkoutSession = await fetch("api/generate/checkout-session", {
        method: "POST",
        headers: {
          origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          subscriptionName: subscriptionName,
          subscriptionValue: subscriptionValue,
        }),
      });

      console.log(checkoutSession);
      const checkoutSessionJson = await checkoutSession.json();
      if (checkoutSessionJson.statusCode === 500) {
        console.error("Error:", checkoutSessionJson.message);
        return;
      }
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });
      if (error) {
        console.error(error);
      }
    } catch (err) {
      console.error("Error handling checkout session:", err);
    }
  };

  // Get user information and router instance
  const { isSignedIn } = useUser();
  const router = useRouter();

  // Function to handle "Get Started" button click
  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/generate");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <>
      {/* Head component for setting page title and meta description */}
      <Head>
        <title>Intelly AI Flashcards</title>
        <meta name="description" content="create flashcards from text" />
      </Head>

      <div className="landingPage-ctr">
        {/* Navbar component */}
        <nav className={"navbar"}>
          <div className="navbar-title-ctr">
            <Image src={logo} width={40} height={40} alt="Intelly logo" />
            <h4 className="navbar-title">Intelly</h4>
          </div>
          <ul className={active}>
            <SignedOut>
              <Link className="navbar-btn" href="/sign-in" passHref>Log In</Link>
              <Link className="navbar-btn" href="/sign-up" passHref>Sign Up</Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ul>
          <div onClick={navToggle} className={icon}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </nav>

        {/* Main content section */}
        <Box height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
          <Box 
            className="headingBg-ctr"
            width={"90vw"}
            height={"75vh"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            borderRadius={"30px"}
          >
            <Typography variant="h2" fontFamily={"sans-serif"} gutterBottom>Welcome To Intelly</Typography>
            <Typography variant="h5" fontFamily={"sans-serif"} pb={4} gutterBottom>
              {' '}Introducing the fastest way to create flashcards from scratch.
            </Typography>
            <button className="heading-btn" onClick={handleGetStarted}>Get Started</button>
          </Box>
        </Box>

        {/* Features section */}
        <Box className="features-ctr" width={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Typography color={"white"} variant="h4" textAlign={"center"} gutterBottom>Features</Typography>
          <div className="features-cards">
            <ul>
              <li>
                <div className="featureCard" id="featureCard-1">
                  <Typography fontWeight={900} className="featureCard-title">Easy Text Input</Typography>
                  <Typography className="featureCard-subtitle">
                    Simply input you text and let our software do the rest.
                    Creating flashcards has never been easier.
                  </Typography>
                </div>
              </li>

              <li>
                <div className="featureCard" id="featureCard-2">
                  <Typography fontWeight={900} className="featureCard-title">Smart Flashcards</Typography>
                  <Typography className="featureCard-subtitle">
                    Our AI intelligently breaks down your text into concise
                    flashcards perfect for studying.
                  </Typography>
                </div>
              </li>

              <li>
                <div className="featureCard" id="featureCard-3">
                  <Typography fontWeight={900} className="featureCard-title">Accessible Anywhere</Typography>
                  <Typography className="featureCard-subtitle">
                    Access your flashcards from any device and at any time.
                    Study on the go with ease. 
                  </Typography>
                </div>
              </li>
            </ul>
          </div>
        </Box>

        {/* Pricing section */}
        <Typography m={"30px"} color={"white"} variant="h4" textAlign={"center"} gutterBottom>Pricing</Typography>
        <div class="pricing-ctr">
          <div class="pricingCard">
            <h3 className="pricingCard-title" id="basicPlan-title">Basic Plan</h3>
            <div class="pricingCard-price">
              <h1><sup>$</sup>2<small>month</small></h1>
            </div>
            <div class="pricingCard-description">
              <ul>
                <li>Access to limited app features.</li>
                <li>Limited Storage</li>
              </ul>
            </div>
            <button 
              className="pricingCard-btn"
              onClick={() => handleSubmit("Basic Subscription", 0.2)}
            >Choose Basic</button>
          </div>
          <div class="pricingCard popular">
            <div class="pricingCard-ribbon">
              <span>MOST POPULAR</span>
            </div>
            <h3 className="pricingCard-title" id="proPlan-title">Pro Plan</h3>
            <div class="pricingCard-price">
              <h1><sup>$</sup>5<small>month</small></h1>
            </div>
            <div class="pricingCard-description">
              <ul>
                <li>Access to unlimited flashcards</li>
                <li>Storage with priority support.</li>
              </ul>
            </div>
            <button 
            className="pricingCard-btn"
            onClick={() => handleSubmit("Pro Subscription", 0.5)}
            >Choose Pro</button>
          </div>
        </div>

        {/* Footer component */}
        <Footer />
      </div>
    </>
  );
}
