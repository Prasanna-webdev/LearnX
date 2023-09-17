 // import "./App.css";
import { useState,useEffect } from "react";
import { signInWithGoogle } from "./firebase-config";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import { db } from "./firebase-config";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
  } from "firebase/firestore";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Card, Button, Row, Col } from 'react-bootstrap';
import card1 from './images/card1.png'
import card2 from './images/card2.png'
import card3 from './images/card3.png'
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import { ethers } from 'ethers';
import './App.css';
import logo from './images/logo2.png'
import heading from './images2/heading.png'
import Home from './pages/Home'
import Testing from './pages/Testing';
import Testing2 from './pages/Testing2'
import Testing3 from './pages/Testing3'
import Testing4 from './pages/Testing4'
import Testing5 from './pages/Testing5'
import Testing6 from './pages/Testing6'
import Testing7 from './pages/Testing7'
import HomePage from "./HomePage";
import NewHome from './NewHome'
import Course1 from "./pages/Course1"
import Courses from './Courses'
import DevRel from './DevRel'
import Transfer from "./Transfer";
import { Routes, Route,Link } from "react-router-dom";

function App() {

  const [loginButtonColor,setLoginButtonColor]=useState('button-1')
  const [loginButtonText,setLoginButtonText]=useState('Sign in ')
  const [loginImage,setLoginImage]=useState(false)
  const [loginButtonImage,setLoginButtonImage]=useState('')
  const [account,setAccount]=useState('Connect Wallet')
  const [accountShow,setAccountShow]=useState('')
  const [balance,setBalance]=useState(0)
  const [show, setShow] = useState(false);
  const courseCollectionRef = collection(db, "courses");
  const usersCollectionRef = collection(db, "usercourse");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  AOS.init();

  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
	// Global settings:
	disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	initClassName: 'aos-init', // class applied after initialization
	animatedClassName: 'aos-animate', // class applied on animation
	useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
	
  
	// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	offset: 120, // offset (in px) from the original trigger point
	delay: 0, // values from 0 to 3000, with step 50ms
	duration: 400, // values from 0 to 3000, with step 50ms
	easing: 'ease', // default easing for AOS animations
	once: false, // whether animation should happen only once - while scrolling down
	mirror: false, // whether elements should animate out while scrolling past them
	anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });

  let abi= [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "modules",
				"type": "uint256"
			}
		],
		"name": "addCourse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "modules",
				"type": "uint256"
			}
		],
		"name": "addModules",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "claimCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "module",
				"type": "uint256"
			}
		],
		"name": "completeModule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "createCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_phono",
				"type": "string"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "moduleId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "linkString",
				"type": "string"
			}
		],
		"name": "setLink",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "certificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "email",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "getCourseById",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "moduleId",
				"type": "uint256"
			}
		],
		"name": "getLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "moduleId",
				"type": "uint256"
			}
		],
		"name": "isModuleComplete",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isRegistered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "link",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "modulesCompleted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numberOfCourses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "numberOfModules",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "phono",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
 
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
  

  useEffect(async () => {
    
    if(localStorage.getItem("name"))
    {
		
      setLoginButtonColor('button-3')
      setLoginButtonText('Logged in as '+localStorage.getItem("name"))
      setLoginButtonImage(localStorage.getItem("profilePic"))
      setLoginImage(true)
      console.log(localStorage)
	  const data = await getDocs(courseCollectionRef);
	
	  localStorage.setItem("myname","Pranav Verma")
	  const coursedata=data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
	 
	  let blockchain=[];
	  
	  localStorage.setItem("blockchain",JSON.stringify(coursedata[0].blockchain))
	  localStorage.setItem('courseinfo',JSON.stringify(coursedata[0]))
	  

	  const user = await getDocs(usersCollectionRef);
	  const userdata=user.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
	  localStorage.setItem("userdata",JSON.stringify(userdata))
	 let flag=0;
	  for (let i = 0; i < userdata.length; i++) {
		const element = userdata[i];
		if(element.email==localStorage.getItem("email")) {
			// localStorage.setItem("iscompletedbasicofblockchain",JSON.stringify(userdata[i].basicsofblockchain))
			// localStorage.setItem("mila?","yes")
	  console.log(userdata[i].email
		)
		localStorage.setItem("userinfo",JSON.stringify(userdata[i]))
		flag=flag+1;
		localStorage.setItem("userId",userdata[i].id)
		}

		// const isComplete=JSON.parse(localStorage.getItem("iscompletedbasicofblockchain"))
		// console.log(isComplete)
		
	  }
	  
	
	  if(flag==0)
	  {
		await addDoc(usersCollectionRef, {
			name: localStorage.getItem("name"),
			email: localStorage.getItem("email"),
			basicsofblockchain: [""],basicprogramming: [""],solidity:[""],dsa:[""],htmlcssjs:[""],reactjs:[""],reactjs:[""]
		  });
		  
		window.location.reload(true)
		
	  }

	  console.log(JSON.parse(localStorage.getItem('blockchain')))

   
    }

	
      
     
    

  
   
  }, [])
  
  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        
        localStorage.setItem('account',accounts[0].substring(0,4)+"...."+accounts[0].substring(38,42))
        setAccount(accounts[0].substring(0,4)+"...."+accounts[0].substring(38,42));
        setAccountShow(accounts[0])

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balanc=await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balanc))
        
        const signer = provider.getSigner();
        const contractAddress = "0xed003f0709Ec34c4e9B1DF990B928Fd029eD1681";
       
        const contract = new ethers.Contract(contractAddress, abi, signer);
        alert('hello')
       
        
        // contract.modulesCompleted(accounts[0], 0, 0).then((data)=>{
        //     alert(data);
        //     console.log(data);
        //     if(data==true)
        //     {
        //       localStorage.setItem("text", 'Completed');
        //       localStorage.setItem("color", 'success');
        //       window.location.reload(true)
        //       // setMarkAsCompleteText('Completed');
        //       // setMarkAsCompleteColor('success')
        //     }
           
        // }).catch((err)=>{
        //     alert(err);
        //     console.log(err);
        // })

        // localStorage.setItem('C0M0','false')
        // localStorage.setItem('C0M1','false')
        // localStorage.setItem('C0M2','false')
        // localStorage.setItem('C0M3','false')
        // localStorage.setItem('C0M4','false')
       
        let courses=ethers.BigNumber.from(await contract.numberOfCourses()).toNumber()
        console.log(courses)
        alert(courses)
        let user=[]

        for(let i=0;i<courses;i++) {

          let obj={}
          
          obj.id=i;
          
          let modules=ethers.BigNumber.from(await contract.numberOfModules(i)).toNumber()
            alert(modules)
          obj.numberOfModules=modules

          obj.isModuleComplete={};


          for(let j=0;j<modules;j++) {

            let isComplete=await contract.modulesCompleted(accounts[0],i,j)
            obj.isModuleComplete[`${j}`]=isComplete

          }
          user.push(obj)
          for(let i=0;i<user.length;i++)
          {
            let flag=0;
            for(let j=0;j<user[i].numberOfModules;j++)
            {
                if(user[i].isModuleComplete[`${j}`]==false)
                {
                    flag=1;
                    break;
                }
            }
            if(flag==0)
            {
                localStorage.setItem(`C${i}`,'true')
            }
            else
            {
                localStorage.setItem(`C${i}`,'false')
            }

          }
          localStorage.setItem('user',JSON.stringify(user))

          
		
        }
        
        

        


      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0].substring(0,4)+"...."+accounts[0].substring(38,42));
      setAccountShow(accounts[0])
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const balanc=provider.getBalance(accountShow);
      setBalance(ethers.utils.formatEther(balanc))
      const contractAddress = "0xed003f0709Ec34c4e9B1DF990B928Fd029eD1681";
       
      const contract = new ethers.Contract(contractAddress, abi, signer);
      alert('hello')
     
      


      let courses=ethers.BigNumber.from(await contract.numberOfCourses()).toNumber()
      console.log(courses)
      alert(courses)
      let user=[]

      for(let i=0;i<courses;i++) {

        let obj={}
        
        obj.id=i;
        
        let modules=ethers.BigNumber.from(await contract.numberOfModules(courses-1)).toNumber()

        obj.numberOfModules=modules

        obj.isModuleComplete={};


        for(let j=0;j<modules;j++) {

          let isComplete=await contract.modulesCompleted(accounts[0],i,j)
          obj.isModuleComplete[`${j}`]=isComplete

        }
        user.push(obj)
        

        

      }
      localStorage.setItem('user',JSON.stringify(user))
      window.location.reload(true)


      
    }
    else{
      setShow(true)
      // window.open("https://metamask.io/download/", '_blank');
    }
  }
  return (
    <div className="App">
      <br/>
	  <center>
	  <img  style={{width:'300px',borderRadius:'40px'}} src={logo}/>
	  </center>
	  <div  class="cnav">
<div  data-aos="fade-up" data-aos-once="false" data-aos-duration="1000" class="cnavpart1">
	






</div>
	
	 

	
	  <div class="cnavpart2">

	  
		
		
	  <button  data-aos="fade-up" data-aos-once="false" data-aos-duration="2000"   class="cbutton" onClick={
        

        connectWallet}>{localStorage.getItem('account')?localStorage.getItem('account'):account}</button>
       
		&nbsp;&nbsp;&nbsp;&nbsp;
		
          {loginImage==true?<div class="login">
    
      
      <img style={{height:'2.5em',width: '2.5em' ,borderRadius: '3em'}} src={loginButtonImage} alt="Circular Image"/>
</div>:<div><button  data-aos="fade-up" data-aos-once="false" data-aos-duration="2000" class="cbutton" onClick={signInWithGoogle}>
        {loginButtonText}
      </button></div>}

	  </div>
	  <div>


		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	  </div>

	 
	  </div>
	  
	  
      
    
	
    
      {/* <div class="full-size-div">hello</div> */}
      {/* <HomePage/> */}
      {/* <Switch>
        <Route path="/course1" component={Home} />
        <Route path="/course2" component={Home} />
        <Route path="/course3" component={Home} />
      </Switch> */}
	  
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/devrel" element={<DevRel />} />
      <Route path="/course1" element={<Course1 />} />
      <Route path="/hello" element={<Home />} />
      <Route path="/Testing" element={<Testing />} />
      <Route path="/Testing2" element={<Testing2 />} />
      <Route path="/Testing3" element={<Testing3 />} />
	  <Route path="/Testing4" element={<Testing4 />} />
	  <Route path="/Testing5" element={<Testing5 />} />
	  <Route path="/Testing6" element={<Testing6 />} />
	  <Route path="/Testing7" element={<Testing7 />} />
	  <Route path="/newhome" element={<NewHome />} />
	  <Route path="/transfer" element={<Transfer/>} />
      {/* <Route path="/player" element={<Player />} />
      <Route path="/About" element={<Player />} /> */}
    </Routes>

      <br></br>
      <br></br>
    {/* <Navbar bg="black" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand href="#home" style={{color:"white"}}>2023 @Connectverse PVT</Navbar.Brand>
        <div style={{color:"white"}}>Privacy Policy</div>
      
        
        <Nav className="me-auto" style={{color:"white"}} >
         
          <Nav.Link href="#termsofuse" style={{color:"white"}}>Terms of Use</Nav.Link>
        </Nav>
      </Container>
    </Navbar> */}
    <center><footer style={{padding:"15px", color:"#fff",backgroundColor:"#000"}}> &copy; 2023 all rights reserved @LearnX &nbsp;<a href="https://twitter.com/" class="fa fa-twitter"></a> &nbsp; <a href="https://www.linkedin.com/" class="fa fa-linkedin"></a> &nbsp; <a href="https://youtube.com/" class="fa fa-youtube"></a> </footer></center>
    


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Wallet not connected</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Make sure that you have wallet installed on your browser
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            window.open("https://metamask.io/download/", '_blank');
          }}>Install Wallet</Button>
        </Modal.Footer>
      </Modal>



    </div>
  );
}

export default App;