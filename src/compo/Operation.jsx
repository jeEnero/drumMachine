import * as React from 'react';
import { useEffect, useState } from 'react';


const audioClips = [
    {
      keycode: 81,
      keypad: "Q",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      displayText: "Heater 1"
    },
   {
      keycode: 87,
      keypad: "W",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      displayText: "Heater 2"
    },
     {
      keycode: 69,
      keypad: "E",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      displayText: "Heater 3"
    },
     {
      keycode: 65,
      keypad: "A",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      displayText: "Heater 4"
    },
     {
      keycode: 83,
      keypad: "S",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      displayText: "Clap"
    },
      {
        keycode: 68,
      keypad: "D",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      displayText: "Open HH"
    },
     {
      keycode: 90,
      keypad: "Z",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      displayText: "Kick n' Hat"
    },
     {
      keycode: 88,
      keypad: "X",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      displayText: "Kick"
    },
     {
      keycode: 67,
      keypad: "C",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      displayText: "Closed HH"
    }
];




function Equal () {
const [volume, setVolume] = useState(1);
const [recording, setRecording] = useState("");


const playRecord = () =>{
let index = 0
  let recordArray = recording.split(" ");
 const interval = setInterval(() =>{
  const sound = document.getElementById(recordArray[index])
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
  index++
 },300 )

}
       return (
 <div className = "min-vh-100 text-white">
        <div className='text-center'>
            {audioClips.map(clip => (
                <Pad key={clip.displayText} clip = {clip}  volume = {volume} setRecording = {setRecording} />
            ))}
            <br/>
            <h2>Volume</h2>
            <input 
              type="range"
              className='w-58'
              onChange={ (e) => setVolume(e.target.value)}
              max='1'
              min  = '0'
              step='.01'
            volume = {volume}
            />
         <h3>{recording}</h3>
           { recording && (
              <>
                <button className='btn btn-success m-4' onClick={playRecord}>play</button>
                <button onClick={ () => setRecording("")} className='btn btn-danger'>clear</button>
              </>


           )}

        </div>
</div>
       )
}


function Pad( {clip, volume, setRecording} ) {
const [active, setActive] = useState(false)
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
  }, [])

const handleKeyPress  = (e) => {
if (e.keyCode === clip.keycode){
  playSound();

}
}
  const playSound = () => {
    const sound = document.getElementById(clip.keypad)

    setActive(true)
    setTimeout(() => setActive(false), 200)
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
    setRecording ( prev => prev + clip.keypad + " ")

  }
    return(
  
            <div className="btn btn-secondary p-4 m-3" onClick={playSound}>
                    <audio  src={clip.audio}  id={clip.keypad} ></audio>
                        {clip.keypad }
            </div>
    );
    }
export default Equal;