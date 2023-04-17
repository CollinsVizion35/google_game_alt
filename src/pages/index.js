import React, { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import { TbArrowBigUpLines,TbArrowBigDownLines } from "react-icons/tb/index"
import { GiPistolGun } from "react-icons/gi/index"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
    for (let i = 0; i < 500; i++) {
      const left = Math.random() * 10000; // Random position between 0 and 100%
      newSpikes.push({ left });
    }
    setSpikes(newSpikes);
  }, []);

  // for bikes
  const [position, setPosition] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [dock, setDock] = useState(100);

  const moveUp = () => {
    setPosition(position - 100);
    setRotate(rotate - 15);
  };
  const moveDown = () => {
    setDock(50)
  };

  useEffect(() => {
    let timeout;
    if (position < 0 || dock < 51) {
      timeout = setTimeout(() => {
        setPosition(0);
        setRotate(0);
        setDock(100)
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [position]);


  // for moving screen
  const [MovePosition, setMovePosition] = useState(0);
  const [isMoving, setIsMoving] = useState(true);
  const moveDivRef = useRef(null);

  useEffect(() => {
    function animate() {
      if (isMoving) {
        setMovePosition(prevMovePosition => prevMovePosition - 20);
        requestAnimationFrame(animate);
      }
    }

    animate();
  }, [isMoving]);

  return (
    <>
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
          <div className="absolute flex flex-row bottom-6 w-[50px] h-[80px]">
            <img
              key={index}
              src="/spike2.png"
              style={{
                left: `${spike.left}%`,
                marginRight: "200em",
              }}
              className="w-[50px] h-[80px]"
            />
          </div>
        ))}

        {/* lanes */}
        <div className="flex flex-row absolute bottom-0">{lanes}</div>

        
      </main>

      {/* dino */}
      <div className=" pt-[30vh]">
      <div
        className="absolute w-[155px] left-[20vw] top-[77vh]"
        style={{ transform: `translateY(${position}px) rotate(${rotate}deg)` }}
      >
        <img src="/dino.png" alt="dino" className="w-[50px] fixed left-11" style={{height: `${dock}px`}}/>
        <img src="/bike.png" alt="bike" className="w-[150px] h-[80px] fixed top-11"/>
      </div>
    </div>

      
      <button className="absolute right-14 bottom-14 rounded-full p-1 border-black border" onClick={moveUp}><TbArrowBigUpLines className="text-4xl"/></button>
      <button className="absolute right-14 bottom-2 rounded-full p-1 border-black border" onClick={moveDown}><TbArrowBigDownLines className="text-4xl"/></button>
      <button className="absolute right-3 bottom-8 rounded-full p-1 border-black border" onClick={moveUp}><GiPistolGun className="text-4xl"/></button>
      
    </>
  );
}
