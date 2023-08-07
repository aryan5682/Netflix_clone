import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres, getUserLikedMovies } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import {onAuthStateChanged} from "firebase/auth"
import { styled } from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function UserLiked() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser) setEmail(currentUser.email);
        else navigate("/login");
    });
    //const genresLoaded=useSelector((state)=>state.netflix.genresLoaded);
    
    // const genres=useSelector((state)=>state.netflix.genres)
  
  useEffect(()=>{
   if(email){
    dispatch(getUserLikedMovies(email));
   }
  },[email])
//   useEffect(()=>{
//     if(genresLoaded){
//     dispatch(fetchMovies({type:"movies"}))
//     }
//    },[genresLoaded])
  
    window.onscroll=()=>{
        setIsScrolled(window.scrollY ===0 ? false:true);
        return ()=>(window.onscroll=null);
    };
  return (
    <Container>
     <Navbar isScrolled={isScrolled}/>
     <div className="content flex column">
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
     <h1>My List</h1>
     <div className='grid flex'>
        {movies && movies.map((movie,index)=>{
         return (<Card 
              movieData ={movie}
                index={index}
                key={movie.id}
                isLiked={true}
                />
         );
        })}
     </div>
     </div>
     </div>
    </Container>
  )
}
const Container =styled.div`
min-width:300px;
.content{
    margin:2.3rem;
     margin-top:8rem;
    gap:3rem;
}
h1{
    margin-left:3rem;
}
.grid{
    flex-wrap:wrap;
    justify-content:center;
    align-items:center;
    gap:1rem;
}
`;
