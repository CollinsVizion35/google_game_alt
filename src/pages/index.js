import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const images = Array.from({ length: 100 }).map((_, index) => (
    <img src="/lane.png" key={index} alt={`Image ${index}`} />
  ));

  return (
    <>
      <main className="bg-white h-[100vh] w-[100vw] ">
        <div className="flex flex-row absolute bottom-0">{images}</div>
      </main>
    </>
  );
}
