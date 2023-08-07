import React from 'react'
import Background from "../assets/login.jpg";
import styled from "styled-components"
export default function BackgroundImage() {
  return (
    <Container>
      <img src={Background} alt="background"/>
    </Container>
  )
}
const Container =styled.div`
min-width:300px;
height: 100vh;
width: 100vw;
img{
  height: 100vh;
  width: 100vw;
    min-width:300px;
}
`;