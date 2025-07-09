import React, { useState } from 'react';
import './App.css'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Alert } from '@mui/material';
// import "swiftie/taylor-swift.css";
// import "swiftie/fearless.css";
// import "swiftie/speak-now.css";
// import "swiftie/red.css";
// import "swiftie/1989.css";
// import "swiftie/reputation.css";
// import "swiftie/lover.css";
// import "swiftie/folklore.css";
// import "swiftie/evermore.css";
// import "swiftie/fearless-tv.css";
// import "swiftie/red-tv.css";
// import "swiftie/midnights.css";

function App() {

  document.body.style.backgroundImage = "url('https://img.buzzfeed.com/store-an-image-prod-us-east-1/nUca4TZAy.png?downsize=625%3A*&output-format=jpg&output-quality=auto')";
  
  const [songInfo, setSongInfo] = React.useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(20); //can be regular var bc it never changes
  const [gameCount, setGameCount] = useState(0); //change name to questionCount
  const [startGame, setStartGame] = useState(false);
  const [inputValue, setInputValue] = useState("");

  if (gameCount === totalScore) {
    endGame();
    // setCurrentScore(0);
    setStartGame(false);
    refreshLyric();
    // setSongInfo(null);
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
    let message = "";
    if (currentScore === 20) {
      message = "Swift AF ";
    } else if (currentScore >= 16) {
      message = "Yes, whale! (Taylor's Version)";
    } else if (currentScore >= 12) {
      message = "Mother is mothering";
    } else if (currentScore >= 8) {
      message = "you need to calm down...";
    } else if (currentScore >= 4) {
      message = "is this you trying?";
    } else {
      message = "now go stand in the corner and think about what you just did! ";
    }

    alert("Game Over! Score: " + currentScore + " / " + totalScore + "\n" + message + "\n" + "(Refresh page to play again)"
    );
  }

  function checkInput() {
    //if user input matches songInfo.title with fuzzy search, increase score and refresh
    const cleanTitle = songInfo.song_title
      .replace(/taylor['’]s version/gi, ' ')
      .replace(/10 minute version/gi, ' ')
      .replace(/\s*\(.*?\)\s*/g, ' ')
      .replace(/\\/g, '')
      .trim()
      .toLowerCase();

    console.log(cleanTitle);

    if (inputValue.trim().toLowerCase() === cleanTitle) {
      alert("Correct!");
      setCurrentScore((prev) => (prev + 1));

    } else {
      alert("Should've said (No) :  " + songInfo.song_title.replace(/\\/g, ''));

    }
      console.log("Cleaned Title: "+ cleanTitle);

    refreshLyric();
    setInputValue("");

    // console.log(songInfo.title);
    
  }

  console.log("Original Title: " + songInfo);

  console.log("Game Count: " + gameCount);

  return (
    <>
      <Container>
        
        <Box>
          <Typography variant="h5" sx={{ my: 4, display: "flex", textAlign: "center", color: "primary/main" }}
          >{currentScore} / {totalScore} {<Box px={19}></Box>} (but honestly, baby who's counting...)  
          {/* add timer here */}
          </Typography>

        </Box>

        <Box py={4}></Box>

        <Typography variant ="h4"sx={{ fontStyle: 'italic', my: 4, textAlign: "left", color: "primary/main" }}>can i ask you a question...?</Typography>
        <Typography variant="h2" sx={{ fontWeight: '450', my: 4, textAlign: "right", color: "primary/main" }} className="font-reputation"
        > ...are you ready for it? </Typography>

        <Box py={3}>
          <button variant="contained" className="font-reputation" color='gray' onClick={() => setGameCount(0) & setStartGame(true) & refreshLyric() } >let the games begin</button>
          <Box py={2} />


        <Typography

        >
          {songInfo.partialLyric}

        </Typography>

                <Box py={2}>

        </Box>
          {startGame &&
            <TextField id="outlined-basic" label="you're on your own, kid" variant="outlined" color="black"
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



        <Box py={1}> </Box>

        <Button
          variant="contained"
          color = "#c2c2d6"
          sx={{ px: 6, mx: 2, }}
          onClick={refreshLyric} 
        >
          Skip
        </Button>

        <Button
          variant="contained"
          color = "#c2c2d6"
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