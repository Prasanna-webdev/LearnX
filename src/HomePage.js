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
import etherjs from './images/ethersjs.png'
import webdev from './images/hcj.png'
import reactjs from './images/reactjs.png'
import blockchain from './images/bb.png'
import solidity from './images/solidity.jpg'
import dsa from './images/dsa.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Navbar from 'react-bootstrap/Navbar';
import Typewriter from 'typewriter-effect';
import heading from './images2/heading.png'
import header from './images/header3.png'
import './App.css';
import logo from "./images/logo.png";
import Home from './pages/Home'
import './HomePage.css'
import { Routes, Route,Link } from "react-router-dom";

function HomePage() {

    const [loginButtonColor,setLoginButtonColor]=useState('button-1')
  const [loginButtonText,setLoginButtonText]=useState('Sign in')
  const [loginImage,setLoginImage]=useState(false)
  const [loginButtonImage,setLoginButtonImage]=useState('')

  let courseObj=[{id:0,name:'Intro to Programming',img:card1,}]

 
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
      
      // width:'15em',
      // backgroundIimage: 'linear-gradient(to bottom right, yellow, orange)',
      // color: 'black', // Set text color to white for better visibility on the gradient background
      // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle box shadow
      width:'15em',
     
border: '0.65px solid rgba(255, 255, 255, 0.12)',
background: 'rgba(255, 255, 255, 0.08)',
color:'white',
padding:'15px'
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
    <div id="home"></div>

    <center><img style={{backgroundColor:'rgba(255,255,255,0.2)',borderRadius:'40px',width:'500px'}} class="heading" src={header} alt="Heading" /></center>
   <center>

    
  
<center>

    <Home string={["Made using Spheron & Router Protocol"]}/>
 
    </center>
    </center>
    
    <br></br>
    <br></br>
   
    <hr></hr>
    {/* <div style={{color:'yellow',marginLeft:'5em'}} >
    <span class="bigger">&raquo;</span> Our Courses
    </div> */}
   
  
   

    <div class="coursecards">
    
    <div >
    
    <Card style={cardStyles}>
      <Card.Img  variant="top" src={blockchain} style={{width:'230px',height:'200px'}} />
      <br></br>
      <Card.Body>
        <Card.Title>Blockchain Basics &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Card.Title>
        <br></br>
        {localStorage.getItem('name')? <Link to="/testing3"><button class="cbutton" onClick={()=>{
           
          }} >explore more</button></Link>:
          <button class="cbutton" onClick={signInWithGoogle}>Let's Go </button>

          
          }
       
      </Card.Body>
    </Card>
  </div>
 

    <div >

    
      <Card style={cardStyles}>
        <Card.Img  variant="top" src={solidity} style={{width:'230px',height:'200px'}} />
        <br></br>
        <Card.Body>
          <Card.Title>Blockchain Backend: Solidity Programming &nbsp;&nbsp;&nbsp;</Card.Title>
          <br></br>
          {localStorage.getItem('name')? <button class="cbuttoncomingsoon"  onClick={()=>{
          
        }}  >coming soon </button>:
          <button class="cbutton" onClick={signInWithGoogle}>explore more</button>

          
          }
         
        </Card.Body>
      </Card>
    </div>
   
    
    

    <div >
      <Card style={cardStyles}>
        <Card.Img variant="top" src={webdev} style={{width:'230px',height:'200px'}} />
        <br></br>
        <Card.Body>
          <Card.Title>Basic Web Development: HTML, CSS & JavaScript</Card.Title>
          <br></br>
          {localStorage.getItem('name')? <button class="cbuttoncomingsoon"  onClick={()=>{
          
        }}  >coming soon </button>:
          <button class="cbutton" onClick={signInWithGoogle}>explore more</button>

          
          }
        </Card.Body>
      </Card>
    </div>
    <div >
      <Card style={cardStyles}>
        <Card.Img variant="top" src={reactjs} style={{width:'230px',height:'200px'}} />
        <br></br>
        <Card.Body>
          <Card.Title> React JS: Mastery Series</Card.Title>
          <br></br>
          {localStorage.getItem('name')? <button class="cbuttoncomingsoon"  onClick={()=>{
          
        }}  >coming soon </button>:
          <button class="cbutton" onClick={signInWithGoogle}>explore more</button>

          
          }
        </Card.Body>
      </Card>
    </div >

    <div>
      <Card style={cardStyles}>
        <Card.Img variant="top" src={etherjs} style={{width:'230px',height:'200px'}}/>
        <br></br>
        <Card.Body>
          <Card.Title>Frontend Blockchain Development: Ether JS</Card.Title>
          <br></br>
          {localStorage.getItem('name')? <button class="cbuttoncomingsoon"  onClick={()=>{
          
        }}  >coming soon </button>:
          <button class="cbutton" onClick={signInWithGoogle}>explore more</button>

          
          }
        </Card.Body>
      </Card>
    </div>
    
  </div>
    <br></br>
    <br></br>

<div id="devrel" ></div>
<br></br>
<br></br>
<center>

   
    </center>
<br></br>
<br></br>
    
    <br></br>

    </div>
  )
}

export default HomePage