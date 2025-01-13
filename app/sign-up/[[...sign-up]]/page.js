'use client';

// Import necessary modules and components
import { AppBar, Container, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';
import { dark, neobrutalism } from "@clerk/themes";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from "next/image";
import logo from "@/public/flash-card.png";
import { React, useState, useEffect, useRef } from 'react';
import Footer from "@/app/components/Footer";
import "@/app/css/sign-up.css";

// Define the SignUpPage component
export default function SignUpPage() {
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

  return (
    <section className="signUp-ctr">
      {/* Navbar component */}
      <nav className={"navbar"}>
        <div className="navbar-title-ctr">
          <Image src={logo} width={40} height={40} alt="Intelly logo" />
          <Link className="navbar-title" href="/" passHref>Intelly</Link>
        </div>
        <ul className={active}>
          <Link className="navbar-btn" href="/sign-in" passHref>Login</Link>
          <Link className="navbar-btn" href="/sign-up" passHref>Sign Up</Link>
        </ul>
        <div onClick={navToggle} className={icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>

      {/* SignUp form component */}
      <div className="signup-form-ctr">
        <SignUp appearance={{
          baseTheme: [dark],
          variables: { colorPrimary: 'grey' }
        }} />
      </div>

      {/* Footer component */}
      <Footer />
    </section>
  );
}