import React, { useState } from 'react';
import './App.css'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Container, Typography } from '@mui/material';
import Fuse from 'fuse.js';

function App() {
  const [songInfo, setSongInfo] = React.useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(20);
  const [gameCount, setGameCount] = useState(0);
  const [startGame, setStartGame] = useState(false)
  const [inputValue, setInputValue] = useState("");

  if (gameCount === totalScore) {
    endGame();
  }

  // const requestLyrics = {
  //   method: "GET",
  //   redirect: "follow"
  // };

  function refreshLyric() {
    setGameCount((prev) => (prev + 1));
    async function getData() {
      //handle randomizer
      const randomInt = Math.floor(Math.random() * 208) + 1;
      const randomMin = Math.floor(Math.random() * 10) + 1;
      const randomMax = randomMin + 2;

      //api call
      const response = await fetch("https://taylor-swift-api.sarbo.workers.dev/lyrics/" + randomInt);
      const data = await response.json();
      let partialLyric = data.lyrics;
      partialLyric = partialLyric.split("\n").slice(randomMin, randomMax).join("\n");
      const correctTitle = data.song_title;

      console.log(randomMin, randomMax);
      console.log("Correct Title: ", correctTitle);

      data.partialLyric = partialLyric;

      setSongInfo(data);
    }
    getData();

  }

  // function getHint() {
  //   console.log(albumHint);
  // }

  function endGame() {
    alert("Game Over! Score: " + currentScore + " / " + totalScore);

  }

  function checkInput() {
    //if user input matches songInfo.title with fuzzy search, increase score and refresh
    const cleanTitle = songInfo.song_title
      .replace("Taylor's version", " ")
      .replace("10 minute version", " ")
      .trim()
      .toLowerCase();
    console.log(cleanTitle);

    if (inputValue.trim().toLowerCase() == cleanTitle) {
      alert("Correct!");
      setCurrentScore((prev) => (prev + 1));

    } else {
      alert("Incorrect!");

    }
    // setGameCount((prev) => (prev + 1));
    refreshLyric();
    setInputValue("");

    // console.log(songInfo.title);
    console.log(cleanTitle);
  }

  console.log(songInfo);

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ my: 4, textAlign: "left", color: "primary/main" }}
        >Score: {currentScore} / {totalScore}  </Typography>

        <Typography variant="h4" sx={{ my: 4, textAlign: "right", color: "primary/main" }}
        >Timer: </Typography>

        <Typography variant="h3" sx={{ my: 4, textAlign: "center", color: "primary/main" }}
        >Are you ready for it?</Typography>

        <Box py={1.5}>

          <button onClick={() => setStartGame(true) & refreshLyric()}>Start</button>

          <Box py={1.5} />

          {startGame &&
            <TextField id="outlined-basic" label="you're on your own, kid" variant="outlined"
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  checkInput()
                };
              }}

            />
          }

        </Box>

        {/* <Button
          variant="contained"
          sx={{ px: 6, mx: 2, }}
          onClick={getHint}
        >
          Hint
        </Button> */}

        <Box py={1}>

        </Box>

        <Typography

        >
          {songInfo.partialLyric}

        </Typography>

        <Box py={1}></Box>

        <Button
          variant="contained"
          sx={{ px: 6, mx: 2, }}
          onClick={refreshLyric}

        >
          Skip
        </Button>

        <Button
          variant="contained"
          sx={{ px: 6, mx: 2, }}
          onClick={checkInput}

        >
          Submit
        </Button>


      </Container>
    </>

  )
}

export default App