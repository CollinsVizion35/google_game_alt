import React, { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import { TbArrowBigUpLines,TbArrowBigDownLines } from "react-icons/tb/index"
import { GiPistolGun } from "react-icons/gi/index"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // scoreboard
  const [Score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(Score + 121);
    }, 0.5);

    return () => {
      clearInterval(interval);
    };
  }, [Score]);

  // for lanes
  const lanes = Array.from({ length: 1000 }).map((_, index) => (
    <img src="/lane.png" key={index} alt={`Image ${index}`} />
  ));

  // for clouds
  const [clouds, setClouds] = useState([]);
  

  useEffect(() => {
    const newClouds = [];
    for (let i = 0; i < 5000; i++) {
      const left = Math.random() * 100000; // Random position between 0 and 100%
      const top = Math.random() * 5; // Random position between 0 and 100%
      newClouds.push({ left, top });
    }
    setClouds(newClouds);
  }, []);

  // for Spikes
  const [Spikes, setSpikes] = useState([]);
  

  useEffect(() => {
    const newSpikes = [];
    for (let i = 0; i < 5000; i++) {
      const left = Math.random() * 1000000; // Random position between 0 and 100%
      newSpikes.push({ left });
    }
    setSpikes(newSpikes);
  }, []);

  // for bikes
  const [position, setPosition] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [dock, setDock] = useState(12.5);

  const dinoRef = useRef()

  const moveUp = () => {
    setPosition(position - 150);
    // setRotate(rotate - 15);
  };

  // for arrow key
  useEffect(() => {
    const handleArrowKeyUp = (event) => {
      if (event.keyCode === 38) {
        setPosition(position - 150);
        console.log('Arrow Up key pressed');
      }
    };

    window.addEventListener('keyup', handleArrowKeyUp);

    // return () => {
    //   window.removeEventListener('keyup', handleArrowKeyUp);
    // };
  }, []);

  const moveDown = () => {
    setDock(8)
    dinoRef.current.style.marginTop = '4.25vh';
  };

  useEffect(() => {
    let timeout;
    if (position < 0 || dock < 12.5) {
      timeout = setTimeout(() => {
        setPosition(0);
        // setRotate(0);
        setDock(12.5);
        dinoRef.current.style.marginTop = '0';
      }, 1500);
      
    }
    return () => clearTimeout(timeout);
  }, [position, dock]);


  // for moving screen
  const [MovePosition, setMovePosition] = useState(0);
  const [isMoving, setIsMoving] = useState(true);
  const moveDivRef = useRef(null);

  useEffect(() => {
    function animate() {
      if (isMoving && Score < 5000) {
        setMovePosition(prevMovePosition => prevMovePosition - 20);
        requestAnimationFrame(animate);
      } else {
        setMovePosition(prevMovePosition => prevMovePosition - 100);
        requestAnimationFrame(animate);
        console.log('faster')
      }
    }

    animate();
  }, [isMoving]);

  // for contact
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);

  useEffect(() => {
    const div1 = div1Ref.current;
    const div2 = div2Ref.current;

    // Check if the two div elements are in contact by comparing their bounding rectangles
    const checkDivsContact = () => {
      if (div1?.getBoundingClientRect().right >= div2?.getBoundingClientRect().left) {
        console.log('The two divs are in contact!');
      }
    };
    

    // Call the checkDivsContact function on mount and on resize
    checkDivsContact();
    // window.addEventListener('resize', checkDivsContact);

    // // Cleanup the event listener on unmount
    // return () => {
    //   window.removeEventListener('resize', checkDivsContact);
    // };
  }, []);

  return (
    <>
  {/* scoreboard */}
  <div className={`${inter} scoreBoard absolute flex flex-row justify-around py-6 px-12 `}>
    <div className="mr-3 fixed left-[5vw] text-3xl z-[999999]">
      <span className="mr-2">High Score:</span>
      <span>200000</span>
    </div>
    <div className="mr-3 fixed right-[5vw] text-3xl z-[999999]">
      <span className="mr-2">Score:</span>
      <span>{Score}</span>
    </div>
  </div>
    {/* main */}
      <main style={{transform: `translateX(${MovePosition}px)`,}} className='main bg-white h-[100vh] w-[100vw] ' ref={moveDivRef}>
        {/* clouds */}
        {clouds.map((cloud, index) => (
          <div className="flex flex-row">
            <img
              key={index}
              src="/cloud.png"
              style={{
                position: "absolute",
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
                marginRight: "200em",
              }}
            />
          </div>
        ))}

        {/* Spikes */}
        {Spikes.map((spike, index) => (
          <div className="flex flex-row">
            <img
            ref={div2Ref}
              key={index}
              src="/spike2.png"
              style={{
                position: "absolute",
                left: `${spike.left}%`,
                marginRight: "200em",
              }}
              className="w-[1.125vw] h-[10vh] top-[88vh]"
            />
          </div>
        ))}

        {/* lanes */}
        <div className="flex flex-row absolute bottom-0">{lanes}</div>

        
      </main>

      {/* dino */}
      <div ref={div1Ref} className=" pt-[30vh]">
      <div
        className="absolute w-[19.375vw] left-1 top-1"
        style={{ transform: `translateY(${position}px) rotate(${rotate}deg)` }}
      >
        <img ref={dinoRef} src="/dino.png" alt="dino" className="lg:w-[3vw] w-[6.25vw] h- fixed lg:left-[24.3vw] left-[25.5vw] top-[84.4vh]" style={{height: `${dock}vh`}}/>
        <img src="/bike.png" alt="bike" className="lg:w-[12vw] w-[18.75vw] h-[10vh] fixed left-[20vw] top-[90vh]"/>
      </div>
    </div>

      
      <button className="absolute right-14 bottom-14 rounded-full p-1 border-black border" onClick={moveUp}><TbArrowBigUpLines className="text-4xl"/></button>
      <button className="absolute right-14 bottom-2 rounded-full p-1 border-black border" onClick={moveDown}><TbArrowBigDownLines className="text-4xl"/></button>
      <button className="absolute right-3 bottom-8 rounded-full p-1 border-black border" onClick={moveUp}><GiPistolGun className="text-4xl"/></button>
      
    </>
  );
}
