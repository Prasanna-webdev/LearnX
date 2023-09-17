import React from 'react'
import { useState,useEffect } from "react";
import { signInWithGoogle } from "./firebase-config";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Card, Button, Row, Col } from 'react-bootstrap';
import card1 from './images/card1.png'
import card2 from './images/card2.png'
import card3 from './images/card3.png'
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import logo from "./images/logo.png";
import Home from './pages/Home'
import { Routes, Route,Link } from "react-router-dom";
function Courses() {
    const [loginButtonColor,setLoginButtonColor]=useState('button-1')
    const [loginButtonText,setLoginButtonText]=useState('Sign in')
    const [loginImage,setLoginImage]=useState(false)
    const [loginButtonImage,setLoginButtonImage]=useState('')
  
   
    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const scrollOptions = {
          behavior: 'smooth',
          block: 'start',
        };
  
        // Calculate the scroll duration based on the distance to scroll and the desired time (1 second in this case).
        const scrollDuration = 500; // 1 second in milliseconds.
  
        // Calculate the distance to scroll to the target section from the current position.
        const distance = section.getBoundingClientRect().top;
  
        // Calculate the number of frames needed for the animation.
        const frames = Math.ceil(scrollDuration / (1000 / 60));
  
        // Calculate the amount to scroll in each frame.
        const scrollStep = distance / frames;
  
        // Define the function to perform the scrolling animation.
        const scrollAnimation = (currentStep) => {
          if (currentStep >= frames) return;
  
          // Calculate the new scroll position.
          const newScrollPosition = window.pageYOffset + scrollStep;
  
          // Perform the scroll step.
          window.scrollTo(0, newScrollPosition);
  
          // Schedule the next step of the animation.
          setTimeout(() => scrollAnimation(currentStep + 1), 1000 / 60);
        };
  
        // Start the scrolling animation.
        scrollAnimation(0);
      }
    };
  
      // Define the styles for the card with a red gradient background
      const cardStyles = {
        
        width:'15em',
        backgroundIimage: 'linear-gradient(to bottom right, yellow, orange)',
        color: 'black', // Set text color to white for better visibility on the gradient background
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle box shadow
      };
    
  
    useEffect(() => {
      
      if(localStorage.getItem("name"))
      {
        setLoginButtonColor('button-3')
        setLoginButtonText('Logged in as '+localStorage.getItem("name"))
        setLoginButtonImage(localStorage.getItem("profilePic"))
        setLoginImage(true)
        console.log(localStorage)
      }
     
    }, [])
  return (
    <div>

<Home string={["Automate Developer Aquisition with ConnectVerse"]}/>
<br></br>
<br></br>
    <div style={{color:'white'}} class="description">

   

<section >
  <ul>
    <li>
      <strong>Automated DevRel for Web 3 Protocols:</strong> Our platform simplifies the DevRel process for Web 3 protocols
      by creating high-quality, informative courses and tutorials. We bridge the gap between developers and complex decentralized
      technologies, making the learning journey seamless and rewarding.
    </li>
    <li>
      <strong>Empowering over 2000 Students:</strong> With a thriving community of over 2000 students, Connectverse is at the forefront
      of educating and nurturing talent in the Web 3 space. Join our platform to become part of an ever-growing network of skilled
      and passionate developers.
    </li>
    <li>
      <strong>Seamless B2B Solutions:</strong> As a B2B company, we understand the unique needs of businesses operating in the Web 3 ecosystem.
      Our tailor-made solutions cater to the specific requirements of our clients, enabling them to enhance their developer relations and drive adoption.
    </li>
    <li>
      <strong>Physical Workshops for Holistic Learning:</strong> We go beyond digital education by organizing physical workshops in colleges across India.
      Our team of experts travels the length and breadth of the country, imparting hands-on knowledge and fostering practical understanding of cutting-edge Web 3 technologies.
    </li>
    <li>
      <strong>End-to-End Web 3 Ecosystem Support:</strong> Connectverse is committed to supporting the entire Web 3 ecosystem. From providing valuable resources
      to facilitating partnerships and collaborations, we act as a catalyst for growth and innovation.
    </li>
    <li>
      <strong>Thought Leadership and Thoughtful Education:</strong> Our courses are designed and curated by industry experts, ensuring that our students receive the
      most up-to-date and relevant information. We embrace thought leadership and believe in empowering developers to think beyond boundaries.
    </li>
    <li>
      <strong>Secure and Trustworthy:</strong> Security is paramount in the Web 3 space, and we prioritize safeguarding the interests of our users.
      Trust is the foundation of our platform, and we maintain the highest standards of data privacy and integrity.
    </li>
  </ul>
</section>
    </div>

    </div>
  )
}

export default Courses