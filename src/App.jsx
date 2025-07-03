import React, { useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Container, Typography } from '@mui/material';

function App() {

  const [results, setResults] = React.useState([]);


  const requestLyrics = {
    method: "GET",
    redirect: "follow"
  };

  function handleClick() {
    //   fetch(
    //     "https://taylor-swift-api.sarbo.workers.dev/lyrics/" + randomInt,
    //     requestLyrics
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setResults(data.data);
    //       console.log(data);
    //     })

    //     .catch((error) => {
    //       console.error('Error:', error);
    //     });
    // }

    async function getData() {
      const randomInt = Math.floor(Math.random() * 208) + 1;
      const response = await fetch("https://taylor-swift-api.sarbo.workers.dev/lyrics/" + randomInt);
      const data = await response.json();
      console.log(data);
    }
    getData();
  }


  return (
    <>
      <Container>
        <Typography variant="h1" sx={{ my: 4, textAlign: "center", color: "primary/main" }}
        >Are you ready for it?</Typography>

        <Button
          variant="contained"
          sx={{ px: 6, mx: 2, }}
          onClick={handleClick}
        >
          Next Lyrics
        </Button>

        <Box py={2}></Box>

        <Typography

        >
          test
        </Typography>


      </Container>
    </>

  )
}

export default App
