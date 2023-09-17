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

<br></br>
<br></br>
<Row style={{marginLeft:'3em'}}>

    <Col>
    
      <Card style={cardStyles}>
        <Card.Img  variant="top" src={card1} />
        <Card.Body>
          <Card.Title>Intro to Programming</Card.Title>
          {localStorage.getItem('name')? <Link to="/testing"><Button variant="primary" onClick={()=>{
            
          }}  >Let's Go</Button></Link>:
          <Button variant="primary" onClick={signInWithGoogle}>Let's Go</Button>

          
          }
         
        </Card.Body>
      </Card>
    </Col>
   
    <Col>
      <Card style={cardStyles}>
        <Card.Img variant="top" src={card2} />
        <Card.Body>
          <Card.Title>Basic Web Development</Card.Title>
        
          {localStorage.getItem('name')? <Link to="/testing2"><Button variant="primary" onClick={()=>{
           
          }} >Let's Go</Button></Link>:
          <Button variant="primary" onClick={signInWithGoogle}>Let's Go</Button>

          
          }
        </Card.Body>
      </Card>
    </Col>
    <Col>
      <Card style={cardStyles}>
        <Card.Img variant="top" src={card3} />
        <Card.Body>
          <Card.Title>Blockchain Development</Card.Title>
          {localStorage.getItem('name')? <Link to="/testing3"><Button variant="primary" onClick={()=>{
          
          }} >Let's Go</Button></Link>:
          <Button variant="primary" onClick={signInWithGoogle}>Let's Go</Button>

          
          }
        </Card.Body>
      </Card>
    </Col>
  </Row>
    </div>
  )
}

export default Courses