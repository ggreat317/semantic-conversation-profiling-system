import {useState} from 'react'

import "../../css/loading.css"

type LoadingProps = {
  line1?: string;
  line2?: string;
};

export function Loading({line1 = "LOADING...", line2 = "THIS IS MURMUR. "} : LoadingProps){

  let lines;

  if(line1){
    if(line2) { lines = [line1.repeat(23),line2.repeat(23)]}
    else { lines = [line1.repeat(23),line1.repeat(23)]}
  }else{
    lines = [
      "LOADING...LOADING...LOADING....LOADING...LOADING...LOADING....LOADING...LOADING...LOADING....LOADING...LOADING...LOADING....LOADING...LOADING...LOADING....LOADING...LOADING...LOADING....LOADING...LOADING...LOADING....LOADING...LOADING...LOADING....",
      "THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR. THIS IS MURMUR."
    ]
  }

  return (
    <div className="loading-background">
      <div className="text-layer">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-row">
            {lines[i%2]}
          </div>
        ))}
      </div>
    </div>

  );
}