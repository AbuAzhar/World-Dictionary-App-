import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.scss";
const colors = {
  color: "silver",
}
export default function Results({ Data }) {
  const [open, setOpen] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // State to store audio URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${Data}`;
        const response = await axios.get(api);
        const { word, phonetics, meanings } = response.data[0];
        const { audio } = phonetics[0];
        const { partOfSpeech, definitions } = meanings[0];
        
        const definitionList = definitions.map(def => def.definition);
        
        const obj = {
          word: word,
          partOfSpeech: partOfSpeech,
          definitions: definitionList
        };
        
        setOpen(obj);
        setAudioUrl(audio); // Set audio URL to state
      } catch (error) {
        console.log("Error fetching data:", error);
        setOpen({});
      }
    };

    fetchData();
  }, [Data]);

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div className="Result">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="Results">
          <div className="wordName">
            <p className="wordTitle">
              {open ? open.word : "PLEASE SEARCH WORD..."}
            </p>
            {open && (
              <button onClick={playAudio}>{<VolumeUpIcon />}</button>
            )}
          </div>
        </AppBar>
      </Box>
      {open && (
        <div className="resultContent">
          <p style={colors}>
            <strong style={{color:"white"}}>Definition of Word: </strong>
            {open.definitions && open.definitions.length > 0
              ? open.definitions[0]
              : "No definition available"}
          </p>
          <br />
          <h2>{open.partOfSpeech}</h2>
          {open.definitions && open.definitions.length > 1 && (
            <div>
              <h4 style={colors}>{open.definitions[1]}</h4>
              <br />
            </div>
          )}
          {open.definitions && open.definitions.length > 2 && (
            <div>
              <h4 style={colors}>{open.definitions[2]}</h4>
              <br />
            </div>
          )}
          <h4>Examples</h4>
          <ol style={{marginLeft:"15px", display:"flex", flexDirection:"column", gap:"10px"}}>
            {open.definitions &&
              open.definitions.slice(1).map((def, index) => (
                <li style={colors} key={index}>{def}</li>
              ))}
          </ol>
        </div>
      )}
    </div>
  );
}
