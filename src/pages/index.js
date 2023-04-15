import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const images = Array.from({ length: 10 }).map((_, index) => (
    <img src="/lane.png" key={index} alt={`Image ${index}`} />
  ));

  return (
    <>
      <main>
        <div className="bg-white h-full w-full flex flex-row">{images}</div>
      </main>
    </>
  );
}
