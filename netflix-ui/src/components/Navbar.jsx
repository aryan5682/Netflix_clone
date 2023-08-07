import React,{useEffect, useRef, useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/logo.png"
import { FaBars, FaPowerOff, FaSearch, FaTimes} from "react-icons/fa"
import { signOut ,onAuthStateChanged} from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
export default function Navbar({isScrolled}) {
    const navigate = useNavigate();
    // const [click,setClick]=useState(false);
    const navRef=useRef();
    const showNavbar=()=>{
        navRef.current.classList.toggle("responsive_nav");
    }
    const links=[
        {name:"Home",link:"/"},
        {name:"Tv Shows",link:"/tv"},
        {name:"Movies",link:"/movies"},
        {name:"My List",link:"/mylist"},
    ]
    const [showSearch ,setShowSearch]=useState(false);
    const [inputHover,setInputHover]=useState(false);
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(!currentUser) navigate("/login")
    });
  return (
    <Container>
       <nav className ={ `flex ${isScrolled ?"scrolled":""} `}>
    
        <div className="brand flex a-center j-center">
            <img src={logo} alt="logo"></img>
        </div>
        <div className ="left flex a-center">
        <ul className="links flex" ref={navRef}>
            { 
                links.map(({name,link})=>{
                      return (
                        <li key={name}><Link to={link}>{name}</Link>
                        </li>
                      )
                })
            }
            <button className="nav-btn nav-close-btn"onClick={showNavbar}><FaTimes/></button>
        </ul>
        <button className="nav-btn" onClick={showNavbar}><FaBars/></button>
        </div>
     
       <div className="right flex a-center">
         <div className={`search ${showSearch ? "show-search":""}`}>
         <button onFocus={()=>setShowSearch(true)} onBlur={()=>{
            if(!inputHover){
                setShowSearch(false);
            }
         }
        }>   
            <FaSearch/>
         </button>
         < input type="text" placeholder="Search"
            onMouseEnter={()=>setInputHover(true)}
            onMouseLeave={()=>setInputHover(false)}
            onBlur={()=>{
                setShowSearch(false);
                setInputHover(false);
            }}
            />
       </div>
        <button onClick={()=>signOut(firebaseAuth)}><FaPowerOff/></button>
       </div>
       </nav>
    </Container>
  )
}

const Container =styled.div`
min-width:300px;
.scrolled{
    background-color:black;
}
nav{
    min-width:300px;
    position:sticky;
    top:0;
     height:6.5rem;
    width:100%;
    justify-content:space-between;
    position:fixed;
    z-index:2;
    padding:0 4rem;
    align-items:center;
    transition:0.3s ease-in-out;
    .brand{
        img{
            height:4rem;
        }
    }
    .left{
        gap:2rem;
        .links{
            list-style-type:none;
            gap:2rem;
            li{
                a{
                    color:white;
                    text-decoration:none;
                }
            }
        }
    }
    .left .nav-btn{
    cursor:pointer;
    background: transparent;
    border:none;
    outline:none;
    color:white;
    visibility: hidden;
    font-size:1.5rem;}
    @media  (max-width:1024px){
        .left .nav-btn{
            visibility: visible;

         
        }
        .left .links{
            position:fixed;
            top:0;
            left:0;
           height:50%;
            /* width:100%; */
            min-width: 100%;
            display:flex;
            flex-direction:column;
            align-items: center;
            justify-content: center;
            gap:1.5rem;
            background-color:rgba(0,0,0,0.7);
            transition:1s;
            transform:translateX(-400vh);
        }
        .left .responsive_nav{
            transform :none;
        }
        .left .nav-close-btn{
            position:absolute;
            right:2rem;
            top:2rem;
        }
    }
    .right{
        gap:1rem;
        button{
            background-color:transparent;
            border:none;
            cursor:pointer;
            &:focus{
                outline:none;
            }
            svg{
                color:#f34242;
                font-size:1.2rem;
            }
        }
        .search{
            display:flex;
            gap:0.4rem;
            align-items:center;
            justify-content:center;
            padding:0.2rem;
            padding-left:0.5rem;
            button{
                background-color:transparent;
            }
            svg{
                color:white;
            }
        }
        input{
            width:0;
            opacity:0;
            visibility:hidden;
            transition:0.3s ease-in-out;
            background-color:transparent;
            border:none;
            color:white;
            &:focus{
                outline:none;
            }
        }
    }
    .show-search{
        border:1px solid white;
        background-color:rgba(0,0,0,0.6);
  input{
    width:100%;
    opacity:1;
    visibility:visible;
    padding:0.3rem;
  }
    }
}`;
