import {createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import BackgroundImage from '../components/BackgroundImage'
import Header from '../components/Header'
import {firebaseAuth} from "../utils/firebase-config";
export default function Signup() {
    const[showPassword,setShowPassword] =useState(false);
    const navigate = useNavigate();
    const [formValues,setFormValues]=useState({
        email:"",
        password:"",
    })
    const handleSignIn = async ()=>{
        try{
            const {email,password}=formValues;
            await createUserWithEmailAndPassword(firebaseAuth,email,password);
        }
        catch(err){
         console.log(err);
        }
    };
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser) navigate("/")
    });
  return (
    <div>
<Container showpassword={showPassword.toString()}>
        <BackgroundImage/>
        <div className="content">
        <Header login/>
        <div className="body flex column a-center j-center">
            <div className="text flex column" style={{display:'flex',flexWrap:'wrap', minWidth:'300px'}}>
                <h1>Unlimited movies,Tv shows and more</h1>
                <h4>Watch anywhere.Cancel anytime</h4>
                <h6>Ready to watch? Enter your email to create or restart membership</h6>
            </div>
            <div className="form">
                <input type ="email" placeholder ="Email Address" name="email" values={formValues.email} onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})}/>
                {showPassword && (<input type ="password" placeholder ="Password" name="password"  values={formValues.password} onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})}/>)}
                {!showPassword && <button className="btnp" onClick={()=>setShowPassword(true)}>Get Started</button>}
            </div>
            <button onClick={handleSignIn}>Sign Up</button>
        </div>
        </div>
       
</Container>
</div>
  )
}
const Container=styled.div`
 position:relative;
 min-width:300px;
.content{
    position:absolute;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.5);
    width:100vw;
     height:100%;
    //display:grid;
    //grid-template-rows:15vh 85vh;
    .body{
        gap:1rem;
        .text{
        gap:1rem;
        margin-top:3rem;
        text-align:center;
        font-size:1.5rem;
        h1{
            padding:0 25rem;
        }
        }
        .form{
            // display:grid;
            // grid-template-columns:${({showPassword})=>showPassword ? "1fr 1fr":"2fr 1fr"};
            display:flex;
            flex-wrap:wrap;
            justify-content:center;
            align-items:center;

            width:50%;
            input{
                color:black;
                border:none;
                padding:1.5rem;
                font-size:1.2rem;
                border:1px solid black;
                &:focus{
                    outline:none;
                }
               
                
            }
            .btnp{
                width:200px;
                height:70px;
            }
            button{
            padding:0.5rem 1rem;
            background-color:#e50914;
            border:none;
            cursor:pointer;
            color:white;
            border-radius:0.2rem;
            font-weight:bolder;
            font-size:1.05rem;
            }
        }
        button{
            padding:0.5rem 1rem;
            background-color:#e50914;
            border:none;
            cursor:pointer;
            color:white;
            border-radius:0.2rem;
            font-weight:bolder;
            font-size:1.05rem;
            }
    }
    }
   
}`;
